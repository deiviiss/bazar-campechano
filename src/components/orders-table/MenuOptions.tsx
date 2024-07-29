'use client'

import Link from 'next/link'
import { IoTrashOutline, IoEllipsisHorizontalSharp, IoSwapHorizontalOutline, IoCheckmarkCircleOutline, IoEyeOutline } from 'react-icons/io5'
import { openConfirmationChangeStatus, openConfirmationDelete, openConfirmationPaid } from '../orders/orderHandlers'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { type IOrder } from '@/interfaces'

interface Props {
  order: IOrder
}

export const MenuOptions = ({ order }: Props) => {
  if (!order) return null
  const { id, isPaid, status, paymentMethod, userId } = order

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          <span className="sr-only">Open menu</span>
          <IoEllipsisHorizontalSharp className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IoEyeOutline className="h-3.5 w-3.5" />
          <Button
            size='sm'
            variant='ghost'
            className='h-6 gap-1'
            asChild
          >
            <Link
              href={`/orders/${id}`}
            >
              Ver pedido
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IoSwapHorizontalOutline className="h-3.5 w-3.5" />
          <Button
            size='sm'
            variant='ghost'
            className='h-6 gap-1'
            onClick={() => { openConfirmationChangeStatus(id, status) }}
          >
            Cambiar estado
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IoCheckmarkCircleOutline className="h-3.5 w-3.5" />
          <Button
            size='sm'
            variant='ghost'
            className='h-6 gap-1'
            onClick={() => { openConfirmationPaid(id, isPaid, paymentMethod, userId) }}
          >
            Pagar pedido
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IoTrashOutline className="h-3.5 w-3.5" />
          <Button
            size='sm'
            variant='ghost'
            className='h-6'
            onClick={() => { openConfirmationDelete(id, isPaid) }}
          >
            Eliminar pedido
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
