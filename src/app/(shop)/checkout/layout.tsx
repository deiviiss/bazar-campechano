import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'

export default async function CheckoutLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login?redirectTo=/checkout/shipping-method')
  }
  return (
    <div className='mt-16 pt-10 sm:px-5 md:px-10 lg:px-14 xl:px-20'>
      {
        children
      }
    </div>
  )
}
