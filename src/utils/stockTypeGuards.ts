import { type StockBase, type ShoeStockDetail, type ClotheStockDetail, type ToyStockDetail } from '@/interfaces'

// Type guard to check if the stock is from a shoe
export const isStockShoe = (stock: StockBase): stock is ShoeStockDetail => {
  return stock !== undefined && typeof (stock as ShoeStockDetail).shoeSize === 'number'
}

// Type guard to check if the stock is from clothing
export const isStockClothe = (stock: StockBase): stock is ClotheStockDetail => {
  return stock !== undefined && typeof (stock as ClotheStockDetail).clotheSize === 'string'
}

// Type guard to check if the stock is from a toy
export const isStockToy = (stock: StockBase): stock is ToyStockDetail => {
  return stock !== undefined && (stock as ToyStockDetail).ageRange !== undefined
}
