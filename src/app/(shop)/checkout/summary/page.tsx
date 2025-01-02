'use client'

import { type ShippingMethod, type PaymentMethod } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PlaceOrder } from './ui/PlaceOrder'
import { ProductsInCart } from './ui/ProductsInCart'
import { ButtonSidebarCart, Title } from '@/components'
import { useAddressStore, useCartStore, useCheckoutStore } from '@/store'

export default function CheckoutSummaryPage() {
  const router = useRouter()
  const { shippingMethod, paymentMethod } = useCheckoutStore()
  const { address } = useAddressStore()

  const [loaded, setLoaded] = useState(false)
  const productsInCart = useCartStore(state => state.cart)

  const isCheckoutIncomplete = !shippingMethod || (shippingMethod === 'delivery' && !address) || !paymentMethod

  if (!shippingMethod || !paymentMethod) {
    router.push('/checkout')
  }

  if (shippingMethod === null) {
    router.push('/checkout')
  }

  useEffect(() => {
    if (isCheckoutIncomplete && loaded) {
      router.push('/checkout')
    }

    if (productsInCart.length === 0 && loaded) {
      router.push('/empty')
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
        <PlaceOrder shippingMethod={shippingMethod as ShippingMethod} paymentMethod={paymentMethod as PaymentMethod} />

      </div>
    </>
  )
}
