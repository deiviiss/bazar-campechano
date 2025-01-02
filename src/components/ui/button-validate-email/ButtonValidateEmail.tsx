'use client'

import { useState } from 'react'
import { sendValidationEmail } from '@/actions/auth/send-validation-email'
import { Button } from '@/components/ui/button'

interface ButtonValidateEmailProps {
  userId: string
}

export const ButtonValidateEmail = ({ userId }: ButtonValidateEmailProps) => {
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSendValidationEmail = async () => {
    setIsSending(true)
    setMessage(null)

    try {
      const response = await sendValidationEmail(userId)
      setMessage(response)
    } catch (error) {
      setMessage('Hubo un error al enviar el correo de validación.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <Button onClick={handleSendValidationEmail} disabled={isSending}>
        {isSending ? 'Enviando...' : 'Validar correo'}
      </Button>
      {message && <p>{message}</p>}
    </>
  )
}
