'use server'

import { type Product } from '@/interfaces'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  query?: string
  page?: number
  take?: number
}

export const getPaginationProductsWithImages = async ({ page = 1, take = 12, query = '' }: PaginationOptions): Promise<{ currentPage: number, totalPages: number, products: Product[] }> => {
  page = validatePageNumber(page)

  try {
    // get products
    const productsDB = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        productImage: {
          take: 2,
          select: {
            id: true,
            url: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      where: {
        title: {
          contains: query,
          mode: 'insensitive'
        }
      }
    })

    const totalCount = await prisma.product.count({
      where: {
        title: {
          contains: query,
          mode: 'insensitive'
        }
      }
    })
    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages,
      products: productsDB
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
