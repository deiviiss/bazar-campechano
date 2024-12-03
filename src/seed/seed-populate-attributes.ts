import prisma from '../lib/prisma'

async function populateAttributes() {
  //! Change categoryId to the correct one
  const attributes = [
    {
      name: 'size',
      inputType: 'string',
      categoryId: '18b7d3ed-fd5b-488f-8a9f-d76a5247e169', // category ID for Clothe
      valueOptions: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'size',
      inputType: 'number',
      categoryId: '68a988e2-4648-432b-9735-f539d382d9d3', // category ID for Shoes
      valueOptions: ['23', '24', '25', '26', '27']
    },
    {
      name: 'ageRange',
      inputType: 'string',
      categoryId: '3965f654-e0ec-4c00-a9f2-e91177ddc6bf', // category ID for Toys
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
