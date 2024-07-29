'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { IoInformationOutline } from 'react-icons/io5'
import { authenticate } from '@/actions'

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

      <Link
        href={`/auth/new-account?redirectTo=${redirectTo}`}
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form >
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className={
        clsx({
          'btn-disabled': pending,
          'btn-primary': !pending
        }
        )
      }
      disabled={pending}
    >
      {pending ? 'Ingresando...' : 'Ingresar'}
    </button>
  )
}
