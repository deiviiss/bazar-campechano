import { titleFont } from '@/config/fonts'

interface TitleProps {
  title: string
  subtitle: string
  className?: string
}

export const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className={`${titleFont.className} min-[450px]:text-4xl text-3xl antialiased title-category`}>{title}</h1>
      {subtitle && (
        <h3 className={`${titleFont.className} text-xl mt-1 mb-1 antialiased`}>{subtitle}</h3>
      )}
    </div>
  )
}
