'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { titleFont } from '@/config/fonts'
import { useCartStore, useUiStore } from '@/store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)
  const totalItems = useCartStore(state => state.getTotalItems()
  )
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className="fixed top-0 z-20 flex px-5 md:px-10 lg:px-20 justify-between items-center w-full shadow-md bg-white">
      {/* logo */}
      <div>
        <Link href={'/'}>
          <span className={`${titleFont.className} antialiased font-bold`}>Bazar Campechano</span>
        </Link>
      </div>

      {/* center menu */}
      <div className='hidden sm:block'>
        <Link href={'/gender/men'} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Hombres</Link>
        <Link href={'/gender/women'} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Mujeres</Link>
        <Link href={'/gender/kid'} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Niños</Link>
      </div>

      {/* search cart menu */}
      <div className='flex items-center'>
        <Link href={
          ((totalItems === 0) && loaded)
            ? '/empty'
            : '/cart'
        } className='mx-2'>
          <div className='relative'>
            {
              (loaded && totalItems > 0) && (
                <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white fade-in'>{totalItems}</span>
              )
            }
            <IoCartOutline className='w-5 h-5'></IoCartOutline>
          </div>
        </Link>

        <button type='button' onClick={openMenu} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Menú</button>
      </div>
    </nav>
  )
}
