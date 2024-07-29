'use server'

import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

// config cloudinary // TODO: Chance for folder name
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const deleteProductImage = async (imageid: string, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      message: 'Imagen de sistema, no se puede eliminar'
    }
  }

  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''

  try {
    await cloudinary.uploader.destroy(imageName)
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageid
      },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })

    // revalidate paths in all routes where product name exist
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${deletedImage.product.slug}`)
    revalidatePath(`/products/${deletedImage.product.slug}`)

    return {
      ok: true,
      message: 'Imagen eliminada correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo eliminar la imagen del producto'
    }
  }
}
