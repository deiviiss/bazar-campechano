import { redirect } from 'next/navigation'
import { validateUserAdmin } from '@/actions'

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    redirect('/profile')
  }

  return (
    <div className='px-1 pt-10 mt-[157.67px] min-[487px]:mt-[141.67px] sm:mt-[100.67px] md:p-4 min-[992px]:p-6 min-[1200px]:p-10 pb-10'>
      {children}
    </div>
  )
}
