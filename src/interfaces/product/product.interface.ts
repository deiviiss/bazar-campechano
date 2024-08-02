export interface Product {
  id: string
  title: string
  description?: string | null
  price: number
  slug: string
  productImage: ProductImage[]
  categoryId: string
  category: Category
}

export type SizeClothe = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'

export interface ProductClothe extends Product {
  sizes: SizeClothe[]
}

export type SizeShoe = number

export interface ProductShoe extends Product {
  sizes: SizeShoe[]
}

export interface ProductToy extends Product {
  ageRange: string
}

export interface CartProduct {
  id: string
  slug: string
  title: string
  price: number
  size?: SizeClothe | SizeShoe
  ageRange?: string
  quantity: number
  image: string
}

export type CategoryType = 'shoes' | 'toys' | 'clothes'

export interface ProductImage {
  id: string
  url: string
}

export interface Category {
  id: string
  description?: string
  name: string
}

export interface Stock {
  id: string
  size: SizeClothe
  inStock: number
}

export interface ProductWithStock extends Product {
  stock: Stock
}
