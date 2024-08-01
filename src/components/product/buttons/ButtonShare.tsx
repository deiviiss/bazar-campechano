'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const noticeCopyLinkProduct = () => {
  toast('Link copiado al portapapeles', {
    position: 'top-right',
    duration: 2000
  })
}

interface Props {
  name?: string
  icon?: JSX.Element
  className?: string
}

export const ButtonShare = ({ className, icon, name }: Props) => {
  return (
    <Button
      variant='outline'
      className={className}
      onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        noticeCopyLinkProduct()
      }}
    >
      {icon}
      {name}
    </Button>
  )
}
