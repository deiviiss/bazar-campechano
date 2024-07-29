'use client'

import Link from 'next/link'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { IoEllipsisHorizontalSharp, IoAlertCircleOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { toggleUserStatus } from '@/actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Props {
  user: {
    id: string
    name: string
    email: string
    phoneNumber: string | null
    role: string
    isActive: boolean
  }
}
export const MenuOptionsUser = ({ user }: Props) => {
  const { id, isActive, name } = user

  const openConfirmationDelete = () => {
    toast('Desactivar usuario', {
      description: `¿Estás seguro? Se ${isActive ? 'desactivara' : 'activara'
        } el usuario ${name} y ${isActive ? 'no podrá' : 'podrá'} acceder a la plataforma`,
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
        onClick: async () => { await handleToggleUserStatus(id, isActive) }
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

  const handleToggleUserStatus = async (id: string, status: boolean) => {
    const { ok, message } = await toggleUserStatus({ id, status })

    if (!ok) {
      toast.error(message, {
        position: 'top-right',
        duration: 2000
      })
      return
    }

    toast.success(message, {
      position: 'top-right',
      duration: 2000
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          <span className="sr-only">Open menu</span>
          <IoEllipsisHorizontalSharp className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Seleccione</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IoAlertCircleOutline className='h-4 w-4 mr-2' />
          <Link
            href={`/admin/users/${id}/edit`}
            className="hover:underline">
            Editar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="hover:underline flex gap-1 items-center"
            onClick={() => { openConfirmationDelete() }}
          >
            {isActive
              ? (
                <>
                  <BsToggleOn className="h-3.5 w-3.5" />
                  <span>Desactivar</span>
                </>)
              : (
                <>
                  <BsToggleOff className="h-3.5 w-3.5" />
                  <span>Activar</span>
                </>)
            }
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
