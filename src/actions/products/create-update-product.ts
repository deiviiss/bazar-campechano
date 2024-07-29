'use server'

import { Gender, type Size } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getSizesProductStock } from '@/actions'
import { type ProductWithStock, type Product } from '@/interfaces'
import prisma from '@/lib/prisma'

// TODO: Move config cloudinary to lib and chance for folder name
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

const sizes: [string, ...string[]] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(2))),
  size: z.enum(sizes),
  sizes: z.coerce
    .string()
    .transform(val => val.split(',')),
  slug: z.string().min(3).max(255),
  inStock: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  gender: z.nativeEnum(Gender)
})

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success) {
    return {
      ok: false,
      message: 'Error al crear el producto'
    }
  }

  const product = productParsed.data
  // config slug format
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()

  const { id, sizes, size, inStock, ...restProduct } = product
  // transaction for upload images, product
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Partial<Product>
      let productStock: Partial<ProductWithStock> | null = null

      if (id) {
        const sizes = await getSizesProductStock(id)
        const sizeExist = sizes.includes(size as Size)

        // create product stock if size from product not exist
        if (!sizeExist) {
          productStock = await tx.productStock.create({
            data: {
              productId: id,
              size: size as Size,
              inStock
            }
          })
        }

        if (sizeExist) {
          const productStockId = await getproductStockIdByProductIdSize(id, size as Size)

          productStock = await tx.productStock.update({
            where: {
              id: productStockId
            },
            data: {
              inStock
            }
          })
        }

        product = await tx.product.update({
          where: { id },
          data: {
            ...restProduct
          }
        })

        if (formData.getAll('images')) {
          const images = await uploadImages(formData.getAll('images') as File[])

          if (!images) {
            throw new Error('Error al subir las imagenes')
          }

          await prisma.productImage.createMany({
            data: images.map(image => ({
              productId: product.id ?? '',
              url: image ?? ''
            }))
          })
        }

        return { product, productStock }
      }

      if (!id) {
        product = await tx.product.create({
          data: {
            ...restProduct
          }
        })

        // create product stock for each size
        await tx.productStock.createMany({
          data: sizes.map(size => ({
            productId: product.id ?? '',
            size: size as Size,
            inStock
          }))
        })

        if (formData.getAll('images')) {
          const images = await uploadImages(formData.getAll('images') as File[])

          if (!images) {
            throw new Error('Error al subir las imagenes, rollingback transaction...')
          }

          await tx.productImage.createMany({
            data: images.map(image => ({
              productId: product.id ?? '',
              url: image ?? ''
            }))
          })
        }

        return { product }
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

const getproductStockIdByProductIdSize = async (productId: string, size: Size) => {
  const productStock = await prisma.productStock.findFirst({
    where: {
      productId,
      size
    }
  })

  if (!productStock) {
    throw new Error('Error al obtener el id del stock del producto')
  }

  return productStock.id
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPomises = images.map(async (image: File) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')

        return await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`).then(r => r.secure_url)
      } catch (error) {
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPomises)

    return uploadedImages
  } catch (error) {
    return null
  }
}
