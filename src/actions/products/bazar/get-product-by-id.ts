'use server'

import { getToyAgeRangeAndStock, getSizesProductClotheStock, getSizesProductShoeStock } from '@/actions'
import prisma from '@/lib/prisma'
import { isClothe, isShoe, isToy } from '@/utils/productTypeGuards'

interface IParams {
  productId: string
}

export const getProductById = async ({ productId }: IParams) => {
  try {
    const productDB = await prisma.product.findFirst({
      where: {
        id: productId
      },
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
    })

    if (!productDB) {
      return null
    }

    const product = productDB

    if (isShoe(product)) {
      const shoeSizes = await getSizesProductShoeStock({ id: product.id })

      return {
        ...product,
        availableSizes: shoeSizes
      }
    }

    if (isClothe(product)) {
      const clotheSizes = await getSizesProductClotheStock({ id: product.id })

      return {
        ...product,
        availableSizes: clotheSizes
      }
    }

    if (isToy(product)) {
      const ageRange = await getToyAgeRangeAndStock({ id: product.id })

      return {
        ...product,
        ageRange
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
