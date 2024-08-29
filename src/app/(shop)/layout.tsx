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
      {children}
      <Toaster />
      <Footer />
    </main>
  )
}
