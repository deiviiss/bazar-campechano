import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FaStore } from 'react-icons/fa'
import { getUserSessionServer } from '@/actions'
import { Title } from '@/components'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export default async function PickupDetailsPage() {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/auth/login')
  }

  const pickupAddress = {
    place: 'Retiro en punto de venta',
    userName: user.name,
    address: 'Calle Lic José María Iglesias',
    postalCode: '24088',
    phone: '9811250049',
    city: 'Campeche',
    country: 'MX'
  }

  return (
    <>
      <Title title="Detalles de Entrega" subtitle='' />

      <Card className="overflow-hidden max-w-[600px] mx-auto mb-10 shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gray-100 text-lg font-medium text-center py-4">
          ¡Vamos a prepar tu pedido!
        </CardHeader>

        <CardContent className="p-6 pb-4 text-gray-700">
          <p className="mb-4">Tu pedido estará listo para ser entregado en el punto de entrega una vez completado el pago.</p>

          <p className="mb-4"><span className='font-medium'>Horarios de atención:</span> Lunes a Viernes de 9am a 6pm.</p>

          <p className='font-medium'>{pickupAddress.place}</p>
          <p className='mb-2'>{pickupAddress.userName}</p>
          <p className='font-medium'>Dirección</p>
          <p>{pickupAddress.address}</p>
          <p>{pickupAddress.city}, {pickupAddress.country} {pickupAddress.postalCode}</p>
          <p className='mb-4'>Teléfono: {pickupAddress.phone}</p>
          <p className="mb-4">Recuerda presentar tu DNI al momento de recibir tu pedido.</p>
        </CardContent>

        <CardFooter className='flex justify-center gap-4 w-full px-4 pb-6 bg-white'>
          <Button
            asChild
            variant='primary'
            className="w-3/4" >
            <Link href="/checkout/way-to-pay?shipping-method=pickup" className="text-white no-underline flex items-center justify-center">
              <FaStore className='mx-1 w-3.5 h-3.5' />
              Forma de pago
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
