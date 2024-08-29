'use server'

import prisma from '@/lib/prisma'

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug
      },
      include: {
        clotheStock: true
      }
    })

    if (!product) {
      return 0
    }

    const stock = product.clotheStock?.map((stock) => stock.inStock).reduce((acc, stock) => acc + stock, 0)

    return stock || 0
  } catch (error) {
    return 0
  }
}
