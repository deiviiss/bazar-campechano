import Image from 'next/image'
import { LiaShippingFastSolid } from 'react-icons/lia'
import hero from '../../../../public/imgs/hero_image.webp'
import { titleFont } from '@/config/fonts'

export const HeaderHero = () => {
  return (
    <>
      <header className="w-full mt-[157.67px] min-[487px]:mt-[141.67px] sm:mt-[100.67px] bg-slate-300"></header>
      <Image
        src={hero}
        alt="hero image"
        className="object-cover h-[480px]"
        priority
      />
      {/* main container */}
      <div className="w-full overflow-hidden bg-primary">
        {/* slider container */}
        <div className="flex gap-10 items-center py-3 sm:py-4 whitespace-nowrap slide-track">

          <span
            className={`${titleFont.className} flex items-center gap-2 text-white text-2xl tracking-wider`}
          >
            <LiaShippingFastSolid className="w-10 h-10" />ENVIÓ GRATIS A TIENDA
            SIEMPRE Y A DOMICILIO A PARTIR DE $199
          </span>
          <span
            className={`${titleFont.className} w-full flex items-center gap-2 text-white text-2xl tracking-wider`}
          >
            <LiaShippingFastSolid className="w-10 h-10" /> ENVIÓ GRATIS A TIENDA
            SIEMPRE Y A DOMICILIO A PARTIR DE $199
          </span>
          <span
            className={`${titleFont.className} w-full flex items-center gap-2 text-white text-2xl tracking-wider`}
          >
            <LiaShippingFastSolid className="w-10 h-10" /> ENVIÓ GRATIS A TIENDA
            SIEMPRE Y A DOMICILIO A PARTIR DE $199
          </span>
          <span
            className={`${titleFont.className} w-full flex items-center gap-2 text-white text-2xl tracking-wider`}
          >
            <LiaShippingFastSolid className="w-10 h-10" /> ENVIÓ GRATIS A TIENDA
            SIEMPRE Y A DOMICILIO A PARTIR DE $199
          </span>
          <span
            className={`${titleFont.className} w-full flex items-center gap-2 text-white text-2xl tracking-wider`}
          >
            <LiaShippingFastSolid className="w-10 h-10" /> ENVIÓ GRATIS A TIENDA
            SIEMPRE Y A DOMICILIO A PARTIR DE $199
          </span>
        </div>

      </div>
    </>
  )
}
