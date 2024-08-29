'use server'

import { getProductById } from './get-product-by-id'
import { type ShoeSize, type ClotheSize } from '@/interfaces'
import prisma from '@/lib/prisma'
import { isClothe, isShoe } from '@/utils/productTypeGuards'

interface IParams {
  id: string
  size: ClotheSize | ShoeSize | number
  inStock: number
}

interface IResponse {
  ok: boolean
  message: string
}

export const updateStockBySizeAndProductId = async ({ id, size, inStock }: IParams): Promise<IResponse> => {
  try {
    const product = await getProductById({ productId: id })

    if (!product) {
      return {
        ok: false,
        message: 'Product not found'
      }
    }

    if (isShoe(product)) {
      await prisma.shoeStock.update({
        where: {
          shoeSize_productId: {
            shoeSize: size as ShoeSize,
            productId: id
          }
        },
        data: {
          inStock
        }
      })

      return {
        ok: true,
        message: 'Stock updated'
      }
    }

    if (isClothe(product)) {
      await prisma.clotheStock.update({
        where: {
          clotheSize_productId: {
            clotheSize: size as ClotheSize,
            productId: id
          }
        },
        data: {
          inStock
        }
      })

      return {
        ok: true,
        message: 'Stock updated'
      }
    }

    return {
      ok: false,
      message: 'Product is not a shoe or clothe'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'An error occurred while updating the stock'
    }
  }
}
