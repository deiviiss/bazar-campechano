import { type ShippingMethod, type PaymentMethod, type Status } from '@prisma/client'

export interface IOrder {
  id: string
  subtotal: number
  tax: number
  total: number
  itemsInOrder: number
  status: Status
  paymentMethod: PaymentMethod
  shippingMethod: ShippingMethod
  isPaid: boolean
  paidAt: Date | null
  createdAt: Date
  updatedAt: Date | null
  userId: string
  transactionId: string | null
  orderAddresses: {
    firstName: string
    lastName: string
  } | null
}

export interface IOrderCard {
  id: string
  name: string
  isPaid: boolean
  paymentMethod: PaymentMethod
  status: Status
  userId: string
}
