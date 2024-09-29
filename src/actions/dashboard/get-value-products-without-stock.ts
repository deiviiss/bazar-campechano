'use server'

import prisma from '@/lib/prisma'

export const getValueOfProductsWithoutStock = async () => {
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
      },
      include: {
        clotheStock: true,
        shoeStock: true,
        toyStock: true
      }
    })

    let totalValue = 0

    productsWithoutStock.forEach(product => {
      totalValue += product.price
    })

    return totalValue
  } catch (error) {
    return 0
  }
}
