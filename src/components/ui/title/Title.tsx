import { titleFont } from '@/config/fonts'

interface TitleProps {
  title: string
  subtitle: string
  className?: string
}

export const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`${titleFont.className} antialiased font-semibold mt-7 mb-3`}>{title}</h1>
      {subtitle && (
        <h3 className="text-base mb-5">{subtitle}</h3>
      )}
    </div>
  )
}
