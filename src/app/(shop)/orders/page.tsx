import Link from 'next/link'
import { IoCardOutline } from 'react-icons/io5'
import { getOrdersByUser } from '@/actions'
import { CardOrder, Pagination, StatusNameWithIcon, Title } from '@/components'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { orders, totalPages } = await getOrdersByUser({ page })

  if (!orders) {
    return (
      <div className='flex flex-col gap-3 items-center justify-center h-[300px] max-w-[920px] my-5 text-center mx-auto'>

        <h1>No tienes pedidos registradas</h1>

        <Link href="/" className='hover:underline font-medium'>
          Comienza a comprar
        </Link>

      </div>
    )
  }

  const processOrders = orders?.map(order => {
    const orderItem = {
      id: order.id,
      name: `${order.orderAddresses?.firstName} ${order.orderAddresses?.lastName}`,
      isPaid: order.isPaid,
      status: order.status,
      paymentMethod: order.paymentMethod,
      userId: order.userId
    }

    return orderItem
  })

  return (
    <>
      <Title title="Pedidos" subtitle='Lista de pedidos' />

      <div className='sm:hidden w-full flex flex-col gap-3 mb-10'>
        {processOrders?.map(order => (
          <CardOrder
            key={order.id}
            order={order} />
        ))}
      </div>

      <div className="hidden sm:block mb-10 overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado del pago
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado del pedido
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map(order => (
                <tr
                  key={order.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id.split('-').at(-1)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.orderAddresses?.firstName} {order.orderAddresses?.lastName}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {
                      order.isPaid
                        ? (
                          <>
                            <IoCardOutline className="text-green-800" />
                            <span className='mx-2 text-green-800'>
                              Pagado
                            </span>
                          </>)
                        : (
                          <>
                            <IoCardOutline className="text-red-800" />
                            <span className='mx-2 text-red-800'>No Pagado</span>
                          </>)
                    }
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <StatusNameWithIcon status={order.status} />
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link
                      href={`/orders/${order.id}`}
                      className="hover:underline">
                      Ver pedido
                    </Link>
                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
      <Pagination totalPages={totalPages || 1} />
    </>
  )
}
