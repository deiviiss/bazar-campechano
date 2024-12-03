import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  shippingMethod: 'pickup' | 'delivery' | null
  paymentMethod: string | null
  setShippingMethod: (method: 'pickup' | 'delivery' | null) => void
  setPaymentMethod: (method: string | null) => void
}

export const useCheckoutStore = create<State>()(
  persist(
    (set) => ({
      shippingMethod: null,
      paymentMethod: null,
      setShippingMethod: (method) => { set({ shippingMethod: method }) },
      setPaymentMethod: (method) => { set({ paymentMethod: method }) }
    }),
    {
      name: 'checkout-cart'
    }
  )
)
