'use server'

import { revalidatePath } from 'next/cache'
import { getUserById, sendNotificationsPayment } from '@/actions'
import prisma from '@/lib/prisma'

export const paidOrder = async (orderId: string, userId: string) => {
  try {
    const { user } = await getUserById(userId)

    if (!user) {
      return {
        ok: false,
        message: 'Usuario no encontrado'
      }
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        status: 'paided',
        paidAt: new Date()
      }
    })

    // send notifications to user and admin
    await sendNotificationsPayment({ userEmail: user.email, userPhoneNumber: user.phoneNumber, userName: user.name })

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
      message: 'Pago completado'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Pago no completado'
    }
  }
}
