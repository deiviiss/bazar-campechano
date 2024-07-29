'use server'

import prisma from '@/lib/prisma'

export const getEmailAdmin = async () => {
  try {
    const emailAdmin = await prisma.user.findFirst({
      where: {
        role: 'admin'
      },
      select: {
        email: true
      }
    })

    if (!emailAdmin) {
      return { ok: false, message: 'No se pudo recuperar el email', emailAdmin: null }
    }

    return {
      ok: true,
      message: 'Número recuperado',
      emailAdmin
    }
  } catch (error) {
    return { ok: false, message: 'No se pudo recuperar el email', emailAdmin: null }
  }
}
