'use client'

import {
  PiCaretDoubleUpDuotone,
  PiCaretDoubleDownDuotone
} from 'react-icons/pi'
import { BarChart, Bar, ResponsiveContainer } from 'recharts'
import { Text } from 'rizzui'
import { MetricCard } from '@/components'
import { type DashboardStatsArray } from '@/interfaces'
import { cn } from '@/lib/utils'

interface IProps {
  className?: string
  dashboardStatData: DashboardStatsArray
}

export function StatCards({ className, dashboardStatData }: IProps) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9', className)}
    >
      {dashboardStatData.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={stat.title}
          metric={stat.metric}
          metricClassName="lg:text-[22px]"
          icon={stat.icon}
          iconClassName={cn(
            '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5',
            stat.id === '1' &&
            '[&>svg]:w-9 [&>svg]:h-7 lg:[&>svg]:w-[42px] lg:[&>svg]:h-[34px]',
            stat.style
          )}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart barSize={5} barGap={2} data={stat.chart}>
                <Bar dataKey="sale" fill={stat.fill} radius={5} />
              </BarChart>
            </ResponsiveContainer>
          }
          chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
          className="@container [&>div]:items-center"
        >
          <Text className="mt-5 flex items-center border-t border-dashed border-muted pt-4 leading-none text-gray-500">
            <Text
              as="span"
              className={cn(
                'me-2 inline-flex items-center font-medium',
                stat.increased ? 'text-green-600' : 'text-red-600'
              )}
            >
              {stat.increased
                ? (
                  <PiCaretDoubleUpDuotone className="me-1 h-4 w-4" />)
                : (
                  <PiCaretDoubleDownDuotone className="me-1 h-4 w-4" />)
              }
              {stat.percentage}%
            </Text>
            <Text as="span" className="me-1 hidden @[240px]:inline-flex">
              {stat.increased ? 'Incremento' : 'Disminución'}
            </Text>{' '}
            mes pasado
          </Text>
        </MetricCard>
      ))}
    </div>
  )
}
