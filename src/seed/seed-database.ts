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
  await prisma.clotheStock.deleteMany()
  await prisma.shoeStock.deleteMany()
  await prisma.toyStock.deleteMany()
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

    if (type === 'clothes') {
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

      await prisma.clotheStock.create({
        data: productStockDataSizeXL
      })

      await prisma.clotheStock.create({
        data: productStockDataSizeL
      })

      await prisma.clotheStock.create({
        data: productStockDataSizeM
      })

      await prisma.clotheStock.create({
        data: productStockDataSizeS
      })

      await prisma.clotheStock.create({
        data: productStockDataSizeXs
      })
    }

    if (type === 'toys') {
      const productStockData = {
        productId: dbProduct.id,
        inStock: 1,
        ageRange: '3-5'
      }

      await prisma.toyStock.create({
        data: productStockData
      })
    }

    if (type === 'shoes') {
      const productStockDataSize25 = {
        productId: dbProduct.id,
        inStock: 1,
        size: 25
      }

      const productStockDataSize26 = {
        productId: dbProduct.id,
        inStock: 1,
        size: 26
      }

      const productStockDataSize27 = {
        productId: dbProduct.id,
        inStock: 1,
        size: 27
      }

      const productStockDataSize24 = {
        productId: dbProduct.id,
        inStock: 1,
        size: 24
      }

      const productStockDataSize23 = {
        productId: dbProduct.id,
        inStock: 1,
        size: 23
      }

      await prisma.shoeStock.create({
        data: productStockDataSize23
      })

      await prisma.shoeStock.create({
        data: productStockDataSize24
      })

      await prisma.shoeStock.create({
        data: productStockDataSize25
      })

      await prisma.shoeStock.create({
        data: productStockDataSize26
      })

      await prisma.shoeStock.create({
        data: productStockDataSize27
      })
    }
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
