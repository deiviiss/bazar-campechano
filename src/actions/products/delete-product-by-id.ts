'use server'

import { revalidatePath } from 'next/cache'
import { getUserSessionServer } from '@/actions'
import prisma from '@/lib/prisma'

interface IParams {
  id: string
}

export const deleteProductById = async ({ id }: IParams) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'Se requiere permisos de administrador'
    }
  }

  try {
    await prisma.product.update({
      where: { id },
      data: { isActive: false }
    })
    revalidatePath('/admin/products')
    revalidatePath('/')

    return {
      ok: true,
      message: 'Producto desactivado correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al desactivar el pedido, contacta a soporte'
    }
  }
}
