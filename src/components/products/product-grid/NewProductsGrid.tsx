import { NewProductItemClothe } from './NewProductItemClothe'
import { NewProductItemShoe } from './NewProductItemShoe'
import { NewProductItemToy } from './NewProductItemToy'
import { getSizesProductClotheStock, getSizesProductShoeStock } from '@/actions'
import { type ProductClothe, type Product, type ProductShoe } from '@/interfaces'

interface NewProductsGridProps {
  products: Product[]
}

export const NewProductsGrid = ({ products }: NewProductsGridProps) => {
  return (
    <div className="flex w-full overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {
        products.map(async (product) => {
          // let productProcessed: Product | ProductClothes = product

          if (product.category.name === 'clothes') {
            const sizesProduct = await getSizesProductClotheStock(product.id)

            const productProcessed: ProductClothe = {
              ...product,
              sizes: sizesProduct
            }

            return (
              <NewProductItemClothe key={product.id} product={productProcessed} />
            )
          }

          if (product.category.name === 'shoes') {
            const sizesProduct = await getSizesProductShoeStock(product.id)

            const productProcessed: ProductShoe = {
              ...product,
              sizes: sizesProduct
            }

            return (
              <NewProductItemShoe key={product.id} product={productProcessed} />
            )
          }

          return (
            <NewProductItemToy key={product.slug} product={product} />
          )
        })
      }
    </div>
  )
}
