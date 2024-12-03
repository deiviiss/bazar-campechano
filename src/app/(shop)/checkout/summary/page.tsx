'use client'

import { type PaymentMethod } from '@prisma/client'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PlaceOrder } from './ui/PlaceOrder'
import { ProductsInCart } from './ui/ProductsInCart'
import { ButtonSidebarCart, Title } from '@/components'
import { useAddressStore, useCartStore, useCheckoutStore } from '@/store'

export default function CheckoutSummaryPage() {
  const { shippingMethod, paymentMethod } = useCheckoutStore()
  const { address } = useAddressStore()

  const [loaded, setLoaded] = useState(false)
  const productsInCart = useCartStore(state => state.cart)

  const isCheckoutIncomplete = !shippingMethod || (shippingMethod === 'delivery' && !address) || !paymentMethod

  if (!shippingMethod) {
    redirect('/checkout')
  }

  if (!paymentMethod) {
    redirect('/checkout')
  }

  useEffect(() => {
    if (isCheckoutIncomplete && loaded) {
      redirect('/checkout')
    }

    if (productsInCart.length === 0 && loaded) {
      redirect('/empty')
    }
    setLoaded(true)
  }, [productsInCart])

  if (!loaded) {
    return <p className='animate-pulse'>Cargando página...</p>
  }

  return (
    <>
      <Title title='Verificar Compra' subtitle="Estamos confirmando tu pedido." />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-10">

        {/* cart */}
        <div className="flex flex-col mb-5">
          <span className="text-xl">Ajustar compra</span>
          <ButtonSidebarCart
            name="Editar carrito"
          />

          {/* items */}
          <ProductsInCart />
        </div>

        {/* summary */}
        <PlaceOrder shippingMethod={shippingMethod} paymentMethod={paymentMethod as PaymentMethod} />

      </div>
    </>
  )
}
