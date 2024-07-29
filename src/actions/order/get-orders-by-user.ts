'use server'

import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getOrdersByUser = async ({ page = 1, take = 12 }: PaginationOptions) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'Debe estar autenticado para realizar esta acción'
    }
  }

  page = validatePageNumber(page)

  const orders = await prisma.order.findMany({
    take,
    skip: (page - 1) * take,
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      orderAddresses: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  })

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
