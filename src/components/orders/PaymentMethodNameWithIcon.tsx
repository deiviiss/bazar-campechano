import { type PaymentMethod } from '@prisma/client'
import { FaCreditCard, FaMoneyBillWave, FaPaypal, FaUniversity } from 'react-icons/fa'

export const paymentMethodNameSpanish: Record<PaymentMethod, string> = {
  paypal: 'PayPal',
  mercadopago: 'Mercado Pago',
  cash: 'Efectivo',
  transfer: 'Transferencia'
}

export const PaymentMethodNameWithIcon = (paymentMethod: PaymentMethod) => {
  if (paymentMethod === 'cash') {
    return (
      <p className='flex items-center'>
        <FaMoneyBillWave className='text-gray-500' />
        <span className='mx-1'>
          {paymentMethodNameSpanish[paymentMethod]}
        </span>
      </p>
    )
  }

  if (paymentMethod === 'mercadopago') {
    return (
      <p className='flex items-center'>
        <FaCreditCard className='text-gray-500' />
        <span className='mx-1'>
          {paymentMethodNameSpanish[paymentMethod]}
        </span>
      </p>
    )
  }

  if (paymentMethod === 'paypal') {
    return (
      <p className='flex items-center'>
        <FaPaypal className='text-gray-500' />
        <span className='mx-1'>
          {paymentMethodNameSpanish[paymentMethod]}
        </span>
      </p>
    )
  }

  if (paymentMethod === 'transfer') {
    return (
      <p className='flex items-center'>
        <FaUniversity className='text-gray-500' />
        <span className='mx-1'>
          {paymentMethodNameSpanish[paymentMethod]}
        </span>
      </p>
    )
  }
}
