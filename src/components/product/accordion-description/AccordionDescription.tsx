'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

interface Props {
  description: string
  history?: string
}

export function AccordionDescription({ description, history }: Props) {
  return (
    <Accordion type="single" collapsible defaultValue='item-1' className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className='uppercase font-semibold'>Descripción</AccordionTrigger>
        <AccordionContent>
          {description}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className='uppercase font-semibold'>historia</AccordionTrigger>
        <AccordionContent>
          {history}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
