'use client'

import { useEffect, useRef, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { ProductItem } from '@/components/products'
import { Button } from '@/components/ui/button'
import { type ProductV2WithStock } from '@/interfaces'
import { availableSizes } from '@/utils/availableSizes'

interface Props {
  products: ProductV2WithStock[]
}

export const NewProductsGrid = ({ products }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isLeftDisabled, setIsLeftDisabled] = useState(true)
  const [isRightDisabled, setIsRightDisabled] = useState(false)

  const preparedProducts: ProductV2WithStock[] = products.map(product => {
    return ({
      ...product,
      hasStock: product.productAttributeValue.some(attr => attr.inStock > 0),
      hasSize: product.productAttributeValue.some(attr => attr.attribute.name === 'size'),
      availableSizes: availableSizes({ product })
    })
  })

  const checkScrollLimits = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setIsLeftDisabled(scrollLeft === 0) // disability if it is at the beginning
      setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth) // disability if it is at the end
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
      checkScrollLimits() // verify limits after scrolling
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
      checkScrollLimits() // verify limits after scrolling
    }
  }

  useEffect(() => {
    checkScrollLimits() // check limits initially
    const handleScroll = () => { checkScrollLimits() } // check limits when scrolling
    const currentRef = scrollRef.current

    currentRef?.addEventListener('scroll', handleScroll)

    return () => {
      currentRef?.removeEventListener('scroll', handleScroll) // clean up event when unmounting
    }
  }, [products])
  return (

    <div className="relative w-full mt-14">
      <Button onClick={scrollLeft} disabled={isLeftDisabled} variant={'secondary'} className="absolute left-2 -top-7 transform -translate-y-1/2 px-3 pr-2">
        <MdArrowBackIos className='w-5 h-5' />
      </Button>
      <div
        ref={scrollRef}
        className="flex w-full overflow-x-scroll pt-3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {
          preparedProducts.map((product) => {
            return (
              <ProductItem key={product.slug} product={product} className='text-white' />
            )
          })
        }
      </div>
      <Button onClick={scrollRight} disabled={isRightDisabled} variant={'secondary'} className="absolute right-2 -top-7 transform -translate-y-1/2 px-3 pl-2">
        <MdArrowForwardIos className='w-5 h-5' />
      </Button>
    </div>
  )
}
