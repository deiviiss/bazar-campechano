'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  name?: string
  className: string
  icon?: JSX.Element
}

export const ButtonScrollTop = ({ name, className, icon }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const fixedScrollThreshold = 2 // 2% scroll threshold

  const handleScroll = () => {
    // calculate the vertical scroll percentage
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    setIsVisible(scrolled > fixedScrollThreshold) // show the button if the percentage is greater than the fixed value
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll) // add the event listener for the scroll

    return () => {
      window.removeEventListener('scroll', handleScroll) // delete the event listener when the component is unmounted
    }
  }, [])

  return (
    <div className={`${isVisible ? 'fade-in pointer-events-auto' : 'opacity-0  pointer-events-none'}`}>
      <Button
        variant='outline'
        className={className}
        onClick={handleScrollToTop}
      >
        {icon && <span className="icon">{icon}</span>}
        {name && <span>{name}</span>}
      </Button>
    </div>
  )
}
