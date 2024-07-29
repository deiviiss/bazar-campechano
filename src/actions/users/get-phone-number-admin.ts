'use server'

import prisma from '@/lib/prisma'

export const getPhoneNumberAdmin = async () => {
  try {
    const phoneNumberAdmin = await prisma.user.findFirst({
      where: {
        role: 'admin'
      },
      select: {
        phoneNumber: true
      }
    })

    if (!phoneNumberAdmin) {
      return { ok: false, message: 'No se pudo recuperar el número', phoneNumberAdmin: null }
    }

    return {
      ok: true,
      message: 'Número recuperado',
      phoneNumberAdmin
    }
  } catch (error) {
    return { ok: false, message: 'No se pudo recuperar el número', phoneNumberAdmin: null }
  }
}
