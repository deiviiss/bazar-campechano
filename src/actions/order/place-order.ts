'use server'

import { type PaymentMethod, type ShippingMethod } from '@prisma/client'
import { getUserSessionServer, sendNotificationsPaymentMethod } from '@/actions'
import { type UserAddress, type Size } from '@/interfaces'
import prisma from '@/lib/prisma'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
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

  const products = await prisma.productStock.findMany({
    where: {
      size: {
        in: productsId.map(product => product.size)
      },
      product: {
        id: {
          in: productsId.map(product => product.productId)
        }
      }
    },
    include: {
      product: true
    }
  })

  const totalItemsInOrder = productsId.reduce((count, product) => count + product
    .quantity, 0)

  const { subTotal, tax, total } = productsId.reduce((totals, items) => {
    const productQuantity = items.quantity
    const product = products.find(product => product.product.id === items.productId && product.size === items.size)

    if (!product) throw new Error('Product not found - 500')

    const subTotal = product.product.price * productQuantity

    totals.subTotal += subTotal
    totals.tax += subTotal * 0.16
    totals.total += subTotal + subTotal * 0.16

    return totals
  }, { subTotal: 0, tax: 0, total: 0 })

  const orderItems = productsId.map(p => ({
    quantity: p.quantity,
    size: p.size,
    productId: p.productId,
    price: products.find(product => product.productId === p.productId)?.product.price || 0
  }))

  const { country, userId, ...restAddress } = address

  // transaction db
  try {
    const prismaTX = await prisma.$transaction(async (tx) => {
      // Update stock
      const updatedProductsPromises = products.map(async (product) => {
        const size = productsId.find(item => item.productId === product.productId && item.size === product.size)?.size

        const quantity = productsId.find(item => item.productId === product.productId && item.size === product.size)?.quantity

        if (!quantity || quantity <= 0) {
          throw new Error('La cantidad no puede ser 0')
        }

        if (!size) {
          throw new Error('Talla no encontrada')
        }

        const productStock = await tx.productStock.findFirst({
          where: {
            productId: product.productId,
            size
          },
          select: {
            id: true,
            inStock: true
          }
        })

        // check if all products are in stock
        if (productStock === null || productStock.inStock === 0) {
          throw new Error(`Producto ${product.product.title} con talla ${size} agotado`)
        }

        if (productStock.inStock < quantity) {
          throw new Error(`Producto ${product.product.title} con talla ${size} no tiene suficiente stock`)
        }

        return await tx.productStock.update({
          where: { id: productStock.id },
          data: {
            inStock: {
              decrement: quantity
            }
          }
        })
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

    return { ok: true, order: prismaTX.order }
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message }
    }
    return { ok: false, message: 'Error al colocar pedido, contacta a soporte' }
  }
}
