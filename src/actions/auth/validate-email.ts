'use server'

import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function validateEmail(token: string) {
  try {
    // Validate that the AUTH_SECRET environment variable is set
    if (!process.env.AUTH_SECRET) {
      throw new Error('La variable de entorno AUTH_SECRET no está definida')
    }

    // Verifica el token
    const decoded = jwt.verify(token, process.env.AUTH_SECRET) as { userId: string }
    const userId = decoded.userId

    // Update the user's emailVerified field to true
    await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true, phoneNumberVerified: true }
    })

    return { ok: true, message: 'Correo validado exitosamente' }
  } catch (error) {
    throw new Error('Token inválido o expirado')
  }
}
