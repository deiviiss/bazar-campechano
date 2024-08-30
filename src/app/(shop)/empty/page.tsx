import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'
import { getPaginationProducts } from '@/actions'
import { CurrentProductsGrid, TitleCategory } from '@/components'
import { Button } from '@/components/ui/button'

export default async function EmptyPage() {
  const { products } = await getPaginationProducts({ page: 1 })
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

      <div className='pb-10 mb-10 border-t border-black'>
        <TitleCategory
          title="Recomendados para ti"
          subtitle="Lo más nuevo"
          className='text-center uppercase pt-10'
        />
        <CurrentProductsGrid products={products} />
        <Button asChild variant='outline' className='flex justify-center mx-auto w-3/4 max-w-32 uppercase bg-transparent mt-[52px]'>
          <Link href='/products'>
            ver todo
          </Link>
        </Button>
      </div>
    </>
  )
}
