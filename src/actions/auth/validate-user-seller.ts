'use server'

import { auth } from '@/auth'

export const validateUserSeller = async () => {
  const session = await auth()
  const user = session?.user

  if (user?.role !== 'seller') {
    return false
  }

  return true
}
