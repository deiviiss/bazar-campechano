import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type UserAddress } from '@/interfaces'

interface State {
  address: UserAddress

  // methods
  setAddress: (address: State['address']) => void
  clearAddress: () => void
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        userId: '',
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: ''
      },
      setAddress: (address) => {
        set({ address })
      },
      clearAddress: () => {
        set({
          address: {
            userId: '',
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            postalCode: '',
            city: '',
            country: '',
            phone: ''
          }
        })
      }
    }),
    {
      name: 'address-storage'
    }
  )
)
