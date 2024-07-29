'use client'
import { useEffect, useState } from 'react'
import { getStockBySlug } from '@/actions/'
import { titleFont } from '@/config/fonts'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getStock = async () => {
      const inStock: number = await getStockBySlug(slug)

      setStock(inStock)
      setIsLoading(false)
    }

    getStock()
  }, [])

  return (
    <>
      {isLoading
        ? (
          <h1 className={`${titleFont.className} antialiased font-semibold text-md bg-gray-200 animate-pulse rounded-sm my-1`}>&nbsp;</h1>)
        : (
          <h1 className={`${titleFont.className} antialiased font-bold text-md my-1`} >
            Stock: {stock}
          </h1 >)
      }
    </>
  )
}
