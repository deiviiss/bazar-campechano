'use server'

import { revalidatePath } from 'next/cache'
import { getProductStockByIdAndSize, getUserSessionServer } from '@/actions'
import { type AgeRange } from '@/interfaces'
import prisma from '@/lib/prisma'
import { isClothe, isShoe, isToy } from '@/utils/productTypeGuards'

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
            clotheSize: true,
            shoeSize: true,
            toyAgeRange: true,
            productId: true,
            product: {
              include: {
                productImage: {
                  take: 1
                },
                category: true
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
      // update stock for each stock product
      for (const item of order.orderItem) {
        if (isClothe(item.product)) {
          if (!item.clotheSize) {
            throw new Error('Clothe size not found')
          }

          const productStock = await getProductStockByIdAndSize({ productId: item.productId, clotheSize: item.clotheSize })

          if (!productStock) {
            throw new Error('Product not found in stock')
          }

          // update stock for item
          await prisma.clotheStock.update({
            where: {
              id: productStock.id
            },
            data: {
              inStock: productStock.inStock + item.quantity
            }
          })
        }

        if (isShoe(item.product)) {
          if (!item.shoeSize) {
            throw new Error('Shoe size not found')
          }

          const productStock = await getProductStockByIdAndSize({ productId: item.productId, shoeSize: item.shoeSize })

          if (!productStock) {
            throw new Error('Product not found in stock')
          }

          // update stock for item
          await prisma.shoeStock.update({
            where: {
              id: productStock.id
            },
            data: {
              inStock: productStock.inStock + item.quantity
            }
          })
        }

        if (isToy(item.product)) {
          if (!item.toyAgeRange) {
            throw new Error('Toy age range not found')
          }

          const productStock = await getProductStockByIdAndSize({ productId: item.productId, ageRange: item.toyAgeRange as AgeRange })

          if (!productStock) {
            throw new Error('Product not found in stock')
          }

          // update stock for item
          await prisma.toyStock.update({
            where: {
              id: productStock.id
            },
            data: {
              inStock: productStock.inStock + item.quantity
            }
          })
        }

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
