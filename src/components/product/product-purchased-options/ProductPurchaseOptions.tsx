'use client'

import { useState } from 'react'
import { AddToCartProduct } from '@/components'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type ProductClothe, type ProductShoe, type ShoeSize, type ClotheSize, type ProductToy, type Product } from '@/interfaces'
import { isClothe, isShoe, isToy } from '@/utils/productTypeGuards'

interface Props {
  product: (ProductShoe | ProductClothe) & { availableSizes?: ShoeSize[] | ClotheSize[] } | ProductToy | Product
}

export const ProductPurchaseOptions = ({ product }: Props) => {
  if (!product) {
    return null
  }

  if (isShoe(product)) {
    const [selectedSize, setSelectedSize] = useState<ShoeSize | undefined>(undefined)
    const isSelectSize = selectedSize !== undefined

    const productToAdd = {
      ...product,
      shoeSize: selectedSize
    }

    return (
      product.availableSizes.length > 0
        ? (<div className='grid xl:grid-cols-2 items-center gap-x-1 gap-y-2 my-3 xl:mt-[3.7rem]'>
          <Select
            onValueChange={(value) => { setSelectedSize(Number(value) as ShoeSize) }}
          >
            <SelectTrigger className="w-full bg-transparent">
              <SelectValue placeholder='TALLA'>
                {selectedSize ?? 'TALLA'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  product.availableSizes.map((size) => (
                    <SelectItem
                      key={size}
                      className='capitalize'
                      value={`${size}`}
                    >{size}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {
            isSelectSize
              ? (
                <AddToCartProduct product={productToAdd} setSelectedShoeSize={setSelectedSize} />)
              : (
                <Button
                  disabled
                  variant='secondary'
                  className='font-semibold uppercase'
                >agregar</Button>)
          }
        </div>)
        : (
          <div className='grid items-center gap-x-1 gap-y-2 my-3'>
            <p className='mt-12 h-10 px-4 py-2 text-center rounded-none text-sm bg-yellow-200 text-secondary-foreground uppercase font-semibold'>vendido</p>
          </div>)
    )
  }

  if (isClothe(product)) {
    const [selectedSize, setSelectedSize] = useState<ClotheSize | undefined>(undefined)
    const isSelectSize = selectedSize !== undefined

    const productToAdd = {
      ...product,
      clotheSize: selectedSize
    }

    return (
      product.availableSizes.length > 0
        ? (
          <div className='grid xl:grid-cols-2 items-center gap-x-1 gap-y-2 my-3 xl:mt-[3.7rem]'>
            <Select
              onValueChange={(value) => { setSelectedSize(value as ClotheSize) }}
            >
              <SelectTrigger className="w-full bg-transparent">
                <SelectValue placeholder='TALLA'>
                  {selectedSize ?? 'TALLA'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    product.availableSizes.map((size) => (
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
            {
              isSelectSize
                ? (
                  <AddToCartProduct product={productToAdd} setSelectedClotheSize={setSelectedSize} />)
                : (
                  <Button
                    disabled
                    variant='secondary'
                    className='font-semibold uppercase'
                  >agregar</Button>)
            }
          </div>)
        : (
          <div className='grid items-center gap-x-1 gap-y-2 my-3'>
            <p className='mt-12 h-10 px-4 py-2 text-center rounded-none text-sm bg-yellow-200 text-secondary-foreground uppercase font-semibold'>vendido</p>
          </div>)
    )
  }

  if (isToy(product)) {
    const getPieceLabel = (count: number) => {
      if (count <= 0) return '0 piezas'
      if (count === 1) return '1 pieza'
      return `${count} piezas`
    }

    const pieceLabel = getPieceLabel(product.availablePieces)

    return (
      product.availablePieces > 0
        ? (
          <div className='grid items-center gap-x-1 gap-y-2 my-3'>
            <p className='h-10 flex items-center'>Disponible: {pieceLabel}</p>
            <AddToCartProduct product={product} />
          </div>)
        : (
          <div className='grid items-center gap-x-1 gap-y-2 my-3'>
            <p className='mt-12 h-10 px-4 py-2 text-center rounded-none text-sm bg-yellow-200 text-secondary-foreground uppercase font-semibold'>vendido</p>
          </div>)
    )
  }
}
