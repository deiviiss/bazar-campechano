import prisma from '../lib/prisma'

async function migrateStock() {
  try {
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
