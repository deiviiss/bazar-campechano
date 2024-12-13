import Link from 'next/link'
import { CiFacebook } from 'react-icons/ci'
import { titleFont } from '@/config/fonts'

export const Footer = () => {
  return (
    <footer className="w-full bg-primary text-gray-300 py-12 mt-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight text-white">Nosotros</h2>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/info/about"
                className="hover:text-white transition-colors"
              >
                Quiénes somos
              </Link>
              <Link
                href="/info/privacy"
                className="hover:text-white transition-colors"
              >
                Políticas de privacidad
              </Link>
            </nav>
          </div>

          {/* Help Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight text-white">Ayuda</h2>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/info/faq"
                className="hover:text-white transition-colors"
              >
                Preguntas frecuentes
              </Link>
              <Link
                href="/info/contact"
                className="hover:text-white transition-colors"
              >
                Contáctenos
              </Link>
              <Link
                href="/info/terms"
                className="hover:text-white transition-colors"
              >
                Términos y condiciones
              </Link>
            </nav>
          </div>

          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex flex-col space-y-1">
                <span className={`${titleFont.className} text-xl font-bold tracking-wider text-white`}>
                  Bazar Campechano
                </span>
                <span className="text-sm text-gray-400">
                  © {new Date().getFullYear()} Todos los derechos reservados
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.facebook.com/people/Bazar-Campechano/61566537580467/"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
              >
                <CiFacebook className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
