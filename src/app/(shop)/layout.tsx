import { Footer, Sidebar, TopMenu } from '@/components'
import { Toaster } from '@/components/ui/sonner'

export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className='mt-14'>
        {children}
      </div>
      <Toaster />
      <Footer />
    </main>
  )
}
