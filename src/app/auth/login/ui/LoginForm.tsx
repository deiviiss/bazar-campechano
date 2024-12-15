'use client'

import Link from 'next/link'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { IoInformationOutline } from 'react-icons/io5'
import { authenticate } from '@/actions'
import { Button } from '@/components/ui/button'

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const [state, dispatch] = useFormState(authenticate, undefined)
  const redirectTo = searchParams.get('redirectTo') || '/profile'

  useEffect(() => {
    if (state === 'SuccessSignin') {
      window.location.replace(redirectTo)
    }
  }, [state])

  return (
    <form action={dispatch} className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name='email'
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name='password' />

      <div
        className='flex h-8 items-end space-x-1 text-red-500'
        aria-live='polite'
        aria-atomic='true'
      >
        {
          state === 'CredentialsInvalid' && (
            <div className='flex mb-2'>
              <IoInformationOutline className='h-5 w-5' />
              <p className='text-sm'>Credenciales invalidas</p>
            </div>
          )
        }
      </div>

      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Button asChild variant={'secondary'} className='flex items-center justify-center w-full'>
        <Link
          href={`/auth/new-account?redirectTo=${redirectTo}`}
        >
          Crear una nueva cuenta
        </Link>
      </Button>
    </form >
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
    >
      {pending ? 'Ingresando...' : 'Ingresar'}
    </Button>
  )
}
