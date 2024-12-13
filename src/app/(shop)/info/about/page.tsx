import { notFound } from 'next/navigation'
import { getEmailAdmin } from '@/actions'
import { NavigationAndContactButtons, TitleCategory } from '@/components'

export default async function AboutPage() {
  const { emailAdmin } = await getEmailAdmin()

  if (!emailAdmin) {
    notFound()
  }

  return (
    <>
      <TitleCategory title="Quiénes Somos" subtitle='' />
      <div className='max-w-[920px]'>
        <div className='px-3 pb-4'>
          <p className='text-base antialiased'>
            <strong>Bazar Campechano</strong> es una comunidad en línea donde los usuarios pueden comprar y vender ropa y artículos de segunda mano de manera sencilla y segura. Esta plataforma está diseñada para que cualquier usuario registrado que ya haya realizado una compra pueda también vender los artículos que ya no utiliza, fomentando un intercambio dinámico y accesible para todos. El proyecto combina la funcionalidad de un bazar tradicional con la comodidad del comercio electrónico, ofreciendo una experiencia amigable y directa.
          </p>
        </div>

        <div className='px-3'>
          <h2 className='text-lg font-semibold pb-2'>Propuesta de Valor</h2>
          <h3 className='text-base font-medium pb-2'>La Solución: Una Comunidad para Comprar y Vender</h3>
          <p className='pb-4'>
            En <strong>Bazar Campechano</strong>, creemos en facilitar el intercambio de valor entre personas, transformando artículos en desuso en oportunidades para otros. Nuestra plataforma permite a los usuarios:
          </p>
          <ul className='list-disc pl-6 pb-4'>
            <li><strong>Vender lo que ya no usan</strong>: Artículos únicos que merecen una segunda oportunidad.</li>
            <li><strong>Comprar artículos de segunda mano</strong>: Productos en excelente estado y a precios accesibles.</li>
          </ul>
          <p className='pb-4'>
            Con un enfoque claro en la simplicidad y la accesibilidad, hemos creado un espacio donde cada pieza es única y tiene un nuevo propósito.
          </p>
        </div>

        <div className='px-3'>
          <h3 className='text-base font-medium pb-2'>Lo que ofrecemos</h3>
          <ul className='list-disc pl-6 pb-4'>
            <li><strong>Simplicidad</strong>: Una plataforma intuitiva y fácil de usar, tanto para compradores como para vendedores.</li>
            <li><strong>Transparencia</strong>: Sin complicaciones ni comisiones ocultas; todo el valor de las transacciones es para los usuarios.</li>
            <li><strong>Seguridad</strong>: Herramientas de moderación y verificación para garantizar una experiencia confiable.</li>
            <li><strong>Exclusividad</strong>: Cada artículo publicado es único, destacando su valor personal y práctico.</li>
          </ul>
        </div>

        <div className='px-3'>
          <h3 className='text-base font-medium pb-2'>Nuestra Diferencia</h3>
          <p className='pb-4'>
            A diferencia de otras plataformas, en <strong>Bazar Campechano</strong> nos enfocamos en crear una <strong>comunidad de intercambio de valor</strong>:
          </p>
          <ul className='list-disc pl-6 pb-4'>
            <li><strong>Productos únicos</strong>: Todo lo que encuentras aquí es especial, reflejando el carácter personal del bazar.</li>
            <li><strong>Una experiencia sin barreras</strong>: Diseñada para que cualquiera pueda participar fácilmente, incluso si no tiene experiencia en comercio electrónico.</li>
          </ul>
        </div>

        <div className='px-3'>
          <h3 className='text-base font-medium pb-2'>Un Proyecto Personal con un Propósito</h3>
          <p className='pb-4'>
            <strong>Bazar Campechano</strong> nació como un proyecto personal para compartir artículos propios, pero ahora se expande para que más personas puedan participar. Cada compra y venta ayuda a sostener esta comunidad, mientras promovemos un consumo más consciente y conectado.
          </p>
        </div>

        <NavigationAndContactButtons email={emailAdmin.email} />
      </div>
    </>
  )
}
