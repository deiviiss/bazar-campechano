'use client'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'

interface Props {
  src?: string
  alt: string
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
  width: number
  height: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  onMouseEnter,
  onMouseLeave
}: Props) => {
  const isFileSystem = src?.startsWith('file-system')

  const imageSrc = (src)
    ? isFileSystem
      ? `/products/${src}`
      : src
    : '/imgs/placeholder.jpg'

  return !isFileSystem
    ? (
      <CldImage
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        crop={{
          type: 'thumb',
          source: true
        }}
        sizes="100vw"
      />)
    : (
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />)
}
