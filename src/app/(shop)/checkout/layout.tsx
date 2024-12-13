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
    <div className='mt-[157.67px] min-[487px]:mt-[141.67px] sm:mt-[100.67px] pt-10 px-1 sm:px-5 md:px-10 lg:px-14 xl:px-20'>
      {
        children
      }
    </div>
  )
}
