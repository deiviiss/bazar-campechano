'use server'

import { type Category } from '@/interfaces'
import prisma from '@/lib/prisma'

const categoryOrder = {
  toy: 1,
  clothe: 2,
  shoe: 3
}

export const getCategories = async (): Promise<Category[] | null> => {
  const categories: Category[] = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true
    },
    orderBy: {
      name: 'asc'
    }
  })

  if (!categories.length) {
    return null
  }

  const categoriesOrdered = categories.sort((a, b) => categoryOrder[a.name] - categoryOrder[b.name])

  return categoriesOrdered
}
