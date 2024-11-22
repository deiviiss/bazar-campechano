import prisma from '../lib/prisma'

async function populateAttributes() {
  //! Change categoryId to the correct one
  const attributes = [
    {
      name: 'size',
      inputType: 'string',
      categoryId: 'c7e59d16-b1e5-4123-b163-a4f4b0ac9a6a', // category ID for Clothing
      valueOptions: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'size',
      inputType: 'number',
      categoryId: 'bd9e46a8-da3e-4444-a708-508efa9724f0', // category ID for Shoes
      valueOptions: ['23', '24', '25', '26', '27']
    },
    {
      name: 'ageRange',
      inputType: 'string',
      categoryId: 'cfe6dff2-e260-4a06-94b9-dd9c740fb0ba', // category ID for Toys
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
