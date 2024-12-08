import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartProduct } from '@/interfaces'
import { useCheckoutStore } from '@/store'

interface State {
  cart: CartProduct[]

  getTotalItems: () => number
  getSummaryInformation: () => {
    subtotal: number
    shippingCost: number
    total: number
    itemsInCart: number
  }

  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProductFromCart: (product: CartProduct) => void

  clearCart: () => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSummaryInformation: () => {
        const { cart, getTotalItems } = get()

        const subtotal = cart.reduce(
          (subtotal, product) => (product.quantity * product.price) + subtotal, 0
        )

        const { shippingMethod } = useCheckoutStore.getState()
        // if subtotal is greater than 199, shipping is free
        const shippingCost = shippingMethod === 'pickup' ? 0 : (subtotal > 199 ? 0 : 45)
        const total = subtotal + shippingCost
        const itemsInCart = getTotalItems()

        return {
          subtotal,
          shippingCost,
          total,
          itemsInCart
        }
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get()

        // Check if the product is already in the cart with selected size
        const productInCart = cart.some(
          (item) =>
            item.id === product.id &&
      JSON.stringify(item.attributes) === JSON.stringify(product.attributes)
        )

        // if the product is not in the cart, add it
        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        // if the product is already in the cart with the selected size, update the quantity
        const updatedCartProducts = cart.map((item) => {
          if (
            item.id === product.id &&
      JSON.stringify(item.attributes) === JSON.stringify(product.attributes)
          ) {
            return { ...item, quantity: item.quantity + product.quantity }
          }

          return item
        })

        set({ cart: updatedCartProducts })
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get()

        const updatedCartProducts = cart.map((item) => {
          if (
            item.id === product.id &&
      JSON.stringify(item.attributes) === JSON.stringify(product.attributes)
          ) {
            return { ...item, quantity }
          }
          return item
        })
        set({ cart: updatedCartProducts })
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get()

        const updatedCartProducts = cart.filter(
          (item) =>
            item.id !== product.id ||
      JSON.stringify(item.attributes) !== JSON.stringify(product.attributes)
        )

        set({ cart: updatedCartProducts })
      },

      clearCart: () => {
        set({ cart: [] })
      }

    }),
    {
      name: 'shopping-cart'
    }
  )
)
