'use client'

import { useEffect, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'
import { Thumbnails } from './Thumbnails'
import { ProductImage } from '../product-image/ProductImage'

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
            <button
              onClick={handlePrevClick}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors duration-300"
              aria-label="Previous image"
            >
              <BsChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={handleNextClick}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors duration-300"
              aria-label="Next image"
            >
              <BsChevronRight className="w-6 h-6 text-gray-800" />
            </button>
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

// export const ProductSlideshow = ({ images, altText }: ProductSlideshowProps) => {
//   console.log(images)
//   return (
//     <Carousel className="w-full"
//       autoplay={5000}>
//       <CarouselContent>
//         {images.map((item, index) => (
//           <CarouselItem key={index}>
//             <div className="p-0 flex items-center justify-center">
//               <Card>
//                 <CardContent className=" w-full flex aspect-square items-center justify-center">
//                   <ProductImage
//                     width={600}
//                     height={500}
//                     src={item.src}
//                     alt={altText}
//                     className='object-fill'
//                   />
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   )
// }
