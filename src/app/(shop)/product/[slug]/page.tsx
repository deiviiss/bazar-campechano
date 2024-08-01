import { type Metadata, type ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { IoArrowBackOutline, IoShareOutline } from 'react-icons/io5'
import { getProductBySlug } from '@/actions'
import { AccordionDescription, ButtonBack, ButtonShare, ProductCarrousel, ProductImage } from '@/components'
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
    <div className='mb-20 min-[960px]:pt-6 min-[960px]:mx-6 grid min-[960px]:grid-cols-3 gap-3'>

      {/* mobile */}
      <div className='min-[960px]:hidden relative'>
        <ProductCarrousel slides={product.images} autoSlide />
      </div>

      {/* desktop */}
      <div className='hidden min-[960px]:col-span-2 min-[960px]:grid grid-cols-2'>
        {product.images.map((image, index) => (
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

        <ButtonShare className='fixed bottom-5 right-5 rounded-full h-14 w-14 p-0 hover:bg-black hover:text-white' icon={<IoShareOutline size={25} />} />

        <div className='flex gap-2 justify-between'>
          <h2 className={`${titleFont.className} antialiased font-bold text-2xl uppercase`}>
            {product.title}
          </h2>

          <h2 className={`${titleFont.className} antialiased font-extrabold text-2xl min-w-24 text-right`}>$ {product.price}</h2>
        </div>

        <div className='my-5'>
          <p className='text-xs p-2 bg-yellow-100 text-black rounded uppercase w-28 text-center'>Agotado</p>
        </div>

        {/* description */}
        <AccordionDescription description={product.description ? product.description : ''} />
      </div>
    </div>
  )
}
