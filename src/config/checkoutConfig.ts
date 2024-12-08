import { type UserAddress } from '@/interfaces'

export const SHIPPING_METHODS = [
  { id: 'pickup', label: 'Retiro en punto de venta' },
  { id: 'delivery', label: 'Envío a domicilio' }
]

export const PAYMENT_METHODS = [
  { id: 'paypal', label: 'PayPal' },
  { id: 'cash', label: 'Efectivo' },
  { id: 'transfer', label: 'Transferencia bancaria' }
]

export const PICKUP_LOCATION: UserAddress = {
  firstName: 'Retiro en punto de venta',
  lastName: 'Sucursal Principal',
  address: 'Calle Lic José María Iglesias',
  postalCode: '24088',
  phone: '9811250049',
  city: 'Campeche',
  country: 'MX',
  userId: ''
}
