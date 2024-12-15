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
            clientAllowedFormats: ['png', 'jpeg', 'jpg'],
            language: 'es',
            text: {
              es: {
                menu: {
                  files: 'Mis archivos',
                  web: 'Web',
                  camera: 'Cámara',
                  image_search: 'Buscar imagen'
                },
                or: 'o',
                camera: {
                  capture: 'Capturar',
                  cancel: 'Cancelar',
                  take_pic: 'Tomar una foto y subirla',
                  explanation: 'Asegúrate de que tu cámara esté conectada y que tu navegador permita la captura de cámara. Cuando estés listo, haz clic en Capturar.',
                  camera_error: 'Hubo un error al acceder a la cámara',
                  retry: 'Reintentar captura',
                  file_name: 'camara_{{time}}'
                },
                queue: {
                  title: 'Cola de subida',
                  title_uploading_with_counter: 'Subiendo {{num}} archivos',
                  title_processing_with_counter: 'Procesando {{num}} archivos',
                  title_uploading_processing_with_counters: 'Subiendo {{uploading}} archivos, procesando {{processing}} archivos',
                  title_uploading: 'Subiendo archivos',
                  mini_title: 'Subido',
                  mini_title_uploading: 'Subiendo',
                  mini_title_processing: 'Procesando',
                  show_completed: 'Mostrar completados',
                  retry_failed: 'Reintentar fallidos',
                  abort_all: 'Cancelar todo',
                  upload_more: 'Subir más',
                  done: 'Listo',
                  mini_upload_count: '{{num}} subidos',
                  mini_failed: '{{num}} fallidos',
                  statuses: {
                    uploading: 'Subiendo...',
                    processing: 'Procesando...',
                    timeout: 'Un archivo grande se está subiendo. Podría tardar un poco en aparecer en tu entorno de producto.',
                    error: 'Error',
                    uploaded: 'Hecho',
                    aborted: 'Cancelado'
                  }
                },

                local: {
                  browse: 'Buscar',
                  dd_title_single: 'Arrastra y suelta una imagen aquí',
                  dd_title_multi: 'Arrastra y suelta imágenes aquí',
                  select: 'Seleccionar'
                }
              }
            }
          }}
          onError={handleError}
          onSuccess={handleSuccess}
        >
          {({ widget, cloudinary, open }) => (
            <Button
              className="me-2 inline-flex items-center rounded-none bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary/80 focus:outline-none focus:ring-4"
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
