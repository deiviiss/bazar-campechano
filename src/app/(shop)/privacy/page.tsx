import Link from 'next/link'
import { getEmailAdmin } from '@/actions'
import { ButtonBackPage, Title } from '@/components'

export default async function PrivacyPage() {
  const { emailAdmin } = await getEmailAdmin()
  return (
    <>
      <Title title="Políticas de privacidad" subtitle='' />
      <div className='max-w-[920px] mx-auto'>
        <div className='px-3 py-4'>
          <p>
            En nuestro sitio web, valoramos y respetamos su privacidad. Esta Política de Privacidad explica cómo recopilamos y utilizamos su información personal a través de nuestro sitio web y los servicios que ofrecemos.
          </p>
        </div>

        <div className='px-3'>
          <Title title="1. Información que Recopilamos" subtitle='' />
          <p className='pb-4'>
            Recopilamos su nombre, dirección de entrega, dirección de correo electrónico y número de teléfono cuando se registra en nuestro sitio web.
          </p>

          <Title title="2. Uso de su Información" subtitle='' />
          <p className='pb-4'>
            Utilizamos su información personal para los siguientes fines:
          </p>
          <ul className='list-disc pl-6'>
            <li>Para procesar simulaciones de pedidos.</li>
            <li>Para gestionar su cuenta y ofrecerle soporte.</li>
            <li>Para recopilar y analizar feedback y comentarios proporcionados por usted para mejorar nuestros servicios.</li>
          </ul>

          <Title title="3. Seguridad de su Información" subtitle='' />
          <p className='pb-4'>
            Tomamos medidas de seguridad para proteger su información contra el acceso no autorizado y garantizar su confidencialidad. Utilizamos prácticas estándar de la industria para proteger sus datos.
          </p>

          <Title title="4. Acceso a su Información" subtitle='' />
          <p className='pb-4'>
            Usted tiene el derecho de acceder, corregir, actualizar o eliminar su información personal en cualquier momento. Puede hacerlo a través de su cuenta en nuestro sitio web o poniéndose en contacto con nosotros directamente.
          </p>

          <Title title="5. Cambios en esta Política de Privacidad" subtitle='' />
          <p className='pb-4'>
            Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Si realizamos cambios sustanciales, notificaremos dichos cambios en nuestro sitio web para mantenerlo informado sobre cómo afectarán a su información personal.
          </p>

          <p>
            Si tiene alguna pregunta sobre esta política de privacidad o cómo manejamos su información, no dude en ponerse en contacto con nosotros a través de nuestro formulario de contacto.
          </p>
        </div>

        <div className='flex justify-center w-full gap-4  m-8 text-center mx-auto'>
          <Link className='btn-primary' target='_blank' href={`mailto:${emailAdmin?.email}?subject=Consulta%20sobre%20Política%20de%20Privacidad`}>
            Contáctanos
          </Link>

          <ButtonBackPage />
        </div>
      </div>
    </>
  )
}
