'use client'

import { useState } from 'react'
import { ButtonAddToCart } from '@/components/products'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type ShoeSize, type ClotheSize, type ProductV2WithStock } from '@/interfaces'
import { isClothe, isShoe } from '@/utils/productTypeGuards'

interface Props {
  product: ProductV2WithStock
}

export const ProductPurchaseOptions = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState<ShoeSize | ClotheSize | undefined>(undefined)

  if (!product) {
    return null
  }

  const sizeOptions = product.availableSizes

  const handleSizeSelect = (value: string) => {
    if (isShoe(product)) {
      setSelectedSize(Number(value) as ShoeSize)
    } else if (isClothe(product)) {
      setSelectedSize(value as ClotheSize)
    }
  }

  const handleAddToCart = () => {
    setSelectedSize(undefined)
  }

  if (sizeOptions.length > 0) {
    const productToAdd = {
      ...product,
      selectedSize
    }

    return (
      <div className="grid gap-4 py-4">
        <Select onValueChange={handleSizeSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una talla" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sizeOptions.map((size) => (
                <SelectItem
                  key={size}
                  className="capitalize"
                  value={size}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedSize
          ? (
            <ButtonAddToCart
              product={productToAdd}
              handleAddToCart={handleAddToCart}
              className="font-semibold uppercase w-full"
              nameButton='agregar'
              selectedSize={selectedSize}
            />)
          : (
            <Button
              disabled
              variant="secondary"
              className="font-semibold uppercase w-full"
            >
              agregar
            </Button>)
        }
      </div>
    )
  }

  return (
    <div className="grid items-center gap-x-1 gap-y-2">
      <p className="h-10 px-4 py-2 text-center rounded-none text-sm bg-yellow-200 text-secondary-foreground uppercase font-semibold">
        vendido
      </p>
    </div>
  )
}
