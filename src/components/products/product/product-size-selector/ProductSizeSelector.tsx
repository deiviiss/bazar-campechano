'use client'

import { DialogDescription } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { ButtonAddToCart } from '@/components/products'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type ProductAttributeSelection, type ProductV2WithStock } from '@/interfaces'

interface Props {
  product: ProductV2WithStock
}

export const ProductSizeSelector = ({ product }: Props) => {
  const [selectedAttributes, setSelectedAttributes] = useState<ProductAttributeSelection[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
    setIsDialogOpen(false)
    setSelectedAttributes([])
  }

  if (sizeOptions.length > 0) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="font-semibold text-black"
          >
            <IoAdd className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Talla</DialogTitle>
            <DialogDescription>Selecciona la talla que deseas comprar</DialogDescription>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
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
