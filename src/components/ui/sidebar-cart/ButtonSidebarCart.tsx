'use client'

import { useEffect, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { useCartStore, useUiStore } from '@/store'

export const ButtonSidebarCart = ({ name }: { name?: string }) => {
  const openCart = useUiStore((state) => state.openSideCart)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])
  return (
    <>
      {!name
        ? <Button
          type='button'
          className="mx-2 hover:bg-primary hover:text-white group pt-3 pl-2"
          variant={'ghost'}
          onClick={openCart}
        >
          <div className="relative">
            {loaded && totalItems > 0 && (
              <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-primary text-white group-hover:bg-white group-hover:text-primary fade-in">
                {totalItems}
              </span>
            )}
            <IoCartOutline className="w-5 h-5"></IoCartOutline>
          </div>
        </Button>
        : <div>
          <Button
            type='button'
            variant={'ghost'}
            className="underline mb-5 text-base hover:bg-white px-0"
            onClick={openCart}
          >
            {name}
          </Button>
        </div>
      }

    </>
  )
}
