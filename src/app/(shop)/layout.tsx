import { IoArrowUpOutline, IoLogoWhatsapp } from 'react-icons/io5'
import { ButtonContactWhatsApp, ButtonScrollTop, Footer, NextProgress, Sidebar, SidebarCart, TopMenu } from '@/components'
import { Toaster } from '@/components/ui/sonner'

export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen">
      <NextProgress />
      <TopMenu />

      <Sidebar />

      <SidebarCart />

      {children}

      <ButtonScrollTop
        className='fixed bottom-10 right-2 z-10 text-primary hover:no-underline hover:text-primary/90 text-xl flex gap-1 p-2 rounded-none border-primary border bg-white h-12 w-12 print:hidden'
        icon={<IoArrowUpOutline />}
      />

      <ButtonContactWhatsApp className='fixed bottom-28 right-2 md:right-2 z-10 text-primary hover:no-underline hover:text-primary/90 text-xl flex gap-1 p-2 rounded-none border-primary border bg-white h-12 w-12 print:hidden'
        icon={<IoLogoWhatsapp />}
      />

      <Toaster />

      <Footer />
    </main>
  )
}
