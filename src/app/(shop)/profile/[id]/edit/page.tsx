import { redirect } from 'next/navigation'
import { getUserById } from '@/actions'
import { EditForm, Title } from '@/components'

interface Props {
  params: {
    id: string
  }
}

export default async function EditUserPage({ params }: Props) {
  const { id } = params
  const { user } = await getUserById(id)

  if (!user) {
    redirect('/')
  }

  return (
    <div className='w-full m-auto sm:w-[350px]'>
      <Title title="Editar perfil" subtitle='Edición del perfil de usuario' />

      <EditForm {...user} />
    </div>
  )
}
