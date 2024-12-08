import { type ProductAttributeSelection } from '../product/product.interface'

export interface ProductToOrder {
  productId: string
  quantity: number
  attributes: ProductAttributeSelection[] // Multiple attributes can be selected
}
