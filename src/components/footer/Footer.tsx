import Link from 'next/link'
import { titleFont } from '@/config/fonts'

export const Footer = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 sm:flex sm:flex-row-reverse sm:mb-10 w-full items-center gap-3 justify-center text-xs mb-5">
      <Link
        href={'/privacy'}
        className='mx-2 text-center'
      >
        Políticas de privacidad
      </Link>

      <Link
        href={'/terms'}
        className='mx-2 text-center'
      >
        Términos y condiciones
      </Link>

      <Link
        href={'/refunds'}
        className='mx-2 text-center'
      >
        Política de devoluciones
      </Link>

      <Link
        href="/"
        className='mx-2 col-span-2 sm:col-auto text-center'
      >
        <span className={`${titleFont.className} antialiased font-bold`}>Bazar Campechano</span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

    </div>
  )
}
