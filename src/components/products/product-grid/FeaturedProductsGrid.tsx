import { ProductItem } from '@/components'
import { type ProductType } from '@/interfaces'

interface Props {
  products: ProductType[]
}

export const FeaturedProductsGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 min-[760px]:grid-cols-3 lg:grid-cols-4 w-full overflow-x-scroll justify-items-center gap-y-4 " style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {
        products.map(async (product) => {
          return (
          <ProductItem key={product.slug} product={product} />
          )
        })
      }
    </div>
  )
}
