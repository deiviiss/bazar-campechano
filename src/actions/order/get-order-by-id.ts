'use server'

import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

export const getOrderById = async (id: string) => {
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
        orderAddresses: true,
        orderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                productImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) throw new Error(`${id} not found`)

    if (user.role === 'user') {
      if (user.id !== order.userId) {
        throw new Error(`${id} is not related to user ${user.id}`)
      }
    }

    return {
      ok: true,
      order
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Contact with support team'
    }
  }
}
