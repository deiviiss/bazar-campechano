import { ProductItem } from '@/components'
import { type ProductType } from '@/interfaces'

interface Props {
  products: ProductType[]
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <div className='grid grid-cols-2 gap-0 justify-items-center mb-10 sm:grid-cols-3 min-[900px]:grid-cols-4 min-[900px]:gap-4 lg:gap-8'>
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
