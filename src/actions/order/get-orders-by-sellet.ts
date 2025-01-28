'use server'

import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getOrdersBySeller = async ({ page = 1, take = 12 }: PaginationOptions) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'Debe estar autenticado para realizar esta acción'
    }
  }

  page = validatePageNumber(page)

  // const orders = await prisma.order.findMany({
  //   take,
  //   skip: (page - 1) * take,
  //   where: {
  //     userId: user.id
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   },
  //   include: {
  //     orderAddresses: {
  //       select: {
  //         firstName: true,
  //         lastName: true
  //       }
  //     }
  //   }
  // })

  const productsWithOrders = await prisma.product.findMany({
    where: {
      userId: user.id
    },
    take,
    skip: (page - 1) * take,
    include: {
      orderItem: {
        include: {
          order: {
            include: {
              orderAddresses: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (productsWithOrders.length === 0) {
    return {
      ok: false,
      message: 'No se encontraron productos con pedidos para este vendedor'
    }
  }

  // Structuring data to respond to the frontend
  const orders = productsWithOrders.flatMap((product) =>
    product.orderItem.map((orderItem) => ({
      id: orderItem.order.id,
      subtotal: orderItem.order.subtotal,
      shippingCost: orderItem.order.shippingCost,
      total: orderItem.order.total,
      itemsInOrder: orderItem.quantity, // Suponemos que cada orderItem representa un producto vendido
      status: orderItem.order.status,
      paymentMethod: orderItem.order.paymentMethod,
      shippingMethod: orderItem.order.shippingMethod,
      isPaid: orderItem.order.isPaid,
      paidAt: orderItem.order.paidAt,
      createdAt: orderItem.order.createdAt,
      updatedAt: orderItem.order.updatedAt,
      userId: orderItem.order.userId,
      transactionId: orderItem.order.transactionId,
      orderAddresses: orderItem.order.orderAddresses || null
    }))
  )

  if (orders.length === 0) {
    return {
      ok: false,
      message: 'No se encontraron pedidos'
    }
  }

  const totalCount = await prisma.order.count({
    where: {
      userId: user.id
    }
  })

  const totalPages = Math.ceil(totalCount / take)

  return {
    ok: true,
    orders,
    currentPage: page,
    totalPages
  }
}
