'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ProductImage, ProductPurchaseOptions } from '@/components'
import { type AgeRange, type Product, type ProductClothe, type ProductShoe, type ProductToy } from '@/interfaces'
import { isToy } from '@/utils/productTypeGuards'

interface Props {
  product: ProductToy | ProductShoe | ProductClothe | Product
  className?: string
}

export const ProductItem = ({ product, className }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.productImage[0].url)

  const handleMouseEnter = () => { setDisplayImage(product.productImage[1].url) }
  const handleMouseLeave = () => { setDisplayImage(product.productImage[0].url) }

  let ageRange: AgeRange | null = null

  if (isToy(product)) {
    const ageRanges = product.stockDetails.map((stock) => stock.ageRange)
    ageRange = ageRanges[0]
  }

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

      <div className='flex flex-col gap-1 justify-between text-sm sm:text-base mt-2'>
        <Link
          href={`/product/${product.slug}`}
          className='h-11 overflow-hidden font-bold'
        >
          {product.title}
          {
            ageRange !== undefined
              ? (
                <span className='block'>Edades: {ageRange} años</span>)
              : null
          }
        </Link>

        <span className='font-bold mt-2'>$ {product.price}</span>
        <ProductPurchaseOptions product={product} />
      </div>
    </div>
  )
}
