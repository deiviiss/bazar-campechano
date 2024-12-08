'use client'

import { useState } from 'react'
import { ButtonAddToCart } from '@/components/products'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type ProductAttributeSelection, type ProductV2WithStock } from '@/interfaces'

interface Props {
  product: ProductV2WithStock
}

export const ProductPurchaseOptions = ({ product }: Props) => {
  const [selectedAttributes, setSelectedAttributes] = useState<ProductAttributeSelection[]>([])

  if (!product) {
    return null
  }

  const sizeOptions = product.availableSizes

  const handleSizeSelect = (selectedSize: string) => {
    // Map size to attributeId and valueOptionId
    const matchingAttribute = product.productAttributeValue.find(
      (attr) => attr.valueOption.value === selectedSize && attr.attribute.name === 'size'
    )

    if (matchingAttribute) {
      setSelectedAttributes([
        {
          attributeId: matchingAttribute.attributeId,
          valueOptionId: matchingAttribute.valueOptionId,
          value: selectedSize
        }
      ])
    }
  }

  const handleAddToCart = () => {
    setSelectedAttributes([])
  }

  if (sizeOptions.length > 0) {
    return (
      <div className="grid gap-4 py-4">
        <Select onValueChange={handleSizeSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una talla" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sizeOptions.map((size) => (
                <SelectItem key={size} className="capitalize" value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedAttributes.length > 0
          ? (
            <ButtonAddToCart
              product={product}
              selectedAttributes={selectedAttributes}
              handleAddToCart={handleAddToCart}
              className="font-semibold uppercase w-full"
              nameButton="Agregar"
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
