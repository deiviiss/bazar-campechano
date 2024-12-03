'use client'

import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProductImage } from '@/components/products'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)

  const productsInCart = useCartStore(state => state.cart)

  useEffect(() => {
    if (productsInCart.length === 0) {
      redirect('/empty')
    }
    setLoaded(true)
  }, [productsInCart])

  if (!loaded) {
    return (
      <p>Cargando productos...</p>
    )
  }

  return (
    <>
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product?.size}`} className="flex flex-col gap-1 ">

            <ProductImage
              src={product.image}
              alt={product.title}
              width={100}
              height={100}
              className='mr-5 rounded w-20 h-20 object-cover'
            />

            <div>
              <span>
                {product.title} {product.size ? `- ${product.size}` : null} ({product.quantity})
              </span>
              <p className='font-semibold'>{currencyFormat(product.price * product.quantity)}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}
