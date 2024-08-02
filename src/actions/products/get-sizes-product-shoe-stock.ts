'use server'

import { type SizeShoe } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getSizesProductShoeStock = async (id: string): Promise<SizeShoe[]> => {
  try {
    const sizesProduct = await prisma.shoeStock.findMany({
      where: {
        productId: id
      },
      select: {
        size: true,
        inStock: true
      }
    })

    if (sizesProduct.length === 0) {
      return []
    }

    const sizes = sizesProduct.map(size => size.size)

    return sizes
  } catch (error) {
    return []
  }
}
