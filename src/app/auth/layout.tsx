import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return (
    <main className='flex justify-center'>
      <div className='w-full sm:w-[350px] sm:px-0 px-10'>
        {children}
      </div>
    </main>
  )
}
