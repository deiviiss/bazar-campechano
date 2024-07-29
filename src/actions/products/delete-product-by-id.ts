'use server'

import { revalidatePath } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

export const deleteProductById = async (id: string) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'Se requiere permisos de administrador'
    }
  }

  try {
    await prisma.$transaction(async () => {
      await prisma.productImage.deleteMany({ where: { productId: id } })
      await prisma.productStock.deleteMany({ where: { productId: id } })
      await prisma.orderItem.deleteMany({ where: { productId: id } })

      await prisma.product.delete({ where: { id } })
    })

    revalidatePath('/admin/products')
    revalidatePath('/')

    return {
      ok: true,
      message: 'Producto eliminado'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al eliminar el pedido, contacta a soporte'
    }
  }
}
