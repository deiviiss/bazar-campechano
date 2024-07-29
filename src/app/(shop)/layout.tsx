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
      <div className='px-1 md:px-12 xl:px-24 mt-[84px]'>
        {children}
      </div>
      <Toaster />
      <Footer />
    </main>
  )
}
