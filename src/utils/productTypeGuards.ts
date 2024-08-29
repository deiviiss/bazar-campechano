import { type ProductToy, type Product, type ProductClothe, type ProductShoe, type ProductCreateUpdate } from '@/interfaces'

// Type guard to check if the product is a shoe
export const isShoe = (product: Product | ProductCreateUpdate): product is ProductShoe => {
  return (product as ProductShoe).category.name === 'shoe'
}

// Type guard to check if the product is clothing
export const isClothe = (product: Product | ProductCreateUpdate): product is ProductClothe => {
  return (product as ProductClothe).category.name === 'clothe'
}

// Type guard to check if the product is a toy
export const isToy = (product: Product | ProductCreateUpdate): product is ProductToy => {
  return (product as ProductToy).category.name === 'toy'
}
