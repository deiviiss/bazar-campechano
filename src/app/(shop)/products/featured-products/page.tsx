import { notFound } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'
import { getFeaturedProducts } from '@/actions/products'
import { Pagination, ButtonBack, TitleCategory } from '@/components'
import { ProductSearch, ProductsGrid } from '@/components/products'

interface Props {
  searchParams: {
    query?: string
    page?: string
    take?: string
  }
}

export default async function FeaturedProductsPage({ searchParams }: Props) {
  const query = searchParams.query || ''
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products, totalPages } = await getFeaturedProducts({ page, query })
  if (!products) {
    notFound()
  }

  return (
    <>
      <div className='flex justify-between mb-6 gap-2'>
        <ProductSearch placeholder='Buscar producto...' />

        <ButtonBack className=' text-primary hover:no-underline hover:text-primary/90 text-xl flex gap-1 p-2 min-[960px]:hidden rounded-none border-primary border bg-white' icon={<IoArrowBackOutline />} />
        <ButtonBack className='text-gray-500 hover:no-underline hover:text-primary/90 text-xl hidden min-[960px]:flex gap-1 pl-0' name='VOLVER' icon={<IoArrowBackOutline />} />
      </div>

      <TitleCategory
        title='Lo último'
        subtitle='Ofertas'
        className="mb-2 w-full items-center justify-center text-center uppercase" />

      {
        products.length > 0
          ? (
            <>
              <ProductsGrid products={products} />

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
