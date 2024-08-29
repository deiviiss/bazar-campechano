'use client'

import { useState } from 'react'
import { IoReloadCircleOutline, IoTrashOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { deleteProductById } from '@/actions'
import { Button } from '@/components/ui/button'

interface IProps {
  id: string
  productName: string
}

export const DeleteButtonProduct = ({ id, productName }: IProps) => {
  const [deleting, setDeleting] = useState(false)

  const openConfirmationDelete = () => {
    toast('Eliminar producto', {
      description: `¿Estás seguro? Se desactivara el  producto ${productName} y no será visible en la tienda`,
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
    const { ok, message } = await deleteProductById({ id: productId })

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
              variant='destructive'
              size='icon'
              className='w-10 h-10 md:w-7 md:h-7'
              onClick={() => { openConfirmationDelete() }}
              disabled={deleting}
            >
              <IoTrashOutline />
            </Button>)
          : (
            <Button
              variant='destructive'
              size='icon'
              disabled
              className='w-10 h-10 md:w-7 md:h-7'
            >
              <IoReloadCircleOutline className="h-4 animate-spin" />
            </Button>)
      }
    </>
  )
}
