import prisma from '../lib/prisma'

async function migrateStock() {
  try {
    // Migrate ClotheStock data
    const clothesStock = await prisma.clotheStock.findMany()
    for (const stock of clothesStock) {
      const valueOption = await prisma.attributeValueOption.findFirst({
        where: {
          value: stock.clotheSize,
          attribute: { name: 'size', inputType: 'string' }
        }
      })

      if (valueOption) {
        await prisma.productAttributeValue.create({
          data: {
            productId: stock.productId,
            attributeId: valueOption.attributeId,
            valueOptionId: valueOption.id,
            inStock: stock.inStock
          }
        })
      }
    }

    // Migrate ShoeStock data
    const shoesStock = await prisma.shoeStock.findMany()
    for (const stock of shoesStock) {
      const valueOption = await prisma.attributeValueOption.findFirst({
        where: {
          value: stock.shoeSize.toString(),
          attribute: { name: 'size', inputType: 'number' }
        }
      })

      if (valueOption) {
        await prisma.productAttributeValue.create({
          data: {
            productId: stock.productId,
            attributeId: valueOption.attributeId,
            valueOptionId: valueOption.id,
            inStock: stock.inStock
          }
        })
      }
    }

    // Migrate ToyStock data
    const toysStock = await prisma.toyStock.findMany()
    for (const stock of toysStock) {
      const valueOption = await prisma.attributeValueOption.findFirst({
        where: {
          value: stock.ageRange,
          attribute: { name: 'ageRange' }
        }
      })
      if (valueOption) {
        await prisma.productAttributeValue.create({
          data: {
            productId: stock.productId,
            attributeId: valueOption.attributeId,
            valueOptionId: valueOption.id,
            inStock: stock.inStock
          }
        })
      }
    }

    // eslint-disable-next-line no-console
    console.log('Stock migrated successfully.')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error migrating stock:', error)
  } finally {
    await prisma.$disconnect()
  }
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  migrateStock()
    .catch(e => {
      // eslint-disable-next-line no-console
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
})()
