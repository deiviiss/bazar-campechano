'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ProductSizeSelector, ProductImage, ButtonAddToCart } from '@/components/products'
import { type ProductV2WithStock } from '@/interfaces'

interface Props {
  product: ProductV2WithStock
  className?: string
}

export const ProductItem = ({ product, className }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.productImage[0].url)
  const hasSize = product.hasSize

  const handleMouseEnter = () => { setDisplayImage(product.productImage[1].url) }
  const handleMouseLeave = () => { setDisplayImage(product.productImage[0].url) }

  return (
    <div className={`flex-shrink-0 max-w-[300px] px-2 min-[400px]:max-w-[400px] md:max-w-[200px] lg:max-w-[240px] xl:max-w-[280px] ${className}`}>
      <Link href={`/product/${product.slug}`}>
        <ProductImage src={displayImage}
          alt={product.title}
          className='w-full object-cover object-top rounded-md h-64'
          width={400}
          height={400}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>

      <div className='flex flex-col gap-2 justify-between items-start text-sm sm:text-base mt-5'>
        <Link
          href={`/product/${product.slug}`}
          className='font-bold'
        >
          {product.title}
        </Link>

        <div className='flex w-full gap-1 justify-between items-start text-sm sm:text-base mt-2'>
          <span className='font-bold mt-2'>$ {product.price}</span>
          {
            hasSize && <ProductSizeSelector product={product} />
          }

          {
            !hasSize && <ButtonAddToCart
              product={product}
              className="font-semibold text-black"
            />
          }
        </div>

      </div>
    </div>
  )
}
