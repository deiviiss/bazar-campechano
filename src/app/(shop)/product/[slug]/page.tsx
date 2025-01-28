import { type Metadata, type ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCldOgImageUrl } from 'next-cloudinary'
import { IoArrowBackOutline, IoShareSocialOutline } from 'react-icons/io5'
import { getProductBySlug } from '@/actions'
import { getProducts } from '@/actions/products'
import { TitleCategory, ButtonBack } from '@/components'
import { ProductPurchaseOptions, AccordionDescription, ButtonShare, CurrentProductsGrid, ButtonAddToCart, ProductSlideshow } from '@/components/products'
import { Button } from '@/components/ui/button'
import { titleFont } from '@/config/fonts'
import { getImageSrc, isValidFileSystemUrl } from '@/utils'

export const revalidate = 60 * 60 * 24 * 7 // 1 week

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = params.slug
  const { product } = await getProductBySlug(slug)
  const imgSrc = getImageSrc(product?.productImage[1].url || '')

  if (!isValidFileSystemUrl(imgSrc)) {
    const url = getCldOgImageUrl({
      src: imgSrc,
      format: 'png'
    })

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
            url
          }
        ]
      }
    }
  }

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
  const { products } = await getProducts({ page: 1 })
  const { product } = await getProductBySlug(slug)
  if (!product) {
    notFound()
  }

  const images = product.productImage.map((image) => {
    return {
      id: image.id,
      src: image.url
    }
  })

  return (
    <>
      <div className='w-full flex items-center justify-center'>
        <div className='mb-20 mt-[157.67px] min-[487px]:mt-[141.67px] sm:mt-[100.67px] md:pt-6 md:mx-6 grid md:grid-cols-[2fr_1fr] gap-3 relative max-w-[1000px]'>

          <ProductSlideshow images={images} altText={product.title} />

          {/* details */}
          <div className="col-span-1 p-0 px-2 h-fit">

            <ButtonBack className='text-gray-500 hover:no-underline hover:text-primary/90 text-xl md:flex gap-1 pl-0' name='VOLVER' icon={<IoArrowBackOutline />} />

            <ButtonShare className='fixed bottom-10 z-10 right-16 text-primary hover:no-underline hover:text-primary/90 text-xl flex gap-1 p-2 rounded-none border-primary border bg-white h-12 w-12' icon={<IoShareSocialOutline size={25} />} title={product.title} description={product.description || ''} />

            <div className='flex gap-2 justify-between'>
              <h2 className={`${titleFont.className} antialiased font-bold text-2xl uppercase`}>
                {product.title}
              </h2>

              <h2 className={`${titleFont.className} antialiased font-extrabold text-2xl min-w-24 text-right`}>$ {product.price}</h2>
            </div>
            <span>Vendido por: {product.user.name}</span>
            {
              product.hasSize &&
              <div className='my-5'>
                <ProductPurchaseOptions product={product} />
              </div>
            }

            {
              !product.hasSize &&
              <div className='my-5 flex justify-end'>
                <ButtonAddToCart
                  product={product}
                  className="font-semibold text-primary"
                  nameButton='Agregar al carrito'
                  selectedAttributes={[
                    {
                      attributeId: product.productAttributeValue[0].attributeId,
                      valueOptionId: product.productAttributeValue[0].valueOptionId
                    }
                  ]}
                />
              </div>
            }

            {/* description */}
            <AccordionDescription description={product.description ? product.description : ''} />
          </div>
        </div>
      </div>

      <div className='pb-10 sm:px-10 mb-10 border-t border-primary'>
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
