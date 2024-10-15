import { titleFont } from '@/config/fonts'

interface TitleProps {
  title: string
  subtitle: string
  className?: string
}

export const TitleHome = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`px-3 mb-4 ${className}`}>
      <h1 className={`${titleFont.className} text-4xl sm:text-[40px] antialiased`}>{title}</h1>
      {subtitle && (
        <h3 className="-mt-2 text-5xl sm:text-[56px] font-black">{subtitle}</h3>
      )}
    </div>
  )
}
