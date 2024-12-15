'use server'

import prisma from '@/lib/prisma'

export const getValueTotalStock = async () => {
  try {
    // Find the products and their attribute combinations
    const products = await prisma.product.findMany({
      include: {
        productAttributeValue: true // Includes the attribute combinations with their stock
      }
    })

    // Variable to store the total stock value
    let totalValue = 0

    // Browse the products
    products.forEach(product => {
      // Loop through each attribute combination and its stock
      product.productAttributeValue.forEach(attributeValue => {
        totalValue += product.price * attributeValue.inStock
      })
    })

    if (!totalValue) {
      return 0
    }

    return totalValue
  } catch (error) {
    return 0
  }
}
