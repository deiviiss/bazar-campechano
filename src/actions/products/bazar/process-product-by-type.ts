import { getSizesProductShoeStock, getToyAgeRangeAndStock, getSizesProductClotheStock } from '@/actions'
import { type Product, type ProductType, type ProductShoe, type ProductClothe, type ProductToy } from '@/interfaces'
import { isClothe, isShoe, isToy } from '@/utils/productTypeGuards'

export const processProductByType = async(product: Product): Promise<ProductType> => {
  if (isShoe(product)) {
    const sizeStockDetail = await getSizesProductShoeStock({ id: product.id })

    const shoeSizes = sizeStockDetail.map(size => size.shoeSize)

    const shoeProduct: ProductShoe = {
      ...product,
      availableSizes: shoeSizes,
      stockDetails: sizeStockDetail
    }

    return shoeProduct
  }

  if (isClothe(product)) {
    const sizeStockDetail = await getSizesProductClotheStock({ id: product.id })

    const clotheSizes = sizeStockDetail.map(size => size.clotheSize)

    const clotheProduct: ProductClothe = {
      ...product,
      availableSizes: clotheSizes,
      stockDetails: sizeStockDetail
    }

    return clotheProduct
  }

  if (isToy(product)) {
    const ageRangeDetail = await getToyAgeRangeAndStock({ id: product.id })

    const availablePieces = ageRangeDetail.reduce((acc, age) => acc + age.inStock, 0)
    const toyProduct: ProductToy = {
      ...product,
      availablePieces,
      stockDetails: ageRangeDetail
    }

    return toyProduct
  }

  throw new Error('Product type not found')
}
