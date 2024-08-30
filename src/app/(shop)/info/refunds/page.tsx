import { notFound } from 'next/navigation'
import { getEmailAdmin } from '@/actions'
import { NavigationAndContactButtons, Title, TitleCategory } from '@/components'

export default async function RefundsPage() {
  const { emailAdmin } = await getEmailAdmin()

  if (!emailAdmin) {
    notFound()
  }

  return (
    <div className='px-1 sm:px-3 mt-[60.67px] pt-10'>
      <TitleCategory title="Política de Reembolso y Devoluciones" subtitle='' />
      <div className='max-w-[920px]'>
        <div className='px-3 pb-4'>
          <p>
            En Bazar Campechano, nos esforzamos por garantizar la satisfacción de nuestros clientes. Sin embargo, debido a la naturaleza de nuestros productos de segunda mano, no ofrecemos devoluciones ni reembolso una vez que la mercancía ha sido entregada.
          </p>
        </div>

        <div className='px-3'>
          <Title title="" subtitle='1. Productos de Segunda Mano' />
          <p className='pb-4'>
            Todos los productos que vendemos son de segunda mano y pueden mostrar señales de uso. Antes de realizar una compra, le recomendamos revisar detalladamente la descripción y las fotos del producto.
          </p>

          <Title title="" subtitle='2. No Reembolso ni Devoluciones' />
          <p className='pb-4'>
            Una vez que el producto ha sido entregado, no aceptamos devoluciones ni ofrecemos reembolso. Esta política se debe a la naturaleza de los productos de segunda mano que vendemos.
          </p>

          <Title title="" subtitle='3. Productos Dañados o Incorrectos' />
          <p className='pb-4'>
            Si recibe un producto dañado o incorrecto, por favor contáctenos dentro de las 48 horas siguientes a la entrega. Evaluaremos cada caso individualmente y, si corresponde, tomaremos las medidas adecuadas para resolver el problema.
          </p>

          <Title title="" subtitle='4. Recogida en Local' />
          <p className='pb-4'>
            Los clientes tienen la opción de recoger sus productos en nuestro local en Campeche, México. Por favor, asegúrese de coordinar la recogida con antelación.
          </p>

          <Title title="" subtitle='5. Contacto' />
          <p className='pb-4'>
            Si tiene alguna pregunta sobre nuestra política de reembolso y devoluciones, no dude en ponerse en contacto con nosotros a través de nuestro correo electrónico.
          </p>
        </div>

        <NavigationAndContactButtons email={emailAdmin.email} />
      </div>
    </div>
  )
}
