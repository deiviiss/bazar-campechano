'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ProductImage, QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
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

  useEffect(() => {
    setLoaded(true)
    if (productsInCart.length === 0) {
      redirect('/empty')
    }
  }, [productsInCart])

  if (!loaded) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <>
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex flex-col gap-1 mt-5">

            <ProductImage
              src={product.image}
              alt={product.title}
              width={100}
              height={100}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className='flex flex-col gap-2'>
              <Link
                className='hover:underline cursor-pointer'
                href={`/product/${product.slug}`}>
                {product.size} - {product.title}
              </Link>
              <p>{currencyFormat(product.price)}</p>
              <QuantitySelector quantity={product.quantity} onQuantityChange={(value) => { updateProductQuantity(product, value) }} />

              <button onClick={() => {
                removeProductFromCart(product)
                noticeRemoveFromCart()
              }} className='underline mt-3'>Remover</button>
            </div>
          </div>
        ))
      }
    </>
  )
}
