export interface User {
  id: string
  email: string
  name: string
  phoneNumber: string
  password: string | null
  emailVerified: boolean | null
  phoneNumberVerified: boolean | null
  image: string | null
  role: string
  isActive: boolean
}
