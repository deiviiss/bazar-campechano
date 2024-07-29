'use server'

import { auth } from '@/auth.config'

export const getUserSessionServer = async () => {
  const session = await auth()

  return session?.user
}
