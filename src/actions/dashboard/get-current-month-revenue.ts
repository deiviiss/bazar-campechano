'use server'

import prisma from '@/lib/prisma'

export const getCurrentMonthRevenue = async () => {
  const currentDate = new Date()
  const startOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0)) // first day of the current month at 00:00:00
  const startOfNextMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, 1, 0, 0, 0)) // first day of the next month at 00:00:00

  const revenue = await prisma.order.groupBy({
    by: ['createdAt'],
    _sum: {
      total: true
    },
    where: {
      createdAt: {
        gte: startOfMonth,
        lt: startOfNextMonth
      },
      isPaid: true
    }
  })

  // transform the results to match the 'ChartData' interface
  const formattedSalesData = revenue.map(data => ({
    day: new Date(data.createdAt).toISOString().split('T')[0], // convert 'createdAt' to YYYY-MM-DD format
    sale: data._sum.total || 0 // extract the total sale for the day
  }))

  return formattedSalesData
}
