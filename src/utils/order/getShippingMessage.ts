import { currencyFormat } from './currencyFormat'

export const getShippingMessage = (shippingMethod: string | null, subtotal: number): string => {
  if (shippingMethod === null) return 'Pendiente'
  if (shippingMethod === 'pickup') return 'No aplica'

  if (subtotal > 199) return 'Gratis'

  return currencyFormat(45)
}
