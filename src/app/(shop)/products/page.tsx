import { notFound } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'
import { getPaginationProducts } from '@/actions'
import { Pagination, ProductsGrid, ProductSearch, TitleCategory, ButtonBack } from '@/components'

interface Props {
  searchParams: {
    query?: string
    page?: string
    take?: string
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const query = searchParams.query || ''
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products, totalPages } = await getPaginationProducts({ page, query })
  if (!products) {
    notFound()
  }

  return (
    <>
      <div className='flex justify-between mb-6 gap-2'>
        <ButtonBack className=' text-black hover:no-underline hover:text-gray-900 text-xl flex gap-1 p-2 min-[960px]:hidden rounded-none border-black border bg-white' icon={<IoArrowBackOutline />} />
        <ButtonBack className='text-gray-500 hover:no-underline hover:text-gray-900 text-xl hidden min-[960px]:flex gap-1 pl-0' name='VOLVER' icon={<IoArrowBackOutline />} />

        <ProductSearch placeholder='Buscar producto...' />
      </div>
      <TitleCategory
        title='Lo más nuevo'
        subtitle='Rebajas'
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
