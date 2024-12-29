import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
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
    'Bazar Campechano es una comunidad en línea donde los usuarios pueden comprar y vender ropa y artículos de segunda mano de manera sencilla y segura. Esta plataforma está diseñada para que cualquier usuario registrado que ya haya realizado una compra pueda también vender los artículos que ya no utiliza, fomentando un intercambio dinámico y accesible para todos. El proyecto combina la funcionalidad de un bazar tradicional con la comodidad del comercio electrónico, ofreciendo una experiencia amigable y directa.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <Providers>
        <body className={`text-primary ${textFont.className}`}>
          {children}
        </body>
        <Analytics />
        <SpeedInsights />
      </Providers >
    </html >
  )
}
