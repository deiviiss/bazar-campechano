'use server'

import { getSizesProductStock } from './get-sizes-product-stock'
import { type ProductWithStock } from '@/interfaces'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  query?: string
  page?: number
  take?: number
}

export const getPaginationProductsStockWithImages = async ({ page = 1, take = 12, query = '' }: PaginationOptions): Promise<{ currentPage: number, totalPages: number, products: ProductWithStock[] }> => {
  page = validatePageNumber(page)

  try {
    // get stock products
    const productsStockDB = await prisma.productStock.findMany({
      where: {
        product: {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        }
      },
      take,
      skip: (page - 1) * take,
      include: {
        product: {
          include: {
            productImage: {
              take: 2,
              select: {
                id: true,
                url: true
              }
            }
          }
        }
      },
      orderBy: [
        {
          product:
          {
            title: 'asc'
          }
        },
        {
          size: 'asc'
        }
      ]
    })

    if (!productsStockDB) {
      return {
        currentPage: page,
        totalPages: 0,
        products: []
      }
    }

    const totalCount = await prisma.productStock.count({
      where: {
        product: {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        }
      }
    })

    const totalPages = Math.ceil(totalCount / take)

    const productsStock = await Promise.all(productsStockDB.map(async (produtStock) => {
      const sizesProduct = await getSizesProductStock(produtStock.product.id)
      const { productImage, ...restProduct } = produtStock.product

      return {
        ...restProduct,
        images: productImage,
        sizes: sizesProduct,
        stock: {
          id: produtStock.id,
          size: produtStock.size,
          inStock: produtStock.inStock
        }
      }
    }))

    return {
      currentPage: page,
      totalPages,
      products: productsStock
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
