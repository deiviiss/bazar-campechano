'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { z } from 'zod'
import { StockDetails } from './ProductFormStockDetails'
import { ProductImage } from '../product-image/ProductImage'
import { createUpdateProduct, deleteProductImage } from '@/actions'
import { CloudinaryButton } from '@/components/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { type CategoryName, type ProductImage as IProductImage, type ProductV2WithStock, type CategoryV2, type StockDetail } from '@/interfaces'

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

// schema zod for product
const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z
    .string({
      required_error: 'El título es requerido.',
      message: 'El título debe tener entre 20 y 50 caracteres.'
    }).min(20, {
      message: 'El título debe tener al menos 20 caracteres.'
    }
    ).max(50, {
      message: 'El título debe tener máximo 50 caracteres.'
    }),
  description: z
    .string({
      required_error: 'La descripción es requerida.',
      message: 'La descripción debe tener entre 150 y 300 caracteres.'
    })
    .min(150, {
      message: 'La descripción debe tener al menos 150 caracteres.'
    })
    .max(350, {
      message: 'La descripción debe tener máximo 350 caracteres.'
    }),
  slug: z
    .string({
      required_error: 'El slug es requerido.',
      message: 'El slug debe tener entre 10 y 50 caracteres.'
    })
    .min(10, {
      message: 'El slug debe tener al menos 10 caracteres.'
    })
    .max(50, {
      message: 'El slug debe tener máximo 50 caracteres.'
    }),
  price: z
    .number({
      message: 'El precio es requerido.'
    })
    .positive({
      message: 'El precio debe ser mayor a 0.'
    })
    .min(0, {
      message: 'El precio debe ser mayor a 0.'
    })
    .transform(val => Number(val.toFixed(2))),
  categoryId: z.string().uuid()
})

const labels: Record<CategoryName, string> = {
  toy: 'Juguetes',
  clothe: 'Ropa',
  shoe: 'Zapatos'
}

interface Props {
  product: ProductV2WithStock | null
  categories: CategoryV2[]
}

