'use server'

import prisma from '@/lib/prisma'

export const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId }
    })

    if (!order) {
      return {
        ok: false,
        message: `No se encontró un pedido con el ${orderId}`
      }
    }

    return {
      ok: true,
      order
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message
      }
    }
    return {
      ok: false,
      message: 'No se actualizo el id de la transaction'
    }
  }
}
