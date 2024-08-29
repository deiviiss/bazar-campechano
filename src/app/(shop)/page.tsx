import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPaginationFeaturedProducts, getPaginationProducts } from '@/actions'
import { NewProductsGrid, FeaturedProductsGrid, CurrentProductsGrid, TitleHome } from '@/components'
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

  const { products } = await getPaginationProducts({ page, query })

  const { products: toyProducts } = await getPaginationProducts({ page, category: 'toy' })

  const { products: featuredProducts } = await getPaginationFeaturedProducts({ page, query })

  const { products: shoeProducts } = await getPaginationProducts({ page, category: 'shoe' })

  const { products: clotheProducts } = await getPaginationProducts({ page, category: 'clothe' })

  if (!products || !featuredProducts) {
    return notFound()
  }

  return (
    <>
      {/* new products */}
      <div className='pb-10 mb-10'>
        <TitleHome
          title="Lo más nuevo"
          subtitle="Rebajas"
          className='text-center uppercase pt-10'
        />
        <CurrentProductsGrid products={products} />
        <Button asChild variant='outline' className='flex justify-center mx-auto w-3/4 max-w-32 uppercase bg-transparent mt-[52px]'>
          <Link href='/products'>
            ver todo
          </Link>
        </Button>
      </div>
      {/* featured products */}
      <div className='pb-10 mb-10 border-t border-black'>
        <TitleHome
          title="Las últimas"
          subtitle="ofertas"
          className='text-center uppercase pt-10'
        />
        <FeaturedProductsGrid products={featuredProducts} />
        <Button asChild variant='outline' className='flex justify-center mx-auto w-3/4 max-w-32 uppercase bg-transparent mt-[52px]'>
          <Link href='/products/featured-products'>
            ver todo
          </Link>
        </Button>
      </div>
      {/* shoe products */}
      <div className='bg-slate-950 pb-28 border-b border-white'>
        <TitleHome
          title="El mejor calzado"
          subtitle="Zapatos"
          className='text-center uppercase text-white pt-10'
        />
        <NewProductsGrid products={shoeProducts} />
        <Button asChild variant='outline' className='flex justify-center mx-auto w-3/4 max-w-32 uppercase bg-transparent text-white mt-[52px]'>
          <Link href='/category/shoe'>
            ver todo
          </Link>
        </Button>
      </div>
      {/* toys products */}
      <div className='bg-slate-950 pb-10 mb-10'>
        <TitleHome
          title="Los más divertido"
          subtitle="Juguetes"
          className='text-center uppercase text-white pt-10'
        />
        <NewProductsGrid products={toyProducts} />
        <Button asChild variant='outline' className='flex justify-center mx-auto w-3/4 max-w-32 uppercase bg-transparent mt-[52px] text-white'>
          <Link href='/category/toy'>
            ver todo
          </Link>
        </Button>
      </div>
      {/* clothe products */}
      <div className='pb-10 mb-10'>
        <TitleHome
          title="La última moda"
          subtitle="Ropa"
          className='text-center uppercase pt-10'
        />
        <FeaturedProductsGrid products={clotheProducts} />
        <Button asChild variant='outline' className='flex justify-center mx-auto w-3/4 max-w-32 uppercase bg-transparent mt-[52px]'>
          <Link href='/category/clothe'>
            ver todo
          </Link>
        </Button>
      </div>
    </>
  )
}
