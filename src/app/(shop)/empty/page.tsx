'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoCartOutline } from 'react-icons/io5'
import { useCartStore } from '@/store'

export default function EmptyPage() {
  const productsInCart = useCartStore(state => state.cart)

  if (productsInCart.length > 0) {
    redirect('/checkout')
  }

  return (
    <>
      <div className='flex justify-center items-center h-[400px] mt-[100.67px] sm:mt-[56.67px] pt-10' >
        <IoCartOutline size={90} className="mx-5" />

        <div>
          <h1>Tu carrito está vacío</h1>

          <Link href="/" className='text-black mt-2 text-4xl hover:text-black/80'>
            Comprar
          </Link>
        </div>
      </div>
    </>
  )
}
