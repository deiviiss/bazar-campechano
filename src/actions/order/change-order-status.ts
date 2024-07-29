'use server'

import { type Status } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getUserSessionServer, sendNotificationsDelivered, sendNotificationsShipment } from '@/actions'
import prisma from '@/lib/prisma'

export const changeOrderStatus = async (id: string, status: Status) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'Se requiere permisos de administrador'
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id
      },
      include: {
        user: true
      }
    })

    if (!order) throw new Error(`${id} not found`)

    if (!order.isPaid) {
      return {
        ok: false,
        message: 'No se ha pagado el pedido, no se puede cambiar el status'
      }
    }

    await prisma.order.update({
      where: {
        id
      },
      data: {
        status
      }
    })

    if (status === 'shipped') {
      await sendNotificationsShipment({ userEmail: order.user.email, userName: order.user.name, userPhoneNumber: order.user.phoneNumber })
    }

    if (status === 'delivered') {
      await sendNotificationsDelivered({ userEmail: order.user.email, userName: order.user.name, userPhoneNumber: order.user.phoneNumber })
    }

    revalidatePath('/admin/orders')
    revalidatePath('/')

    return {
      ok: true,
      message: 'Estado del pedido cambiado'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al cambiar el Estado del pedido, contacta a soporte'
    }
  }
}
