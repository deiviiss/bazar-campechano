'use server'

import { getSizesProductClotheStock } from './bazar/get-sizes-product-clothe-stock'
import { type ClotheSize } from '@/interfaces'
import prisma from '@/lib/prisma'

interface IParams {
  slug: string
  size: ClotheSize
}

export const getProductBySlugSize = async ({ slug, size }: IParams) => {
  try {
    const productStockDB = await prisma.clotheStock.findFirst({
      include: {
        product: {
          include: {
            productImage: true
          }
        }
      },
      where: {
        product: {
          slug
        },
        clotheSize: size
      }
    })

    if (!productStockDB) {
      return null
    }

    const productSizes = await getSizesProductClotheStock({ id: productStockDB.product.id })
    const { productImage, ...restProduct } = productStockDB.product

    const productStock = {
      ...restProduct,
      productImage,
      sizes: productSizes,
      stock: {
        id: productStockDB.id,
        clotheSize: productStockDB.clotheSize,
        inStock: productStockDB.inStock
      }
    }

    return productStock
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
