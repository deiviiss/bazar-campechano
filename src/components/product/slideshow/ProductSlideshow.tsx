'use client'

import { ProductImage } from '@/components'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

interface ProductSlideshowProps {
  images: string[]
  title: string
}

export const ProductSlideshow = ({ images, title }: ProductSlideshowProps) => {
  return (
    <Carousel className="w-full"
      autoplay={5000}>
      <CarouselContent>
        {images.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-0 flex items-center justify-center">
              <Card>
                <CardContent className=" w-full flex aspect-square items-center justify-center">
                  <ProductImage
                    width={600}
                    height={500}
                    src={item}
                    alt={title}
                    className='object-fill'
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
