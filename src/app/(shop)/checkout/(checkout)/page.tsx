import { type PaymentMethod, type ShippingMethod } from '@prisma/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PlaceOrder } from './ui/PlaceOrder'
import { ProductsInCart } from './ui/ProductsInCart'
import { Title } from '@/components'

interface Props {
  searchParams: {
    'shipping-method': string
    'payment-method': string
  }
}

export default function CheckoutPage({ searchParams }: Props) {
  const shippingMethod = searchParams['shipping-method'] || ''
  const paymentMethod = searchParams['payment-method'] || ''

  // validate shipping and payment method
  if (!shippingMethod) {
    redirect('/checkout/shipping-method')
  }

  if (!['pickup', 'delivery'].includes(shippingMethod)) {
    redirect('/checkout/shipping-method')
  }

  if (!paymentMethod) {
    redirect(`/checkout/way-to-pay?shipping-method=${shippingMethod}`)
  }

  if (!['paypal', 'mercadopago', 'cash', 'transfer'].includes(paymentMethod)) {
    redirect(`/checkout/way-to-pay?shipping-method=${shippingMethod}`)
  }

  return (
    <>
      <Title title='Verificar Compra' subtitle="Estamos confirmando tu pedido." />
      <div className="flex justify-center items-center mb-72 px-1 sm:px-0">

        <div className="flex flex-col w-[1000px]">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* cart */}
            <div className="flex flex-col mt-5">
              <span className=" text-xl">Ajustar compra</span>
              <Link href="/cart" className="underline mb-5">
                Editar carrito
              </Link>

              {/* items */}
              <ProductsInCart />
            </div>

            {/* summary */}
            <PlaceOrder shippingMethod={shippingMethod as ShippingMethod} paymentMethod={paymentMethod as PaymentMethod} />

          </div>
        </div>
      </div>
    </>
  )
}
