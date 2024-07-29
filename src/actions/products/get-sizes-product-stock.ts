'use server'

import { type Size } from '@/interfaces'
import prisma from '@/lib/prisma'

const sizeOrder = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
  XXL: 6,
  XXXL: 7
}

export const getSizesProductStock = async (id: string): Promise<Size[]> => {
  try {
    const sizesProduct = await prisma.productStock.findMany({
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

    const sizes = sizesProduct
      .filter(size => size.inStock > 0) // filter sizes with stock > 0
      .map(size => size.size) // get only size
      .sort((a, b) => sizeOrder[a] - sizeOrder[b]) // sort sizes

    return sizes
  } catch (error) {
    return []
  }
}
