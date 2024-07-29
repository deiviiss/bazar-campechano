import { type Status } from '@prisma/client'

export const statusNameSpanish: Record<Status, string> = {
  unpaid: 'Por pagar',
  paided: 'Preparando',
  shipped: 'Enviado',
  delivered: 'Entregado'
}
