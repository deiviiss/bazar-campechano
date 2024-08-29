import { LiaShippingFastSolid } from "react-icons/lia";
import { titleFont } from "@/config/fonts";
import hero from "../../../../public/imgs/hero_image.jpg";
import Image from "next/image";

export const HeaderHero = () => {
  return (
    <>
      <header className="w-full pt-14 bg-slate-300"></header>
      <Image src={hero} alt="hero image" className="object-cover h-[480px]" />
      {/* Contenedor general */}
      <div className="w-full flex gap-10 overflow-hidden bg-[#0E0F0F]">
        {/* Contenedor de items (slider) */}
        <div className="w-full flex gap-10 py-4 slide-track">
          <span
            className={`${titleFont.className} w-full flex items-center gap-2 text-white text-2xl tracking-wider`}
          >
            <LiaShippingFastSolid className="w-10 h-10" /> ENVIO GRATIS A TIENDA
            SIEMPRE Y A DOMICILIO A PARTIR DE $599
          </span>
          <span
            className={`${titleFont.className} w-full flex items-center gap-2 text-white text-2xl tracking-wider`}
          >
            <LiaShippingFastSolid className="w-10 h-10" /> ENVIO GRATIS A TIENDA
            SIEMPRE Y A DOMICILIO A PARTIR DE $599
          </span>
        </div>
        <div className="w-full flex gap-10 py-4 slide-track2">
          <span
            className={`${titleFont.className} w-full flex items-center gap-2 text-white text-2xl tracking-wider`}
          >
            <LiaShippingFastSolid className="w-10 h-10" /> ENVIO GRATIS A TIENDA
            SIEMPRE Y A DOMICILIO A PARTIR DE $599
          </span>
          <span
            className={`${titleFont.className} w-full flex items-center gap-2 text-white text-2xl tracking-wider`}
          >
            <LiaShippingFastSolid className="w-10 h-10" /> ENVIO GRATIS A TIENDA
            SIEMPRE Y A DOMICILIO A PARTIR DE $599
          </span>
        </div>
      </div>
    </>
  );
};
