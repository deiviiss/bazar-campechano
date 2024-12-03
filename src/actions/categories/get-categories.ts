'use server'

import { type CategoryV2 } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getCategories = async (): Promise<CategoryV2[] | null> => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        attribute: {
          include: {
            valueOptions: true
          }
        }
      }
    })

    const formattedCategories: CategoryV2[] = categories.map((category) => ({
      id: category.id,
      description: category.description,
      name: category.name,
      attribute: category.attribute.map((attr) => ({
        id: attr.id,
        name: attr.name,
        inputType: attr.inputType as 'string' | 'number', // Asegurar el tipo correcto
        categoryId: attr.categoryId,
        valueOptions: attr.valueOptions.map((valueOption) => ({
          id: valueOption.id,
          value: valueOption.value,
          attributeId: valueOption.attributeId
        }))
      }))
    }))

    return formattedCategories
  } catch (error) {
    return null
  }
}
