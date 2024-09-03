'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaStore } from 'react-icons/fa'
import { IoReloadCircleOutline } from 'react-icons/io5'
import { deleteUserAddress } from '@/actions'
import { Button } from '@/components/ui/button'
import { useAddressStore, useCartStore } from '@/store'

export const ButtonPickupPoint = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const [loaded, setLoaded] = useState(false)

  const clearAddress = useAddressStore((state) => state.clearAddress)
  const setPickupInStore = useCartStore((state) => state.setPickupInStore)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <Button
        disabled
        className="w-3/4"
      >
        <IoReloadCircleOutline className="mr-1 h-3.5 animate-spin" />
        Cargando...
      </Button>
    )
  }

  const ButtonResetAddress = () => {
    clearAddress()
    deleteUserAddress(userId)

    router.push('/checkout/way-to-pay?shipping-method=pickup')
  }

  return (
    <Button
      onClick={() => {
        ButtonResetAddress()
        setPickupInStore(true)
      }}
      className="w-3/4"
    >
      <FaStore className='mx-1 w-3.5 h-3.5' />
      Forma de pago
    </Button>
  )
}
