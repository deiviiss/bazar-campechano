'use client'

import { CldUploadWidget, type CloudinaryUploadWidgetError, type CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { IoCloudDoneOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { type ProductImage } from '@/interfaces'

interface IUploaderProps {
  images: ProductImage[]
  setImages: (images: ProductImage[] | ((prevImages: ProductImage[]) => ProductImage[])) => void
}

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export function CloudinaryButton({ images, setImages }: IUploaderProps) {
  // const isImageComplete = images.length >= 4

  function handleSuccess(result: CloudinaryUploadWidgetResults) {
    if (!result.info || typeof result.info === 'string') {
      return
    }

    // cast result.info to CloudinaryUploadWidgetInfo
    const info = result.info

    setImages((prev: ProductImage[]) => {
      const updatedImages = [...prev, { url: info.public_id, id: info.public_id }]

      return updatedImages
    })
  }

  function handleError(error: CloudinaryUploadWidgetError) {
    toast.error('No se pudo cargar la imagen', {
      position: 'top-right',
      duration: 2000
    })
    return error
  }

  return (
    <div>
      <div className='w-full flex-col-reverse flex items-center justify-between gap-3'>
        <p className='text-[10px]'>Se recomienda subir hasta 4 imágenes por producto</p>
        <CldUploadWidget
          uploadPreset={uploadPreset}
          options={{
            sources: ['local', 'camera', 'image_search'],
            // showSkipCropButton: false,
            // cropping: true,
            // croppingAspectRatio: 1,
            clientAllowedFormats: ['png', 'jpeg', 'jpg']
          }}
          onError={handleError}
          onSuccess={handleSuccess}
        >
          {({ widget, cloudinary, open }) => (
            <Button
              className="me-2 inline-flex items-center rounded-none bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-black/80 focus:outline-none focus:ring-4"
              type='button'
              onClick={() => {
                open()
              }}
            >
              <IoCloudDoneOutline className="mr-2" />
              Subir imagen
            </Button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  )
}
