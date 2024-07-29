import { type Metadata, type ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getPaginationProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, ProductSearch, Title } from '@/components'
import { type ValidGender } from '@/interfaces'

interface Props {
  params: {
    gender: ValidGender
  }
  searchParams: {
    query?: string
    page?: string
    take?: string
  }
}

const description: Record<ValidGender, string> = {
  men: 'Hombres',
  women: 'Mujeres',
  kid: 'Niños',
  unisex: 'Unisex'
}

const labels: Record<ValidGender, string> = {
  men: 'de hombre',
  women: 'de mujer',
  kid: 'de niño',
  unisex: 'unisex'
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const gender = params.gender

  return {
    title: `Categoria de ${description[gender]}`,
    description: `Toda la ropa ${labels[gender]} que necesitas para estar a la moda.`,
    openGraph: {
      title: `Categoria de ${description[gender]}`,
      description: `Toda la ropa ${labels[gender]} que necesitas para estar a la moda.`
    }
  }
}

export default async function GenderByPage({ params, searchParams }: Props) {
  const { gender } = params
  const query = searchParams.query || ''
  const page = searchParams.page ? Number(searchParams.page) : 1

  const result = await getPaginationProductsWithImages({ page, query, gender })

  if (!result) {
    notFound()
  }

  const { products, totalPages } = result

  const processedProducts = products.map(product => ({
    ...product,
    description: product.description || 'Sin descripción'
  }))

  return (
    <>
      <Title
        title={`${description[gender]}`}
        subtitle={`Toda la ropa ${labels[gender]} que necesitas para estar a la moda.`}
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
