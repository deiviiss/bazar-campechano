'use client'

import { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { Thumbnails } from './Thumbnails'
import { ProductImage } from '../product-image/ProductImage'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

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
  console.log('images', images)
  // const handlePrevClick = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //   )
  // }

  // const handleNextClick = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //   )
  // }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row-reverse gap-4 sm:h-fit sm:px-1">

      {/* Main Image */}
      {isLoaded
        ? (
          <Carousel
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
            className="relative w-full flex justify-center transition-all">
            <CarouselContent>
              {images.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-0 flex items-center justify-center">
                    <Card className='p-0 w-full h-full overflow-hidden'>
                      <CardContent className="p-0">
                        <ProductImage
                          width={600}
                          height={500}
                          src={item.src}
                          alt={altText}
                          className='object-cover'
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant={'default'} className='rounded-none hidden sm:flex' />
            <CarouselNext variant={'default'} className='rounded-none hidden sm:flex' />
          </Carousel>)
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
