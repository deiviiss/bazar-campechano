import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function CheckoutLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login?redirectTo=/checkout')
  }
  return (
    <div className='mt-[80px] sm:mt-[60.67px] pt-10 px-1 sm:px-5 md:px-10 lg:px-14 xl:px-20'>
      {
        children
      }
    </div>
  )
}
