'use server'

import { type PaymentMethod, type ShippingMethod } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getUserSessionServer, sendNotificationsPaymentMethod } from '@/actions'
import { type UserAddress, type ClotheSize, type ShoeSize, type AgeRange, type Stock } from '@/interfaces'
import prisma from '@/lib/prisma'
import { isClothe, isShoe, isToy } from '@/utils/productTypeGuards'

interface ProductToOrder {
  productId: string
  quantity: number
  shoeSize?: ShoeSize
  clotheSize?: ClotheSize
  ageRange?: AgeRange
}

interface OrderDetails {
  productsId: ProductToOrder[]
  address: UserAddress
  shippingMethod: ShippingMethod
  paymentMethod: PaymentMethod
}

export const placeOrder = async ({ productsId, address, paymentMethod, shippingMethod }: OrderDetails) => {
  // validate shipping and payment method
  if (!shippingMethod) {
    return {
      ok: false,
      message: 'No se ha seleccionado un método de envío'
    }
  }

  if (!['pickup', 'delivery'].includes(shippingMethod as string)) {
    return {
      ok: false,
      message: 'Método de envío no válido'
    }
  }

  if (!paymentMethod) {
    return {
      ok: false,
      message: 'No se ha seleccionado un método de pago'
    }
  }

  if (!['paypal', 'mercadopago', 'cash', 'transfer'].includes(paymentMethod as string)) {
    return {
      ok: false,
      message: 'Método de pago no válido'
    }
  }

  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'No se ha podido obtener la información del usuario'
    }
  }

  const clotheSizes = productsId
    .filter(product => typeof product.clotheSize === 'string')
    .map(product => product.clotheSize)

  const validClotheSizes = clotheSizes.filter((size): size is ClotheSize => size !== undefined)

  const shoeSizes = productsId
    .filter(product => typeof product.shoeSize === 'number')
    .map(product => product.shoeSize)

  const validateShoeSizes = shoeSizes.filter((size): size is ShoeSize => size !== undefined)

  const ageRanges = productsId
    .filter(product => typeof product.ageRange === 'string')
    .map(product => product.ageRange)

  const validateAgeRanges = ageRanges.filter((range): range is AgeRange => range !== undefined)

  const productsIds = productsId.map(product => product.productId)

  const clotheStock = await prisma.clotheStock.findMany({
    where: {
      clotheSize: {
        in: validClotheSizes
      },
      product: {
        id: {
          in: productsIds
        }
      }
    },
    include: {
      product: {
        include: {
          productImage: true,
          category: true
        }
      }
    }
  })

  const shoeStock = await prisma.shoeStock.findMany({
    where: {
      shoeSize: {
        in: validateShoeSizes
      },
      product: {
        id: {
          in: productsIds
        }
      }
    },
    include: {
      product: {
        include: {
          productImage: true,
          category: true
        }
      }
    }
  })

  const toyStock = await prisma.toyStock.findMany({
    where: {
      ageRange: {
        in: validateAgeRanges
      },
      product: {
        id: {
          in: productsId.map(product => product.productId)
        }
      }
    },
    include: {
      product: {
        include: {
          productImage: true,
          category: true
        }
      }
    }
  }) as Stock[]

  const allProductsStock: Stock[] = [...clotheStock, ...shoeStock, ...toyStock]

  const totalItemsInOrder = productsId.reduce((count, product) => count + product
    .quantity, 0)

  const { subTotal, tax, total } = productsId.reduce((totals, items) => {
    const productQuantity = items.quantity

    const product = allProductsStock.find(stock => {
      return stock.product.id === items.productId && (
        ('clotheSize' in stock && stock.clotheSize === items.clotheSize) ||
        ('shoeSize' in stock && stock.shoeSize === items.shoeSize) ||
        ('ageRange' in stock && stock.ageRange === items.ageRange)
      )
    })

    if (!product) throw new Error('Product not found - 500')

    const subTotal = product.product.price * productQuantity

    totals.subTotal += subTotal
    // Determine if pickup in store applies
    const pickupInStore = shippingMethod === 'pickup'

    // Calculate tax based on shipping method and subtotal
    const productTax = pickupInStore
      ? 0
      : totals.subTotal > 199
        ? 0
        : 45

    // Update tax
    totals.tax = productTax

    // Calculate total for the current set of products
    const productTotal = subTotal + productTax

    // Update total
    totals.total += productTotal

    return totals
  }, { subTotal: 0, tax: 0, total: 0 })

  const orderItems = productsId.map(item => {
    let price = 0

    const productStock = allProductsStock.find(stock =>
      stock.product.id === item.productId && (
        ('clotheSize' in stock && stock.clotheSize === item.clotheSize) ||
        ('shoeSize' in stock && stock.shoeSize === item.shoeSize) ||
      ('ageRange' in stock && stock.ageRange === item.ageRange)
      )
    )

    if (productStock) {
      price = productStock.product.price
    }

    return {
      quantity: item.quantity,
      clotheSize: item.clotheSize || undefined,
      shoeSize: item.shoeSize || undefined,
      toyAgeRange: item.ageRange || undefined,
      productId: item.productId,
      price
    }
  })

  const { country, userId, ...restAddress } = address

  // transaction db
  try {
    const prismaTX = await prisma.$transaction(async (tx) => {
      // Update stock
      const updatedProductsPromises = allProductsStock.map(async (product) => {
        if (isClothe(product.product)) {
          const productDetails = productsId.find(item => {
            return item.productId === product.product.id && (
              item.clotheSize === product.clotheSize
            )
          }

          )

          const clotheSize: ClotheSize | undefined = productDetails?.clotheSize
          const quantity = productDetails?.quantity

          if (!clotheSize) throw new Error('Talla no disponible')
          if (!quantity || quantity <= 0) throw new Error('La cantidad no puede ser 0')

          const productClotheStock = await tx.clotheStock.findFirst({
            where: {
              productId: product.product.id,
              clotheSize
            },
            select: {
              id: true,
              inStock: true
            }
          })

          // check if all clothe products are in stock
          if (productClotheStock === null || productClotheStock.inStock === 0) {
            throw new Error(`Producto ${product.product.title} con talla ${clotheSize} agotado`)
          }

          if (productClotheStock.inStock < quantity) {
            throw new Error(`Producto ${product.product.title} con talla ${clotheSize} no tiene suficiente stock`)
          }

          const updatedClotheProduct = await tx.clotheStock.update({
            where: { id: productClotheStock.id },
            data: {
              inStock: {
                decrement: quantity
              }
            }
          })

          return updatedClotheProduct
        }

        if (isShoe(product.product)) {
          const productDetails = productsId.find(item =>
            item.productId === product.product.id && (
              item.shoeSize === product.shoeSize
            )
          )

          const shoeSize: ShoeSize | undefined = productDetails?.shoeSize
          const quantity = productDetails?.quantity

          if (!shoeSize) throw new Error('Talla no encontrada')
          if (!quantity || quantity <= 0) throw new Error('La cantidad no puede ser 0')

          const productShoeStock = await tx.shoeStock.findFirst({
            where: {
              productId: product.product.id,
              shoeSize
            },
            select: {
              id: true,
              inStock: true
            }
          })

          // check if all shoe products are in stock
          if (productShoeStock === null || productShoeStock.inStock === 0) {
            throw new Error(`Producto ${product.product.title} con talla ${shoeSize} agotado`)
          }

          if (productShoeStock.inStock < quantity) {
            throw new Error(`Producto ${product.product.title} con talla ${shoeSize} no tiene suficiente stock`)
          }

          const updatedShoeProduct = await tx.shoeStock.update({
            where: { id: productShoeStock.id },
            data: {
              inStock: {
                decrement: quantity
              }
            }
          })

          return updatedShoeProduct
        }

        if (isToy(product.product)) {
          const productDetails = productsId.find(item => {
            return item.productId === product.product.id && (
              item.ageRange === product.ageRange
            )
          }
          )

          const ageRange: AgeRange | undefined = productDetails?.ageRange
          const quantity = productDetails?.quantity

          if (!ageRange) throw new Error('Rango de edad no encontrado')
          if (!quantity || quantity <= 0) throw new Error('La cantidad no puede ser 0')

          const productToyStock = await tx.toyStock.findFirst({
            where: {
              productId: product.product.id,
              ageRange
            },
            select: {
              id: true,
              inStock: true
            }
          })

          // check if all toy products are in stock
          if (productToyStock === null || productToyStock.inStock === 0) {
            throw new Error(`Producto ${product.product.title} agotado`)
          }

          if (productToyStock.inStock < quantity) {
            throw new Error(`Producto ${product.product.title} no tiene suficiente stock`)
          }

          const updatedToyProduct = await tx.toyStock.update({
            where: { id: productToyStock.id },
            data: {
              inStock: {
                decrement: quantity
              }
            }
          })

          return updatedToyProduct
        }
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)

      // create order
      const order = await tx.order.create({
        data: {
          userId: user.id,
          itemsInOrder: totalItemsInOrder,
          subtotal: subTotal,
          tax,
          total,
          paymentMethod,
          shippingMethod,

          orderItem: {
            createMany: {
              data: orderItems
            }
          }
        }
      })

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: address.country,
          orderId: order.id
        }
      })

      return {
        order,
        updatedProducts,
        orderAddress
      }
    })

    if (paymentMethod === 'cash') {
      await sendNotificationsPaymentMethod({ userName: user.name, paymentMethod })
    }

    if (paymentMethod === 'transfer') {
      await sendNotificationsPaymentMethod({ userName: user.name, paymentMethod })
    }

    revalidatePath('/')
    revalidatePath('/admin')

    return { ok: true, order: prismaTX.order }
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message }
    }
    return { ok: false, message: 'Error al colocar pedido, contacta a soporte' }
  }
}
