import { notFound } from 'next/navigation'
import { getEmailAdmin } from '@/actions'
import { NavigationAndContactButtons, Title, TitleCategory } from '@/components'

export default async function FaqPage() {
  const { emailAdmin } = await getEmailAdmin()

  if (!emailAdmin) {
    notFound()
  }

  return (
    <div className='px-1 sm:px-3 mt-[60.67px] pt-10'>
      <TitleCategory title="Preguntas Frecuentes" subtitle='' />
      <div className='max-w-[920px]'>
        <div className='px-3 pb-4'>
          <Title title='' subtitle='¿Cómo realizo una compra?' />
          <p className='pb-4'>
            Para realizar una compra, selecciona los productos que deseas añadir al carrito y procede al pago. Puedes pagar con tarjeta de crédito/débito o Paypal.
          </p>

          <Title title='' subtitle='¿Dónde entregan sus productos?' />
          <p className='pb-4'>
            Actualmente, solo realizamos entregas en Campeche, México. También puedes recoger tus productos en nuestra tienda local.
          </p>

          <Title title='' subtitle='¿Aceptan devoluciones?' />
          <p className='pb-4'>
            No aceptamos devoluciones de productos de segunda mano, excepto en casos de productos dañados o incorrectos. Consulta nuestra <a href='/info/refunds' className='hover:underline hover:text-warning font-semibold'>Política de Devoluciones</a> para más detalles.
          </p>

          <Title title='' subtitle='¿Cómo puedo contactar con el servicio de atención al cliente?' />
          <p className='pb-4'>
            Puedes enviarnos un correo electrónico a <a href={`mailto:${emailAdmin.email}`} className='hover:underline hover:text-warning font-semibold'>{emailAdmin.email}</a> o llamarnos al +52 (981) 209-9475.
          </p>
        </div>

        <NavigationAndContactButtons email={emailAdmin.email} />
      </div>
    </div>
  )
}
