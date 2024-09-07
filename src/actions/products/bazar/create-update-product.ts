'use server'

import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getSizesProductClotheStock } from './get-sizes-product-clothe-stock'
import { getSizesProductShoeStock, getToyAgeRangeAndStock, updateStockByAgeRangeAndProductId, updateStockBySizeAndProductId } from '@/actions'
import { type StockBase, type ClotheStockDetail, type ProductCreateUpdate, type ShoeStockDetail, type ToyStockDetail } from '@/interfaces'
import prisma from '@/lib/prisma'
import { isStockClothe, isStockShoe, isStockToy } from '@/utils/stockTypeGuards'

// TODO: Move config cloudinary to lib and chance for folder name
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

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
      message: 'La descripción debe tener al menos 10 caracteres.'
    })
    .max(350, {
      message: 'La descripción debe tener máximo 200 caracteres.'
    }),
  history: z.string().optional(),
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
  price: z.coerce
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
  categoryId: z.string().uuid(),
  categoryName: z.string({
    message: 'La categoría es requerida.'
  }),
  stockDetails: z.array(
    z.object({
      clotheSize: z.string().optional(), // products with sizes
      shoeSize: z.number().optional(), // products with sizes
      ageRange: z.string().optional(), // products with age range
      inStock: z.number().min(0, { message: 'El stock debe ser mayor o igual a 0.' })
    })
  ),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string()
    })).optional()
}).strict()

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const parsedStockDetails = JSON.parse(formData.get('stockDetails') as string)
  const parsedImages = JSON.parse(formData.get('images') as string)

  const dataToValidate = {
    ...data,
    stockDetails: parsedStockDetails,
    images: parsedImages
  }

  const productParsed = productSchema.safeParse(dataToValidate)

  if (!productParsed.success) {
    return {
      ok: false,
      message: 'Error al crear el producto'
    }
  }

  const productData = productParsed.data

  // config slug format
  productData.slug = productData.slug.toLowerCase().replace(/ /g, '-').trim()

  const { id, stockDetails, images, categoryName, ...restProduct } = productData

  // transaction for upload images, product
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: ProductCreateUpdate

      if (id) {
        product = await tx.product.update({
          where: { id },
          data: {
            ...restProduct
          }
        })

        // update stock details
        if (categoryName === 'clothe') {
          // get current stock details
          const dbStockDetails = await getSizesProductClotheStock({ id })
          const clientStockDetails = stockDetails as ClotheStockDetail[]

          const updatedStockDetails = prepareStockUpdates(dbStockDetails, clientStockDetails)

          await applyStockUpdates(updatedStockDetails, id)
        }

        if (categoryName === 'shoe') {
          // get current stock details
          const dbStockDetails = await getSizesProductShoeStock({ id })
          const clientStockDetails = stockDetails as ShoeStockDetail[]

          const updatedStockDetails = prepareStockUpdates(dbStockDetails, clientStockDetails)

          await applyStockUpdates(updatedStockDetails, id)
        }

        if (categoryName === 'toy') {
          // get current stock details
          const dbStockDetails = await getToyAgeRangeAndStock({ id })
          const clientStockDetails = stockDetails as ToyStockDetail[]

          const updatedStockDetails = prepareStockUpdates(dbStockDetails, clientStockDetails)

          await applyStockUpdates(updatedStockDetails, id)
        }

        // update images
        if (images && images.length > 0) {
          await tx.productImage.deleteMany({
            where: {
              productId: product.id
            }
          })

          const uploadImages = images.map(image => ({
            productId: product.id ?? '',
            url: image.url ?? ''
          }))

          await prisma.productImage.createMany({
            data: uploadImages
          })
        }

        return { product, stockDetails, images }
      }

      if (!id) {
        product = await tx.product.create({
          data: {
            title: restProduct.title,
            description: restProduct.description ?? 'just a description',
            history: restProduct.history ?? 'just a history',
            price: restProduct.price,
            slug: restProduct.slug,
            categoryId: restProduct.categoryId
          }
        })

        // create stock details
        if (categoryName === 'clothe') {
          const clothedStockDetails = stockDetails as ClotheStockDetail[]

          await tx.clotheStock.createMany({
            data: clothedStockDetails.map((stockDetail) => ({
              productId: product.id ?? '',
              clotheSize: stockDetail.clotheSize,
              inStock: stockDetail.inStock
            }))
          })
        }

        if (categoryName === 'shoe') {
          const shoeStockDetails = stockDetails as ShoeStockDetail[]

          await tx.shoeStock.createMany({
            data: shoeStockDetails.map((stockDetail) => ({
              productId: product.id ?? '',
              shoeSize: stockDetail.shoeSize,
              inStock: stockDetail.inStock
            }))
          })
        }

        if (categoryName === 'toy') {
          const toyStockDetails = stockDetails as ToyStockDetail[]

          await tx.toyStock.createMany({
            data: toyStockDetails.map((stockDetail: any) => ({
              productId: product.id ?? '',
              ageRange: stockDetail.ageRange,
              inStock: stockDetail.inStock
            }))
          })
        }

        // create images
        if (images && images.length > 0) {
          const uploadImages = images.map(image => ({
            productId: product.id ?? '',
            url: image.url ?? ''
          }))

          await tx.productImage.createMany({
            data: uploadImages
          })
        }

        return { product, stockDetails, images }
      }
    })

    // revalidate paths in all routes where product name exist
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${prismaTx?.product.slug}`)
    revalidatePath(`/products/${prismaTx?.product.slug}`)

    return {
      ok: true,
      product: prismaTx?.product
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al crear/actualizar el producto'
    }
  }
}

const prepareStockUpdates = <T extends StockBase>(stock: T[], updates: T[]): T[] => {
  return stock.map(item => {
    const update = updates.find(u => {
      if (isStockClothe(item) && isStockClothe(u) && u.clotheSize === item.clotheSize) {
        return true
      }
      if (isStockShoe(item) && isStockShoe(u) && u.shoeSize === item.shoeSize) {
        return true
      }
      if (isStockToy(item) && isStockToy(u) && u.ageRange === item.ageRange) {
        return true
      }

      return false
    })

    return update ? { ...item, ...update } : item
  })
}

const applyStockUpdates = async <T extends StockBase>(updates: T[], id: string): Promise<void> => {
  // prepare promises for each update
  const updatePromises = updates.map(async update => {
    if (isStockClothe(update)) {
      return await updateStockBySizeAndProductId({ id, size: update.clotheSize, inStock: update.inStock })
    }

    if (isStockShoe(update)) {
      return await updateStockBySizeAndProductId({ id, size: update.shoeSize, inStock: update.inStock })
    }

    if (isStockToy(update)) {
      return await updateStockByAgeRangeAndProductId({ id, ageRange: update.ageRange, inStock: update.inStock })
    }

    // add more stock types if needed

    // return a empty promise in case no condition is met
    await Promise.resolve()
  })

  // execute all updates concurrently
  await Promise.all(updatePromises)
}
