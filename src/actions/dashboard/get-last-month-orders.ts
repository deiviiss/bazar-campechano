'use server'

import prisma from '@/lib/prisma'

export const getLastMonthOrders = async () => {
  const currentDate = new Date()
  const startOfLastMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() - 1, 1, 0, 0, 0))
  // first day of the last month at 00:00:00

  const startOfCurrentMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0))
  // first day of the current month at 00:00:00

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startOfLastMonth, // from the start of the current month
        lt: startOfCurrentMonth // to the start of the next month
      }
    }
  })

  const totalOrdersCount = orders.length

  // group orders by day and calculate total sales
  const groupedData = orders.reduce<Array<{ day: string, sale: number }>>((acc, order) => {
    const day = order.createdAt.toISOString().split('T')[0] // convert date to 'YYYY-MM-DD' format
    const totalSale = order.total // use the 'total' field from the order

    // check if there's already an entry for this day
    const existingEntryDay = acc.find(data => data.day === day)

    if (!existingEntryDay) {
      // if no entry exists, create a new entry
      acc.push({
        day,
        sale: totalSale
      })
      return acc
    }
    // if an entry exists, add the total sale to it
    existingEntryDay.sale += totalSale

    return acc
  }, [])

  return { groupedData, totalOrdersCount }
}
