'use client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { type Product, type CartProduct } from '@/interfaces'
import { useCartStore } from '@/store'

interface Props {
  product: Product
}

const noticeAddToCart = () => {
  toast('Producto agregado al carrito', {
    position: 'top-right',
    duration: 2000
  })
}

export const AddToCartProduct = ({ product }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)

  const AddToCart = async () => {
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0].url,
      size: product.sizes[0],
      quantity: 1
    }

    addProductToCart(cartProduct)

    noticeAddToCart()
  }

  return (
    <Button onClick={AddToCart} className='w-full bg-black text-white'>
      Agregar al carrito
    </Button>
  )
}
