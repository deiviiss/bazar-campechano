'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { QuantitySelector, SizeSelector } from '@/components'
import { type Size, type Product, type CartProduct } from '@/interfaces'
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

const noticeCopyLinkProduct = () => {
  toast('Link copiado al portapapeles', {
    position: 'top-right',
    duration: 2000
  })
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [attempted, setAttempted] = useState<boolean>(false)

  const AddToCart = async () => {
    setAttempted(true)

    if (!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0].url,
      size,
      quantity
    }

    addProductToCart(cartProduct)
    setAttempted(false)
    setQuantity(1)
    setSize(undefined)

    noticeAddToCart()
  }

  return (
    <>
      {/* color selector */}

      {/* validation size */}
      {
        attempted && !size && (
          <span className='mb-10 text-red-500 fade-in'>
            Selecciona una talla*
          </span>
        )
      }

      {/* size selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={setSize}
      />

      {/* count selector */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* buttons */}
      <div className='grid w-full justify-start items-start gap-3 my-5 xl:grid-cols-[170px,1fr] 2xl:grid-cols-[1fr,1fr]'>
        <button
          onClick={AddToCart}
          className='btn-primary w-full md:w-full'>Agregar al carrito</button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            noticeCopyLinkProduct()
          }}
          className='btn-primary w-full md:w-full'>Compartir</button>
      </div>

    </>
  )
}
