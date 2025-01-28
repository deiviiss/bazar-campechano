import { notFound } from 'next/navigation'
import { getEmailAdmin } from '@/actions'
import { NavigationAndContactButtons, Title, TitleCategory } from '@/components'

export default async function FaqPage() {
  const { emailAdmin } = await getEmailAdmin()

  if (!emailAdmin) {
    notFound()
  }

  return (
    <>
      <TitleCategory title="Preguntas Frecuentes" subtitle='' />
      <div className='max-w-[920px]'>
        <div className='px-3 pb-4'>
          <Title title='' subtitle='¿Cómo realizo una compra?' />
          <p>
            Para realizar una compra en Bazar Campechano, sigue estos pasos:
          </p>
          <ul className="list-inside list-disc pb-4">
            <li>Regístrate en nuestra plataforma si aún no lo has hecho.</li>
            <li>Navega por los productos disponibles y selecciona los que deseas agregar a tu carrito.</li>
            <li>Procede al pago seleccionando un método de pago seguro (transferencia bancaria).</li>
            <li>Elige el método de envío que más te convenga, ya sea entrega a domicilio o recogida en el punto acordado con el vendedor.</li>
            <li>Confirma el pedido y acepta nuestros términos y condiciones.</li>
          </ul>

          <Title title='' subtitle='¿Cómo puedo vender un artículo?' />
          <p className='pb-1'>
            Para vender en Bazar Campechano, debes ser un usuario registrado y haber realizado al menos una compra. Una vez que estés registrado, sigue estos pasos:
          </p>
          <ul className="list-inside list-disc pb-4">
            <li>Accede a tu cuenta y dirígete a tu perfil y haz click en la opción de activar vendedor. Se activará el menu de vendedor.</li>
            <li>Accede a la sección de productos y haz click en el botón &quot;Agregar producto&quot; para agregar un nuevo producto.</li>
            <li>Completa los detalles del producto (nombre, descripción, fotos, precio) y publícalo en la plataforma.</li>
            <li>El producto será validado por el equipo de Bazar Campechano antes de ser mostrado en la plataforma. Este proceso puede demorar hasta 24 horas.</li>
          </ul>

          <Title title='' subtitle='¿Por qué mi producto no aparece en la plataforma inmediatamente después de subirlo?' />
          <p className='pb-4'>
            Cuando subes un producto, nuestro equipo realiza una validación para asegurarse de que cumpla con los estándares de calidad y las políticas de la plataforma. Este proceso puede tardar hasta 24 horas. Una vez aprobado, tu producto estará disponible para la compra en la plataforma.
          </p>

          <Title title='' subtitle='¿Qué tipos de productos puedo vender?' />
          <p className='pb-4'>
            En Bazar Campechano puedes vender productos de segunda mano, principalmente ropa, zapatos y juguetes. Asegúrate de que los productos estén en buenas condiciones y bien descritos, ya que esto facilitará la venta.
          </p>

          <Title title='' subtitle='¿Cómo se procesan los pagos?' />
          <p className='pb-4'>
            Cuando un comprador realiza un pedido, el pago se transfiere inicialmente a una cuenta de Bazar Campechano para garantizar la seguridad de la transacción. Una vez que el comprador confirma la recepción del artículo, el pago es liberado al vendedor. Si la compra fue mediante transferencia bancaria, la plataforma realizará la transferencia al vendedor una vez que se complete la transacción.
          </p>

          <Title title='' subtitle='¿Puedo cancelar un pedido después de haberlo realizado?' />
          <p className='pb-4'>
            No aceptamos cancelaciones una vez que el pedido ha sido confirmado y pagado. Sin embargo, puedes contactar directamente al vendedor para intentar llegar a un acuerdo si surge un problema con el pedido.
          </p>

          <Title title='' subtitle='¿Cómo puedo saber si mi pedido ha sido enviado?' />
          <p className='pb-4'>
            Cuando el vendedor envíe tu producto, se te notificará a través de la plataforma. También podrás ver el estado del pedido en tu panel de usuario. Si el producto es entregado en persona, ambos usuarios deben confirmar que la operación se ha completado para proceder con el pago al vendedor.
          </p>

          <Title title='' subtitle='¿Qué pasa si el producto que compré no es como se describe?' />

          <p>
            Si el artículo que compraste no coincide con la descripción o las imágenes en el momento de la entrega:
          </p>
          <ul className="pl-6 pb-1 list-disc list-inside">
            <li>
              <span>Si la compra fue en efectivo:</span> simplemente no aceptarás el producto, y la transacción no se completará.
            </li>
            <li>
              <span>Si el pago fue por transferencia u otro método:</span> el bazar te devolverá el dinero. Sin embargo, el costo del envío será cargado al comprador.
            </li>
          </ul>

          <p className='pb-4'>
            Es fundamental que los vendedores suban información precisa y válida sobre sus productos para evitar inconvenientes. Además, se recomienda a los compradores revisar los artículos al momento de la entrega siempre que sea posible.
          </p>

          <Title title='' subtitle='¿Realizan envíos fuera de Campeche?' />
          <p className='pb-4'>
            Actualmente, los envíos solo están disponibles dentro de la ciudad de Campeche. Los usuarios también tienen la opción de coordinar la recogida de productos directamente con el vendedor.
          </p>

          <Title title='' subtitle='¿Puedo cambiar o devolver un producto?' />
          <p className='pb-4'>
            Dado que los productos son de segunda mano, no aceptamos devoluciones, excepto en casos en los que el producto llegue dañado o sea incorrecto. Para más detalles, consulta nuestros <a href='/info/terms' className='hover:underline hover:text-warning font-semibold'>Términos y Condiciones</a>.
          </p>

          <Title title='' subtitle='¿Cómo puedo calificar a un vendedor o comprador?' />
          <p className='pb-4'>
            Una vez que se haya completado una transacción, ambos usuarios podrán calificar la experiencia en la plataforma. Las calificaciones ayudarán a otros usuarios a tomar decisiones informadas y a mantener un ambiente de confianza dentro de la comunidad.
          </p>

          <Title title='' subtitle='¿Es seguro comprar y vender en Bazar Campechano?' />
          <p>
            Bazar Campechano es una comunidad en línea que conecta compradores y vendedores de forma directa, ofreciendo herramientas como calificaciones de usuarios y vendedores para fomentar la confianza en la plataforma. Aunque no somos intermediarios y no podemos garantizar las transacciones, hemos diseñado un sistema para facilitar el intercambio seguro, incluyendo un sistema de validación de productos antes de su publicación y un historial de calificaciones para evaluar a las partes involucradas.
          </p>
          <p className='pb-4'>Es importante que tanto compradores como vendedores actúen con responsabilidad y transparencia para que las operaciones se desarrollen de manera satisfactoria.</p>

          <Title title='' subtitle='¿Qué pasa si tengo un problema con un pedido?' />
          <p>
            Si tienes un problema con un pedido, el manejo dependerá del método de pago:
          </p>
          <ul className="pl-6 pb-1 list-disc list-inside">
            <li>
              Si pagaste por transferencia, el bazar puede devolverte el dinero, y el vendedor recibirá una calificación negativa.
            </li>
            <li>
              Si pagaste en efectivo, el efectivo no habrá sido entregado y el vendedor será calificado negativamente en caso de incumplimiento.
            </li>
          </ul>

          <p className='pb-4'>
            Bazar Campechano no actúa como intermediario en las transacciones, pero fomenta un entorno confiable mediante la puntuación de vendedores y compradores, lo que permite identificar a quienes cumplan o no con sus responsabilidades.
          </p>

          <Title title='' subtitle='¿Qué hago si mi inventario no se actualiza correctamente?' />
          <p className='pb-4'>
            Es responsabilidad del vendedor actualizar su inventario y marcar los productos como entregados una vez que se complete la transacción. Si el inventario no se actualiza correctamente, por favor revisa el estado de tus pedidos y actualiza el sistema manualmente. En caso de dudas, contacta con nuestro soporte.
          </p>

          <Title title='' subtitle='¿Puedo vender productos si no soy de Campeche?' />
          <p className='pb-4'>
            Para vender productos, es necesario estar registrado en la plataforma y ser parte de nuestra comunidad. Aunque solo realizamos envíos dentro de Campeche, los vendedores pueden coordinar con los compradores la entrega o recogida de los productos.
          </p>

          <Title title='' subtitle='¿Cómo puedo contactar con el servicio de atención al cliente?' />
          <p className='pb-4'>
            Si tienes preguntas adicionales o necesitas ayuda, puedes enviarnos un correo electrónico a <a href={`mailto:${emailAdmin.email}`} className='hover:underline hover:text-warning font-semibold'>{emailAdmin.email}</a> o llamarnos al +52 (981) 209-9475.
          </p>
        </div>

        <NavigationAndContactButtons email={emailAdmin.email} />
      </div>
    </>
  )
}
