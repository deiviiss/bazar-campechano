import { notFound } from 'next/navigation'
import { getEmailAdmin } from '@/actions'
import { NavigationAndContactButtons, TitleCategory } from '@/components'

export default async function AboutPage() {
  const { emailAdmin } = await getEmailAdmin()

  if (!emailAdmin) {
    notFound()
  }

  return (
    <div className='px-1 sm:px-3 mt-[60.67px] pt-10'>
      <TitleCategory title="Quiénes Somos" subtitle='' />
      <div className='max-w-[920px]'>
        <div className='px-3 pb-4'>
          <p className='text-base antialiased'>
            Somos Bazar Campechano, una tienda en línea de ropa de segunda mano ubicada en Campeche, México. Nuestra misión es ofrecer ropa de calidad a precios accesibles, promoviendo la sostenibilidad y reduciendo el desperdicio textil.
          </p>
        </div>

        <div className='px-3'>
          <p className='pb-4'>
            Creemos en la reutilización de recursos y en la moda circular, brindando a nuestros clientes la oportunidad de encontrar piezas únicas y asequibles. Nuestro equipo está comprometido con la satisfacción del cliente y con el impacto positivo en el medio ambiente.
          </p>
        </div>

        <NavigationAndContactButtons email={emailAdmin.email} />
      </div>
    </div>
  )
}
