'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { QuantitySelector, ProductImage } from '@/components/products'
import { Button } from '@/components/ui/button'
import { useCartStore, useUiStore } from '@/store'
import { currencyFormat } from '@/utils'

const noticeRemoveFromCart = async () => {
  toast.success('Producto eliminado del carrito', {
    position: 'top-right',
    duration: 2000
  })
}

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)

  const productsInCart = useCartStore(state => state.cart)
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
  const removeProductFromCart = useCartStore(state => state.removeProductFromCart)
  const closeMenuCart = useUiStore((state) => state.closeSideCart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p className='animate-pulse'>Cargando...</p>
  }

  if (productsInCart.length === 0) {
    return <p>No hay productos en el carrito</p>
  }

  return (
    <div className='flex flex-col w-full gap-5'>
      {productsInCart.map(product => {
        const size = product.attributes[0]?.value || null

        return (
          <div key={`${product.slug}-${size}`} className="flex items-center gap-4">
            <ProductImage
              src={product.image}
              alt={product.title}
              width={80}
              height={80}
              className="object-cover rounded-lg"
            />
            <div className='flex flex-col flex-grow'>
              <Link
                className='hover:underline cursor-pointer text-sm capitalize'
                href={`/product/${product.slug}`}
                onClick={() => { closeMenuCart() }}
              >
                {product.title} {size ? `- ${size}` : null}
              </Link>
              <p className='text-sm font-bold'>{currencyFormat(product.price)}</p>
              <div className='flex flex-col items-center justify-between mt-2'>
                <QuantitySelector
                  quantity={product.quantity}
                  onQuantityChange={(value) => { updateProductQuantity(product, value) }}
                />
                <Button
                  variant={'link'}
                  onClick={() => {
                    removeProductFromCart(product)
                    noticeRemoveFromCart()
                  }}
                  className='text-xs underline flex justify-end w-full'
                >
                  Remover
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
