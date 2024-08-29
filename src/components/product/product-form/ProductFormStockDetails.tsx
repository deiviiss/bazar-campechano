'use client'

import { toast } from 'sonner'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type ClotheStockDetail, type ToyStockDetail, type ShoeStockDetail, type ShoeSize, type ClotheSize, type AgeRange } from '@/interfaces'
import { isStockClothe, isStockShoe, isStockToy } from '@/utils/stockTypeGuards'

interface StockDetailsProps {
  stockDetails: ClotheStockDetail[] | ShoeStockDetail[] | ToyStockDetail[]
  setStockDetails: (stockDetails: ClotheStockDetail[] | ShoeStockDetail[] | ToyStockDetail[]) => void
}

export const StockDetails = ({ stockDetails, setStockDetails }: StockDetailsProps) => {
  const stockTotal = stockDetails.reduce((acc, stock) => acc + stock.inStock, 0)

  if (isStockShoe(stockDetails[0])) {
    const handleInputChange = (size: ShoeSize, value: number) => {
      if (value < 0) {
        value = 0
        toast.error('El stock no puede ser menor a 0', {
          position: 'top-right',
          duration: 5000
        })

        return
      }

      value = Math.round(value)
      // create a copy of the current state
      const updatedStockDetails = [...stockDetails] as ShoeStockDetail[]

      // find the index of the detail you want to update
      const indexToUpdate = updatedStockDetails.findIndex(detail => detail.shoeSize === size)

      // if we found the detail, update its value
      if (indexToUpdate !== -1) {
        updatedStockDetails[indexToUpdate] = {
          ...updatedStockDetails[indexToUpdate],
          inStock: value
        }
      }

      // updated the state with the new array
      setStockDetails(updatedStockDetails)
    }
    return (
      <Card className='h-fit'>
        <CardHeader>
          <h3 className="text-lg font-semibold p-5 bg-slate-400 text-black">Stock de zapatos por número</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stockDetails.map((shoe, index) => {
              const shoeDetail = shoe as ShoeStockDetail

              return (
                <div key={index} className='flex w-full gap-4 items-center justify-between'>
                  <Label>
                    Número {shoeDetail.shoeSize}
                  </Label>
                  <Input
                    type="number"
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement
                      // delete any decimal point and minus sign the user might try to input
                      input.value = input.value.replace(/[^0-9]/g, '')
                    }}
                    defaultValue={shoeDetail.inStock}
                    onChange={(e) => {
                      handleInputChange(shoeDetail.shoeSize, Number(e.target.value))
                    }}
                    className="w-20 text-right"
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter className="pt-6 font-semibold flex justify-end">Stock total: {stockTotal === 1 ? `${stockTotal} pieza` : `${stockTotal} piezas`}</CardFooter>
      </Card>
    )
  }

  if (isStockClothe(stockDetails[0])) {
    const handleInputChange = (size: ClotheSize, value: number) => {
      if (value < 0) {
        value = 0
        toast.error('El stock no puede ser menor a 0', {
          position: 'top-right',
          duration: 5000
        })

        return
      }

      value = Math.round(value)
      // create a copy of the current state
      const updatedStockDetails = [...stockDetails] as ClotheStockDetail[]

      // find the index of the detail you want to update
      const indexToUpdate = updatedStockDetails.findIndex(detail => detail.clotheSize === size)

      // if we found the detail, update its value
      if (indexToUpdate !== -1) {
        updatedStockDetails[indexToUpdate] = {
          ...updatedStockDetails[indexToUpdate],
          inStock: value
        }
      }

      // updated the state with the new array
      setStockDetails(updatedStockDetails)
    }
    return (
      <Card className='h-fit'>
        <CardHeader>
          <h3 className="text-lg font-semibold p-5 bg-slate-400 text-black">Stock de ropa por talla</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stockDetails.map((clothe, index) => {
              const clotheDetail = clothe as ClotheStockDetail

              return (
                <div key={index} className='flex w-full gap-4 items-center justify-between'>
                  <Label className=''>
                    Talla {clotheDetail.clotheSize}
                  </Label>
                  <Input
                    type="number"
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement
                      // delete any decimal point and minus sign the user might try to input
                      input.value = input.value.replace(/[^0-9]/g, '')
                    }}
                    defaultValue={clotheDetail.inStock}
                    onChange={(e) => { handleInputChange(clotheDetail.clotheSize, Number(e.target.value)) }}
                    className="w-20 text-right"
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter className="pt-6 font-semibold flex justify-end">Stock total: {stockTotal === 1 ? `${stockTotal} pieza` : `${stockTotal} piezas`}</CardFooter>
      </Card>
    )
  }

  if (isStockToy(stockDetails[0])) {
    const handleInputChange = (ageRange: AgeRange, value: number) => {
      if (value < 0) {
        value = 0
        toast.error('El stock no puede ser menor a 0', {
          position: 'top-right',
          duration: 5000
        })

        return
      }

      value = Math.round(value)

      // create a copy of the current state
      const updatedStockDetails = [...stockDetails] as ToyStockDetail[]

      // find the index of the detail you want to update
      const indexToUpdate = updatedStockDetails.findIndex(detail => detail.ageRange === ageRange)

      // if we found the detail, update its value
      if (indexToUpdate !== -1) {
        updatedStockDetails[indexToUpdate] = {
          ...updatedStockDetails[indexToUpdate],
          inStock: value
        }
      }

      // updated the state with the new array
      setStockDetails(updatedStockDetails)
    }
    return (
      <Card className='h-fit'>
        <CardHeader>
          <h3 className="text-lg font-semibold p-5 bg-slate-400 text-black">Stock de juguetes por edad</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stockDetails.map((toy, index) => {
              const toyDetail = toy as ToyStockDetail

              return (
                <div key={index} className='flex w-full gap-4 items-center justify-between'>
                  <Label>
                    Edades {toyDetail.ageRange}
                  </Label>
                  <Input
                    type="number"
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement
                      // delete any decimal point and minus sign the user might try to input
                      input.value = input.value.replace(/[^0-9]/g, '')
                    }}
                    defaultValue={toyDetail.inStock}
                    onChange={(e) => { handleInputChange(toyDetail.ageRange, Number(e.target.value)) }}
                    className="w-16 text-right"
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter className="pt-6 font-semibold flex justify-end">Stock total: {stockTotal === 1 ? `${stockTotal} pieza` : `${stockTotal} piezas`}</CardFooter>
      </Card>
    )
  }
}
