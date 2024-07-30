import { ProductGridItemDark } from './ProductGridItemDark'
import { type Product } from '@/interfaces'

interface ProductGridProps {
  products: Product[]
}

export const ProductGridDark = ({ products }: ProductGridProps) => {
  return (
    <div className="flex w-full overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {
        products.map((product) => (
          <ProductGridItemDark key={product.slug} product={product} />
        ))
      }
    </div>
  )
}
