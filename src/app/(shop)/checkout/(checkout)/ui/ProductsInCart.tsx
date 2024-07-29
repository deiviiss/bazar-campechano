'use client'

import { useEffect, useState } from 'react'
import { ProductImage } from '@/components'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)

  const productsInCart = useCartStore(state => state.cart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <>
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex flex-col mt-5">

            <ProductImage
              src={product.image}
              alt={product.title}
              width={100}
              height={100}
              className='mr-5 rounded w-20 h-20 object-cover'
            />

            <div>
              <span>
                {product.size} - {product.title} ({product.quantity})
              </span>
              <p className='font-semibold'>{currencyFormat(product.price * product.quantity)}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}
