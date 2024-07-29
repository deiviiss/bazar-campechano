'use client'

import { type ShippingMethod, type PaymentMethod } from '@prisma/client'
import clsx from 'clsx'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { placeOrder } from '@/actions'
import { PaymentMethodNameWithIcon } from '@/components'
import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

interface Props {
  shippingMethod: ShippingMethod
  paymentMethod: PaymentMethod
}

export const PlaceOrder = ({ paymentMethod, shippingMethod }: Props) => {
  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const userName = session?.user?.name || ''
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const noticeConfirmOrder = async (id?: string) => {
    if (!id) return

    toast('Pedido generado con éxito, procede con el pago', {
      position: 'top-right',
      duration: Infinity,
      className: 'grid grid-cols-[1fr,110px] items-start justify-center text-sm p-2 col-span-2 pb-4',
      classNames: {
        content: 'flex items-start justify-center text-sm col-span-4 p-2'
      },
      actionButtonStyle: {
        color: 'white',
        backgroundColor: '#1E40AF',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      },
      action: {
        label: 'Ver pedido',
        onClick: async () => { router.replace(`/orders/${id}`) }
      }
    })
  }

  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)
  let address = useAddressStore(state => state.address)
  const isMethodPickup = shippingMethod === 'pickup'

  if (isMethodPickup) {
    address = {
      userId,
      firstName: 'Retiro en punto de venta',
      lastName: userName,
      address: 'Calle Lic José María Iglesias',
      address2: '',
      postalCode: '24088',
      phone: '9811250049',
      city: 'Campeche',
      country: 'MX'
    }
  }

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

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    const productToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    const orderDetails = {
      productsId: productToOrder,
      address,
      shippingMethod,
      paymentMethod
    }

    const rta = await placeOrder(orderDetails)

    // product sold out
    if (!rta.ok) {
      setIsPlacingOrder(false)

      setErrorMessage(String(rta.message))
      return
    }

    // order success
    clearCart()
    noticeConfirmOrder(rta.order?.id)
  }

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>

      <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
      <p className='text-xl'>{isMethodPickup ? address.firstName : `${address.firstName} ${address.lastName}`}</p>
      <p className='text-xl'>{isMethodPickup && address.lastName}</p>
      <div className="mb-10">
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
        <p>{address.city}, {address.country}</p>
      </div>

      {/* divider */}
      <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

      <h2 className='text-2xl mb-2'>Método de pago</h2>
      <div className='mb-10' >{PaymentMethodNameWithIcon(paymentMethod)}</div>

      {/* divider */}
      <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

      <h2 className='text-2xl mb-2'>Resumen del pedido</h2>

      <div className='grid grid-cols-2'>
        <span className='text-right'>No. Productos</span>
        <span className='text-right'>{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artíulos`}</span>

        <span className='text-right'>Subtotal</span>
        <span className='text-right'>{currencyFormat(subtotal)}</span>

        <span className='text-right'>IVA (16%)</span>
        <span className='text-right'>{currencyFormat(tax)}</span>

        <span className='mt-5 text-2xl text-right'>Total</span>
        <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>
      </div>

      <div className='mt-5 mb-2 w-full'>

        <p className="mb-5">
          <span>
            Al hacer clic en &quot;Confirmar compra&quot;, aceptas nuestros <Link href="/terms" className="underline">términos y condiciones</Link> y <Link href={'/privacy'} className='underline'>política de privacidad</Link>
          </span>
        </p>

        <p className='pb-4 text-red-500'>{errorMessage}</p>

        <button
          disabled={isPlacingOrder}
          className={
            clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder
            })
          }
          onClick={async () => { await onPlaceOrder() }}
        >
          Confirmar compra
        </button>
      </div>
    </div >
  )
}
