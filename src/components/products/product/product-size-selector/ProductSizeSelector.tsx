'use client'

import { DialogDescription } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { ButtonAddToCart } from '@/components/products'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type ShoeSize, type ClotheSize, type ProductV2WithStock } from '@/interfaces'
import { isClothe, isShoe } from '@/utils/productTypeGuards'

interface Props {
  product: ProductV2WithStock
}

export const ProductSizeSelector = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState<ShoeSize | ClotheSize | undefined>(undefined)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (!product) {
    return null
  }

  const sizesOptions = product.availableSizes

  const handleSizeSelect = (value: string) => {
    if (isShoe(product)) {
      setSelectedSize(Number(value) as ShoeSize)
    } else if (isClothe(product)) {
      setSelectedSize(value as ClotheSize)
    }
  }

  const handleAddToCart = () => {
    setIsDialogOpen(false)
    setSelectedSize(undefined)
  }

  if (sizesOptions.length > 0) {
    const productToAdd = {
      ...product,
      selectedSize
    }

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
                  {sizesOptions.map((size) => (
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
                  nameButton='Agregar'
                  className="font-semibold uppercase w-full bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
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
