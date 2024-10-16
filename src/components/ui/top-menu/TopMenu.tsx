'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { titleFont } from '@/config/fonts'
import { useCartStore, useUiStore } from '@/store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className="fixed top-0 z-20 flex px-5 md:px-10 lg:px-20 justify-between items-center w-full border-b-[1px] border-black bg-white">
      {/* logo */}
      <div>
        <Link href={'/'}>
          <span
            className={`${titleFont.className} antialiased font-bold text-xl`}
          >
            Bazar Campechano
          </span>
        </Link>
      </div>

      {/* center menu */}
      <div className="flex justify-center w-full sm:w-auto bg-white absolute sm:static top-[60.67px] left-0 border-b-[1px] sm:border-b-0 border-black">
        <Link
          href={'/category/clothe'}
          className={`${titleFont.className} mx-2 sm:m-2 p-2 text-lg transition-all hover:bg-black hover:text-white`}
        >
          Ropa
        </Link>
        <Link
          href={'/category/shoe'}
          className={`${titleFont.className} mx-2 sm:m-2 p-2 text-lg transition-all hover:bg-black hover:text-white`}
        >
          Zapatos
        </Link>
        <Link
          href={'/category/toy'}
          className={`${titleFont.className} mx-2 sm:m-2 p-2 text-lg transition-all hover:bg-black hover:text-white`}
        >
          Juguetes
        </Link>
        <Link
          href={'/products?autofocus=true'}
          className={`${titleFont.className} mx-2 sm:m-2 p-2 text-lg transition-all flex items-center gap-2 hover:bg-black hover:text-white`}
        >
          <IoSearchOutline className="w-5 h-5" />
          Buscar
        </Link>
      </div>

      {/* cart menu */}
      <div className="flex items-center w-auto">
        <Link
          href={totalItems === 0 && loaded ? '/empty' : '/cart'}
          className="mx-2"
        >
          <div className="relative">
            {loaded && totalItems > 0 && (
              <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-black text-white fade-in">
                {totalItems}
              </span>
            )}
            <IoCartOutline className="w-5 h-5"></IoCartOutline>
          </div>
        </Link>

        <button
          type="button"
          onClick={openMenu}
          className={`${titleFont.className} m-2 p-2 rounded-none text-lg transition-all  hover:bg-black hover:text-white`}
        >
          Menú
        </button>
      </div>

    </nav>
  )
}
