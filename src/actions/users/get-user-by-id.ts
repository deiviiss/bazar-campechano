'use server'

import { type User } from '@/interfaces'
import prisma from '@/lib/prisma'

interface IResponse {
  ok: boolean
  message: string
  user?: User
}

export const getUserById = async (id: string): Promise<IResponse> => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        password: true,
        emailVerified: true,
        image: true,
        role: true,
        isActive: true
      }
    })

    if (!user) {
      return {
        ok: false,
        message: 'Usuario no encontrado'
      }
    }

    return {
      ok: true,
      message: 'Usuario encontrado',
      user
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al buscar usuario, contacta a soporte'
    }
  }
}
