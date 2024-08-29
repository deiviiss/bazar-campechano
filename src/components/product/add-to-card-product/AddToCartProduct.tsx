'use client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { type Product, type CartProduct, type ProductToy, type ProductShoe, type ProductClothe, type ClotheSize, type ShoeSize, type AgeRange } from '@/interfaces'
import { useCartStore } from '@/store'

interface Props {
  product: Product | ProductClothe | ProductShoe | ProductToy
  setSelectedClotheSize?: (size: ClotheSize | undefined) => void
  setSelectedShoeSize?: (size: ShoeSize | undefined) => void
}

const noticeAddToCart = () => {
  toast('Producto agregado al carrito', {
    position: 'top-right',
    duration: 2000
  })
}

export const AddToCartProduct = ({ product, setSelectedClotheSize, setSelectedShoeSize }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)

  const AddToCart = async () => {
    let clotheSize: ClotheSize | undefined
    let shoeSize: ShoeSize | undefined
    let ageRange: AgeRange | null = null

    if ('clotheSize' in product) {
      clotheSize = product.clotheSize
    }

    if ('shoeSize' in product) {
      shoeSize = product.shoeSize
    }

    if ('ageRange' in product) {
      ageRange = product.ageRange as AgeRange
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.productImage[0].url,
      clotheSize,
      shoeSize,
      ageRange,
      quantity: 1
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
