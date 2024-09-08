'use client'

import { CldUploadWidget, type CloudinaryUploadWidgetError, type CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useState } from 'react'
import { IoCloudDoneOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { type ProductImage } from '@/interfaces'

interface IUploaderProps {
  images: ProductImage[]
  setImages: (images: ProductImage[] | ((prevImages: ProductImage[]) => ProductImage[])) => void
}

export function CloudinaryButton({ images, setImages }: IUploaderProps) {
  const [widgetOpen, setWidgetOpen] = useState(false)
  const isImageComplete = images.length >= 4

  function handleSuccess(result: CloudinaryUploadWidgetResults) {
    if (!result.info || typeof result.info === 'string') {
      return
    }

    setImages((prev: ProductImage[]) => {
      const updatedImages = [...prev, { url: result.info?.public_id || '', id: result.info?.public_id || '' }]

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
        <p className='text-[10px]'>Puedes subir hasta 4 imágenes por producto</p>
        {
          !isImageComplete && (
            <CldUploadWidget
              uploadPreset="bazar-campechano"
              options={{
                sources: ['local', 'url', 'camera', 'image_search'],
                showSkipCropButton: false,
                cropping: true,
                croppingAspectRatio: 1,
                clientAllowedFormats: ['png', 'jpeg', 'jpg']
              }}
              onError={handleError}
              onSuccess={handleSuccess}
              onOpen={() => { setWidgetOpen(true) }}
              onClose={() => { setWidgetOpen(false) }}
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
                  {widgetOpen ? 'Subiendo...' : 'Subir imagen'}
                </Button>
              )}
            </CldUploadWidget>
          )
        }
      </div>
    </div>
  )
}
