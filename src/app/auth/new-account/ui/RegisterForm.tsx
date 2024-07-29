'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { registerUser } from '@/actions'
import { login } from '@/actions/auth/login'

interface FormInputs {
  name: string
  email: string
  phoneNumber: string
  password: string
}

export const RegisterForm = () => {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const rta = await registerUser(data)

    if (!rta.ok) {
      setErrorMessage(rta.message)
      return
    }

    await login(data.email, data.password)
    const redirectTo = searchParams.get('redirectTo') || '/profile'

    window.location.replace(redirectTo)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      {
        errors.name?.type === 'required' && (
          <span className='text-red-500'>* El nombre es requerido</span>
        )
      }

      <label htmlFor="name">Nombre completo</label>
      <input
        className={
          clsx(
            'px-5 py-2 border bg-gray-200 rounded mb-5',
            {
              'border-red-500': errors.name
            }
          )
        }
        type="text"
        autoFocus
        {...register('name', { required: true })}
      />

      <label htmlFor="name">Teléfono</label>
      <input
        className={
          clsx(
            'px-5 py-2 border bg-gray-200 rounded mb-5',
            {
              'border-red-500': errors.phoneNumber
            }
          )
        }
        type="text"
        {...register('phoneNumber', { required: true })}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={
          clsx(
            'px-5 py-2 border bg-gray-200 rounded mb-5',
            {
              'border-red-500': errors.email
            }
          )
        }
        type="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i, minLength: 6 })}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className={
          clsx(
            'px-5 py-2 border bg-gray-200 rounded mb-5',
            {
              'border-red-500': errors.password
            }
          )
        }
        type="password"
        {...register('password', { required: true, minLength: 6 })}
      />

      <span className='text-red-500 pb-3'>{errorMessage}</span>

      <button
        className="btn-primary">
        Crear cuenta
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Ingresar
      </Link>

    </form>
  )
}
