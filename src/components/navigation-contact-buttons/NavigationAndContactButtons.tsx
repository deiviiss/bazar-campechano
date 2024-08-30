import Link from 'next/link'
import { IoArrowBackOutline } from 'react-icons/io5'
import { ButtonBack } from '@/components'
import { Button } from '@/components/ui/button'

interface Props {
  email: string
}

export const NavigationAndContactButtons = ({ email }: Props) => {
  return (
    <div className='grid justify-center w-full gap-2 m-8 text-center mx-auto min-[350px]:grid-cols-2 min-[400px]:gap-4 max-w-96 px-3'>
      <Button asChild className=' uppercase'>
        <Link target='_blank' href={`mailto:${email}?subject=Consulta%20sobre%20Términos%20y%20Condiciones`}>
          Contáctanos
        </Link>
      </Button>

      <ButtonBack className='text-gray-500 hover:no-underline hover:text-gray-900 gap-1 border-black border' name='VOLVER' icon={<IoArrowBackOutline />} />

    </div>
  )
}
