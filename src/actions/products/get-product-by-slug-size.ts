'use server'

import { getSizesProductStock } from './get-sizes-product-clothe-stock'
import { type Size } from '@/interfaces'
import prisma from '@/lib/prisma'

interface IParams {
  slug: string
  size: Size
}

export const getProductBySlugSize = async ({ slug, size }: IParams) => {
  try {
    const productStockDB = await prisma.productStock.findFirst({
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
        size
      }
    })

    if (!productStockDB) {
      return null
    }

    const sizesProduct = await getSizesProductStock(productStockDB.product.id)
    const { productImage, ...restProduct } = productStockDB.product

    const productStock = {
      ...restProduct,
      images: productImage,
      sizes: sizesProduct,
      stock: {
        id: productStockDB.id,
        size: productStockDB.size,
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
