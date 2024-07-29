import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'

export default function EmptyPage() {
  return (
    <div className='flex justify-center items-center h-[400px]' >
      <IoCartOutline size={90} className="mx-5" />

      <div>
        <h1>Tu carrito está vacío</h1>

        <Link href="/" className='text-blue-500 mt-2 text-4xl'>
          Comprar
        </Link>
      </div>
    </div>
  )
}
