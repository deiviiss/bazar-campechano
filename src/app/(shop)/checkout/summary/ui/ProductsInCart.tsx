'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProductImage } from '@/components/products'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export const ProductsInCart = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)

  const productsInCart = useCartStore(state => state.cart)

  useEffect(() => {
    if (productsInCart.length === 0) {
      router.push('/empty')
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
        productsInCart.map(product => {
          const size = product.attributes[0]?.value || null

          return (
            <div key={`${product.slug}`} className="flex flex-col gap-1 ">

              <ProductImage
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
                className='mr-5 rounded w-20 h-20 object-cover'
              />

              <div>
                <span>
                  {product.title} {size ? `- ${size}` : null} ({product.quantity})
                </span>
                <p className='font-semibold'>{currencyFormat(product.price * product.quantity)}</p>
              </div>
            </div>
          )
        })
      }
    </>
  )
}
