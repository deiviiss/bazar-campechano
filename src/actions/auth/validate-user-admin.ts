'use server'

import { auth } from '@/auth.config'

export const validateUserAdmin = async () => {
  const session = await auth()
  const user = session?.user

  if (user?.role !== 'admin') {
    return false
  }

  return true
}
