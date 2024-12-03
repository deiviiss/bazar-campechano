'use client'
import { IoAdd } from 'react-icons/io5'
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

export const ButtonAddToCart = ({ product, setSelectedClotheSize, setSelectedShoeSize, handleAddToCart, className, nameButton, selectedSize }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)

  const hasStock = product.hasStock

  const AddToCart = async () => {
    if (!hasStock) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.productImage[0].url,
      size: selectedSize,
      quantity: 1
    }

    addProductToCart(cartProduct)

    if (setSelectedClotheSize) {
      setSelectedClotheSize(undefined)
    }

    if (setSelectedShoeSize) {
      setSelectedShoeSize(undefined)
    }

    handleAddToCart && handleAddToCart()
    noticeAddToCart()
  }

  return (
    hasStock
      ? (
        <Button
          variant={'outline'}
          onClick={AddToCart}
          className={className && className}>
          {
            !nameButton
              ? <IoAdd className="h-4 w-4" />
              : nameButton
          }
        </Button>)
      : (
        <div className="grid items-center gap-x-1 gap-y-2">
          <p className="h-10 px-4 py-2 text-center rounded-none text-sm bg-yellow-200 text-secondary-foreground uppercase font-semibold">
            vendido
          </p>
        </div>)
  )
}
