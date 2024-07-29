import { redirect } from 'next/navigation'
import { getOrderById } from '@/actions'
import { CashButton, OrderStatus, paymentMethodNameSpanish, PayPalButton, ProductImage, Title, TransferButton } from '@/components'
import { currencyFormat } from '@/utils'

interface Props {
  params: {
    id: string
  }
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params

  const { ok, order } = await getOrderById(id)

  if (!ok || !order) {
    redirect('/')
  }

  const orderItem = order.orderItem
  const orderAddress = order.orderAddresses

  // Mapping object for payment methods and corresponding components
  const paymentButtonComponents = {
    paypal: <PayPalButton orderId={order.id} amount={order.total} />,
    mercadopago: <p>mercadopago</p>,
    cash: <CashButton amount={order.total} />,
    transfer: <TransferButton amount={order.total} />
  }

  const isMethodPickup = order.shippingMethod === 'pickup'

  return (
    <>
      <Title className='' title={`Pedido #${id.split('-').at(-1)}`} subtitle="Estos son los datos de tu pedido" />
      <div className="flex justify-center items-center mb-72 px-1 sm:px-0">

        <div className="flex flex-col w-[1000px]">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* cart */}
            <div className="flex flex-col mt-5">

              <OrderStatus isPaid={order.isPaid} />

              {/* items */}
              {
                orderItem.map((item, index) => (
                  <div key={index} className="flex flex-col mt-5">
                    <ProductImage
                      src={item.product.productImage[0].url}
                      alt={item.product.title}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <span>{item.size} - {item.product.title}</span>
                      <p>{currencyFormat(item.price)} x {item.quantity}</p>
                      <p className='font-bold'>Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* summary */}
            <div className='bg-white rounded-xl shadow-xl p-7 pb-1'>

              <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
              <div className="mb-10">
                <p className='text-xl'>{isMethodPickup ? orderAddress?.firstName : `${orderAddress?.firstName} ${orderAddress?.lastName}`}</p>
                <p className='text-xl'>{isMethodPickup && orderAddress?.lastName}</p>
                <p>{orderAddress?.address}</p>
                <p>{orderAddress?.city}</p>
                <p>CP {orderAddress?.postalCode}</p>
                <p>{orderAddress?.phone}</p>
              </div>

              {/* divider */}
              <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

              <h2 className='text-2xl mb-2'>Resumen del pedido</h2>

              <div className='grid grid-cols-2'>
                <span className='text-right'>No. Productos</span>
                <span className='text-right'>{order.itemsInOrder === 1 ? '1 artículo' : `${order.itemsInOrder} artíulos`}</span>

                <span className='text-right'>Subtotal</span>
                <span className='text-right'>{currencyFormat(order.subtotal)}</span>

                <span className='text-right'>IVA (16%)</span>
                <span className='text-right'>{currencyFormat(order.tax)}</span>

                <span className='mt-5 text-2xl text-right'>Total</span>
                <span className='mt-5 text-2xl text-right'>{currencyFormat(order.total)}</span>
              </div>

              {/* divider */}
              <div className='w-full h-0.5 rounded bg-gray-200 my-10'></div>

              {
                order.isPaid
                  ? (
                    <div className='mt-6'>
                      <OrderStatus isPaid={order.isPaid} />
                    </div>)
                  : (paymentButtonComponents[order.paymentMethod])
              }

              {
                order.isPaid && (<div className='text-center text-green-700 mb-5'>
                  <p>Pagado con {paymentMethodNameSpanish[order.paymentMethod]}</p>
                  <p>¡Gracias por tu compra!</p>
                </div>)
              }

            </div>
          </div>
        </div>
      </div >
    </>
  )
}
