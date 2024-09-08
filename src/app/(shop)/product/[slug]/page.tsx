import { type Metadata, type ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCldOgImageUrl } from 'next-cloudinary'
import { IoArrowBackOutline, IoShareSocialOutline } from 'react-icons/io5'
import { getPaginationProducts, getProductBySlug } from '@/actions'
import { AccordionDescription, ButtonBack, ButtonShare, CurrentProductsGrid, ProductCarrousel, ProductImage, ProductPurchaseOptions, TitleCategory } from '@/components'
import { Button } from '@/components/ui/button'
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

  const url = getCldOgImageUrl({
    src: product?.productImage[1].url || ''
  })

  const imgSrc = (url)
    ? product?.productImage[1].url.startsWith('http')
      ? product?.productImage[1].url
      : `/products/${product?.productImage[1].url}`
    : '/imgs/placeholder.jpg'

  return {
    title: product?.title || 'Product page title',
    description: product?.description || 'Product page description',
    openGraph: {
      title: product?.title || 'Product page title',
      description: product?.description || 'Product page description',
      images: [
        {
          width: 1200,
          height: 627,
          url: imgSrc
        }
      ]
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params
  const { products } = await getPaginationProducts({ page: 1 })
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <div className='mb-20 mt-[60.67px] min-[960px]:pt-6 min-[960px]:mx-6 grid min-[960px]:grid-cols-3 gap-3'>

        {/* mobile */}
        <div className='min-[960px]:hidden relative'>
          <ProductCarrousel slides={product.productImage} autoSlide />
        </div>

        {/* desktop */}
        <div className='hidden min-[960px]:col-span-2 min-[960px]:grid grid-cols-2 gap-[1.5px] bg-black'>
          {product.productImage.map((image, index) => (
            <ProductImage
              key={index}
              src={image.url}
              alt={image.url}
              width={400}
              height={400}
              className='w-full min-w-full h-[400px] object-cover'
            />
          ))}
        </div>

        {/* details */}
        <div className="col-span-1 p-0 px-2 h-fit">

          {/* mobile */}
          <ButtonBack className='absolute top-[4.3rem] right-3 text-black hover:no-underline hover:text-gray-900 text-xl flex gap-1 p-2 min-[960px]:hidden rounded-none border-black border bg-white' icon={<IoArrowBackOutline />} />

          <ButtonBack className='text-gray-500 hover:no-underline hover:text-gray-900 text-xl min-[960px]:flex gap-1 pl-0' name='VOLVER' icon={<IoArrowBackOutline />} />

          <ButtonShare className='fixed bottom-10 z-10 right-16 text-black hover:no-underline hover:text-gray-900 text-xl flex gap-1 p-2 rounded-none border-black border bg-white h-12 w-12' icon={<IoShareSocialOutline size={25} />} />

          <div className='flex gap-2 justify-between'>
            <h2 className={`${titleFont.className} antialiased font-bold text-2xl uppercase`}>
              {product.title}
            </h2>

            <h2 className={`${titleFont.className} antialiased font-extrabold text-2xl min-w-24 text-right`}>$ {product.price}</h2>
          </div>

          <div className='my-5'>
            <ProductPurchaseOptions product={product} />
          </div>

          {/* description */}
          <AccordionDescription description={product.description ? product.description : ''} history={product.history ? product.history : ''} />
        </div>
      </div>

      <div className='pb-10 mb-10 border-t border-black'>
        <TitleCategory
          title="Recomendados para ti"
          subtitle="Lo más nuevo"
          className='text-center uppercase pt-10'
        />
        <CurrentProductsGrid products={products} />
        <Button asChild variant='outline' className='flex justify-center mx-auto w-3/4 max-w-32 uppercase bg-transparent mt-[52px]'>
          <Link href='/products'>
            ver todo
          </Link>
        </Button>
      </div>
    </>
  )
}
