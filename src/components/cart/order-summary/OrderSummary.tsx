'use client'

import { useEffect, useState } from 'react'
import { useCartStore, useCheckoutStore } from '@/store'
import { currencyFormat } from '@/utils'
import { getShippingMessage } from '@/utils/order/getShippingMessage'

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const { subtotal, itemsInCart } = useCartStore(state => state.getSummaryInformation())
  const { shippingMethod } = useCheckoutStore()

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p className='animate-pulse'>Cargando...</p>
  }

  return (
    <div className='space-y-2 mt-2'>
      <div className='flex justify-between'>
        <span>No. Productos</span>
        <span>{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>
      </div>
      <div className='flex justify-between'>
        <span>Subtotal</span>
        <span>{currencyFormat(subtotal)}</span>
      </div>
      <div className='flex justify-between'>
        {
          shippingMethod === null &&
          <>
            <span>Envío</span>
            <span>{getShippingMessage(shippingMethod, subtotal)}</span>
          </>
        }
        {
          shippingMethod === 'delivery' &&
          <>
            <span>Envío</span>
            <span>{getShippingMessage(shippingMethod, subtotal)}</span>
          </>
        }
      </div>
      <div className='flex justify-between text-lg font-bold'>
        <span>Total</span>
        <span>{currencyFormat(subtotal)}</span>
      </div>
    </div>
  )
}
