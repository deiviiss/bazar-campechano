import { type ReactElement } from 'react'

// Define the type for the chart data
export interface ChartData {
  day: string
  sale: number
}

// Define the main type for the eComDashboardStatData
export interface DashboardStat {
  id: string
  icon: ReactElement // Type for a React component element
  title: string
  metric: string
  increased: boolean
  decreased: boolean
  percentage: number
  style: string
  fill: string
  chart: ChartData[] // Array of chart data objects
}

// Type for the overall eComDashboardStatData
export type DashboardStatsArray = DashboardStat[]
