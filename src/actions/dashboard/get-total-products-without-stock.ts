'use server'

import prisma from '@/lib/prisma'

export const getTotalProductsWithoutStock = async () => {
  try {
    const productsWithoutStock = await prisma.product.findMany({
      where: {
        isActive: true,
        AND: [
          {
            clotheStock: {
              every: {
                inStock: 0
              }
            }
          },
          {
            shoeStock: {
              every: {
                inStock: 0
              }
            }
          },
          {
            toyStock: {
              every: {
                inStock: 0
              }
            }
          }
        ]
      }
    })

    return productsWithoutStock.length
  } catch (error) {
    return 0
  }
}
