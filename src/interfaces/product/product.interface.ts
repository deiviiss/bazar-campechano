export interface Product {
  id: string
  title: string
  description?: string | null
  price: number
  slug: string
  gender: ValidGender
  sizes: Size[]
  images: ProductImage[]
  categoryId: string
}

export interface Stock {
  id: string
  size: Size
  inStock: number
}

export interface ProductWithStock extends Product {
  stock: Stock
}

export interface CartProduct {
  id: string
  slug: string
  title: string
  price: number
  size: Size
  quantity: number
  image: string
}

export type ValidGender = 'men' | 'women' | 'kid' | 'unisex'

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'

export type ValidType = 'shirts' | 'pants' | 'hoodies' | 'hats'

export interface ProductImage {
  id: string
  url: string
}

export interface Category {
  id: string
  description: string | null
  name: string
}
