'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { sendValidationEmail } from '@/actions/auth/send-validation-email'
import { noticeFailure } from '@/components/notification-toast/NotificationToast'
import { Button } from '@/components/ui/button'

interface ButtonValidateEmailProps {
  userId: string
}

export const ButtonValidateEmail = ({ userId }: ButtonValidateEmailProps) => {
  const router = useRouter()
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSendValidationEmail = async () => {
    setIsSending(true)
    setMessage(null)

    try {
      const { ok, message } = await sendValidationEmail(userId)

      if (!ok) {
        noticeFailure(message)
        router.refresh()
        return
      }

      setMessage(message)
    } catch (error) {
      setMessage('Hubo un error al enviar el correo de validación.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <Button onClick={handleSendValidationEmail} disabled={isSending}>
        <IoCheckmarkCircleOutline />
        <span>
          {isSending ? 'Enviando...' : 'Validar correo'}
        </span>
      </Button>
      {message && <p>{message}</p>}
    </>
  )
}
