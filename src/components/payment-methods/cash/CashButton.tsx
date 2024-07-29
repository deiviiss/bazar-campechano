'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoTimeOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'

interface Props {
  amount: number
}

export const CashButton = ({ amount }: Props) => {
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
      <h2 className='text-2xl mb-2'>Pago en efectivo</h2>

      <div className='flex flex-col gap-2 mb-10'>
        <div className='mb-4'>
          <h2>Monto exacto</h2>
          <p className='text-sm text-gray-500'>$ {rountedAmount}</p>
          <p className='text-xs text-gray-500'>Por favor, ten el monto exacto al recoger tu pedido para facilitar el pago</p>
        </div>

        <div className='mb-4'>
          <p className='text-sm text-gray-500'>Realiza el pago en efectivo al recoger tu pedido en el punto de venta.</p>
        </div>

        <div className='flex gap-2'>
          <IoTimeOutline />
          <p className='text-xs text-gray-500'>Solo podemos guardar tu pedido hasta el final del día</p>
        </div>
      </div>

      <CardFooter>
        <Button asChild variant='primary' className='mx-auto'>
          <Link href='/orders'>
            Ver mis pedidos
          </Link>
        </Button>
      </CardFooter>
    </>
  )
}
