import { titleFont } from '@/config/fonts'

interface TitleProps {
  title: string
  subtitle: string
  className?: string
}

export const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`px-3 mb-4 ${className}`}>
      <h1 className={`${titleFont.className} text-xl antialiased`}>{title}</h1>
      {subtitle && (
        <h3 className="text-[56px]">{subtitle}</h3>
      )}
    </div>
  )
}
