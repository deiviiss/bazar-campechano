import { initialData } from './seed'
import { countries } from './seed-countries'
import { type ClotheSize } from '../interfaces'
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
      url: `file-system/${image}`,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })

    if (type === 'clothe') {
      const productStockDataSizeXs = {
        productId: dbProduct.id,
        inStock: 1,
        clotheSize: 'XS' as ClotheSize
      }

      const productStockDataSizeS = {
        productId: dbProduct.id,
        inStock: 1,
        clotheSize: 'S' as ClotheSize
      }

      const productStockDataSizeM = {
        productId: dbProduct.id,
        inStock: 1,
        clotheSize: 'M' as ClotheSize
      }

      const productStockDataSizeL = {
        productId: dbProduct.id,
        inStock: 1,
        clotheSize: 'L' as ClotheSize
      }

      const productStockDataSizeXL = {
        productId: dbProduct.id,
        inStock: 1,
        clotheSize: 'XL' as ClotheSize
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

    if (type === 'toy') {
      const productStockData = {
        productId: dbProduct.id,
        inStock: 1,
        ageRange: '3 - 5'
      }

      await prisma.toyStock.create({
        data: productStockData
      })
    }

    if (type === 'shoe') {
      const productStockDataSize25 = {
        productId: dbProduct.id,
        inStock: 1,
        shoeSize: 25
      }

      const productStockDataSize26 = {
        productId: dbProduct.id,
        inStock: 1,
        shoeSize: 26
      }

      const productStockDataSize27 = {
        productId: dbProduct.id,
        inStock: 1,
        shoeSize: 27
      }

      const productStockDataSize24 = {
        productId: dbProduct.id,
        inStock: 1,
        shoeSize: 24
      }

      const productStockDataSize23 = {
        productId: dbProduct.id,
        inStock: 1,
        shoeSize: 23
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
