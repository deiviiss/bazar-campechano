'use server'

import { type ProductAttributeValue, type ProductV2WithStock } from '@/interfaces'

import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  query?: string
  page?: number
  take?: number
  category?: string
}

interface IResponse {
  currentPage: number
  totalPages: number
  products: ProductV2WithStock[]
}

export const getFeaturedProducts = async ({ page = 1, take = 12, query = '', category }: PaginationOptions): Promise<IResponse> => {
  page = validatePageNumber(page)

  try {
    const productsDB = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        user: true,
        productImage: {
          take: 2,
          select: {
            id: true,
            url: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            description: true
          }
        },
        productAttributeValue: {
          select: {
            id: true,
            inStock: true,
            attributeId: true,
            valueOptionId: true,
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
        isActive: true,
        ...(category
          ? {
              category: {
                name: category
              }
            }
          : {}),
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: {
        price: 'asc'
      }
    })

    if (!productsDB) {
      throw new Error('No products found')
    }

    const totalCount = await prisma.product.count({
      where: {
        isActive: true,
        ...(category
          ? {
              category: {
                name: category
              }
            }
          : {}),
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      }
    })

    const totalPages = Math.ceil(totalCount / take)

    // Map the product data to the ProductV2WithStock interface
    const products: ProductV2WithStock[] = productsDB.map((product): ProductV2WithStock => {
      const productAttributeValue = product.productAttributeValue.map((attr) => ({
        id: attr.id,
        attributeId: attr.attributeId,
        valueOptionId: attr.valueOptionId,
        attribute: {
          id: attr.attribute.id,
          name: attr.attribute.name
        },
        valueOption: {
          id: attr.valueOption.id,
          value: attr.valueOption.value
        },
        inStock: attr.inStock
      })) as ProductAttributeValue[]

      const hasStock = productAttributeValue.some(attr => attr.inStock > 0)
      const hasSize = productAttributeValue.some(attr => attr.attribute.name === 'size')
      const availableSizes = productAttributeValue
        .filter(attr => attr.attribute.name === 'size' && attr.inStock > 0)
        .map(attr => attr.valueOption.value)
        .sort((a, b) => {
          const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
          const isNumeric = !isNaN(Number(a)) && !isNaN(Number(b))
          return isNumeric ? Number(a) - Number(b) : sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
        })

      return {
        id: product.id,
        title: product.title,
        description: product.description,
        history: product.history,
        price: product.price,
        slug: product.slug,
        isActive: product.isActive,
        categoryId: product.category.id,
        category: {
          id: product.category.id,
          name: product.category.name,
          description: product.category.description
        },
        productImage: product.productImage,
        productAttributeValue,
        hasStock,
        hasSize,
        availableSizes,
        user: {
          id: product.user.id,
          name: product.user.name
        },
        userId: product.user.id
      }
    })

    return {
      currentPage: page,
      totalPages,
      products
    }
  } catch (error) {
    if (error instanceof Error) {
      return { currentPage: page, totalPages: 0, products: [] }
    }
    throw new Error(String(error))
  }
}
