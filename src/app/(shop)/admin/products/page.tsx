import Link from 'next/link'
import { IoAdd } from 'react-icons/io5'
import { getCategories, getPaginationProductsStock } from '@/actions'
import { CardProduct, Pagination, ProductFilter, ProductSearch, Title } from '@/components'
import { Button } from '@/components/ui/button'
import { type CategoryName } from '@/interfaces'

interface Props {
  searchParams: {
    query?: string
    page?: string
    category?: CategoryName
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const categoryName = searchParams.category || undefined
  const query = searchParams.query || ''
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginationProductsStock({ page, query, category: categoryName })

  const categories = await getCategories()

  if (!categories) {
    return null
  }

  return (
    <>
      <Title title='Mantenimiento de productos' subtitle='Listado de productos' className='' />

      <div className='grid min-[430px]:grid-cols-[1fr,100px] sm:grid-cols-[1fr,200px] gap-2 p-3 min-[430px]:p-5 bg-slate-400'>
        <div className='flex gap-2 justify-between w-full max-w-96'>
          <ProductSearch placeholder='Buscar producto...' />
          <ProductFilter categories={categories} />
        </div>

        <div className='flex justify-end'>

          <Button
            asChild
            className='flex gap-1 items-center'
          >
            <Link
              href='/admin/product/create'>
              <IoAdd className='w-6 h-6' />
              <span className='hidden sm:block'>Crear producto</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className='grid w-full justify-items-center gap-6 pt-5 md:pt-10 md:grid-cols-2 min-[992px]:grid-cols-3 min-[1200px]:grid-cols-4'>
        {
          products.length > 0 && (
            products.map(product => {
              return (
                <CardProduct key={product.id} product={product} />
              )
            }))
        }
        {
          products.length === 0 && (
            <div className='flex flex-col w-full items-center justify-center col-span-4 h-36'>
              <h1>No se han encontrado productos con ese nombre </h1>
              <Link href='/admin/product/create' className='hover:underline'>Crea un producto!</Link>
            </div>
          )
        }
      </div>
      {
        products.length > 0 && (
          <Pagination totalPages={totalPages} />
        )
      }
    </>
  )
}
