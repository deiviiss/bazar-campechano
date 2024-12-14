import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getFeaturedProducts, getProducts } from '@/actions/products'
import { TitleHome, HeaderHero } from '@/components'
import { NewProductsGrid, FeaturedProductsGrid, CurrentProductsGrid } from '@/components/products'
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

  const { products } = await getProducts({ page, query })

  const { products: featuredProducts } = await getFeaturedProducts({ page, query })

  const { products: toyProducts } = await getProducts({ page, category: 'toy' })

  const { products: shoeProducts } = await getProducts({ page, category: 'shoe' })

  const { products: clotheProducts } = await getProducts({ page, category: 'clothe' })

  if (!products || !featuredProducts) {
    return notFound()
  }

  return (
    <>
      <HeaderHero />

      {/* new products */}
      <div className='pb-10 sm:px-10 mb-10'>
        <TitleHome
          title="De segunda mano"
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
      <div className='pb-10 sm:px-10 mb-10 border-t border-primary'>
        <TitleHome
          title="Lo último"
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
      <div className='bg-primary pb-28 sm:px-10 border-b border-white'>
        <TitleHome
          title="Calzado de bazar"
          subtitle="precios justos"
          className='text-center uppercase text-white pt-10 mb-14'
        />
        <NewProductsGrid products={shoeProducts} />
        <Button asChild variant='outline' className='flex justify-center mx-auto w-3/4 max-w-32 uppercase bg-transparent text-white mt-[52px]'>
          <Link href='/category/shoe'>
            ver todo
          </Link>
        </Button>
      </div>
      {/* toys products */}
      <div className='bg-primary pb-10 sm:px-10 mb-10'>
        <TitleHome
          title="Los más divertido"
          subtitle="Juguetes"
          className='text-center uppercase text-white pt-10 mb-14'
        />
        <NewProductsGrid products={toyProducts} />
        <Button asChild variant='outline' className='flex justify-center mx-auto w-3/4 max-w-32 uppercase bg-transparent mt-[52px] text-white'>
          <Link href='/category/toy'>
            ver todo
          </Link>
        </Button>
      </div>
      {/* clothe products */}
      <div className='pb-10 sm:px-10 mb-10'>
        <TitleHome
          title="Hallazgos de moda"
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
