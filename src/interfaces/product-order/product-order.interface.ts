export interface ProductToOrder {
  productId: string
  quantity: number
  attributes: Array<{ value: string }>
}
