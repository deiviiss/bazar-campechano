import { type ProductV2 } from '@/interfaces'

export const availableSizes = ({ product }: { product: ProductV2 }): string[] => {
  if (!product.productAttributeValue) {
    return []
  }

  return product.productAttributeValue
    .filter((attr) => attr.attribute.name === 'size' && attr.inStock > 0)
    .map((attr) => attr.valueOption.value)
    .sort((a, b) => {
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

      // Verify if a and b are numeric
      const isNumeric = !isNaN(Number(a)) && !isNaN(Number(b))

      if (isNumeric) {
        // Numerical order
        return Number(a) - Number(b)
      }

      // Alphabetical order
      return sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
    })
}
