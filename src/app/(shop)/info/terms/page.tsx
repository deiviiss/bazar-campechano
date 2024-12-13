import { notFound } from 'next/navigation'
import { getEmailAdmin } from '@/actions'
import { Title, NavigationAndContactButtons, TitleCategory } from '@/components'

export default async function TermsPage() {
  const { emailAdmin } = await getEmailAdmin()

  if (!emailAdmin) {
    notFound()
  }

  return (
    <>
      <TitleCategory title="Términos y condiciones" subtitle='' />
      <div className='max-w-[920px]'>
        <div className='px-3 pb-4'>
          <p className='text-base antialiased'>
            Bienvenido a Bazar Campechano. Al utilizar nuestros servicios, aceptas los siguientes Términos y Condiciones. Si no estás de acuerdo con ellos, te recomendamos no utilizar nuestra plataforma.
          </p>
        </div>

        <div className='px-3'>
          <Title title='' subtitle='1. Servicios' />
          <p className='pb-4'>
            Bazar Campechano es una comunidad en línea donde los usuarios pueden comprar y vender ropa, zapatos, juguetes y artículos de segunda mano de manera sencilla y segura. La plataforma conecta a usuarios vendedores con usuarios compradores, proporcionando las herramientas necesarias para facilitar el intercambio. <span className='font-semibold'>No somos intermediarios en la transacción, solo conectamos a las partes involucradas.</span>
          </p>

          <Title title='' subtitle='2. Registro y Uso de la Plataforma' />
          <ul className='pb-4'>
            <li>Requisitos: Para registrarte, debes proporcionar información verídica y completa, incluyendo tu nombre, correo electrónico y número de teléfono.</li>
            <li>Condiciones para vender: Solo los usuarios que hayan realizado al menos una compra en la plataforma podrán habilitar la opción de venta.</li>
            <li>Responsabilidad: Los usuarios son responsables de actualizar su información personal, inventario y estado de sus pedidos.</li>
          </ul>

          <Title title='' subtitle='3. Funcionamiento de la Plataforma' />
          <p className='pb-4'>
            <strong>Subida de productos por el vendedor:</strong> Los productos subidos pasan por una validación de hasta 24 horas para asegurar que cumplen con los estándares y políticas de la plataforma antes de ser listados. Es responsabilidad del vendedor proporcionar información precisa y fotografías claras.
          </p>
          <div className='pb-4'>
            <strong>Compra del producto:</strong>
            <ul className='list-inside list-disc'>
              <li>El comprador selecciona el producto y lo agrega al carrito.</li>
              <li>Elige método de envío (a domicilio o recogida en persona).</li>
              <li>Selecciona el método de pago (transferencia bancaria a la cuenta de Bazar Campechano o efectivo contra entrega).</li>
              <li>Confirmación del pedido: El comprador acepta los Términos y Condiciones antes de finalizar la compra.</li>
            </ul>
          </div>
          <p className='pb-4'>
            <strong>Notificación al vendedor:</strong> La plataforma notifica al vendedor sobre el pedido y proporciona los datos del comprador para gestionar la entrega.
          </p>
          <p>
            <strong>Gestión del pedido:</strong>
          </p>
          <ul className='list-inside list-disc pb-2'>
            <li>El vendedor es responsable de cambiar el estado del pedido a &quot;Pagado&quot; y posteriormente a &quot;Entregado&quot; una vez completada la transacción.</li>
            <li>El comprador también debe confirmar en su panel que ha recibido el producto.</li>
          </ul>
          <p className='pb-4'>
            <strong>Liberación del pago:</strong> En caso de pago por transferencia, el dinero se libera al vendedor una vez que ambas partes confirman la operación.
          </p>

          <Title title='' subtitle='4. Políticas de Envío' />
          <p className='pb-4'>
            <strong>Envíos a domicilio:</strong> Disponibles solo para artículos pequeños (ropa, zapatos, peluches, etc.). Los costos de envío se calculan según la ubicación y se agregarán al total de la compra.
          </p>
          <p className='pb-4'>
            <strong>Recogida en persona:</strong> El comprador y el vendedor deben acordar un punto de encuentro a través del sistema de mensajería de la plataforma. La dirección predeterminada del vendedor puede ser utilizada si no hay acuerdo.
          </p>

          <Title title='' subtitle='5. Políticas de Pago' />
          <p className='pb-4'>
            <strong>Transferencias:</strong> El comprador transfiere el monto total (producto + envío) a una cuenta de Bazar Campechano. El pago al vendedor se libera tras la confirmación de entrega.
          </p>
          <p className='pb-4'>
            <strong>Efectivo contra entrega:</strong> El pago se realiza directamente al vendedor en el momento de la entrega.
          </p>

          <Title title='' subtitle='6. Políticas de Reembolso y Devoluciones' />
          <p className='pb-4'>
            No se aceptan devoluciones ni reembolsos debido a la naturaleza de los productos de segunda mano. Los compradores deben revisar las descripciones y fotos detalladamente antes de realizar una compra.
          </p>

          <Title title='' subtitle='7. Sistema de Calificaciones' />
          <p className='pb-4'>
            Tanto compradores como vendedores deben calificar la transacción. Las calificaciones negativas recurrentes pueden resultar en la suspensión o eliminación de la cuenta.
          </p>

          <Title title='' subtitle='8. Responsabilidad' />
          <p className='pb-4'>
            <strong>De los usuarios:</strong> Los vendedores son responsables de actualizar su inventario y gestionar sus pedidos. Los compradores deben confirmar la recepción de los productos en tiempo y forma.
          </p>
          <p className='pb-4'>
            <strong>De la plataforma:</strong> No somos responsables de la calidad, veracidad o entrega de los productos, ya que nuestra función es conectar a las partes involucradas.
          </p>

          <Title title='' subtitle='9. Modificaciones' />
          <p className='pb-4'>
            Nos reservamos el derecho de modificar estos Términos y Condiciones. El uso continuo de la plataforma implica la aceptación de los cambios.
          </p>

          <Title title='' subtitle='10. Ley Aplicable' />
          <p className='pb-4'>
            Estos Términos y Condiciones se rigen por las leyes aplicables en Campeche, México.
          </p>
        </div>

        <NavigationAndContactButtons email={emailAdmin.email} />
      </div>
    </>
  )
}
