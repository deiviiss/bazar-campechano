import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getEmailAdmin } from '@/actions'
import { Title, NavigationAndContactButtons, TitleCategory } from '@/components'

export default async function TermsPage() {
  const { emailAdmin } = await getEmailAdmin()

  if (!emailAdmin) {
    notFound()
  }

  return (
    <div className='px-1 sm:px-3 mt-[60.67px] pt-10'>
      <TitleCategory title="Términos y condiciones" subtitle='' />
      <div className='max-w-[920px]'>
        <div className='px-3 pb-4'>
          <p className='text-base antialiased'>
            Bienvenido a nuestro sitio web. Al utilizar nuestros servicios, acepta los siguientes términos y condiciones de uso. Si no está de acuerdo con estos términos, le recomendamos no utilizar nuestros servicios.
          </p>
        </div>

        <div className='px-3'>
          <Title title='' subtitle='1. Servicios y productos' />
          <p className='pb-4'>
            Este sitio web es un eCommerce real que vende ropa de bazar. Todos nuestros productos son de segunda mano y pueden mostrar señales de uso. Los productos agregados al carrito serán entregados a la dirección proporcionada al momento de la compra o pueden ser recogidos en nuestro local. Todas las transacciones realizadas a través de nuestra pasarela de pagos son válidas y procesadas de manera segura. Actualmente, solo ofrecemos servicios y entregas dentro de Campeche, México.
          </p>

          <Title title='' subtitle='2. Registro de Usuarios' />
          <p className='pb-4'>
            Al registrarse, los usuarios aceptan proporcionar información veraz y actualizada. La protección de sus datos es importante para nosotros, y manejamos su información conforme a nuestra <Link className='hover:underline hover:text-warning font-semibold' href={'/info/privacy'}> Política de Privacidad</Link>. La cuenta de usuario puede ser suspendida o eliminada en caso de incumplimiento de estos términos.
          </p>

          <Title title='' subtitle='3. Privacidad' />
          <p className='pb-4'>
            Para ofrecer nuestros servicios de manera efectiva, recopilamos y almacenamos información personal como la dirección de entrega, correo electrónico y número de teléfono. Puede obtener más información sobre cómo manejamos sus datos en nuestra <Link className='hover:underline hover:text-warning font-semibold' href={'/info/privacy'}>Política de Privacidad</Link>.
          </p>

          <Title title='' subtitle='4. Pagos y rembolso' />
          <p className='pb-4'>Todos los pagos realizados a través de nuestra pasarela de pagos (Paypal, tarjeta de crédito/débito, etc.) son procesados de manera segura. En caso de devoluciones o reembolso, estos se manejarán conforme a nuestra <Link className='hover:underline hover:text-warning font-semibold' href={'/info/refunds'} >Política de Devoluciones</Link>, disponible en el sitio web. Tenga en cuenta que no aceptamos devoluciones basadas únicamente en el estado de uso de los productos, ya que son artículos de segunda mano.</p>

          <Title title='' subtitle='5. Modificaciones' />
          <p className='pb-4'>
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Le recomendamos revisar periódicamente esta página para estar al tanto de los cambios. El uso continuo de nuestros servicios después de los cambios constituirá su aceptación de los términos modificados.
          </p>

          <Title title='' subtitle='6. Ley Aplicable' />
          <p className='pb-4'>
            Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes aplicables. Cualquier disputa que surja en relación con estos términos será resuelta exclusivamente  por los tribunales competentes de Campeche, México.
          </p>
        </div>

        <NavigationAndContactButtons email={emailAdmin.email} />
      </div>
    </div>
  )
}
