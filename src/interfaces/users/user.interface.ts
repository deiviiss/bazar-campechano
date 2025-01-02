export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean | null
  phoneNumber: string
  phoneNumberVerified: boolean | null
  hasPurchasedOnce: boolean
  isActive: boolean
  image?: string | null
  role: string
  password?: string | null
}
