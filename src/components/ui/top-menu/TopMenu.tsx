'use client'

import Link from 'next/link'
import { IoSearchOutline } from 'react-icons/io5'
import { ButtonSidebarCart } from '@/components'
import { Button } from '@/components/ui/button'
import { titleFont } from '@/config/fonts'
import { useUiStore } from '@/store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)

  return (
    <nav className="fixed top-0 z-20 flex px-5 md:px-10 lg:px-20 justify-between items-center w-full border-b-[1px] border-primary bg-white">
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
      <div className="flex justify-center w-full sm:w-auto bg-white absolute sm:static top-[56.67px] left-0 border-b-[1px] sm:border-b-0 border-primary">
        <Link
          href={'/category/clothe'}
          className={`${titleFont.className} mx-2 sm:m-2 p-2 text-lg transition-all hover:bg-primary hover:text-white`}
        >
          Ropa
        </Link>
        <Link
          href={'/category/shoe'}
          className={`${titleFont.className} mx-2 sm:m-2 p-2 text-lg transition-all hover:bg-primary hover:text-white`}
        >
          Zapatos
        </Link>
        <Link
          href={'/category/toy'}
          className={`${titleFont.className} mx-2 sm:m-2 p-2 text-lg transition-all hover:bg-primary hover:text-white`}
        >
          Juguetes
        </Link>
        <Link
          href={'/products?autofocus=true'}
          className={`${titleFont.className} mx-2 sm:m-2 p-2 text-lg transition-all flex items-center gap-2 hover:bg-primary hover:text-white`}
        >
          <IoSearchOutline className="w-5 h-5" />
          Buscar
        </Link>
      </div>

      {/* cart menu */}
      <div className="flex items-center w-auto">
        <ButtonSidebarCart />

        <Button
          type="button"
          variant={'ghost'}
          onClick={openMenu}
          className={`${titleFont.className} m-2 p-2 rounded-none text-lg transition-all  hover:bg-primary hover:text-white`}
        >
          Menú
        </Button>
      </div>

    </nav>
  )
}