const initializeStockForNewProduct = (categoryId: string, categories: CategoryV2[]): StockDetail[] => {
  const category = categories.find((cat) => cat.id === categoryId)
  if (!category || !category.attribute) return []

  return category.attribute.flatMap((attr) =>
    attr.valueOptions.map((option) => ({
      id: null, // Create in the backend
      productId: null, //  Get from the backend

      attributeId: attr.id,
      valueOptionId: option.id,
      inStock: 0,

      attribute: {
        id: attr.id,
        name: attr.name
      },
      valueOption: {
        id: option.id,
        value: option.value
      }
    }))
  )
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categoryIdDefault = product?.categoryId || categories[0].id
  const [categoryId, setCategoryId] = useState<string>(categoryIdDefault)
  const categoryName = categories.find(category => category.id === categoryId)?.name

  if (categoryName === undefined) throw new Error('No se encontró la categoría del producto')

  const [images, setImages] = useState<IProductImage[]>(product?.productImage || [])

  const [stockDetails, setStockDetails] = useState<StockDetail[]>(product?.productAttributeValue || initializeStockForNewProduct(categoryId, categories))

  const defaultValuesForm = {
    id: product?.id,
    title: product?.title,
    slug: product?.slug,
    description: product?.description || '',
    price: product?.price || 0,
    categoryId
  }

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: { ...defaultValuesForm }
  })

  useEffect(() => {
    if (!product?.productAttributeValue?.length) {
      const categoryDetails = initializeStockForNewProduct(categoryId, categories)
      //! when changing between product categories, the stockDetails is not being reset
      setStockDetails(categoryDetails)
    }

    form.reset({
      ...defaultValuesForm,
      categoryId
    })
  }, [categoryId, categoryName, product])

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setIsSubmitting(true)

    const totalStock = stockDetails.reduce((acc, stock) => acc + stock.inStock, 0)

    if (totalStock <= 0) {
      toast.error('Debes ingresar al menos un stock', {
        position: 'top-right',
        duration: 5000
      })
      setIsSubmitting(false)
      return
    }

    if (images.length < 2) {
      toast.error('Debes ingresar al menos dos imágenes', {
        position: 'top-right',
        duration: 5000
      })
      setIsSubmitting(false)
      return
    }

    const formData = new FormData()

    const { ...productToSave } = values

    if (productToSave.id) formData.append('id', productToSave.id)
    formData.append('title', productToSave.title)
    formData.append('description', productToSave.description || '')
    formData.append('slug', productToSave.slug)
    formData.append('price', productToSave.price.toString())
    formData.append('categoryId', productToSave.categoryId)
    formData.append('stockDetails', JSON.stringify(stockDetails))

    if (images) {
      formData.append('images', JSON.stringify(images))
    }

    const { ok } = await createUpdateProduct(formData)

    if (!ok) {
      noticeFailSaved()
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    noticeSuccessSaved()

    router.push('/admin/products')
  }

  const openConfirmDeleteImage = (id: string, url: string) => {
    toast('¿Estás seguro de eliminar la imagen?', {
      position: 'top-right',
      duration: Infinity,
      className: 'grid grid-cols-[1fr,110px] items-start justify-center text-sm p-2 col-span-2 pb-4',
      classNames: {
        content: 'flex items-start justify-center text-sm col-span-4 p-2'
      },
      actionButtonStyle: {
        color: 'white',
        backgroundColor: '#000000',
        borderRadius: '0px',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      },
      action: {
        label: 'Confirmar',
        onClick: async () => { await handleDeleteImageClick(id, url) }
      },
      cancel:
      {
        label: 'Cancelar',
        onClick: () => { toast.dismiss() }
      },
      cancelButtonStyle: {
        color: 'white',
        backgroundColor: 'red',
        borderRadius: '0px',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      }
    })
  }

  const handleDeleteImageClick = async (id: string, url: string) => {
    setIsSubmitting(true)

    const rta = await deleteProductImage(id, url)
    if (!rta?.ok) {
      noticeFailSavedDeleteImage(rta.message)
      setIsSubmitting(false)
      return
    }

    setImages((prevImages) => prevImages.filter((image) => image.id !== id))

    setIsSubmitting(false)
    noticeSuccessDeleteImage()
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 px-0 mb-16 gap-3 min-[480px]:px-3 sm:grid-cols-2 md:gap-7">

        {/* data general */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold p-5 bg-slate-400 text-black">Datos generales</h3>
          </CardHeader>

          {/* category */}
          <CardContent>
            {
              product?.id
                ? <>
                  <FormField
                    control={form.control}
                    name='categoryId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría: {labels[categoryName as CategoryName]}</FormLabel>
                      </FormItem>
                    )}
                  />

                </>
                : <FormField
                  control={form.control}
                  name='categoryId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            setCategoryId(value)
                            field.onChange(value)
                          }} defaultValue={`${field.value}`}
                          disabled={isSubmitting || !!product?.id}
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {labels[field.value as CategoryName]}
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            }
          </CardContent>

          {/* title */}
          <CardContent>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder='Nombre del producto' {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          {/* slug */}
          <CardContent>
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (SEO)</FormLabel>
                  <FormControl>
                    <Input placeholder='Slug del producto' {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </CardContent>

          {/* description */}
          <CardContent>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Descripción del producto' {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          {/* price */}
          <CardContent>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='Precio del producto' {...field}
                      onChange={(e) => { field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value)) }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* stockDetails & images  */}
        <div className='flex flex-col gap-7 h-fit'>

          {/* stockDetails */}
          <StockDetails
            stockDetails={stockDetails} setStockDetails={setStockDetails}
          />

          {/* productImage */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold p-5 bg-slate-400 text-black">Imágenes</h3>
            </CardHeader>

            {/* productImage */}
            <CardContent>
              {
                images.length > 0 && (
                  <div className="grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-auto py-5">
                    {images.map((image, index) => (
                      <div
                        className='flex flex-col items-center justify-center gap-1 relative'
                        key={`${image.url} ${index}`}>
                        <ProductImage
                          src={image.url}
                          alt={product?.title ? product.title : 'Producto'}
                          width={200}
                          height={200}
                          className="rounded-t shadow-md"
                        />
                        <Button
                          disabled={isSubmitting}
                          size='icon'
                          variant='destructive'
                          className='absolute w-5 h-5 rounded-lg top-0 right-0 p-0'
                          onClick={() => { openConfirmDeleteImage(image.id, image.url) }}
                          type='button'
                        >
                          <IoCloseCircleOutline className='w-6 h-6' />
                        </Button>
                      </div>
                    ))}
                  </div>
                )
              }
              <CloudinaryButton images={images} setImages={setImages} />
            </CardContent>
          </Card>
        </div>

        {/* buttons */}
        <div className='flex justify-end gap-2 w-full'>
          <Button
            disabled={isSubmitting}
          >
            Guardar
          </Button>

          <Button
            type="button"
            disabled={isSubmitting}
            variant="destructive"
            onClick={() => { router.push('/admin/products') }}
          >
            Cancelar
          </Button>
        </div>
      </form >
    </Form >
  )
}
