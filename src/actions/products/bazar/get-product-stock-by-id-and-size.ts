'use server'

import { getProductById } from './get-product-by-id'
import { type ShoeSize, type ClotheSize, type AgeRange } from '@/interfaces'
import prisma from '@/lib/prisma'
import { isClothe, isShoe, isToy } from '@/utils/productTypeGuards'

interface IParams {
  productId: string
  clotheSize?: ClotheSize
  shoeSize?: ShoeSize | number
  ageRange?: AgeRange
}

export const getProductStockByIdAndSize = async ({ productId, shoeSize, clotheSize, ageRange }: IParams) => {
  try {
    const product = await getProductById({ productId })

    if (!product) {
      return null
    }

    if (isShoe(product)) {
      if (!shoeSize) {
        return null
      }

      const productStockDB = await prisma.shoeStock.findFirst({
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
        },
        where: {
          product: {
            id: productId
          },
          shoeSize
        }
      })

      if (!productStockDB) {
        return null
      }

      return productStockDB
    }

    if (isClothe(product)) {
      if (!clotheSize) {
        return null
      }

      const productStockDB = await prisma.clotheStock.findFirst({
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
        },
        where: {
          product: {
            id: productId
          },
          clotheSize
        }
      })

      if (!productStockDB) {
        return null
      }

      return productStockDB
    }

    if (isToy(product)) {
      if (!ageRange) {
        throw new Error('Age range is required for toy products')
      }

      const productStockDB = await prisma.toyStock.findFirst({
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
        },
        where: {
          product: {
            id: productId
          },
          ageRange
        }
      })

      if (!productStockDB) {
        return null
      }

      return productStockDB
    }

    throw new Error('Product type not found')
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
