'use client'

import Link from 'next/link'
import { IoCreateOutline } from 'react-icons/io5'
import { DeleteButtonProduct, ProductImage } from '@/components/products'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type ProductV2WithStock } from '@/interfaces'

interface Props {
  product: ProductV2WithStock
}

export const CardProduct = ({ product }: Props) => {
  const stockTotal = product.productAttributeValue.reduce((acc, stock) => acc + stock.inStock, 0)

  const stockDetails = (product: ProductV2WithStock) => {
    const productStock = product.productAttributeValue.map((stock) => {
      return stock
    })

    return (
      <ul>
        {
          productStock?.map((stock) => {
            return (
              <li key={stock.id} className='flex gap-2 justify-between'>Talla {stock.valueOption.value} <span>{stock.inStock}</span></li>
            )
          }
          )
        }
      </ul>
    )
  }

  return (
    <Card className="bg-slate-400 w-full shadow-md rounded-none ">
      <CardHeader className='relative group overflow-hidden'>
        <Link
          href={`/product/${product.slug}`}
          className='flex justify-center'
        >
          <ProductImage
            src={product.productImage[0].url}
            alt={product.title}
            className='rounded-t shadow-md'
            width={540}
            height={540}
          />
        </Link>

        <div className='absolute flex gap-2 top-6 right-28 min-[700px]:right-[124px] min-[720px]:right-[128px] min-[735px]:right-[134px] min-[750px]:right-[140px] min-[760px]:right-[150px] md:right-0 transform translate-x-full transition-transform duration-300 md:group-hover:translate-x-[calc(-100%+40px)]'>
          <Button asChild size='icon' className='w-10 h-10 md:w-7 md:h-7 border border-white' >
            <Link href={`/admin/product/${product.slug}?size=${product.id}`}>
              <IoCreateOutline />
            </Link>
          </Button>
          <DeleteButtonProduct id={`${product.id}`} productName={product.title} />
        </div>
      </CardHeader>

      <CardContent className='flex items-center justify-between gap-3 pb-2'>
        <div className='flex flex-col justify-between'>
          <CardTitle className="text-base font-bold h-12 overflow-hidden">{product.title}</CardTitle>

          {
            product.isActive
              ? (<p className="text-lg w-full">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} className="text-yellow-500">
                    &#9733;
                  </span>
                ))}

              </p>)
              : (
                <p className='text-xs bg-red-400 rounded-sm p-2 text-secondary w-3/4'>En validación</p>)
          }

        </div>

        <h2 className='bg-gray-300 rounded-sm p-2 w-max font-bold self-start'>${product.price}</h2>
      </CardContent>

      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className='justify-start gap-1 pb-1'>Stock: <span className='w-full text-end'>{stockTotal === 1 ? `${stockTotal} pieza` : `${stockTotal} piezas`}</span></AccordionTrigger>
            <AccordionContent>
              {
                stockDetails(product)
              }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

    </Card >
  )
}
