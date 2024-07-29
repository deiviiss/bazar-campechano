'use server'

import { type Category } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getCategories = async (): Promise<Category[] | null> => {
  const categories: Category[] = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true
    }
  })

  if (!categories.length) {
    return null
  }

  return categories
}
