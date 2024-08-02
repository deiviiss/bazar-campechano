import { FeaturedProductItemClothe } from './FeaturedProductItemClothe'
import { FeaturedProductItemShoe } from './FeaturedProductItemShoe'
import { FeaturedProductItemToy } from './FeaturedProductItemToy'
import { getSizesProductClotheStock, getSizesProductShoeStock } from '@/actions'
import { type ProductClothe, type ProductShoe, type Product } from '@/interfaces'

interface ProductGridProps {
  products: Product[]
}

export const FeaturedProductsGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 min-[760px]:grid-cols-3 lg:grid-cols-4 w-full overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {
        products.map(async (product) => {
          if (product.category.name === 'clothes') {
            const sizesProduct = await getSizesProductClotheStock(product.id)

            const productProcessed: ProductClothe = {
              ...product,
              sizes: sizesProduct
            }

            return (
              <FeaturedProductItemClothe key={product.id} product={productProcessed} />
            )
          }

          if (product.category.name === 'shoes') {
            const sizesProduct = await getSizesProductShoeStock(product.id)

            const productProcessed: ProductShoe = {
              ...product,
              sizes: sizesProduct
            }

            return (
              <FeaturedProductItemShoe key={product.id} product={productProcessed} />
            )
          }

          return (
            <FeaturedProductItemToy key={product.slug} product={product} />
          )
        })
      }
    </div>
  )
}
