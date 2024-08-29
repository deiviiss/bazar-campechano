'use server'

import { getSizesProductClotheStock } from './bazar/get-sizes-product-clothe-stock'
import { type ClotheSize } from '@/interfaces'
import prisma from '@/lib/prisma'

interface IParams {
  productId: string
  size: ClotheSize
}

export const getProductByIdSize = async ({ productId, size }: IParams) => {
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
          id: productId
        },
        clotheSize: size
      }
    })

    if (!productStockDB) {
      return null
    }

    const sizesProduct = await getSizesProductClotheStock({ id: productStockDB.product.id })
    const { productImage, ...restProduct } = productStockDB.product

    const productStock = {
      ...restProduct,
      images: productImage,
      sizes: sizesProduct,
      stock: {
        id: productStockDB.id,
        size: productStockDB.clotheSize,
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
