'use server'

import { getSizesProductStock } from './get-sizes-product-stock'
import prisma from '@/lib/prisma'

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        productImage: true
      },
      where: {
        slug
      }
    })

    if (!product) {
      return null
    }

    const sizes = await getSizesProductStock(product.id)

    return {
      ...product,
      sizes,
      images: product.productImage.map((image) => {
        return {
          id: image.id,
          url: image.url
        }
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
