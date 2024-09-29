'use server'

import prisma from '@/lib/prisma'

export const getTotalProducts = async () => {
  try {
    const totalProducts = await prisma.product.count({
      where: {
        isActive: true
      }
    })

    if (!totalProducts) {
      return 0
    }

    return totalProducts
  } catch (error) {
    return 0
  }
}
