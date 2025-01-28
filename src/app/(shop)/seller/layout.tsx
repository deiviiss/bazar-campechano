import { redirect } from 'next/navigation'
import { validateUserSeller } from '@/actions/auth/validate-user-seller'

export default async function SellerLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const isSeller = await validateUserSeller()

  if (!isSeller) {
    redirect('/profile')
  }

  return (
    <div className='px-1 pt-10 mt-[157.67px] min-[487px]:mt-[141.67px] sm:mt-[100.67px] md:p-4 min-[992px]:p-6 min-[1200px]:p-10 pb-10'>
      {children}
    </div>
  )
}
