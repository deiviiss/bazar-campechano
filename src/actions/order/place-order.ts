'use server'

import { type PaymentMethod, type ShippingMethod } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getUserSessionServer, sendNotificationsPaymentMethod } from '@/actions'
import { type UserAddress, type ProductToOrder } from '@/interfaces'
import prisma from '@/lib/prisma'

interface OrderDetails {
  productsId: ProductToOrder[]
  address: UserAddress
  shippingMethod: ShippingMethod
  paymentMethod: PaymentMethod
}

// Utility function for stock validation
const validateStockForProduct = (product: ProductToOrder, productStocks: Array<{
  id: string
  productId: string
  valueOptionId: string
  valueOption: { value: string }
  inStock: number
  product: {
    title: string
    price: number
  }
}>) => {
  const stockForProduct = productStocks.find((stock) => {
    const hasAttributes = Array.isArray(product.attributes) && product.attributes.length > 0

    return (
      stock.productId === product.productId &&
      (!hasAttributes ||
        product.attributes.every((attr) => stock.valueOption.value === attr.value))
    )
  })

  // Check if the product exists in the stock
  if (!stockForProduct && product.attributes.length > 0) {
    throw new Error(
      'Producto no encontrado en el inventario. Revise los atributos del producto.'
    )
  }

  if (!stockForProduct) {
    throw new Error('Producto con no encontrado en el inventario.')
  }

  // Check if there is enough stock
  if (stockForProduct.inStock < product.quantity && product.attributes.length > 0) {
    throw new Error(
      `Producto ${stockForProduct.product.title} con talla ${product.attributes
        .map((attr) => attr.value)
        .join(', ')} no tiene suficiente stock.`
    )
  }

  if (stockForProduct.inStock < product.quantity) {
    throw new Error(
      `Producto ${stockForProduct.product.title} no tiene suficiente stock disponible.`
    )
  }

  return stockForProduct
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

  try {
    // session user
    const user = await getUserSessionServer()

    if (!user) {
      return {
        ok: false,
        message: 'No se ha podido obtener la información del usuario'
      }
    }

    const productStocks = await prisma.productAttributeValue.findMany({
      where: {
        OR: productsId.map(product => {
          const hasAttributes = Array.isArray(product.attributes) && product.attributes.length > 0

          return {
            productId: product.productId,
            ...(hasAttributes && {
              valueOption: {
                value: {
                  in: product.attributes.map((attr) => attr.value)
                }
              }
            })
          }
        })
      },
      include: {
        product: {
          include: {
            productImage: true,
            category: true
          }
        },
        valueOption: true // Include details of the value of the attribute
      }
    })

    // check if all products are in stock
    productsId.forEach(product => {
      validateStockForProduct(product, productStocks)
    })

    const totalItemsInOrder = productsId.reduce((count, product) => count + product
      .quantity, 0)

    const subTotal = productsId.reduce((total, product) => {
      const stockForProduct = validateStockForProduct(product, productStocks)
      return total + stockForProduct.product.price * product.quantity
    }, 0)

    const shippingCost =
  shippingMethod === 'pickup'
    ? 0
    : subTotal > 199
      ? 0
      : 45

    const total = subTotal + shippingCost

    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          subtotal: subTotal,
          shippingCost,
          total,
          paymentMethod,
          shippingMethod,
          itemsInOrder: totalItemsInOrder
        }
      })

      // Create order items
      for (const product of productsId) {
        const stockForProduct = validateStockForProduct(product, productStocks)

        await tx.orderItem.create({
          data: {
            orderId: newOrder.id, // Relation to the order
            productId: product.productId,
            quantity: product.quantity,
            price: stockForProduct.product.price,
            attributes: {
              connect: product.attributes.map((attr) => {
                const matchingStock = productStocks.find(
                  (stock) =>
                    stock.productId === product.productId &&
                stock.valueOption.value === attr.value
                )

                if (!matchingStock) {
                  throw new Error(`Atributo no válido: ${attr.value}`)
                }

                return { id: matchingStock.valueOptionId }
              })
            }
          }
        })
      }

      const { country, userId, ...restAddress } = address

      // Create order address
      await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: address.country,
          orderId: newOrder.id
        }
      })

      // Reduce stock
      await Promise.all(
        productsId.map(async (product) => {
          const stockForProduct = validateStockForProduct(product, productStocks)

          return await prisma.productAttributeValue.update({
            where: { id: stockForProduct.id },
            data: {
              inStock: {
                decrement: product.quantity
              }
            }
          })
        })
      )

      return newOrder
    })

    if (paymentMethod === 'cash') {
      await sendNotificationsPaymentMethod({ userName: user.name, paymentMethod })
    }

    if (paymentMethod === 'transfer') {
      await sendNotificationsPaymentMethod({ userName: user.name, paymentMethod })
    }

    revalidatePath('/')
    revalidatePath('/admin')

    return { ok: true, message: 'Order placed successfully', orderId: order.id }
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message }
    }
    return { ok: false, message: 'Error al colocar pedido, contacta a soporte' }
  }
}
