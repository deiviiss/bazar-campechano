import prisma from '../lib/prisma'

async function populateAttributes() {
  const categoryClotheIdDB = await prisma.category.findFirst({ where: { name: 'clothe' } })

  const categoryShoeIdDB = await prisma.category.findFirst({ where: { name: 'shoe' } })

  const categoryToyIdDB = await prisma.category.findFirst({ where: { name: 'toy' } })

  if (!categoryClotheIdDB || !categoryShoeIdDB || !categoryToyIdDB) throw new Error('Category not found')

  const categoryClotheId = categoryClotheIdDB?.id
  const categoryShoeId = categoryShoeIdDB?.id
  const categoryToyId = categoryToyIdDB?.id

  const attributes = [
    {
      name: 'size',
      inputType: 'string',
      categoryId: categoryClotheId,
      valueOptions: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'size',
      inputType: 'number',
      categoryId: categoryShoeId,
      valueOptions: ['23', '24', '25', '26', '27']
    },
    {
      name: 'ageRange',
      inputType: 'string',
      categoryId: categoryToyId,
      valueOptions: ['3 - 5', '6 - 8', '9 - 12']
    }
  ]

  try {
    for (const attr of attributes) {
      // Create the attribute
      const attribute = await prisma.attribute.create({
        data: {
          name: attr.name,
          inputType: attr.inputType,
          categoryId: attr.categoryId
        }
      })

      // Create the value options
      await prisma.attributeValueOption.createMany({
        data: attr.valueOptions.map((value) => ({
          value,
          attributeId: attribute.id
        }))
      })
    }

    // eslint-disable-next-line no-console
    console.log('Attributes and value options populated successfully.')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error populating attributes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  populateAttributes()
    .catch(e => {
      // eslint-disable-next-line no-console
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
})()
