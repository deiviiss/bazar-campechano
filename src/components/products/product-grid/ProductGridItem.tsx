'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ProductImage } from '@/components'
import { type Product } from '@/interfaces'

interface ProductGridItemProps {
  product: Product
}

export const ProductGridItem = ({ product }: ProductGridItemProps) => {
  const [displayImage, setDisplayImage] = useState(product.images[0].url)

  const handleMouseEnter = () => { setDisplayImage(product.images[1].url) }
  const handleMouseLeave = () => { setDisplayImage(product.images[0].url) }

  return (
    <div className='rounded-md overflow-hidden fade-in'>
      <Link href={`/product/${product.slug}`}>
        <ProductImage src={displayImage}
          alt={product.title}
          className='w-full object-cover object-top rounded max-h-[160px] md:max-h-[200px] lg:max-h-[300px] xl:max-h-[400px]'
          width={500}
          height={500}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>

      <div className='p-4 flex flex-col'>
        <Link
          className='hover:text-blue-600'
          href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        {
          product.sizes.length > 0
            ? (<span className='text-sm'>Tallas: {product.sizes.join(' - ')}</span>)
            : (<span className='text-sm'>Agotado</span>)
        }
        <span className='font-bold'>$ {product.price}</span>
      </div>
    </div>
  )
}
