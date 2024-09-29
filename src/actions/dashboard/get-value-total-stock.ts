'use server'

import prisma from '@/lib/prisma'

export const getValueTotalStock = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        clotheStock: true,
        shoeStock: true,
        toyStock: true
      }
    })

    // variable to store the total value of the stock
    let totalValue = 0

    products.forEach(product => {
      // sum the value of the clothing stock
      product.clotheStock.forEach(stock => {
        totalValue += product.price * stock.inStock
      })

      // sum the value of the shoe stock
      product.shoeStock.forEach(stock => {
        totalValue += product.price * stock.inStock
      })

      // sum the value of the toy stock
      product.toyStock.forEach(stock => {
        totalValue += product.price * stock.inStock
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
