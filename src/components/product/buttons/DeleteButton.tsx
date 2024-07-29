'use client'

import { useState } from 'react'
import { IoReloadCircleOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { deleteProductByIdAndSize } from '@/actions'
import { Button } from '@/components/ui/button'
import { type Size } from '@/interfaces'

interface IProps {
  id: string
  size: Size
}

export const DeleteButtonProduct = ({ id, size }: IProps) => {
  const [deleting, setDeleting] = useState(false)

  const openConfirmationDelete = () => {
    toast('Eliminar producto', {
      description: `¿Estás seguro? Se eliminara el stock de la talla '${size}' del  producto #${id.split('-').at(-1)} `,
      position: 'top-right',
      duration: Infinity,
      className: 'grid grid-cols-[1fr,110px] items-start justify-center text-sm p-2 col-span-2 pb-4',
      classNames: {
        content: 'flex items-start justify-center text-sm col-span-4 p-2'
      },
      actionButtonStyle: {
        color: 'white',
        backgroundColor: '#1E40AF',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      },
      action: {
        label: 'Confirmar',
        onClick: async () => { await handleDeleteProduct(id) }
      },
      cancel:
      {
        label: 'Cancelar',
        onClick: () => { toast.dismiss() }
      },
      cancelButtonStyle: {
        color: 'white',
        backgroundColor: 'red',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      }
    })
  }

  const handleDeleteProduct = async (productId: string) => {
    setDeleting(true)
    const { ok, message } = await deleteProductByIdAndSize(productId, size)

    if (!ok) {
      toast.error(message, {
        position: 'top-right',
        duration: 2000
      })
      setDeleting(false)
      return
    }

    toast.success(message, {
      position: 'top-right',
      duration: 2000
    })
  }

  return (
    <>
      {
        !deleting
          ? (
            <Button
              onClick={() => { openConfirmationDelete() }}
              disabled={deleting}
              className="btn-danger w-32">
              Eliminar
            </Button>)
          : (
            <Button
              disabled
              className='w-full md:w-full max-w-32 overflow-hidden'
            >
              <IoReloadCircleOutline className="mr-1 h-4 animate-spin" />
              Eliminando
            </Button>)
      }
    </>
  )
}
