'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

interface Props {
  description: string
}

export function AccordionDescription({ description }: Props) {
  return (
    <Accordion type="single" collapsible defaultValue='item-1' className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className='uppercase font-semibold'>Descripción</AccordionTrigger>
        <AccordionContent>
          {description}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
