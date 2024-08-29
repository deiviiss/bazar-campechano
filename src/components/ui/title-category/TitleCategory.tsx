import { titleFont } from '@/config/fonts'

interface TitleProps {
  title: string
  subtitle: string
  className?: string
}

export const TitleCategory = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`px-3 mb-[2.5rem] ${className}`}>
      <h1 className={`${titleFont.className} min-[450px]:text-[40px] text-4xl antialiased title-category`}>{title}</h1>
      {subtitle && (
        <h3 className=" min-[450px]:text-[56px] text-5xl font-black">{subtitle}</h3>
      )}
    </div>
  )
}
