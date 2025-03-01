import { redirect } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'
import { getCategories, getProductBySlug } from '@/actions'
import { ButtonBack, Title } from '@/components/'
import { ProductSellerForm } from '@/components/products/product/seller-product-form/SellerProductForm'

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params

  const [{ product }, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  if (!categories) {
    redirect('/admin/products')
  }

  if (!product && slug !== 'create') {
    redirect('/admin/products')
  }

  const title = (slug === 'create') ? 'Crear producto' : 'Editar producto'
  const subtitle = (slug === 'create') ? 'Creación de un nuevo producto' : 'Edición de un producto existente'

  return (
    <>
      <div className='flex w-full justify-between items-start'>
        <Title title={title} subtitle={subtitle} className='text-lg' />

        <ButtonBack className=' text-primary hover:no-underline hover:text-primary/90 text-xl flex gap-1 p-2 min-[960px]:hidden rounded-none border-primary border bg-white' icon={<IoArrowBackOutline />} />
        <ButtonBack className='text-gray-500 hover:no-underline hover:text-primary/90 text-xl hidden min-[960px]:flex gap-1 pl-0' name='VOLVER' icon={<IoArrowBackOutline />} />
      </div>
      <ProductSellerForm product={product} categories={categories} />
    </>
  )
}
