'use server'

import { revalidatePath } from 'next/cache'
import { getProductByIdSize, getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

export const deleteOrderById = async (id: string) => {
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
            id: true,
            price: true,
            quantity: true,
            size: true,
            productId: true,

            product: {
              select: {
                id: true,
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

    if (order.isPaid) {
      return {
        ok: false,
        message: 'Pedido pagado no se puede eliminar'
      }
    }

    await prisma.$transaction(async () => {
      for (const item of order.orderItem) {
        const productStock = await getProductByIdSize({ productId: item.productId, size: item.size })

        if (!productStock) {
          return {
            ok: false,
            message: 'Product not found'
          }
        }

        // update stock for item
        await prisma.productStock.update({
          where: {
            id: productStock.stock.id
          },
          data: {
            inStock: productStock.stock.inStock + item.quantity
          }
        })

        //  delete item from order
        await prisma.orderItem.delete({
          where: {
            id: item.id
          }
        })
      }

      // delete order address
      await prisma.orderAddress.delete({
        where: {
          id: order.orderAddresses?.id
        }
      })

      // delete order
      await prisma.order.delete({
        where: {
          id
        }
      })

      return 'ok'
    })

    revalidatePath('/admin/orders')
    revalidatePath('/')

    return {
      ok: true,
      message: 'Pedido eliminado'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al eliminar el pedido, contacta a soporte'
    }
  }
}
