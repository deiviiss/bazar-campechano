'use server'

import prisma from '@/lib/prisma'

export const getCurrentMonthSales = async () => {
  const currentDate = new Date()
  const startOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0)) // first day of the current month at 00:00:00
  const startOfNextMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, 1, 0, 0, 0)) // first day of the next month at 00:00:00

  // query to group orders by their creation date (day) and calculate the total sales
  const sales = await prisma.order.groupBy({
    by: ['createdAt'], // group by the 'createdAt' field to aggregate results per day
    _sum: {
      total: true // sum the 'total' field to compute daily sales
    },
    where: {
      createdAt: {
        gte: startOfMonth,
        lt: startOfNextMonth
      }
    }
  })

  // transform the results to match the 'ChartData' interface
  const formattedSalesData = sales.map(data => ({
    day: new Date(data.createdAt).toISOString().split('T')[0], // convert 'createdAt' to YYYY-MM-DD format
    sale: data._sum.total || 0 // extract the total sale for the day
  }))

  return formattedSalesData
}
