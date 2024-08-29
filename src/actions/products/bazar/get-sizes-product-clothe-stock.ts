'use server'

import { type ClotheStockDetail } from '@/interfaces'
import prisma from '@/lib/prisma'

const sizeOrder: Record<string, number> = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
  XXL: 6
}

interface IParams {
  id: string
}

export const getSizesProductClotheStock = async ({ id }: IParams): Promise<ClotheStockDetail[]> => {
  try {
    const sizesProduct = await prisma.clotheStock.findMany({
      where: {
        productId: id
      },
      select: {
        clotheSize: true,
        inStock: true
      }
    })

    if (sizesProduct.length === 0) {
      return []
    }

    const sizesWithStock = sizesProduct
      .filter(size => size.inStock > 0) // filter sizes with stock > 0
      .map(size => ({
        clotheSize: size.clotheSize,
        inStock: size.inStock
      })) // get size and stock
      .sort((a, b) => sizeOrder[a.clotheSize] - sizeOrder[b.clotheSize]) // sort sizes

    return sizesWithStock
  } catch (error) {
    return []
  }
}
