'use client'
import Link from 'next/link'

export const Banner = () => {
  return (
    <div className="text-sm bg-primary text-white py-3 px-4 text-center">
      <p className="">
        ¿Quieres una tienda como esta para tu negocio?{' '}
        <Link
          href="https://mitiendaenlinea.shop" className="font-bold underline hover:text-secondary transition-colors"
          target='_blank'
        >
          Contáctenos
        </Link>{' '}
      </p>
    </div>
  )
}
