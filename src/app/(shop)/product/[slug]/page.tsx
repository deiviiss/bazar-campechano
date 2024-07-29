import { type Metadata, type ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { AddToCart } from './ui/AddToCart'
import { getProductBySlug } from '@/actions'
import { ProductSlideshow, StockLabel } from '@/components'
import { titleFont } from '@/config/fonts'
export const revalidate = 60 * 60 * 24 * 7 // 1 week

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = params.slug

  const product = await getProductBySlug(slug)

  return {
    title: product?.title || 'Product page title',
    description: product?.description || 'Product page description',
    openGraph: {
      title: product?.title || 'Product page title',
      description: product?.description || 'Product page description',
      images: [`/products/${product?.images[1].url}`]
    }

  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className='mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>

      <div className='col-span-1 md:col-span-2'>
        <ProductSlideshow
          title={product.title}
          images={product.images.map((image) => image.url)}
        />
      </div>

      {/* details */}
      <div className="col-span-1 p-5 bg-blue-200 h-fit">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">$ {product.price}</p>

        {
          product.sizes.length === 0
            ? (
              <div className='mb-5'>
                <span className='text-red-500'>Agotado</span>
              </div>)
            : (<AddToCart product={product} />)
        }

        {/* description */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
