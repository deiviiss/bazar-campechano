'use client'

import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)

  const { subtotal, tax, total, itemsInCart } = useCartStore(state => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true)
    if (itemsInCart === 0) {
      redirect('/empty')
    }
  }, [])

  if (!loaded) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <div className='grid grid-cols-2'>
      <span className='text-right'>No. Productos</span>
      <span className='text-right'>{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artíulos`}</span>

      <span className='text-right'>Subtotal</span>
      <span className='text-right'>{currencyFormat(subtotal)}</span>

      <span className='text-right'>IVA(16%)</span>
      <span className='text-right'>{currencyFormat(tax)}</span>

      <span className='mt-5 text-2xl text-right'>Total</span>
      <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>
    </div>
  )
}
