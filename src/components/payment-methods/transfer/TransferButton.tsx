'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoCopy, IoTimeOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'

interface Props {
  amount: number
}

export const TransferButton = ({ amount }: Props) => {
  const [loaded, setLoaded] = useState(false)
  const rountedAmount = Math.round(amount * 100) / 100

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <div className='animate-pulse flex flex-col gap-4 mt-12 mb-16'>
        <div className='h-10 bg-gray-300 rounded'></div>
        <div className='h-10 bg-gray-300 rounded'></div>
      </div>
    )
  }

  return (
    <>
      <h2 className='text-2xl mb-2'>Transferencia bancaria</h2>

      <div className='flex flex-col gap-2 mb-10'>
        <h2>Copia y pega esta CLABE en tu banca en línea</h2>
        <Card className='text-sm text-gray-500 mb-3'>
          <div className='flex items-center justify-between p-3'>
            722969010929869618
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText('722969010929869618')
                toast('CLABE copiada al portapapeles', {
                  position: 'top-right'
                })
              }}
              className="h-6 w-6"
            >
              <IoCopy className="h-3 w-3" />
              <span className="sr-only">Copiar CLABE</span>
            </Button>
          </div>
        </Card>

        <div>
          <h2>Nombre del beneficiario</h2>
          <p className='text-sm text-gray-500'>Bazar Campechano</p>
        </div>

        <div>
          <h2>Banco destinatario</h2>
          <p className='text-sm text-gray-500'>STP (Sistema de Transferencias y Pagos)</p>
        </div>

        <div className='mb-4'>
          <h2>Monto exacto</h2>
          <p className='text-sm text-gray-500'>$ {rountedAmount}</p>
          <p className='text-xs text-gray-500'>Ingresa el monto con centavos exactos, para evitar que tu pago se rechace</p>
        </div>

        <div className='flex gap-2'>
          <IoTimeOutline />
          <p className='text-xs text-gray-500'>Pagas y se acredita hasta en 2 horas</p>
        </div>
      </div>

      <CardFooter>
        <Button asChild className='mx-auto'>
          <Link href='/orders'>
            Ver mis pedidos
          </Link>
        </Button>
      </CardFooter>
    </>
  )
}
