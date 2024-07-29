import { IoCardOutline } from 'react-icons/io5'
import { MenuOptions, PaymentMethodNameWithIcon, StatusNameWithIcon } from '@/components'
import { type IOrder } from '@/interfaces'

interface Orders {
  orders: IOrder[]
}

export const TableOrder = ({ orders }: Orders) => {
  return (
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
            Método de pago
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
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
              <td className="text-sm text-gray-900 font-light px-6 text-center">
                {PaymentMethodNameWithIcon(order.paymentMethod)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 text-center">
                <MenuOptions order={order} />
              </td>

            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
