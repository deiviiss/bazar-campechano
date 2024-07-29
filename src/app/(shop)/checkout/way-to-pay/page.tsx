import { redirect } from 'next/navigation'
import { FaMoneyBillWave, FaCreditCard, FaUniversity, FaPaypal } from 'react-icons/fa'

import { ButtonMethodPay } from './ui/ButtonMethodPay'
import { Title } from '@/components'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface Props {
  searchParams: {
    'shipping-method': string
    'payment-method': string
  }
}

export default async function PaymentMethodPage({ searchParams }: Props) {
  const ShippingMethod = searchParams['shipping-method'] || ''

  if (!ShippingMethod) {
    redirect('/checkout/shipping-method')
  }

  if (!['pickup', 'delivery'].includes(ShippingMethod)) {
    redirect('/checkout/shipping-method')
  }

  return (
    <>
      <Title title="Forma de Pago" subtitle='' />

      <Card className="overflow-hidden max-w-[500px] mx-auto mb-10 shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gray-100 text-lg font-medium text-center py-4">
          Elige el método de pago
        </CardHeader>

        <CardContent className="p-6 pb-4 text-gray-700">
          <p className="mb-4 text-center">Selecciona la forma de pago que prefieras.</p>
        </CardContent>

        <CardFooter className='grid min-[340px]:grid-cols-2 justify-center gap-4 px-4 pb-6 bg-white'>
          <ButtonMethodPay icon={<FaPaypal />} methodName='Paypal' methodValue='paypal' />

          <ButtonMethodPay isDisabled={true} icon={<FaCreditCard />} methodName='Mercado Pago' methodValue='mercadopago' />

          <ButtonMethodPay icon={<FaMoneyBillWave />} methodName='Efectivo' methodValue='cash' />

          <ButtonMethodPay icon={<FaUniversity />} methodName='Transferencia' methodValue='transfer' />
        </CardFooter>
      </Card>
    </>
  )
}
