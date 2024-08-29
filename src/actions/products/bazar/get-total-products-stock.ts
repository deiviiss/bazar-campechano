'use server'

import prisma from '@/lib/prisma'

// Get the total number of products by summing up the stock for all sizes across all categories
export const getTotalProductsStock = async () => {
  try {
    // Sum up the stock for all sizes in clothing products
    const clotheTotalStock = await prisma.clotheStock.aggregate({
      _sum: {
        inStock: true
      }
    })

    // Sum up the stock for all sizes in shoe products
    const shoeTotalStock = await prisma.shoeStock.aggregate({
      _sum: {
        inStock: true
      }
    })

    // Sum up the stock for all age ranges in toy products
    const toyTotalStock = await prisma.toyStock.aggregate({
      _sum: {
        inStock: true
      }
    })

    // Calculate the total stock across all categories
    const totalStock = (clotheTotalStock._sum.inStock || 0) +
                       (shoeTotalStock._sum.inStock || 0) +
                       (toyTotalStock._sum.inStock || 0)

    return totalStock
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
