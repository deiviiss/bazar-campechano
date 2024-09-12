import Image from 'next/image'
import Link from 'next/link'
import { PiBankDuotone, PiChartPieSliceDuotone, PiGiftDuotone, PiPlusBold } from 'react-icons/pi'
import welcomeImg from '../../../../public/imgs/shop-illustration.png'
import { getCurrentMonthOrders, getLastMonthOrders, getCurrentMonthSales, getLastMonthSales, getLastMonthRevenue, getCurrentMonthRevenue } from '@/actions/dashboard'
import WelcomeBanner from '@/components/banners/welcome'
import { StatCards } from '@/components/dashboard'
import HandWaveIcon from '@/components/icons/hand-wave'
import { Button } from '@/components/ui/button'
import { type DashboardStatsArray } from '@/interfaces'

export default async function AdminPage() {
  // orders
  const { totalOrdersCount: totalCurrentOrdersCount, groupedData: currentMonthOrdersData } = await getCurrentMonthOrders()
  const { totalOrdersCount: totalLastOrdersCount } = await getLastMonthOrders()

  // calculate increment/decrement percentage
  const ordersIncreased = totalCurrentOrdersCount > totalLastOrdersCount
  const ordersDecreased = totalCurrentOrdersCount < totalLastOrdersCount
  const ordersPercentage = totalLastOrdersCount === 0
    ? (totalCurrentOrdersCount > 0 ? 100 : 0) // if there are no orders last month and there are orders this month, it's 100%. If there are no orders in both, it's 0%.
    : ((totalCurrentOrdersCount - totalLastOrdersCount) / totalLastOrdersCount) * 100 // difference percentage between current and last month orders

  // sales
  const currentMonthSalesData = await getCurrentMonthSales()
  const totalCurrentSales = currentMonthSalesData.reduce((acc, curr) => acc + curr.sale, 0)
  const lastMonthSalesData = await getLastMonthSales()
  const totalLastSales = lastMonthSalesData.reduce((acc, curr) => acc + curr.sale, 0)

  // calculate increment/decrement percentage
  const salesIncreased = totalCurrentSales > totalLastSales
  const salesDecreased = totalCurrentSales < totalLastSales
  const salesPercentage = totalLastSales === 0
    ? (totalCurrentSales > 0 ? 100 : 0) // if there are no sales last month and there are sales this month, it's 100%. If there are no sales in both, it's 0%.
    : ((totalCurrentSales - totalLastSales) / totalLastSales) * 100 // difference percentage between current and last month sales

  // revenue
  const currentMonthRevenueData = await getCurrentMonthRevenue()
  const totalCurrentRevenue = currentMonthRevenueData.reduce((acc, curr) => acc + curr.sale, 0)
  const lastMonthRevenueData = await getLastMonthRevenue()
  const totalLastRevenue = lastMonthRevenueData.reduce((acc, curr) => acc + curr.sale, 0)

  // calculate increment/decrement percentage
  const revenueIncreased = totalCurrentRevenue > totalLastRevenue
  const revenueDecreased = totalCurrentRevenue < totalLastRevenue
  const revenuePercentage = totalLastRevenue === 0
    ? (totalCurrentRevenue > 0 ? 100 : 0) // if there are no revenue last month and there are revenue this month, it's 100%. If there are no revenue in both, it's 0%.
    : ((totalCurrentRevenue - totalLastRevenue) / totalLastRevenue) * 100 // difference percentage between current and last month revenue

  const eComDashboardStatData: DashboardStatsArray = [
    {
      id: '1',
      icon: <PiGiftDuotone className="h-6 w-6" />,
      title: 'Nuevos pedidos',
      metric: `${totalCurrentOrdersCount}`,
      increased: ordersIncreased,
      decreased: ordersDecreased,
      percentage: Number(ordersPercentage.toFixed(2)),
      style: 'text-[#3872FA]',
      fill: '#3872FA',
      chart: currentMonthOrdersData
    },
    {
      id: '2',
      icon: <PiChartPieSliceDuotone className="h-6 w-6" />,
      title: 'Ventas',
      metric: `$${totalCurrentSales}`,
      increased: salesIncreased,
      decreased: salesDecreased,
      percentage: Number(salesPercentage.toFixed(2)),
      style: 'text-[#10b981]',
      fill: '#10b981',
      chart: currentMonthSalesData
    },
    {
      id: '3',
      icon: <PiBankDuotone className="h-6 w-6" />,
      title: 'Ingresos',
      metric: `$${totalCurrentRevenue}`,
      increased: revenueIncreased,
      decreased: revenueDecreased,
      percentage: Number(revenuePercentage.toFixed(2)),
      style: 'text-[#7928ca]',
      fill: '#7928ca',
      chart: currentMonthRevenueData
    }
  ]

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-8 3xl:gap-8">
        <WelcomeBanner
          title={
            <>
              Buen día, <br /> David{' '}
              <HandWaveIcon className="inline-flex h-8 w-8" />
            </>
          }
          description={
            'Esto es lo que está sucediendo en tu tienda hoy. Consulta las estadísticas de inmediato.'
          }
          media={
            <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
              <div className="relative">
                <Image
                  src={welcomeImg}
                  alt="Welcome shop image form freepik"
                  className="dark:brightness-95 dark:drop-shadow-md"
                />
              </div>
            </div>
          }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-muted bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-8 lg:pb-9 dark:bg-gray-100/30"
        >
          <Button asChild className="h-[38px] shadow md:h-10">
            <Link href='/admin/product/create' className="inline-flex">
              <PiPlusBold className="me-1 h-4 w-4" /> Agregar producto
            </Link>
          </Button>
        </WelcomeBanner>

        <StatCards className="@2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8" dashboardStatData={eComDashboardStatData} />

      </div>
    </div>
  )
}
