import Link from 'next/link'
import { FaHome, FaTruck } from 'react-icons/fa'
import { Title } from '@/components'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export default async function ShippingMethodPage() {
  return (
    <>
      <Title title="Forma de envío" subtitle='' />

      <Card className="overflow-hidden max-w-[600px] mx-auto mb-10 shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gray-100 text-lg font-medium text-center py-4">
          Selecciona una forma de envío
        </CardHeader>

        <CardContent className="p-6 pb-4 text-gray-700">
          <p className="mb-4 text-center">Elige cómo deseas recibir tu pedido.</p>
        </CardContent>

        <CardFooter className='grid min-[500px]:grid-cols-2 justify-center gap-4 w-full px-4 pb-6 bg-white'>

          <Button variant='primary' className="w-full">
            <Link href="/checkout/pickup-details" className="text-white no-underline flex items-center justify-center">
              <FaHome className='mx-1 w-3.5 h-3.5' />
              Retirar en punto de venta
            </Link>
          </Button>

          <Button variant='primary' className="w-full">
            <Link href="/checkout/address" className="text-white no-underline flex items-center justify-center">
              <FaTruck className='mx-1 w-3.5 h-3.5' />
              Envío a domicilio
            </Link>
          </Button>

        </CardFooter>
      </Card>
    </>
  )
}
