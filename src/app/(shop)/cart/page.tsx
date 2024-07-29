import Link from 'next/link'
import { OrderSummary } from './ui/OrderSummary'
import { ProductsInCart } from './ui/ProductsInCart'
import { Title } from '@/components'

export default function CartPage() {
  return (
    <>
      <Title title='Carrito' subtitle="Tus compras en el carrito" />
      <div className="flex justify-center items-center mb-72 px-1 sm:px-0">

        <div className="flex flex-col w-[1000px]">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* cart */}
            <div className="flex flex-col gap-1 mt-3">
              <span className=" text-xl">Agregar más artículos</span>
              <Link href="/" className="underline mb-5 hover:text-blue-600">
                Continua comprando
              </Link>

              {/* items */}
              <ProductsInCart />

            </div>

            {/* summary */}
            <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
              <h2 className='text-2xl mb-2'>Resumen del pedido</h2>

              <OrderSummary />

              <div className='mt-5 mb-2 w-full'>
                <Link
                  href="/checkout/shipping-method"
                  className='flex btn-primary justify-center'
                >
                  Comprar
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
