'use server'

import { processProductByType } from '@/actions'
import { type ProductType } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getProductBySlug = async (slug: string): Promise<ProductType | null> => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        productImage: true,
        category: true
      },
      where: {
        slug
      }
    })

    if (!product) {
      return null
    }

    const productProcessed = await processProductByType(product)

    return productProcessed
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
