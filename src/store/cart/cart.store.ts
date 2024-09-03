import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartProduct } from '@/interfaces'

interface State {
  cart: CartProduct[]
  pickupInStore: boolean

  getTotalItems: () => number
  getSummaryInformation: () => {
    subtotal: number
    tax: number
    total: number
    itemsInCart: number
  }

  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProductFromCart: (product: CartProduct) => void

  setPickupInStore: (pickup: boolean) => void

  clearCart: () => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      pickupInStore: false,

      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSummaryInformation: () => {
        const { cart, getTotalItems, pickupInStore } = get()

        const subtotal = cart.reduce(
          (subtotal, product) => (product.quantity * product.price) + subtotal, 0
        )

        // if subtotal is greater than 199, shipping is free
        const tax = pickupInStore ? 0 : (subtotal > 199 ? 0 : 45)
        const total = subtotal + tax
        const itemsInCart = getTotalItems()

        return {
          subtotal,
          tax,
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
            item.clotheSize === product.clotheSize &&
            item.shoeSize === product.shoeSize &&
            item.ageRange === product.ageRange
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
             item.clotheSize === product.clotheSize &&
            item.shoeSize === product.shoeSize &&
            item.ageRange === product.ageRange
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
            item.clotheSize === product.clotheSize &&
            item.shoeSize === product.shoeSize &&
            item.ageRange === product.ageRange
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
            item.clotheSize !== product.clotheSize ||
            item.shoeSize !== product.shoeSize ||
            item.ageRange !== product.ageRange
        )

        set({ cart: updatedCartProducts })
      },

      clearCart: () => {
        set({ cart: [] })
      },

      setPickupInStore: (pickup: boolean) => {
        set({ pickupInStore: pickup })
      }

    }),
    {
      name: 'shopping-cart'
    }
  )
)
