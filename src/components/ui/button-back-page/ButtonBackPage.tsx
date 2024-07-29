'use client'

import { useRouter } from 'next/navigation'

export const ButtonBackPage = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => { router.back() }}
      className='btn-danger'
    >
      Regresar
    </button>
  )
}
