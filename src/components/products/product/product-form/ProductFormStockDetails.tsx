'use client'

import { toast } from 'sonner'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type StockDetail } from '@/interfaces'

interface StockDetailsProps {
  stockDetails: StockDetail[]
  setStockDetails: (stockDetails: StockDetail[]) => void
}

export const StockDetails = ({ stockDetails, setStockDetails }: StockDetailsProps) => {
  const stockTotal = stockDetails.reduce((acc, stock) => acc + stock.inStock, 0)

  const handleInputChange = (attributeId: string, optionId: string, value: number) => {
    if (value < 0) {
      value = 0
      toast.error('El stock no puede ser menor a 0', {
        position: 'top-right',
        duration: 5000
      })
      return
    }

    value = Math.round(value)

    // Create a copy of the current state
    const updatedStockDetails = [...stockDetails]

    // Find the index of the attribute to update
    const indexToUpdate = updatedStockDetails.findIndex(
      (detail) => detail.attributeId === attributeId && detail.valueOptionId === optionId
    )

    // Update the stock if the detail is found
    if (indexToUpdate !== -1) {
      updatedStockDetails[indexToUpdate] = {
        ...updatedStockDetails[indexToUpdate],
        inStock: value
      }
    }

    // Update the state with the new array
    setStockDetails(updatedStockDetails)
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <h3 className="text-lg font-semibold p-5 bg-slate-400 text-black">
          Stock
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stockDetails.map((detail, index) => (
            <div key={index} className="flex w-full gap-4 items-center justify-between px-6">
              <Label>
                {detail.valueOption.value} :
              </Label>
              <Input
                type="number"
                onInput={(e) => {
                  const input = e.target as HTMLInputElement
                  input.value = input.value.replace(/[^0-9]/g, '')
                }}
                defaultValue={detail.inStock}
                onChange={(e) => {
                  handleInputChange(detail.attributeId, detail.valueOptionId, Number(e.target.value))
                }}
                className="w-20 text-right"
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-6 font-semibold flex justify-end">
        Stock total: {stockTotal === 1 ? `${stockTotal} pieza` : `${stockTotal} piezas`}
      </CardFooter>
    </Card>
  )
}
