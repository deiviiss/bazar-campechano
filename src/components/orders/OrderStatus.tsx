import clsx from 'clsx'
import { IoCardOutline } from 'react-icons/io5'

interface Props {
  isPaid: boolean
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={
        clsx(
          'flex items-center rounded-none py-2 px-3.5 text-xs font-bold text-white mb-5',
          {
            'bg-green-700': isPaid,
            'bg-red-500': !isPaid
          }
        )
      }
    >
      <IoCardOutline size={30} className='mr-2' />
      <span>{isPaid ? 'Pagado' : 'Pendiente de pago'}</span>
    </div>
  )
}
