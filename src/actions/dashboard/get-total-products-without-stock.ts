'use server'

import prisma from '@/lib/prisma'

export const getTotalProductsWithoutStock = async () => {
  try {
    // Find products where all attribute combinations have `inStock` at 0
    const productsWithoutStock = await prisma.product.findMany({
      where: {
        isActive: true,
        productAttributeValue: {
          every: {
            inStock: 0 // All attribute combinations must have 0 stock
          }
        }
      },
      select: {
        id: true // Optional: Select only the product ID
      }
    })

    return productsWithoutStock.length
  } catch (error) {
    return 0
  }
}
