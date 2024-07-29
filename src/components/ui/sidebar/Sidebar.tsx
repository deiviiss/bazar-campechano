'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'
import { logout } from '@/actions'
import { useUiStore } from '@/store'

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
  const closeMenu = useUiStore((state) => state.closeSideMenu)

  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const isAdmin = session?.user?.role === 'admin'

  return (
    <div>
      {
        isSideMenuOpen && (
          <>
            {/* background */}
            <div className='fixed top-0 left-0 w-screen h-screen z-30 bg-black opacity-30'>
            </div>
            {/* blur */}
            <div onClick={closeMenu} className='fade-in fixed top-0 left-0 w-screen h-screen z-30 backdrop-filter backdrop-blur-sm'>
            </div>
          </>
        )
      }

      <nav className={
        clsx(
          'fixed p-5 right-0 top-0 w-full md:w-[350px] h-screen bg-white z-40 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen
          }
        )
      }>

        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* menú */}
        <div className='mt-28'>
          {
            !isAuthenticated
              ? (
                <Link href='/auth/login'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                  <IoLogInOutline size={30} />
                  <span className='ml-3 text-xl'>Ingresar</span>
                </Link>)
              : (
                <>
                  <Link href='/profile'
                    onClick={() => { closeMenu() }}
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                    <IoPersonOutline size={30} />
                    <span className='ml-3 text-xl'>Perfil</span>
                  </Link>

                  <Link href='/orders'
                    onClick={() => { closeMenu() }}
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                    <IoTicketOutline size={30} />
                    <span className='ml-3 text-xl'>Pedidos</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout()
                      closeMenu()
                      window.location.replace('/auth/login')
                    }}
                    className='flex items-center w-full mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                    <IoLogOutOutline size={30} />
                    <span className='ml-3 text-xl'>Salir</span>
                  </button>
                </>)
          }

          {/* divisor */}
          <div className="w-full h-px bg-gray-100 rounded transition-all mt-5"></div>
        </div>

        {
          isAdmin && (
            <>
              <Link href='/admin/products'
                onClick={() => { closeMenu() }}
                className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoShirtOutline size={30} />
                <span className='ml-3 text-xl'>Productos</span>
              </Link>

              <Link href='/admin/orders'
                onClick={() => { closeMenu() }}
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoTicketOutline size={30} />
                <span className='ml-3 text-xl'>Pedidos</span>
              </Link>

              <Link href='/admin/users'
                onClick={() => { closeMenu() }}
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoPeopleOutline size={30} />
                <span className='ml-3 text-xl'>Usuarios</span>
              </Link>
            </>)
        }

      </nav >

    </div >
  )
}
