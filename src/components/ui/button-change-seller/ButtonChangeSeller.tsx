'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { changeUserToSeller } from '@/actions/auth/change-user-to-seller'
import { noticeFailure, noticeSuccess } from '@/components/notification-toast/NotificationToast'
import { Button } from '@/components/ui/button'

interface ButtonChangeSellerProps {
  userId: string
}

export const ButtonChangeSeller = ({ userId }: ButtonChangeSellerProps) => {
  const router = useRouter()
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleChangeSeller = async () => {
    setIsSending(true)
    setMessage(null)

    try {
      const { ok, message } = await changeUserToSeller({ userId })

      if (!ok) {
        noticeFailure(message)
        setMessage(message)
        return
      }

      noticeSuccess(message)
      router.refresh()
    } catch (error) {
      setMessage('Hubo un error al cambiar el usuario a vendedor.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <Button onClick={handleChangeSeller} disabled={isSending}>
        {isSending ? 'Cambiando...' : 'Quiero ser vendedor'}
      </Button>
      {message && <p>{message}</p>}
    </>
  )
}
