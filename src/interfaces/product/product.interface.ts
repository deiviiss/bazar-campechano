export interface Product {
  id: string
  title: string
  description: string | null
  history: string | null
  price: number
  slug: string
  productImage: ProductImage[]
  categoryId: string
  category: Category
  isActive: boolean
}

export interface ProductCreateUpdate {
  id?: string
  title: string
  description: string | null
  history: string | null
  price: number
  slug: string
  categoryId: string
}

export type ClotheSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type ShoeSize = 23 | 24 | 25 | 26 | 27
export type AgeRange = '3 - 5' | '6 - 8' | '9 - 12'

export interface StockBase {
  inStock: number
}

export interface ClotheStockDetail extends StockBase {
  clotheSize: ClotheSize
}

export interface ShoeStockDetail extends StockBase {
  shoeSize: ShoeSize
}

export interface ToyStockDetail extends StockBase {
  ageRange: AgeRange
}

export interface ProductClothe extends Product {
  clotheSize?: ClotheSize
  availableSizes: ClotheSize[]
  stockDetails: ClotheStockDetail[]
}

export interface ProductShoe extends Product {
  shoeSize?: ShoeSize
  availableSizes: ShoeSize[]
  stockDetails: ShoeStockDetail[]
}

export interface ProductToy extends Product {
  availablePieces: number
  stockDetails: ToyStockDetail[]
}

export interface CartProduct {
  id: string
  slug: string
  title: string
  price: number
  clotheSize?: ClotheSize
  shoeSize?: ShoeSize
  ageRange: AgeRange | null
  quantity: number
  image: string
}

export type CategoryName = 'shoe' | 'toy' | 'clothe'

export interface ProductImage {
  id: string
  url: string
}

export interface Category {
  id: string
  description: string | null
  name: CategoryName
}

export interface Stock {
  id: string
  inStock: number
  clotheSize?: ClotheSize
  shoeSize?: ShoeSize | number
  ageRange?: AgeRange
  product: Product | ProductClothe | ProductShoe | ProductToy
}

export interface ProductWithStock extends Product {
  stock: Stock
}

// Define a type that includes all possible product types
export type ProductType = ProductClothe | ProductShoe | ProductToy

export type StockDetailType = ClotheStockDetail | ShoeStockDetail | ToyStockDetail
