'use client'

import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Title } from '@/components'
import { PaymentMethod, ShippingMethod } from '@/components/checkout'
import { Button } from '@/components/ui/button'
import { useAddressStore, useCartStore, useCheckoutStore } from '@/store'

export default function ShippingAndPaymentPage() {
  const router = useRouter()
  const { shippingMethod, paymentMethod } = useCheckoutStore()
  const { address } = useAddressStore()
  const productsInCart = useCartStore(state => state.cart)

  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isButtonDisabled = !shippingMethod || (shippingMethod === 'delivery' && !address) || !paymentMethod

  useEffect(() => {
    if (productsInCart.length === 0) {
      redirect('/empty')
    }
    setLoaded(true)
  }, [productsInCart])

  if (!loaded) {
    return <p className='animate-pulse'>Cargando página...</p>
  }

  const handleButtonConfirm = () => {
    if (!shippingMethod) {
      setError('Por favor, seleccione un método de envío')
      return
    }
    if (shippingMethod === 'delivery' && !address) {
      setError('Por favor, introduzca su dirección de entrega')
      return
    }
    if (!paymentMethod) {
      setError('Por favor, seleccione un método de pago')
      return
    }
    setError(null)
    router.push('/checkout/summary')
  }

  return (
    <>
      <Title title='Completa los detalles de tu pedido' subtitle="Selecciona cómo deseas recibir tu pedido y realizar el pago." />
      <ShippingMethod />
      <PaymentMethod />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <Button
        onClick={handleButtonConfirm}
        className="mt-4"
        disabled={isButtonDisabled}
      >
        Confirmar y continuar
      </Button>
    </>
  )
}
