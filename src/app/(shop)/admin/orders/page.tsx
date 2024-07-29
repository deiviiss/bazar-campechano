import Link from 'next/link'
import { getPaginatedOrders, validateUserAdmin } from '@/actions'
import { CardOrderAdmin, Pagination, TableOrder, Title } from '@/components'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrdersPage({ searchParams }: Props) {
  await validateUserAdmin()

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { orders, totalPages } = await getPaginatedOrders({ page })

  if (!orders) {
    return (
      <div className='flex flex-col gap-3 items-center justify-center h-[300px] max-w-[920px] mx-auto my-5 text-center'>

        <h1>No se ha hecho ninguna pedido</h1>

        <Link href="/" className='hover:underline'>
          Haz una compra!
        </Link>

      </div>
    )
  }

  const processOrders = orders?.map(order => {
    const orderItem = {
      id: order.id,
      name: `${order.orderAddresses?.firstName} ${order.orderAddresses?.lastName}`,
      isPaid: order.isPaid,
      paymentMethod: order.paymentMethod,
      status: order.status,
      userId: order.userId
    }

    return orderItem
  })

  return (
    <>
      <Title title="Todos los pedidos" subtitle='Lista de pedidos de todos los usuarios' />

      <div className='sm:hidden w-full flex flex-col gap-3 mb-10'>
        {processOrders?.map(order => (
          <CardOrderAdmin
            key={order.id}
            order={order} />
        ))}
      </div>

      <div className="hidden sm:block mb-10 overflow-auto">
        <TableOrder orders={orders} />
      </div>
      <Pagination totalPages={totalPages || 1} />
    </>
  )
}
