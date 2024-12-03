'use server'

import { revalidatePath } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

export const deleteOrderById = async (id: string) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'Se requiere permisos de administrador'
    }
  }

  const order = await prisma.order.findUnique({
    where: {
      id
    },
    include: {
      orderAddresses: true,
      orderItem: {
        include: {
          product: {
            include: {
              productAttributeValue: {
                include: {
                  valueOption: true,
                  attribute: true
                }
              },
              category: true
            }
          },
          attributes: true
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

  try {
    await prisma.$transaction(async (tx) => {
      // Update inventory based on order items
      for (const item of order.orderItem) {
        // Check if the product has size attribute
        const hasSize = item.product.productAttributeValue.some(attr => attr.attribute.name === 'size')

        if (hasSize) {
          for (const attr of item.attributes) {
            const stockForAttribute = await tx.productAttributeValue.findFirst({
              where: {
                productId: item.productId,
                valueOption: {
                  value: attr.value
                }
              }
            })

            if (!stockForAttribute) {
              throw new Error(`Stock no encontrado para el atributo ${attr.value}`)
            }

            // Update stock
            await tx.productAttributeValue.update({
              where: { id: stockForAttribute.id },
              data: { inStock: { increment: item.quantity } }
            })
          }
        }

        if (!hasSize) {
          const stockForProduct = await tx.productAttributeValue.findFirst({
            where: {
              productId: item.productId
            }
          })

          if (!stockForProduct) {
            throw new Error(`Stock no encontrado para el producto ${item.productId}`)
          }

          // Update stock
          await tx.productAttributeValue.update({
            where: { id: stockForProduct.id },
            data: { inStock: { increment: item.quantity } }
          })
        }
      }

      // Delete order and all related data
      await tx.order.delete({
        where: { id }
      })
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
