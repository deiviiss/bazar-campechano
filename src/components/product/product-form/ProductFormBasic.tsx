'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createUpdateProduct, deleteProductImage } from '@/actions'
import { ProductImage } from '@/components'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { type CategoryName, type Category, type Product } from '@/interfaces'

interface Props {
  product: Product
  categories: Category[]
  params: {
    slug: string
  }
}

interface FormInputs {
  id?: string
  title: string
  slug: string
  description: string | null
  price: number
  inStock: number
  // clotheSize?: ClotheSize
  // shoeSize?: ShoeSize
  // ageRange: AgeRange | null
  categoryId: string
  productImage?: FileList
}

const labels: Record<CategoryName, string> = {
  toy: 'Juguetes',
  clothe: 'Ropa',
  shoe: 'Zapatos'
}

const noticeFailSaved = () => {
  toast.error('No se pudo guardar el producto, intente nuevamente', {
    position: 'top-right',
    duration: 5000
  })
}

const noticeSuccessSaved = () => {
  toast.success('Producto guardado correctamente', {
    position: 'top-right',
    duration: 2000
  })
}

const noticeSuccessDeleteImage = () => {
  toast.success('Imagen eliminada correctamente', {
    position: 'top-right',
    duration: 2000
  })
}

const noticeFailSavedDeleteImage = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    duration: 2000
  })
}

export const ProductFormBasic = ({ product, categories, params }: Props) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [category, setCategory] = useState<CategoryName>('clothe')

  const currentCategoryId = categories.find(category => category.name === 'clothe')?.id

  if (currentCategoryId === undefined) {
    throw new Error('No se encontró la categoría de ropa')
  }

  const defaultValuesForm: FormInputs = {
    id: product.id,
    title: product.title,
    slug: product.slug,
    description: product.description || null,
    price: product.price,
    categoryId: product.categoryId || currentCategoryId,
    inStock: product.price, // consultar stock
    productImage: undefined
  }

  const {
    handleSubmit,
    register,
    formState: { isValid },
    setValue
  } = useForm<FormInputs>({
    defaultValues: defaultValuesForm
  })

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(false)
    const formData = new FormData()

    const { productImage, ...productToSave } = data

    if (productToSave.id) formData.append('id', productToSave.id)

    formData.append('title', productToSave.title)
    formData.append('description', productToSave.description || '')
    formData.append('slug', productToSave.slug)
    formData.append('price', productToSave.price.toString())
    formData.append('inStock', productToSave.inStock.toString())
    formData.append('categoryId', productToSave.categoryId)

    if (productImage) {
      for (let i = 0; i < productImage.length; i++) {
        formData.append('images', productImage[i])
      }
    }

    const { ok, product } = await createUpdateProduct(formData)

    if (!ok) {
      noticeFailSaved()
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    noticeSuccessSaved()
    router.replace(`/admin/product/${product?.slug}`)
  }

  const handleDeleteImageClick = async (id: string, url: string) => {
    setIsSubmitting(true)
    const rta = await deleteProductImage(id, url)
    if (!rta?.ok) {
      noticeFailSavedDeleteImage(rta.message)
      setIsSubmitting(false)
      return
    }
    setIsSubmitting(false)
    noticeSuccessDeleteImage()
  }

  const handleCategory = (value: string) => {
    setValue('categoryId', value)
    const categoryName = categories.find(category => category.id === value)?.name

    if (!categoryName) {
      noticeFailSaved()
      return
    }

    setCategory(categoryName)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 px-0 mb-16 gap-3 min-[480px]:px-3 sm:grid-cols-2 md:gap-7">

      <div className='flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Datos del producto</h3>
          </CardHeader>
          <CardContent>
            <Label htmlFor="categoryId">Tipo de producto</Label>
            <Select
              onValueChange={(value) => {
                handleCategory(value)
              }}
              defaultValue={currentCategoryId}
              {...register('categoryId', { required: true })}
            >
              <SelectTrigger>
                <SelectValue placeholder={labels[category as CategoryName]}>
                  {labels[category as CategoryName]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    categories.map(category => (
                      <SelectItem
                        className='capitalize'
                        key={category.id}
                        value={category.id}>
                        {labels[category.name as CategoryName]}
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
          <CardContent >
            <Label htmlFor="title">Nombre</Label>
            <Input id="title" className='w-full' {...register('title', { required: true })} />
          </CardContent>

          <CardContent>
            <Label htmlFor='slug' >Slug (SEO)</Label>
            <Input
              type="text"
              {...register('slug', { required: true })}
            />
          </CardContent>

          <CardContent>
            <Label htmlFor='description'>Descripción</Label>
            <Textarea
              rows={5}
              {...register('description', { required: true })} id="description" />
          </CardContent>

          <CardContent>
            <Label htmlFor='price'>Precio</Label>
            <Input
              type="number"
              {...register('price', { required: true, min: 0 })}
            />
          </CardContent>

        </Card>
      </div>

      {/* inStock & photo selector  */}
      <Card className='h-fit'>
        {/* inStock */}
        <CardContent className="pt-6">
          <Label htmlFor='inStock'>Inventario</Label>
          <Input
            type="number"
            {...register('inStock', { required: true, min: 0 })}
          />
        </CardContent>

        {/* images */}
        <CardContent>
          <Label htmlFor='productImage'>Fotos</Label>
          <Input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/avif"
            {...register('productImage', { required: true })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 overflow-auto h-96">
            {
              product.productImage &&
              product.productImage?.map(image => (
                <div
                  className='flex flex-col items-center justify-center'
                  key={image.url}>
                  <ProductImage
                    src={image.url}
                    alt={product.title ? product.title : 'Producto'}
                    width={200}
                    height={200}
                    className="rounded-t shadow-md" />

                  <button
                    disabled={isSubmitting}
                    onClick={() => { handleDeleteImageClick(image.id, image.url) }}
                    type='button'
                    className={
                      clsx(
                        'w-full p-2 mt-2 rounded-b border border-t-0',
                        {
                          'btn-disabled': isSubmitting,
                          'btn-danger': !isSubmitting
                        }
                      )
                    }>
                    Eliminar
                  </button>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>

      <div className='flex gap-2 w-full text-center'>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className='w-full mt-4'
          variant='primary'
        >
          Guardar
        </Button>

        <Button
          type="button"
          disabled={isSubmitting}
          className='w-full mt-4'
          variant="destructive"
          onClick={() => { router.push('/admin/products') }}
        >
          Cancelar
        </Button>
      </div>
    </form >
  )
}
