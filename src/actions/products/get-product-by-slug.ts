'use server'

import { type ProductV2WithStock, type ProductAttributeValue } from '@/interfaces'
import prisma from '@/lib/prisma'

interface IResponse {
  ok: boolean
  message: string
  product: ProductV2WithStock | null
}

export const getProductBySlug = async (slug: string): Promise<IResponse> => {
  try {
    const productDB = await prisma.product.findFirst({
      include: {
        productImage: {
          select: {
            id: true,
            url: true
          }
        },
        category: true,
        productAttributeValue: {
          include: {
            attribute: {
              select: {
                id: true,
                name: true
              }
            },
            valueOption: {
              select: {
                id: true,
                value: true
              }
            }
          }
        }
      },
      where: {
        slug
      }
    })

    if (!productDB) {
      return {
        ok: false,
        message: 'No se encontró el producto',
        product: null
      }
    }

    const hasStock = productDB.productAttributeValue.some((attr) => attr.inStock > 0)
    const hasSize = productDB.productAttributeValue.some(attr => attr.attribute.name === 'size')
    const availableSizes = productDB.productAttributeValue
      .filter(attr => attr.attribute.name === 'size' && attr.inStock > 0)
      .map(attr => attr.valueOption.value)
      .sort((a, b) => {
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
        const isNumeric = !isNaN(Number(a)) && !isNaN(Number(b))
        return isNumeric ? Number(a) - Number(b) : sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
      })

    const product: ProductV2WithStock = {
      id: productDB.id,
      title: productDB.title,
      description: productDB.description,
      history: productDB.history,
      price: productDB.price,
      slug: productDB.slug,
      isActive: productDB.isActive,
      categoryId: productDB.category.id,
      category: {
        id: productDB.category.id,
        name: productDB.category.name,
        description: productDB.category.description
      },
      productImage: productDB.productImage,
      productAttributeValue: productDB.productAttributeValue.map((attr) => ({
        id: attr.id,
        attribute: {
          id: attr.attribute.id,
          name: attr.attribute.name
        },
        valueOption: {
          id: attr.valueOption.id,
          value: attr.valueOption.value
        },
        inStock: attr.inStock
      })) as ProductAttributeValue[],
      hasStock,
      hasSize,
      availableSizes
    }

    return {
      ok: true,
      message: 'Producto encontrado',
      product
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
