import { ProductItem } from '@/components'
import { type ProductType } from '@/interfaces'

interface Props {
  products: ProductType[]
}

export const NewProductsGrid = ({ products }: Props) => {
  return (
    <div className="flex w-full overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {
        products.map(async (product) => {
          return (
            <ProductItem key={product.slug} product={product} className='text-white' />
          )
        })
      }
    </div>
  )
}
