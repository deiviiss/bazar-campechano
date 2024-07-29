import { redirect } from 'next/navigation'
import { getCategories, getProductBySlugSize } from '@/actions'
import { ProductForm, Title } from '@/components'
import { type Size } from '@/interfaces'

interface Props {
  searchParams: {
    size: Size
  }
  params: {
    slug: string
  }
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = params
  const { size } = searchParams

  const [product, categories] = await Promise.all([
    getProductBySlugSize({ slug, size }),
    getCategories()
  ])

  if (!product && slug !== 'create') {
    redirect('/admin/products')
  }

  const title = (slug === 'create') ? 'Crear producto' : 'Editar producto'
  const subtitle = (slug === 'create') ? 'Creación de un nuevo producto' : 'Edición de un producto existente'

  return (
    <>
      <Title title={title} subtitle={subtitle} className=' text-lg' />

      <ProductForm product={product ?? {}} categories={categories ?? []} params={params} />
    </>
  )
}
