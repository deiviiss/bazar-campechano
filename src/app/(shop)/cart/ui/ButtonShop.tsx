'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export const ButtonShop = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <Button
        disabled={true}
        className='w-full animate-pulse'
      >
        Cargando
      </Button>
    )
  }

  return (
    <Button
      asChild
      className='w-full'
      disabled={!loaded}
    >
      <Link
        href="/checkout/shipping-method"
      >
        Comprar
      </Link>
    </Button>
  )
}
