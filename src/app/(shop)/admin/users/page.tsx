import { redirect } from 'next/navigation'
import { getPaginatedUsers } from '@/actions'
import { CardUser, Pagination, Title, UsersTable } from '@/components'

export const revalidate = 0

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function UsersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { ok, users = [], totalPages } = await getPaginatedUsers({ page })

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" subtitle='Lista de todos los usuarios' />

      <div className='sm:hidden w-full flex flex-col gap-3 mb-10'>
        {
          users.map(user => (
            <CardUser
              key={user.id}
              user={user}
            />
          ))
        }
      </div>

      <div className="hidden sm:block mb-10 overflow-auto">
        <UsersTable users={users} />

      </div>
      <Pagination totalPages={totalPages || 1} />
    </>
  )
}
