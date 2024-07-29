import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoPencil } from 'react-icons/io5'
import { getUserById, getUserSessionServer } from '@/actions'
import { Title } from '@/components'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Perfil de usuario',
  description: 'Contiene la información del usuario.'
}

const ProfilePage = async () => {
  const userSession = await getUserSessionServer()

  if (!userSession) {
    redirect('/')
  }

  const { user } = await getUserById(userSession.id)

  if (!user) {
    redirect('/')
  }

  const userName = user.name || 'Nombre de usuario'
  const userImage = user.image || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
  const userMail = user.email || 'Correo electrónico'
  const userPhoneNumber = user.phoneNumber || 'Número de teléfono'

  return (
    <Card className='mb-10 pb-10 max-w-[400px] mx-auto' >
      <CardHeader className='text-center'>
        <Title title='Perfil' subtitle='' />
      </CardHeader>

      <CardContent className='flex justify-center'>
        <Image src={userImage} alt={userName} width={100} height={100} className='rounded-full' />
      </CardContent>

      <CardContent >
        <div className=' flex justify-end'>
          <Button asChild variant='outline' size='sm' className='gap-1'>
            <Link href={`/profile/${user.id}/edit`} className='text-[10px]'>
              <IoPencil />
              <span className='hidden sm:flex'>Editar</span>
            </Link>
          </Button>
        </div>

        <p><span className='font-semibold'>Nombre:</span> {userName}</p>
        <p><span className='font-semibold'>Correo:</span> {userMail}</p>
        <p><span className='font-semibold'>Teléfono:</span> {userPhoneNumber}</p>

        <Button asChild variant='primary' size='sm' className='flex mx-auto w-3/4 mt-10'>
          <Link href='/orders'>
            <span>Mis pedidos</span>
          </Link>
        </Button>
      </CardContent>

    </Card>
  )
}

export default ProfilePage
