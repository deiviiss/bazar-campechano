'use client'

import { type ShippingMethod, type PaymentMethod } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsTruck } from 'react-icons/bs'
import { CgCreditCard, CgSpinnerTwo } from 'react-icons/cg'
import { toast } from 'sonner'
import { placeOrder } from '@/actions'
import { PaymentMethodNameWithIcon } from '@/components'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PICKUP_LOCATION } from '@/config/checkoutConfig'
import { type ProductToOrder } from '@/interfaces'
import { useAddressStore, useCartStore, useCheckoutStore } from '@/store'
import { currencyFormat } from '@/utils'
import { getShippingMessage } from '@/utils/order/getShippingMessage'

interface Props {
  shippingMethod: ShippingMethod
  paymentMethod: PaymentMethod
}

export const PlaceOrder = ({ paymentMethod, shippingMethod }: Props) => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)
  const address = useAddressStore(state => state.address)
  const validAddress = address?.firstName?.trim() ? address : PICKUP_LOCATION

  const { setShippingMethod, setPaymentMethod } = useCheckoutStore()

  const { subtotal, total, itemsInCart } = useCartStore(state => state.getSummaryInformation())

  const noticeConfirmOrder = async () => {
    toast('Pedido generado con éxito, procede con el pago', {
      position: 'top-right',
      duration: Infinity,
      className: 'grid grid-cols-[1fr,110px] items-start justify-center text-sm p-2 col-span-2 pb-4',
      classNames: {
        content: 'flex items-start justify-center text-sm col-span-4 p-2'
      },
      actionButtonStyle: {
        color: 'white',
        backgroundColor: '#000000',
        borderRadius: '0px',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      },
      action: {
        label: 'Ok',
        onClick: () => {
          toast.dismiss()
        }
      }
    })
  }

  const noticeFailedOrder = () => {
    toast.error('No se pudo crear el pedido, intente nuevamente', {
      position: 'top-right',
      duration: 3000
    })
  }

  useEffect(() => {
    setLoaded(true)
    if (itemsInCart === 0) {
      router.push('/empty')
    }
  }, [])

  if (!loaded) {
    return (
      <p>Cargando...</p>
    )
  }

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    // Transform cart items into ProductToOrder format required by the backend
    const productToOrder: ProductToOrder[] = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      attributes: product.attributes?.length > 0
        ? product.attributes.map(attr => ({
          attributeId: attr.attributeId,
          valueOptionId: attr.valueOptionId
        }))
        : [{ attributeId: product.attributes[0]?.attributeId, valueOptionId: product.attributes[0]?.valueOptionId }]
    }))

    const orderDetails = {
      productsId: productToOrder,
      address: validAddress,
      shippingMethod,
      paymentMethod
    }

    const { message, orderId, ok } = await placeOrder(orderDetails)

    // product sold out
    if (!ok) {
      setIsPlacingOrder(false)
      noticeFailedOrder()
      setErrorMessage(String(message))
      return
    }

    // order success
    noticeConfirmOrder()

    router.replace(`/orders/${orderId}`)

    setTimeout(() => {
      setShippingMethod(null)
      setPaymentMethod(null)
      clearCart()
    }, 2000)
  }

  return (
    <Card>
      <CardContent className='shadow-xl p-7'>
        <h2 className='text-2xl mb-2 flex items-center'><BsTruck className="mr-2" />  Dirección de entrega</h2>
        {
          shippingMethod === 'delivery'
            ? <>
              <p className='text-xl'>{`${address.firstName} ${address.lastName}`}</p>
              <p className='text-xl'>{address.lastName}</p>
              <div className="mb-7">
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.postalCode}</p>
                <p>{address.phone}</p>
                <p>{address.city}, {address.country}</p>
              </div>
            </>
            : <>
              <p className='text-xl'>{PICKUP_LOCATION.firstName}</p>
              <p className='text-xl'>{PICKUP_LOCATION.lastName}</p>
              <div className="mb-7">
                <p>{PICKUP_LOCATION.address}</p>
                <p>{PICKUP_LOCATION.city}, {PICKUP_LOCATION.country} {PICKUP_LOCATION.postalCode}</p>
                <p className='mb-2'>Teléfono: {PICKUP_LOCATION.phone}</p>
                <p className='text-sm'>Horario de atención: Lunes-Viernes: 9AM-5PM, Sábado: 10AM-2PM</p>
              </div>
            </>
        }

        {/* divider */}
        <div className='w-full h-0.5 rounded bg-gray-200 mb-7'></div>

        <h2 className='text-2xl mb-2 flex items-center'><CgCreditCard className="mr-2" />  Método de pago</h2>
        <div className='mb-10' >{PaymentMethodNameWithIcon(paymentMethod)}</div>

        {/* divider */}
        <div className='w-full h-0.5 rounded bg-gray-200 mb-7'></div>

        <h2 className='text-2xl mb-2'>Resumen del pedido</h2>

        <div className='grid grid-cols-2'>
          <span className='text-right'>No. Productos</span>
          <span className='text-right'>{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>

          <span className='text-right'>Subtotal</span>
          <span className='text-right'>{currencyFormat(subtotal)}</span>

          {
            shippingMethod === 'delivery' &&
            <>
              <span className='text-right'>Envió</span>
              <span className='text-right'>{getShippingMessage(shippingMethod, subtotal)}</span>
            </>
          }

          <span className='mt-5 text-2xl text-right'>Total</span>
          <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>
        </div>

        <div className='mt-5 mb-2 w-full'>

          <p className="mb-5">
            <span>
              Al hacer clic en &quot;Confirmar compra&quot;, aceptas nuestros <Link href="/info/terms" className="underline">términos y condiciones</Link> y <Link href={'/info/privacy'} className='underline'>política de privacidad</Link>
            </span>
          </p>

          <p className='pb-4 text-red-500'>{errorMessage}</p>
          <Button
            disabled={isPlacingOrder}
            onClick={async () => { await onPlaceOrder() }}
          >
            <span className={`flex gap-1 items-center transition-opacity duration-300 ${isPlacingOrder ? 'opacity-0' : 'opacity-100'}`}>
              Confirmar compra
            </span>
            <span className={`flex gap-1 items-center transition-opacity duration-300 ${isPlacingOrder ? 'opacity-100' : 'opacity-0'} absolute`}>
              <CgSpinnerTwo className='animate-spin h-5 w-5 mr-3' />
              Procesando
            </span>
          </Button>
        </div>
      </CardContent >

    </Card>
  )
}
