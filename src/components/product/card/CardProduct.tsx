'use client'

import Link from 'next/link'
import { DeleteButtonProduct, ProductImage } from '@/components'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { type Size, type ProductWithStock } from '@/interfaces'

interface Props {
  product: ProductWithStock
}

export const CardProduct = ({ product }: Props) => {
  return (
    <Card className="bg-blue-200 rounded-lg shadow-md overflow-hidden w-full sm:w-64 md:w-72 lg:w-80">
      <div className="p-4 flex justify-center">
        <Link href={`/product/${product.slug}`}
        >
          <ProductImage
            src={product.images[0].url}
            alt={product.title}
            className='rounded-t shadow-md'
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div className="p-4 space-y-2">
        <CardTitle className="text-lg font-bold  rounded-md p-2">{product.title}</CardTitle>
        <div className='grid min-[400px]:grid-cols-2 gap-4'>
          <div>
            <div className="flex justify-start items-center">
              <p className="text-sm rounded-md p-2">Inventario: {product.stock.inStock}</p>
              <p className="text-sm rounded-md p-2">Talla: {product.stock.size}</p>
            </div>
            <div className="flex justify-start items-center">
              <p className="text-sm rounded-md p-2">Género: {product.gender}</p>
              <p className="text-lg font-bold  rounded-md p-2">${product.price}</p>
            </div>
          </div>
          <div className="flex justify-end items-end gap-3">
            <Button asChild className="btn-primary w-full md:w-full max-w-32">
              <Link href={`/admin/product/${product.slug}?size=${product.stock.size}`}>
                Editar
              </Link>
            </Button>
            <DeleteButtonProduct id={`${product.id}`} size={product.stock.size as Size} />
          </div>
        </div>
      </div>
    </Card>
  )
}
