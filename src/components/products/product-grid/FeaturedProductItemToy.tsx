'use client'

import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { ProductImage } from '@/components'
import { Button } from '@/components/ui/button'
import { type CartProduct, type Product } from '@/interfaces'
import { useCartStore } from '@/store'

interface ProductGridItemProps {
  product: Product
}

const noticeAddToCart = () => {
  toast('Producto agregado al carrito', {
    position: 'top-right',
    duration: 2000
  })
}

export const FeaturedProductItemToy = ({ product }: ProductGridItemProps) => {
  const [displayImage, setDisplayImage] = useState(product.productImage[0].url)

  const addProductToCart = useCartStore(state => state.addProductToCart)

  const AddToCart = async () => {
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.productImage[0].url,
      quantity: 1
    }

    addProductToCart(cartProduct)

    noticeAddToCart()
  }

  const handleMouseEnter = () => { setDisplayImage(product.productImage[1].url) }
  const handleMouseLeave = () => { setDisplayImage(product.productImage[0].url) }

  return (
    <div className='flex-shrink-0 max-w-[300px] px-2 min-[400px]:max-w-[400px] md:max-w-[200px] lg:max-w-[200px]'>
      <Link href={`/product/${product.slug}`}>
        <ProductImage src={displayImage}
          alt={product.title}
          className='w-full object-cover object-top rounded-md'
          width={400}
          height={400}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>

      <div className='p-4 flex flex-col gap-1 text-sm sm:text-base'>
        <Link
          href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <p>Color: Juguetes</p>
        <Button
          onClick={AddToCart}
          variant='secondary'
          className='mt-2 font-semibold'
        >
          AGREGAR
        </Button>
        <span className='font-bold'>$ {product.price}</span>
      </div>
    </div>
  )
}
