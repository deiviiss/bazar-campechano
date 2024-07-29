import Link from 'next/link'
import { getEmailAdmin } from '@/actions'
import { Title, ButtonBackPage } from '@/components'

export default async function TermsPage() {
  const { emailAdmin } = await getEmailAdmin()
  return (
    <>
      <Title title="Términos y condiciones" subtitle='' />
      <div className='max-w-[920px] mx-auto'>
        <div className='px-3 py-4'>
          <p className='text-base antialiased'>
            Bienvenido a nuestro sitio web. Este es un ecommerce de ejemplo que simula el flujo de compra. Al utilizar nuestros servicios, acepta los siguientes términos y condiciones de uso. Si no está de acuerdo con estos términos, le recomendamos no utilizar nuestros servicios.
          </p>
        </div>

        <div className='px-3'>
          <Title title='1. Servicios Simulados' subtitle='' />
          <p className='pb-4'>
            Este sitio web es una simulación de un ecommerce y los productos agregados al carrito no serán entregados. Las transacciones realizadas son solo de prueba y no tienen validez comercial. Sin embargo, los pagos realizados a través de la pasarela de pagos (Paypal) son reales y no reembolsables, por lo que todos los productos tienen un precio simbólico de $1 peso mexicano.
          </p>

          <Title title='2. Registro de Usuarios' subtitle='' />
          <p className='pb-4'>
            Al registrarse, los usuarios aceptan que la base de datos puede ser reiniciada en cualquier momento, lo que puede resultar en la pérdida de la información registrada.
          </p>

          <Title title='3. Privacidad' subtitle='' />
          <p className='pb-4'>
            Para ofrecer nuestros servicios de manera efectiva, recopilamos y almacenamos información personal como la dirección de entrega, correo electrónico y número de teléfono. Puede obtener más información sobre cómo manejamos sus datos en nuestra {' '}
            <Link className='hover:underline hover:text-warning font-semibold' href={'/privacy'}>
              Política de Privacidad
            </Link>.
          </p>

          <Title title='4. Modificaciones' subtitle='' />
          <p className='pb-4'>
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Le recomendamos revisar periódicamente esta página para estar al tanto de los cambios. El uso continuo de nuestros servicios después de los cambios constituirá su aceptación de los términos modificados.
          </p>

          <Title title='5. Ley Aplicable' subtitle='' />
          <p className='pb-4'>
            Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes aplicables. Cualquier disputa que surja en relación con estos términos será resuelta exclusivamente por los tribunales competentes.
          </p>
        </div>

        <div className='flex justify-center w-full gap-4  m-8 text-center mx-auto'>
          <Link className='btn-primary' target='_blank' href={`mailto:${emailAdmin?.email}?subject=Consulta%20sobre%20Términos%20y%20Condiciones`}>
            Contáctanos
          </Link>

          <ButtonBackPage />
        </div>
      </div>
    </>
  )
}
