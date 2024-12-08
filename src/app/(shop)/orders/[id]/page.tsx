import { redirect } from 'next/navigation'
import { BsTruck } from 'react-icons/bs'
import { getOrderById } from '@/actions'
import { CashButton, OrderStatus, paymentMethodNameSpanish, PayPalButton, Title, TransferButton } from '@/components'
import { ProductImage } from '@/components/products'
import { Card, CardContent } from '@/components/ui/card'
import { PICKUP_LOCATION } from '@/config/checkoutConfig'
import { currencyFormat } from '@/utils'
import { getShippingMessage } from '@/utils/order/getShippingMessage'

interface Props {
  params: {
    id: string
  }
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params
  const { ok, order } = await getOrderById(id)

  if (!ok || !order) {
    redirect('/orders')
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
      <div className="flex justify-center items-center mb-20 px-1 sm:px-0">

        <div className="flex flex-col w-[1000px]">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* cart */}
            <div className="flex flex-col mt-5">

              <OrderStatus isPaid={order.isPaid} />

              {/* items */}
              {
                orderItem.map((item, index) => {
                  const isClotheOrShoe = (categoryName: string): boolean => {
                    return ['clothe', 'shoe'].includes(categoryName)
                  }
                  return (
                    <div key={index} className="flex flex-col mt-5">
                      <ProductImage
                        src={item.product.productImage[0].url}
                        alt={item.product.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div>
                        <span>
                          {item.product.title}
                          {isClotheOrShoe(item.product.category.name)
                            ? `${item.attributes.map(attr => ` - (${attr.value}`).join(', ')})`
                            : null}
                        </span>
                        <p>{currencyFormat(Number(item.price))} x {item.quantity}</p>
                        <p className='font-bold'>Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            {/* summary */}
            <Card>
              <CardContent className='shadow-xl p-7'>
                <h2 className='text-2xl mb-2 flex items-center'><BsTruck className="mr-2" />  Dirección de entrega</h2>
                {
                  isMethodPickup
                    ? <>
                      <p className='text-xl'>{PICKUP_LOCATION.firstName}</p>
                      <p className='text-xl'>{PICKUP_LOCATION.lastName}</p>
                      <div className="mb-7">
                        <p>{PICKUP_LOCATION.address}</p>
                        <p>{PICKUP_LOCATION.city}, {PICKUP_LOCATION.country} {PICKUP_LOCATION.postalCode}</p>
                        <p className='mb-2'>Teléfono: {PICKUP_LOCATION.phone}</p>
                        <p className='text-sm'>Horario de atención: Lunes-Viernes: 9AM-5PM, Sábado: 10AM-2PM</p>
                      </div>
                    </>
                    : <>
                      <p className='text-xl'>{`${orderAddress?.firstName} ${orderAddress?.lastName}`}</p>
                      <p className='text-xl'>{orderAddress?.lastName}</p>
                      <div className="mb-7">
                        <p>{orderAddress?.address}</p>
                        <p>{orderAddress?.address2}</p>
                        <p>{orderAddress?.postalCode}</p>
                        <p>{orderAddress?.phone}</p>
                        <p>{orderAddress?.city}, {orderAddress?.countryId}</p>
                      </div>
                    </>
                }

                {/* divider */}
                <div className='w-full h-0.5 rounded bg-gray-200 mb-7'></div>

                <h2 className='text-2xl mb-2'>Resumen del pedido</h2>

                <div className='grid grid-cols-2'>
                  <span className='text-right'>No. Productos</span>
                  <span className='text-right'>{order.itemsInOrder === 1 ? '1 artículo' : `${order.itemsInOrder} artículos`}</span>

                  <span className='text-right'>Subtotal</span>
                  <span className='text-right'>{currencyFormat(order.subtotal)}</span>

                  {
                    !isMethodPickup &&
                    <>
                      <span className='text-right'>Envió</span>
                      <span className='text-right'>{getShippingMessage(order.shippingMethod, order.subtotal)}</span>
                    </>

                  }

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
              </CardContent>
            </Card>
          </div>
        </div>
      </div >
    </>
  )
}
