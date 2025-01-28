'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { validateEmail } from '@/actions/auth/validate-email'

interface Props {
  searchParams: {
    token?: string
  }
}

export default function ValidateEmailPage({ searchParams }: Props) {
  const token = searchParams.token

  const [message, setMessage] = useState('Validando...')
  const router = useRouter()

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setMessage('Token no proporcionado')
        router.push('/profile')
        return
      }

      try {
        const { ok, message: result } = await validateEmail(token)

        if (ok) {
          toast(result, {
            position: 'top-right',
            duration: 2000
          })
          router.push('/profile')
        }
      } catch (error) {
        setMessage('Token inválido o expirado')
        router.push('/profile')
      }
    }

    validate()
  }, [token])

  return (
    <div>{message}</div>
  )
}
