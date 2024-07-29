'use server'

import prisma from '@/lib/prisma'

export const getOrderAddressIdByOrderId = async (orderId: string) => {
  const orderAddressId = await prisma.order.findUnique({
    where: {
      id: orderId
    },
    select: {
      orderAddresses: {
        select: {
          id: true
        }
      }
    }
  })

  if (!orderAddressId) {
    return null
  }

  return orderAddressId
}
