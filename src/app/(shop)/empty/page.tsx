import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'

export default async function EmptyPage() {
  return (
    <>
      <div className='flex justify-center items-center h-[400px] mt-[60.67px] pt-10' >
        <IoCartOutline size={90} className="mx-5" />

        <div>
          <h1>Tu carrito está vacío</h1>

          <Link href="/" className='text-black mt-2 text-4xl hover:text-black/80'>
            Comprar
          </Link>
        </div>
      </div>
    </>
  )
}
