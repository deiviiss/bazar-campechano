'use client'

import { useSearchParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

interface Props {
  methodName: string
  methodValue: string
  icon: React.ReactNode
  isDisabled?: boolean
}

export const ButtonMethodPay = ({ methodName, icon, methodValue, isDisabled }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const shippingMethod = params.get('shipping-method') || ''

  const handledClickMethodPay = () => {
    router.push(`/checkout?shipping-method=${shippingMethod}&payment-method=${methodValue}`)
  }

  return (
    <Button
      disabled={isDisabled}
      onClick={handledClickMethodPay}
      variant='primary'
      className="w-full gap-1"
    >
      {icon}
      {methodName}
    </Button>
  )
}
