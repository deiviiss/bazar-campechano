import { initialData } from './seed'
import { countries } from './seed-countries'
import prisma from '../lib/prisma'

const main = async () => {
  // delete all data
  await prisma.orderItem.deleteMany()
  await prisma.orderAddress.deleteMany()
  await prisma.order.deleteMany()

  await prisma.userAddress.deleteMany()
  await prisma.country.deleteMany()
  await prisma.productStock.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // seed categories
  const { categories, products, users } = initialData

  // users
  await prisma.user.createMany({
    data: users
  })

  const categoriesData = categories.map((category) => ({
    name: category
  }))

  await prisma.category.createMany({
    data: categoriesData
  })

  // format categories
  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce<Record<string, string>>((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map
  }, {})

  // products
  products.forEach(async (product) => {
    const { type, images, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })

    const productStockDataSizeXs = {
      productId: dbProduct.id,
      inStock: 1,
      size: 'XS' as 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
    }

    const productStockDataSizeS = {
      productId: dbProduct.id,
      inStock: 1,
      size: 'S' as 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
    }

    const productStockDataSizeM = {
      productId: dbProduct.id,
      inStock: 1,
      size: 'M' as 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
    }

    const productStockDataSizeL = {
      productId: dbProduct.id,
      inStock: 1,
      size: 'L' as 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
    }

    const productStockDataSizeXL = {
      productId: dbProduct.id,
      inStock: 1,
      size: 'XL' as 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
    }

    await prisma.productStock.create({
      data: productStockDataSizeXL
    })

    await prisma.productStock.create({
      data: productStockDataSizeL
    })

    await prisma.productStock.create({
      data: productStockDataSizeM
    })

    await prisma.productStock.create({
      data: productStockDataSizeS
    })

    await prisma.productStock.create({
      data: productStockDataSizeXs
    })
  }
  )

  // countries
  await prisma.country.createMany({
    data: countries
  })

  // eslint-disable-next-line no-console
  console.log('Seed executed successfully')
}

(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
}
)()
