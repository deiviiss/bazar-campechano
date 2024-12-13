'use client'

import { useEffect, useRef, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { MdArrowBackIos, MdArrowForwardIos, MdExpandLess, MdExpandMore } from 'react-icons/md'
import { ProductImage } from '../product-image/ProductImage'
import { Button } from '@/components/ui/button'

interface ImageProps {
  images: Array<{
    id: string
    src: string
  }>
  altText: string
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
}

export const Thumbnails = ({ images, altText, currentImageIndex, setCurrentImageIndex }: ImageProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isLeftDisabled, setIsLeftDisabled] = useState(true)
  const [isRightDisabled, setIsRightDisabled] = useState(false)
  const [isTopDisabled, setIsTopDisabled] = useState(true)
  const [isDownDisabled, setIsDownDisabled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const checkScrollLimitsHorizontal = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setIsLeftDisabled(scrollLeft === 0) // disability if it is at the beginning
      setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth) // disability if it is at the end
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
      checkScrollLimitsHorizontal() // verify limits after scrolling
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
      checkScrollLimitsHorizontal() // verify limits after scrolling
    }
  }

  const checkScrollLimitsVertical = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      setIsTopDisabled(scrollTop === 0) // disability if it is at the beginning
      setIsDownDisabled(scrollTop + clientHeight >= scrollHeight) // disability if it is at the end
    }
  }

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -300, behavior: 'smooth' })
      checkScrollLimitsVertical() // verify limits after scrolling
    }
  }

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 300, behavior: 'smooth' })
      checkScrollLimitsVertical() // verify limits after scrolling
    }
  }

  useEffect(() => {
    if (scrollRef.current && scrollRef.current.children[currentImageIndex]) {
      const thumbnail = scrollRef.current.children[currentImageIndex]
      thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    }

    checkScrollLimitsHorizontal() // Verify limits horizontally
  }, [currentImageIndex])

  useEffect(() => {
    checkScrollLimitsHorizontal() // check limits initially
    const handleScroll = () => {
      checkScrollLimitsVertical()
      checkScrollLimitsHorizontal()
    } // check limits when scrolling

    const handleResize = () => {
      checkScrollLimitsHorizontal() // Verify limits horizontally
      checkScrollLimitsVertical() // Verify limits vertically
    }

    const currentRef = scrollRef.current

    currentRef?.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      currentRef?.removeEventListener('scroll', handleScroll) // clean up event when unmounting
      window.removeEventListener('resize', handleResize) // clean up event when unmounting
    }
  }, [images])

  return (
    <div className='relative px-7 overflow-hidden sm:px-0 sm:pt-5'>
      <Button
        onClick={scrollUp}
        disabled={isTopDisabled}
        size={'icon'}
        className="absolute w-full top-0 z-10 hidden h-5 sm:flex">
        <MdExpandLess className='w-5 h-5' />
      </Button>

      <Button
        onClick={scrollLeft}
        disabled={isLeftDisabled}
        size={'icon'}
        className="absolute h-full left-0 z-10 w-5 sm:hidden">
        <MdArrowBackIos className='w-5 h-5' />
      </Button>

      <div
        ref={scrollRef}
        className="flex sm:flex-col sm:overflow-y-scroll gap-2 overflow-x-scroll sm:h-[450px] sm:pb-5 lg:pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 cursor-pointer transition-all duration-300 border-b-[3px] ${index === currentImageIndex ? 'opacity-100 border-primary' : 'border-transparent opacity-75 hover:opacity-100'}`}
            onClick={() => { setCurrentImageIndex(index) }}
          >
            {
              isLoaded
                ? (
                  <ProductImage
                    width={75}
                    height={75}
                    src={image.src}
                    alt={altText}
                    className={'object-fill'}
                  />)
                : (
                  <div className="flex flex-col h-16 w-16 items-center justify-center transition-all bg-slate-200">
                    <CgSpinner className='text-primary animate-spin' />
                  </div>)
            }
          </div>
        ))}
      </div>

      <Button
        onClick={scrollRight}
        disabled={isRightDisabled}
        size={'sm'}
        className="absolute h-full right-0 top-0 z-10 w-5 sm:hidden p-0">
        <MdArrowForwardIos className='w-5 h-5' />
      </Button>

      <Button
        onClick={scrollDown}
        disabled={isDownDisabled}
        size={'sm'}
        className="absolute w-full bottom-0 z-10 h-5 hidden sm:flex">
        <MdExpandMore className='w-5 h-5' />
      </Button>
    </div>
  )
}
