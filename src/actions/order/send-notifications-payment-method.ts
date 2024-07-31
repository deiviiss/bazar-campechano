'use server'

import { type PaymentMethod } from '@prisma/client'
import { getEmailAdmin, sendEmail } from '@/actions'
import { paymentMethodNameSpanish } from '@/components'

interface Props {
  userName: string
  paymentMethod: PaymentMethod
}

export const sendNotificationsPaymentMethod = async ({ paymentMethod, userName }: Props) => {
  const name = userName

  const { emailAdmin } = await getEmailAdmin()

  if (emailAdmin === null) {
    return {
      ok: false,
      message: 'No se pudo enviar la notificación de método de pago'
    }
  }

  // send email to admin to notify payment method
  await sendEmail({
    email: emailAdmin.email,
    subject: `Pedido de ${name} pagado con ${paymentMethodNameSpanish[paymentMethod]}`,
    message: `
      <p>Hola,</p>
      <p>El pedido de ${name} ha sido pagado por ${paymentMethodNameSpanish[paymentMethod]}, valida el pago.</p>
      <p>SLDS</p>
      `
  })
}
