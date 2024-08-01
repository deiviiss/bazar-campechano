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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className='uppercase font-semibold'>Descripción</AccordionTrigger>
        <AccordionContent>
          {description}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className='uppercase font-semibold'>Cuidados</AccordionTrigger>
        <AccordionContent>
          Lavar en lavadora con agua fría a 30ºC, usar jabón o detergente, no usar cloro ni blanqueador, secar colgado a la sombra, planchar a temperatura baja 110 ºC, planchar por el reverso.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
