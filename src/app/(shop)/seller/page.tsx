import Image from 'next/image'
import Link from 'next/link'
import { PiPlusBold } from 'react-icons/pi'
import welcomeImg from '../../../../public/imgs/shop-illustration.png'
import { getUserSessionServer } from '@/actions'
import WelcomeBanner from '@/components/banners/welcome'
import HandWaveIcon from '@/components/icons/hand-wave'
import { Button } from '@/components/ui/button'

export default async function SellerPage() {
  // user
  const user = await getUserSessionServer()

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-8 3xl:gap-8">
        <WelcomeBanner
          title={
            <>
              Buen día, <br /> {user?.name}
              <HandWaveIcon className="inline-flex h-8 w-8" />
            </>
          }
          description={
            'Gestiona los productos de tu tienda y mantente al tanto de tus pedidos. ¡Este es tu espacio para crecer como vendedor!'
          }

          media={
            <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
              <div className="relative">
                <Image
                  src={welcomeImg}
                  alt="Welcome shop image form freepik"
                  className="dark:brightness-95 dark:drop-shadow-md"
                />
              </div>
            </div>
          }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-muted bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-8 lg:pb-9 dark:bg-gray-100/30"
        >
          <Button asChild className="h-[38px] shadow md:h-10">
            <Link href='/seller/product/create' className="inline-flex">
              <PiPlusBold className="me-1 h-4 w-4" /> Agregar producto
            </Link>
          </Button>
        </WelcomeBanner>

      </div>
    </div>
  )
}
