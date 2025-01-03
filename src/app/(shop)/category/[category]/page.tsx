import { type Metadata, type ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'
import { getProducts } from '@/actions/products'
import { Pagination, TitleCategory, ButtonBack } from '@/components'
import { ProductsGrid, ProductSearch } from '@/components/products'
import { type CategoryName } from '@/interfaces'

interface Props {
  params: {
    category: CategoryName
  }
  searchParams: {
    query?: string
    page?: string
    take?: string
  }
}

const description: Record<CategoryName, string> = {
  toy: 'Lo más divertido',
  clothe: 'La última moda',
  shoe: 'El mejor calzado'
}

const labels: Record<CategoryName, string> = {
  toy: 'Juguetes',
  clothe: 'Ropa',
  shoe: 'Zapatos'
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const categoryName = params.category

  return {
    title: `Categoría de ${description[categoryName]}`,
    description: `${labels[categoryName]} en descuento.`,
    openGraph: {
      title: `Categoría de ${description[categoryName]}`,
      description: `${labels[categoryName]} en descuento.`
    }
  }
}

export default async function CategoryByPage({ params, searchParams }: Props) {
  const categoryName = params.category
  const query = searchParams.query || ''
  const page = searchParams.page ? Number(searchParams.page) : 1

  const result = await getProducts({ page, query, category: categoryName })

  if (!result) {
    notFound()
  }

  const { products, totalPages } = result

  return (
    <div className='mt-[157.67px] min-[487px]:mt-[141.67px] sm:mt-[100.67px]'>
      <div className='flex justify-between pt-10 mb-6 gap-2'>
        <ProductSearch placeholder='Buscar producto...' />

        <ButtonBack className=' text-primary hover:no-underline hover:primary/90 text-xl flex gap-1 p-2 min-[960px]:hidden rounded-none border-primary border bg-white' icon={<IoArrowBackOutline />} />
        <ButtonBack className='text-gray-500 hover:no-underline hover:primary/90 text-xl hidden min-[960px]:flex gap-1 pl-0' name='VOLVER' icon={<IoArrowBackOutline />} />
      </div>

      <TitleCategory
        title={`${description[categoryName]}`}
        subtitle={`${labels[categoryName]}`}
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
    </div>
  )
}
