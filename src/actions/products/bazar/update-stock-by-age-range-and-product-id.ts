'use server'

import { getProductById } from './get-product-by-id'
import { type Stock, type AgeRange } from '@/interfaces'
import prisma from '@/lib/prisma'
import { isToy } from '@/utils/productTypeGuards'

interface IParams {
  id: string
  ageRange: AgeRange
  inStock: number
}

interface IResponse {
  ok: boolean
  message: string
  stock: Stock | null
}

export const updateStockByAgeRangeAndProductId = async ({ id, ageRange, inStock }: IParams): Promise<IResponse> => {
  try {
    const product = await getProductById({ productId: id })

    if (!product) {
      return {
        ok: false,
        message: 'Product not found',
        stock: null
      }
    }

    if (isToy(product)) {
      const updatedStock = await prisma.toyStock.update({
        where: {
          ageRange_productId: {
            ageRange,
            productId: id
          }
        },
        data: {
          inStock
        },
        include: {
          product: {
            include: {
              productImage: true,
              category: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              }
            }
          }
        }
      })

      const stock = {
        ...updatedStock,
        ageRange: updatedStock.ageRange as AgeRange
      }

      return {
        ok: true,
        message: 'Stock updated successfully',
        stock
      }
    }

    return {
      ok: false,
      message: 'Product is not a toy',
      stock: null
    }
  } catch (error) {
    return {
      ok: false,
      message: 'An error occurred while updating the stock',
      stock: null
    }
  }
}
