'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
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
      id: z.string().uuid().optional().nullable(),
      attributeId: z.string().uuid({ message: 'El ID del atributo es requerido.' }),
      valueOptionId: z.string().uuid({ message: 'El ID de la opción de valor es requerido.' }),
      attribute: z
        .object({
          name: z.string()
        })
        .optional(),
      valueOption: z
        .object({
          value: z.string()
        })
        .optional(),
      inStock: z.number().min(0, { message: 'El stock debe ser mayor o igual a 0.' })
    })
  ),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string()
    })),
  userId: z.string().uuid()
}).strict()

const messages = {
  productCreateSuccess: 'Product created successfully',
  productUpdateSuccess: 'Product updated successfully',
  productError: 'Error al crear/actualizar el producto'
}

export const createUpdateProduct = async (formData: FormData) => {
  const user = await getUserSessionServer()

  // Check if the userId arrived in the form or we take it from the session
  const userIdFromForm = formData.get('userId')
  const userIdFromSession = user ? user.id : null

  const userIdValidate = userIdFromForm || userIdFromSession

  // If there is no userId, return an error
  if (!userIdValidate) {
    return {
      ok: false,
      message: 'No se pudo obtener la información del usuario'
    }
  }

  const parsedStockDetails = JSON.parse(formData.get('stockDetails') as string)
  const parsedImages = JSON.parse(formData.get('images') as string)

  const data = Object.fromEntries(formData)
  const dataToValidate = {
    ...data,
    stockDetails: parsedStockDetails,
    images: parsedImages,
    userId: userIdValidate
  }

  const productParsed = productSchema.safeParse(dataToValidate)

  if (!productParsed.success) {
    return {
      ok: false,
      message: messages.productError,
      errors: productParsed.error.format()
    }
  }

  const productData = productParsed.data

  // config slug format
  productData.slug = productData.slug.toLowerCase().replace(/ /g, '-').trim()

  const { id, stockDetails, images, userId, ...restProduct } = productData

  const validStockDetails = stockDetails.filter(
    (stock) => stock.inStock > 0 || stock.id
  )

  // transaction for upload images, product
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // Update product
      if (id) {
        const product = await tx.product.update({
          where: { id },
          data: {
            ...restProduct,
            userId,
            productImage: {
              deleteMany: {}, // Delete all existing images
              createMany: {
                data: images.map((image) => ({ url: image.url }))
              }
            }
          }
        })

        // Upsert stock details: update if exists, create if not
        await Promise.all(validStockDetails.map(async (stock) =>
          await tx.productAttributeValue.upsert({
            where: {
              productId_attributeId_valueOptionId: {
                attributeId: stock.attributeId,
                valueOptionId: stock.valueOptionId,
                productId: id
              }
            },
            update: {
              inStock: stock.inStock
            },
            create: {
              productId: id,
              attributeId: stock.attributeId,
              valueOptionId: stock.valueOptionId,
              inStock: stock.inStock
            }
          })
        ))

        return {
          ok: true,
          message: messages.productUpdateSuccess,
          product
        }
      }

      const product = await tx.product.create({
        data: {
          ...restProduct,
          userId,
          productImage: {
            createMany: {
              data: images.map((image) => ({ url: image.url }))
            }
          },
          isActive: false,
          productAttributeValue: {
            createMany: {
              data: validStockDetails.map((stock) => ({
                attributeId: stock.attributeId,
                valueOptionId: stock.valueOptionId,
                inStock: stock.inStock
              }))
            }
          }

        }
      })

      return {
        ok: true,
        message: messages.productUpdateSuccess,
        product
      }
    })

    // revalidate paths in all routes where product name exist
    if (id) {
      revalidatePath(`/admin/product/${prismaTx?.product.slug}`)
      revalidatePath(`/products/${prismaTx?.product.slug}`)
    }

    revalidatePath('/admin/products')

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
