'use server'

import prisma from '@/lib/prisma'

interface ButtonChangeSellerProps {
  userId: string
}

export async function changeUserToSeller({ userId }: ButtonChangeSellerProps) {
  try {
    // Update the user to seller
    const newUserRole = await prisma.user.update({
      where: { id: userId },
      data: { role: 'seller' }
    })

    if (!newUserRole) {
      throw new Error('No se pudo cambiar el rol del usuario')
    }

    return { ok: true, message: 'Usuario cambiado a vendedor exitosamente' }
  } catch (error) {
    throw new Error('Token inválido o expirado')
  }
}
