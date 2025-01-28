'use server'

import { type ProductV2WithStock, type StockDetail } from '@/interfaces'
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
        user: true,
        productImage: {
          select: {
            id: true,
            url: true
          }
        },
        category: {
          include: {
            attribute: {
              include: {
                valueOptions: true
              }
            }
          }
        },
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
      where: { slug }
    })

    if (!productDB) {
      return {
        ok: false,
        message: 'No se encontró el producto',
        product: null
      }
    }

    const { category, productAttributeValue } = productDB

    // Create StockDetail for each attribute-value combination
    const allOptions: StockDetail[] = category.attribute.flatMap(attr =>
      attr.valueOptions.map(option => ({
        id: null,
        productId: productDB.id,
        attributeId: attr.id,
        valueOptionId: option.id,
        inStock: 0,
        attribute: {
          id: attr.id,
          name: attr.name
        },
        valueOption: {
          id: option.id,
          value: option.value
        }
      }))
    )
    // Add all options to the product
    const completeAttributeValues = allOptions.map(option => {
      const existing = productAttributeValue.find(
        attr =>
          attr.attributeId === option.attributeId &&
          attr.valueOptionId === option.valueOptionId
      )
      return existing || option
    })

    const hasStock = completeAttributeValues.some((attr) => attr.inStock > 0)

    const hasSize = completeAttributeValues.some(attr => attr.attribute.name === 'size')
    const availableSizes = completeAttributeValues
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
      userId: productDB.userId,
      user: {
        id: productDB.userId,
        name: productDB.user.name
      },
      productImage: productDB.productImage,
      productAttributeValue: completeAttributeValues,
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
