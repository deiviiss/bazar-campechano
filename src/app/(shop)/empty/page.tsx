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
      <div className='flex justify-center items-center h-[400px] mt-[157.67px] min-[487px]:mt-[141.67px] sm:mt-[100.67px] pt-10' >
        <IoCartOutline size={90} className="mx-5" />

        <div>
          <h1>Tu carrito está vacío</h1>

          <Link href="/" className='text-primary mt-2 text-4xl hover:text-primary/80'>
            Comprar
          </Link>
        </div>
      </div>
    </>
  )
}
