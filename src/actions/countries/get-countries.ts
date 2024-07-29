'use server'

import prisma from '@/lib/prisma'

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return countries
  } catch (error) {
    return []
  }
}
