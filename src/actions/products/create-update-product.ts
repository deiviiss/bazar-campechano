'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'

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
  stockDetails: z.array(
    z.object({
      id: z.string().uuid(),
      attribute: z.object({
        id: z.string().uuid(),
        name: z.string()
      }),
      valueOption: z.object({
        id: z.string().uuid(),
        value: z.string()
      }),
      inStock: z.number().min(0, { message: 'El stock debe ser mayor o igual a 0.' })
    })
  ),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string()
    }))
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

  const { id, stockDetails, images, ...restProduct } = productData

  // transaction for upload images, product
  try {
    const prismaTx = await prisma.$transaction(async(tx) => {
      // Update product
      if (id) {
        const product = await tx.product.update({
          where: { id },
          data: {
            ...restProduct,
            productAttributeValue: {
              deleteMany: {}, // Delete all existing attribute-value combinations
              createMany: {
                data: stockDetails.map((stock) => ({
                  attributeId: stock.attribute.id,
                  valueOptionId: stock.valueOption.id,
                  inStock: stock.inStock
                }))
              }
            },
            productImage: {
              deleteMany: {}, // Delete all existing images
              createMany: {
                data: images.map((img) => ({ url: img.url }))
              }
            }
          }
        })

        return {
          ok: true,
          message: 'Product updated successfully',
          product
        }
      }

      // Create product
      const product = await tx.product.create({
        data: {
          ...restProduct,
          productAttributeValue: {
            createMany: {
              data: stockDetails.map((stock) => ({
                attributeId: stock.attribute.id,
                valueOptionId: stock.valueOption.id,
                inStock: stock.inStock
              }))
            }
          },
          productImage: {
            createMany: {
              data: images.map((img) => ({ url: img.url }))
            }
          }
        }
      })

      return {
        ok: true,
        message: 'Product created successfully',
        product
      }
    })

    // revalidate paths in all routes where product name exist
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${prismaTx?.product.slug}`)
    revalidatePath(`/products/${prismaTx?.product.slug}`)

    return {
      ok: true,
      product: restProduct
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al crear/actualizar el producto'
    }
  }
}
