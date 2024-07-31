import { ProductGridItemLight } from './ProductGridItemLight'
import { type Product } from '@/interfaces'

interface ProductGridProps {
  products: Product[]
}

export const ProductGridLight = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 min-[760px]:grid-cols-3 lg:grid-cols-4 w-full overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {
        products.map((product) => (
          <ProductGridItemLight key={product.slug} product={product} />
        ))
      }
    </div>
  )
}
