'use server'

import { type ShoeSize, type ShoeStockDetail } from '@/interfaces'
import prisma from '@/lib/prisma'

interface IParams {
  id: string
}

export const getSizesProductShoeStock = async ({ id }: IParams): Promise<ShoeStockDetail[]> => {
  try {
    const sizesProduct = await prisma.shoeStock.findMany({
      where: {
        productId: id
      },
      select: {
        shoeSize: true,
        inStock: true
      },
      orderBy: {
        shoeSize: 'asc'
      }
    })

    if (sizesProduct.length === 0) {
      return []
    }

    const sizesWithStock = sizesProduct
      .filter(size => size.inStock > 0)
      .map(size => ({
        shoeSize: size.shoeSize as ShoeSize,
        inStock: size.inStock
      }))

    return sizesWithStock
  } catch (error) {
    throw new Error('No sizes found')
  }
}
