'use client'

import { useEffect, useState } from 'react'
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
  const [isVisible, setIsVisible] = useState(false)
  const fixedScrollThreshold = 2 // 2% scroll threshold

  const handleScroll = () => {
    // Calculate the vertical scroll percentage
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    setIsVisible(scrolled > fixedScrollThreshold) // Show the button if the percentage is greater than the fixed value
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll) // Add the event listener for scroll

    return () => {
      window.removeEventListener('scroll', handleScroll) // Remove the event listener when the component is unmounted
    }
  }, [])

  return (
    <>
      {isVisible && (
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
      )}
    </>
  )
}
