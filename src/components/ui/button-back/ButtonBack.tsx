'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Props {
  name?: string
  className: string
  icon?: JSX.Element
}

export const ButtonBack = ({ name, className, icon }: Props) => {
  const router = useRouter()

  return (
    <Button
      variant='link'
      onClick={() => { router.back() }}
      className={className}
    >
      {icon}
      {name}
    </Button>
  )
}
