import { Poppins, Anton } from 'next/font/google'

export const textFont = Poppins({ subsets: ['latin'], weight: '400' })

export const titleFont = Anton({
  subsets: ['latin'],
  weight: ['400']
})
