'use client'

import { IoLogOutOutline } from 'react-icons/io5'
import { logout } from '@/actions'

export const ButtonLogout = () => {
  return (
    <button
      onClick={() => { logout() }}
      className='flex items-center w-full mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
      <IoLogOutOutline size={30} />
      <span className='ml-3 text-xl'>Salir</span>
    </button>
  )
}
