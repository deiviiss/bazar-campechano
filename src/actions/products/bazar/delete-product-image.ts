'use server'

import { v2 as cloudinary } from 'cloudinary'
import { isValidFileSystemUrl } from '@/utils'

// config cloudinary // TODO: Chance for folder name
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const deleteProductImage = async (imageId: string, imageUrl: string) => {
  if (isValidFileSystemUrl(imageUrl)) {
    return {
      ok: false,
      message: 'Imagen de sistema, no se puede eliminar'
    }
  }

  try {
    await cloudinary.uploader.destroy(imageId)

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
