import { notFound } from 'next/navigation'
import { getPaginationFeaturedProductsWithImages, getPaginationProductsWithImages } from '@/actions'
import { ProductGridDark, ProductGridLight, Title } from '@/components'
import { Button } from '@/components/ui/button'

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
  const { products: featuredProducts } = await getPaginationFeaturedProductsWithImages({ page, query })

  if (!result || !featuredProducts) {
    return notFound()
  }

  const { products } = result

  const processedFeaturedProducts = featuredProducts.map(product => ({
    ...product,
    description: product.description || 'Sin descripción'
  }))

  const processedProducts = products.map(product => ({
    ...product,
    description: product.description || 'Sin descripción'
  }))

  return (
    <>
      <div className='bg-black pb-10 mb-10'>
        <Title
          title="Lo más nuevo"
          subtitle="Rebajas"
          className='text-center uppercase text-white pt-10'
        />

        {
          products.length > 0
            ? (
              <>
                <ProductGridDark products={processedProducts} />
                <Button variant='outline' className='flex justify-center mx-auto w-3/4 max-w-40 capitalize bg-transparent text-white mt-[52px]'>ver todo</Button>
              </>)
            : (
              <div className='flex w-full items-center justify-center h-36'>
                <p>No hay productos con ese nombre</p>
              </div>)
        }
      </div>

      <div className='pb-10 mb-10'>
        <Title
          title="Las últimas"
          subtitle="ofertas"
          className='text-center uppercase pt-10'
        />

        {
          featuredProducts.length > 0
            ? (
              <ProductGridLight products={processedFeaturedProducts} />)
            : (
              <div className='flex w-full items-center justify-center h-36'>
                <p>No hay productos con ese nombre</p>
              </div>)
        }

      </div>
    </>
  )
}
