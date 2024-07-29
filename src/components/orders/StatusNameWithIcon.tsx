import { type Status } from '@prisma/client'
import { BsTruck } from 'react-icons/bs'
import { CiSquareCheck } from 'react-icons/ci'
import { IoHourglass, IoWalletOutline } from 'react-icons/io5'
import { statusNameSpanish } from '@/utils'

interface Props {
  status: Status
}

export const StatusNameWithIcon = ({ status }: Props) => {
  if (status === 'unpaid') {
    return (
      <div className='flex items-center'>
        <IoWalletOutline className="text-yellow-700" />
        <span className='mx-1 text-yellow-700'>
          {statusNameSpanish[status]}
        </span>
      </div>
    )
  }

  if (status === 'paided') {
    return (
      <div className='flex items-center'>
        <IoHourglass className="text-yellow-700" />
        <span className='mx-1 text-yellow-700'>
          {statusNameSpanish[status]}
        </span>
      </div>
    )
  }

  if (status === 'shipped') {
    return (
      <div className='flex items-center'>
        <BsTruck className="text-yellow-800" />
        <span className='mx-1 text-yellow-800'>
          {statusNameSpanish[status]}
        </span>
      </div>
    )
  }

  if (status === 'delivered') {
    return (
      <div className='flex items-center'>
        <CiSquareCheck className="text-green-800" />
        <span className='mx-1 text-green-800'>
          {statusNameSpanish[status]}
        </span>
      </div>
    )
  }
}
