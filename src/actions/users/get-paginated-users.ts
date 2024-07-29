'use server'

import { validateUserAdmin } from '@/actions'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getPaginatedUsers = async ({ page = 1, take = 12 }: PaginationOptions) => {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    return {
      ok: false,
      message: 'Debe estar autenticado para realizar como administrador'
    }
  }

  page = validatePageNumber(page)

  const users = await prisma.user.findMany({
    take,
    skip: (page - 1) * take,
    orderBy: {
      name: 'desc'
    }
  })

  if (!users) {
    return {
      ok: false,
      message: 'No se encontraron usuarios'
    }
  }

  const totalCount = await prisma.order.count({})

  const totalPages = Math.ceil(totalCount / take)

  return {
    ok: true,
    users,
    currentPage: page,
    totalPages
  }
}
