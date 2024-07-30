'use client'

import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { ProductImage } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type Size, type Product, type CartProduct } from '@/interfaces'
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

export const ProductGridItemDark = ({ product }: ProductGridItemProps) => {
  const [displayImage, setDisplayImage] = useState(product.images[0].url)
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const addProductToCart = useCartStore(state => state.addProductToCart)
  const isSelectSize = selectedSize !== null

  const AddToCart = async () => {
    if (!selectedSize) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0].url,
      size: selectedSize,
      quantity: 1
    }

    addProductToCart(cartProduct)
    setSelectedSize(null)

    noticeAddToCart()
  }

  const handleMouseEnter = () => { setDisplayImage(product.images[1].url) }
  const handleMouseLeave = () => { setDisplayImage(product.images[0].url) }

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

      <div className='p-4 flex flex-col gap-1 text-white text-sm sm:text-base'>
        <Link
          href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <p>Color: VERDES</p>
        {
          product.sizes.length > 0
            ? (<div className='flex flex-col gap-1 my-3'>
              <Select
                onValueChange={(value) => { setSelectedSize(value as Size) }}
              >
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder='TALLA'>
                    {selectedSize ?? 'TALLA'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      product.sizes.map((size) => (
                        <SelectItem
                          key={size}
                          className='capitalize'
                          value={size}
                        >{size}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                onClick={AddToCart}
                disabled={!isSelectSize}
                variant='secondary'
                className='mt-2 font-semibold'
              >
                AGREGAR
              </Button>
            </div>)
            : (<p className='text-xs p-2 bg-yellow-100 text-black rounded uppercase w-28 text-center'>Agotado</p>)
        }
        <span className='font-bold'>$ {product.price}</span>
      </div>
    </div>
  )
}
