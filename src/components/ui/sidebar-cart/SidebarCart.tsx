'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { Title } from '@/components'
import { ProductsInCart, OrderSummary } from '@/components/cart'
import { Button } from '@/components/ui/button'
import { useCartStore, useUiStore } from '@/store'

export const SidebarCart = () => {
  const isSideCartOpen = useUiStore((state) => state.isSideCartOpen)
  const closeMenuCart = useUiStore((state) => state.closeSideCart)
  const pathname = usePathname()

  const totalItems = useCartStore((state) => state.getTotalItems())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div>
      {
        isSideCartOpen && (
          <>
            {/* background */}
            <div className='fixed top-0 left-0 w-screen h-screen z-30 bg-black opacity-30'>
            </div>
            {/* blur */}
            <div onClick={closeMenuCart} className='fade-in fixed top-0 left-0 w-screen h-screen z-30 backdrop-filter backdrop-blur-sm'>
            </div>
          </>
        )
      }

      <nav className={
        clsx(
          'fixed p-5 px-3 right-0 top-0 w-full md:w-[350px] h-screen bg-white z-40 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideCartOpen
          }
        )
      }>

        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenuCart}
        />

        <div className='mt-8 flex flex-col h-full'>

          <Title title='Carrito' subtitle="Tus compras en el carrito" />

          <div className='flex-1 overflow-y-auto overflow-x-hidden'>
            <ProductsInCart />
          </div>

          {
            loaded && totalItems > 0 && (
              <div className="mt-5 border-t border-gray-900 pt-5 pb-5">
                <OrderSummary />
                <div className="mt-5 mb-2 w-full">
                  {
                    pathname !== '/checkout/summary' && pathname !== '/checkout'
                      ? <Button
                        asChild
                        className='w-full'
                        disabled={!loaded}
                        onClick={closeMenuCart}
                      >
                        <Link
                          href="/checkout"
                        >
                          Comprar
                        </Link>
                      </Button>
                      : <Button
                        className='w-full'
                        disabled={!loaded}
                        onClick={closeMenuCart}
                      >
                        Comprar
                      </Button>
                  }
                </div>
              </div>
            )
          }
        </div>

      </nav>

    </div >
  )
}
