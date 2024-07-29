export interface User {
  id: string
  email: string
  name: string
  phoneNumber: string
  password: string | null
  emailVerified: Date | null
  image: string | null
  role: string
  isActive: boolean
}
