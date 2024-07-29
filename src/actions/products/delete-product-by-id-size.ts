'use server'

import { revalidatePath } from 'next/cache'
import { getProductByIdSize, getUserSessionServer } from '@/actions'
import { type Size } from '@/interfaces'
import prisma from '@/lib/prisma'

export const deleteProductByIdAndSize = async (id: string, size: string) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'Se requiere permisos de administrador'
    }
  }

  try {
    const productStock = await getProductByIdSize({ productId: id, size: size as Size })

    if (!productStock) {
      return {
        ok: false,
        message: 'No se encontro el producto'
      }
    }

    await prisma.productStock.delete({
      where: {
        id: productStock.stock.id
      }
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
