import type { Metadata } from 'next'
import { Providers } from '@/components'
import { bodyFont } from '@/config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Bazar Campechano',
    default: 'Bazar Campechano'
  },
  description: 'Tienda de ropa online. Encuentra la ropa que necesitas para estar a la moda.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <Providers>
        <body className={bodyFont.className}>{children}</body>
      </Providers>
    </html>
  )
}
