'use server'

import { type PaymentMethod, type ShippingMethod } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getUserById, getUserSessionServer, sendNotificationsPaymentMethod } from '@/actions'
import { type UserAddress, type ProductToOrder, type User } from '@/interfaces'
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
  attributeId: string
  valueOption: { value: string }
  inStock: number
  product: {
    title: string
    price: number
    categoryId: string
  }
}>) => {
  // Check if the product exists in the stock
  const stock = productStocks.find((stock) => {
    // verify if the productId matches
    if (stock.productId !== product.productId) return false

    // verify if the attributes match
    const attributesMatch = product.attributes.every((attr) =>
      stock.attributeId === attr.attributeId &&
      stock.valueOptionId === attr.valueOptionId
    )

    return attributesMatch
  })

  // Product not found in stock
  if (!stock) {
    throw new Error(
      product.attributes.length > 0
        ? 'Producto no encontrado en el inventario con los atributos seleccionados.'
        : 'Producto no encontrado en el inventario.'
    )
  }

  // Check if there is enough stock
  if (stock.inStock < product.quantity) {
    const attributeDetails =
      product.attributes.length > 0
        ? ` con atributos ${product.attributes
            .map((attr) => stock.valueOption.value)
            .join(', ')}`
        : ''

    throw new Error(
      `Producto ${stock.product.title}${attributeDetails} no tiene suficiente stock disponible.`
    )
  }

  return stock
}

// Utility function for order creation process
const createOrderProcess = async (
  user: User,
  productsId: ProductToOrder[],
  address: UserAddress,
  paymentMethod: PaymentMethod,
  shippingMethod: ShippingMethod,
  productStocks: Array<{
    id: string
    productId: string
    valueOptionId: string
    attributeId: string
    valueOption: { value: string }
    inStock: number
    product: {
      title: string
      price: number
      categoryId: string
    }
  }>
) => {
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
                stock.attributeId === attr.attributeId
              )

              if (!matchingStock) {
                throw new Error('Atributo no válido')
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

  if (paymentMethod === 'cash' || paymentMethod === 'transfer') {
    await sendNotificationsPaymentMethod({ userName: user.name, userEmail: user.email, paymentMethod })
  }

  return order.id
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
    const userSession = await getUserSessionServer()
    if (!userSession) {
      return {
        ok: false,
        message: 'No se ha podido obtener la información del usuario'
      }
    }
    const { user } = await getUserById(userSession.id)
    if (!user) {
      return {
        ok: false,
        message: 'No se ha podido obtener la información del usuario'
      }
    }

    const userValidated = user.emailVerified && user.phoneNumberVerified

    // User not validated
    if (!userValidated) {
      // User has already purchased once
      if (user.hasPurchasedOnce) {
        return {
          ok: false,
          message: 'Por favor, valida tu cuenta desde tu perfil para continuar comprando.'
        }
      }
    }

    const productStocks = await prisma.productAttributeValue.findMany({
      where: {
        productId: { in: productsId.map(product => product.productId) }
      },
      include: {
        product: true,
        valueOption: {
          select: {
            value: true
          }
        }
      }
    })

    // If user is validated, proceed with order creation normally
    const orderId = await createOrderProcess(user, productsId, address, paymentMethod, shippingMethod, productStocks)

    revalidatePath('/orders')

    return { ok: true, message: 'Order placed successfully', orderId }
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message }
    }
    return { ok: false, message: 'Error al colocar pedido, contacta a soporte' }
  }
}
