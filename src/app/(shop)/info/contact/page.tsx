import { notFound } from 'next/navigation'
import { getEmailAdmin } from '@/actions'
import { NavigationAndContactButtons, Title, TitleCategory } from '@/components'

export default async function ContactPage() {
  const { emailAdmin } = await getEmailAdmin()

  if (!emailAdmin) {
    notFound()
  }

  return (
    <div className='px-1 sm:px-3 mt-[60.67px] pt-10'>
      <TitleCategory title="Contacto" subtitle='' />
      <div className='max-w-[920px]'>
        <div className='px-3 pb-4'>
          <p className='text-base antialiased'>
            Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.
          </p>
        </div>

        <div className='px-3'>
          <Title title='' subtitle='Correo Electrónico' />
          <p className='pb-4'>
            Puedes enviarnos un correo a <a href={`mailto:${emailAdmin.email}`} className='hover:underline hover:text-warning font-semibold'>{emailAdmin.email}</a>.
          </p>

          <Title title='' subtitle='Dirección' />
          <p className='pb-4'>
            Nos encontramos en Campeche, México. Puedes visitarnos en nuestra tienda local para ver los productos en persona.
          </p>

          <Title title='' subtitle='Teléfono' />
          <p className='pb-4'>
            Llámanos al +52 (981) 209-9475 para consultas inmediatas.
          </p>
        </div>

        <NavigationAndContactButtons email={emailAdmin.email} />
      </div>
    </div>
  )
}
