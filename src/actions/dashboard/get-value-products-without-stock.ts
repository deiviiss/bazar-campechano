'use server'

import prisma from '@/lib/prisma'

export const getValueOfProductsWithoutStock = async () => {
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
      include: {
        productAttributeValue: true // Include attribute values to verify stock
      }
    })

    // Add the total value of the products out of stock
    let totalValue = 0

    productsWithoutStock.forEach(product => {
      totalValue += product.price
    })

    return totalValue
  } catch (error) {
    return 0
  }
}
