'use server'

import cloudinary from '@/lib/cloudinary'
import { isValidFileSystemUrl } from '@/utils'

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
