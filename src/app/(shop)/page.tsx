import { notFound } from 'next/navigation'
import { getPaginationProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, ProductSearch, Title } from '@/components'

interface Props {
  searchParams: {
    query?: string
    page?: string
    take?: string
  }
}

export default async function ShopPage({ searchParams }: Props) {
  const query = searchParams.query || ''
  const page = searchParams.page ? Number(searchParams.page) : 1

  const result = await getPaginationProductsWithImages({ page, query })

  if (!result) {
    return notFound()
  }

  const { products, totalPages } = result

  const processedProducts = products.map(product => ({
    ...product,
    description: product.description || 'Sin descripción'
  }))

  return (
    <>
      <Title
        title="Tienda de ropa"
        subtitle="Toda la ropa que necesitas para estar a la moda."
        className="mb-2" />

      <div className='flex justify-end mb-6 gap-2'>
        <ProductSearch placeholder='Buscar producto...' />
      </div>

      {
        products.length > 0
          ? (
            <>
              <ProductGrid products={processedProducts} />

              <Pagination totalPages={totalPages} />
            </>)
          : (
            <div className='flex w-full items-center justify-center h-36'>
              <p>No hay productos con ese nombre</p>
            </div>)
      }
    </>
  )
}
