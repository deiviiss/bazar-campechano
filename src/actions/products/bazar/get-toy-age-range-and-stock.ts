'use server'

import { type ToyStockDetail, type AgeRange } from '@/interfaces'
import prisma from '@/lib/prisma'

interface IParams {
  id: string
}

export const getToyAgeRangeAndStock = async ({ id }: IParams): Promise<ToyStockDetail[]> => {
  try {
    const ageRange = await prisma.toyStock.findMany({
      where: {
        productId: id
      },
      select: {
        ageRange: true,
        inStock: true
      }
    })

    if (ageRange.length === 0) {
      return []
    }

    const ageRangeWithStock = ageRange
      .filter(age => age.inStock > 0) // filter age range with stock > 0
      .map(age => ({
        ageRange: age.ageRange as AgeRange,
        inStock: age.inStock
      })) // get age range and stock

    return ageRangeWithStock
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
