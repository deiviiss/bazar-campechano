import Link from 'next/link'
import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from 'react-icons/ci'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { titleFont } from '@/config/fonts'

export const Footer = () => {
  return (
    <div className='grid md:grid-cols-2 gap-2 px-1 pb-2'>
      <div className="flex flex-col min-[400px]:flex-row sm:mb-10 w-full h-full items-center gap-2 justify-center text-xs mb-1 ">
        <Card className='w-full h-full bg-gray-300 py-5 px-4'>
          <CardTitle className='mb-5'>
            Nosotros
          </CardTitle>

          <CardContent className='p-0 flex flex-col text-start text-sm gap-3'>
            <Link href={'/'}>
              Quiénes somos
            </Link>
            <Link href={'/privacy'}>
              Políticas de privacidad
            </Link>
          </CardContent>
        </Card>

        <Card className='w-full h-full bg-gray-300 py-5 px-4'>
          <CardTitle className='mb-5'>
            Ayuda
          </CardTitle>
          <CardContent className='p-0 flex flex-col text-start text-sm gap-3'>
            <Link href={'/'}>
              Preguntas frecuentes
            </Link>

            <Link href={'/'}>
              Contáctanos
            </Link>

            <Link href={'/terms'}>
              Términos y condiciones
            </Link>

            <Link href={'/refunds'}>
              Política de devoluciones
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className='w-full h-full bg-gray-300 py-5 px-4'>
        <CardTitle className='mb-5'>
          <Link href="/" >
            <span className={`${titleFont.className} antialiased font-bold`}>Bazar Campechano</span>
            <span>© {new Date().getFullYear()}</span>
          </Link>
        </CardTitle>

        <CardContent className='w-full justify-end items-center flex gap-3'>
          <CiFacebook size={35} />
          <CiTwitter size={35} />
          <CiInstagram size={35} />
          <CiYoutube size={35} />
        </CardContent>
      </Card>
    </div>
  )
}
