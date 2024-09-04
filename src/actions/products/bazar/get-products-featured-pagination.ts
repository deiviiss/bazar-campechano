'use server'

import { processProductByType } from '@/actions'
import { type ProductType } from '@/interfaces'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  query?: string
  page?: number
  take?: number
}

interface IResponse {
  currentPage: number
  totalPages: number
  products: ProductType[]
}

export const getPaginationFeaturedProducts = async ({ page = 1, take = 8, query = '' }: PaginationOptions): Promise<IResponse> => {
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
            name: true,
            description: true
          }
        }
      },
      where: {
        isActive: true,
        title: {
          contains: query,
          mode: 'insensitive'
        }
      },
      orderBy: {
        price: 'asc'
      }
    })

    if (!productsDB) {
      throw new Error('No products found')
    }

    const totalCount = await prisma.product.count({
      where: {
        title: {
          contains: query,
          mode: 'insensitive'
        }
      }
    })

    const totalPages = Math.ceil(totalCount / take)

    const productsProcessed = await Promise.all(productsDB.map(async (product) => {
      return await processProductByType(product)
    }))

    return {
      currentPage: page,
      totalPages,
      products: productsProcessed
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
