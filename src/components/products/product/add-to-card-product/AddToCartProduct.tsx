'use client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { type CartProduct, type ClotheSize, type ShoeSize, type ProductV2WithStock } from '@/interfaces'
import { useCartStore } from '@/store'

interface Props {
  product: ProductV2WithStock
  setSelectedClotheSize?: (size: ClotheSize | undefined) => void
  setSelectedShoeSize?: (size: ShoeSize | undefined) => void
  handleAddToCart?: () => void
  className?: string
  nameButton?: string
  selectedSize?: ClotheSize | ShoeSize | undefined
}

const noticeAddToCart = () => {
  toast('Producto agregado al carrito', {
    position: 'top-right',
    duration: 2000
  })
}

export const AddToCartProduct = ({ product, setSelectedClotheSize, setSelectedShoeSize, handleAddToCart, className, nameButton, selectedSize }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)

  const AddToCart = async () => {
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.productImage[0].url,
      quantity: 1,
      size: selectedSize
    }

    addProductToCart(cartProduct)

    if (setSelectedClotheSize) {
      setSelectedClotheSize(undefined)
    }

    if (setSelectedShoeSize) {
      setSelectedShoeSize(undefined)
    }

    noticeAddToCart()
  }

  return (
    <Button variant='secondary' onClick={AddToCart} className='w-full font-semibold uppercase'>
      agregar
    </Button>
  )
}
