'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { changeUserToSeller } from '@/actions/auth/change-user-to-seller'
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
        toast.error(message, {
          position: 'top-right',
          duration: 2000
        })
        setMessage(message)
        return
      }

      toast.success(message, {
        position: 'top-right',
        duration: 2000
      })
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
