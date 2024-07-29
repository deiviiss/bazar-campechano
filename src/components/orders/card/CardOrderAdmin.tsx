'use client'

import Link from 'next/link'
import { IoEllipsisHorizontalSharp, IoCardOutline, IoSwapHorizontalOutline, IoTrashOutline, IoCheckmarkCircleOutline, IoCopy, IoEyeOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { openConfirmationChangeStatus, openConfirmationDelete, openConfirmationPaid } from '../orderHandlers'
import { StatusNameWithIcon, PaymentMethodNameWithIcon } from '@/components'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { type IOrderCard } from '@/interfaces'

interface Props {
  order: IOrderCard
}

export const CardOrderAdmin = ({ order }: Props) => {
  const { name, id, isPaid, status, paymentMethod, userId } = order

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50 p-4">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Pedido #{id.split('-').at(-1)}
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(id)
                toast('ID de pedido copiado al portapapeles', {
                  position: 'top-right'
                })
              }}
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 absolute right-0"
            >
              <IoCopy className="h-3 w-3" />
              <span className="sr-only">Copiar ID de pedido</span>
            </Button>
          </CardTitle>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button asChild size="sm" variant="outline" className="h-8 gap-1">
            <Link
              href={`/orders/${id}`}
              className="flex items-center gap-2">
              <IoEyeOutline className="h-3.5 w-3.5" />
              <span className='hidden min-[500px]:block'>Ver pedido</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="sm" variant="outline" className="h-8 gap-1 focus-visible:ring-0 focus-visible:ring-offset-0">

                <IoEllipsisHorizontalSharp className="h-3.5 w-3.5" />
                <span className='hidden min-[500px]:block focus-visible:ring-0 focus-visible:ring-offset-0'>Más</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Button
                  onClick={() => { openConfirmationChangeStatus(id, status) }}
                  size="sm"
                  variant="ghost"
                  className="h-6 gap-1">
                  <IoSwapHorizontalOutline className="h-3.5 w-3.5 mr-1" />
                  <span>Cambiar estado</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  size='sm'
                  variant='ghost'
                  className='h-6 gap-1'
                  onClick={() => { openConfirmationPaid(id, isPaid, paymentMethod, userId) }}
                >
                  <IoCheckmarkCircleOutline className="h-3.5 w-3.5 mr-1" />
                  <span>Pagar pedido</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  onClick={() => {
                    openConfirmationDelete(id, isPaid)
                  }}
                  size="sm"
                  variant="ghost"
                  className="h-6 gap-1">
                  <IoTrashOutline className="h-3.5 w-3.5 mr-1" />
                  <span>Eliminar pedido</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <CardDescription className="flex items-center justify-start gap-2">
            <span className="font-semibold">Cliente</span>
            <span>{name}</span>
          </CardDescription>
          {/* status paid */}
          <CardDescription className="flex items-center justify-start gap-2">
            <span className="font-semibold">Estado del pago</span>
            {
              isPaid
                ? (
                  <div className='flex items-center'>
                    <IoCardOutline className="text-green-800" />
                    <span className='mx-1 text-green-800'>
                      Pagado
                    </span>
                  </div>)
                : (
                  <div className='flex items-center'>
                    <IoCardOutline className="text-red-800" />
                    <span className='mx-1 text-red-800'>No Pagado</span>
                  </div>)
            }
          </CardDescription>
          {/* status order */}
          <CardDescription className="flex items-center justify-start gap-2">
            <span className="font-semibold">Estado del pedido</span>
            <StatusNameWithIcon status={status} />
          </CardDescription>
          <CardDescription className="flex items-center justify-start gap-2">
            <span className='font-semibold'>Método de pago</span>
            {PaymentMethodNameWithIcon(order.paymentMethod)}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
