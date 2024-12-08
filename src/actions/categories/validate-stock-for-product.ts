'use server'

import prisma from '@/lib/prisma'

export const validateStockForProduct = async (product: any) => {
  const stock = await prisma.productAttributeValue.findFirst({
    where: {
      productId: product.productId,
      attributeId: product.attributeId,
      valueOptionId: product.valueOptionId
    }
  })

  if (!stock) {
    throw new Error(
      `No se encontró stock para el producto con ID ${product.productId} y la combinación de atributos proporcionada.`
    )
  }

  if (stock.inStock < product.quantity) {
    throw new Error(
      `El producto con ID ${product.productId} no tiene suficiente stock. Disponible: ${stock.inStock}, requerido: ${product.quantity}.`
    )
  }

  return stock
}
