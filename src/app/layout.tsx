import type { Metadata } from 'next'
import { Providers } from '@/components'
import { textFont } from '@/config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Bazar Campechano',
    default: 'Bazar Campechano - Ropa de Segunda Mano'
  },
  description:
    'Bienvenido a Bazar Campechano, tu tienda en línea de ropa de segunda mano con estilo. Descubre una amplia variedad de prendas únicas y accesibles que te ayudarán a estar a la moda sin romper el banco. Desde blusas con estampados atrevidos hasta elegantes chaquetas, encuentra tesoros escondidos y ofertas increíbles en cada compra. ¡Visítenos y renueva tu armario con ropa con historia!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <Providers>
        <body className={textFont.className}>{children}</body>
      </Providers >
    </html >
  )
}
