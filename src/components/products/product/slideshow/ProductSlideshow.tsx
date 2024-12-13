'use client'

import { useEffect, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'
import { Thumbnails } from './Thumbnails'
import { ProductImage } from '../product-image/ProductImage'
import { Button } from '@/components/ui/button'

interface ProductSlideshowProps {
  images: Array<{
    id: string
    src: string
  }>
  altText: string
}

export const ProductSlideshow = ({ images, altText }: ProductSlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row-reverse gap-4 sm:h-fit sm:px-1">

      {/* Main Image */}
      {isLoaded
        ? (
          <div className="relative w-full flex justify-center transition-all">
            <ProductImage
              width={600}
              height={500}
              src={images[currentImageIndex]?.src}
              alt={altText}
              className='object-cover'
            />

            {/* Navigation Arrows */}
            <Button
              onClick={handlePrevClick}
              size={'icon'}
              className="absolute left-0 sm:left-2 top-1/2"
              aria-label="Previous image"
            >
              <BsChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size={'icon'}
              onClick={handleNextClick}
              className="absolute right-0 sm:right-2 top-1/2 "
              aria-label="Next image"
            >
              <BsChevronRight className="w-5 h-5" />
            </Button>
          </div>)
        : (
          <div className="flex flex-col h-96 w-full items-center justify-center transition-all bg-slate-200">
            <CgSpinner className='text-primary animate-spin' />
          </div>)
      }

      {/* Thumbnails */}
      <Thumbnails
        images={images}
        altText={altText}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />

    </div>
  )
}
