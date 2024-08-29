import { notFound } from 'next/navigation'
import { getEmailAdmin } from '@/actions'
import { NavigationAndContactButtons, Title } from '@/components'

export default async function RefundsPage() {
  const { emailAdmin } = await getEmailAdmin()

  if (!emailAdmin) {
    notFound()
  }

  return (
    <div className='px-1 sm:px-3'>
      <Title title="Política de Reembolsos y Devoluciones" subtitle='' />
      <div className='max-w-[920px]'>
        <div className='px-3 py-4'>
          <p>
            En Bazar Campechano, nos esforzamos por garantizar la satisfacción de nuestros clientes. Sin embargo, debido a la naturaleza de nuestros productos de segunda mano, no ofrecemos devoluciones ni reembolsos una vez que la mercancía ha sido entregada.
          </p>
        </div>

        <div className='px-3'>
          <Title title="1. Productos de Segunda Mano" subtitle='' />
          <p className='pb-4'>
            Todos los productos que vendemos son de segunda mano y pueden mostrar señales de uso. Antes de realizar una compra, le recomendamos revisar detalladamente la descripción y las fotos del producto.
          </p>

          <Title title="2. No Reembolsos ni Devoluciones" subtitle='' />
          <p className='pb-4'>
            Una vez que el producto ha sido entregado, no aceptamos devoluciones ni ofrecemos reembolsos. Esta política se debe a la naturaleza de los productos de segunda mano que vendemos.
          </p>

          <Title title="3. Productos Dañados o Incorrectos" subtitle='' />
          <p className='pb-4'>
            Si recibe un producto dañado o incorrecto, por favor contáctenos dentro de las 48 horas siguientes a la entrega. Evaluaremos cada caso individualmente y, si corresponde, tomaremos las medidas adecuadas para resolver el problema.
          </p>

          <Title title="4. Recogida en Local" subtitle='' />
          <p className='pb-4'>
            Los clientes tienen la opción de recoger sus productos en nuestro local en Campeche, México. Por favor, asegúrese de coordinar la recogida con antelación.
          </p>

          <Title title="5. Contacto" subtitle='' />
          <p className='pb-4'>
            Si tiene alguna pregunta sobre nuestra política de reembolsos y devoluciones, no dude en ponerse en contacto con nosotros a través de nuestro correo electrónico.
          </p>
        </div>

        <NavigationAndContactButtons email={emailAdmin.email} />
      </div>
    </div>
  )
}
