import Link from 'next/link'
import { getPaginationProductsStockWithImages } from '@/actions'
import { CardProduct, Pagination, ProductSearch, ProductTable, Title } from '@/components'

interface Props {
  searchParams: {
    query?: string
    page?: string
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const query = searchParams.query || ''
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginationProductsStockWithImages({ page, query })

  return (
    <>
      <Title title="Matenimiento de productos" subtitle='Lista de todos los productos' />

      <div className='flex justify-end mb-5 gap-2'>
        <ProductSearch placeholder='Buscar producto...' />
        <Link
          className='btn-primary'
          href='/admin/product/create'>
          Crear producto
        </Link>
      </div>

      <div className='sm:hidden w-full flex flex-col gap-3 mb-10'>
        {
          products.map(product => (
            <CardProduct
              key={`${product.id}-${product.stock.size}`}
              product={product}
            />
          ))
        }
      </div>

      <div className="hidden sm:block mb-10 overflow-auto">
        <ProductTable products={products} />
      </div >
      {
        products.length > 0 && (
          <Pagination totalPages={totalPages} />
        )
      }
    </>
  )
}
