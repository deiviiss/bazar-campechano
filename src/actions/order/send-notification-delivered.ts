'use server'

import { getUserSessionServer, getEmailAdmin, sendEmail } from '@/actions'

interface Props {
  userEmail?: string
  userName?: string
}

export const sendNotificationsDelivered = async ({ userEmail, userName }: Props) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'No se pudo enviar la notificación de pago'
    }
  }

  const email = userEmail || user.email
  const name = userName || user.name

  const { emailAdmin } = await getEmailAdmin()

  if (!user || emailAdmin === null) {
    return {
      ok: false,
      message: 'No se pudo enviar la notificación de entrega'
    }
  }

  // send email to user to notify delivery
  await sendEmail({
    email,
    subject: 'Pedido entregado',
    message: `
      <p>Hola ${name},</p>
      <p>Su pedido ha sido entregado. Gracias por su compra.</p>
      <p>SLDS</p>
      `
  })

  // send email to admin to notify delivery
  await sendEmail({
    email: emailAdmin.email,
    subject: `Pedido de ${name} entregado`,
    message: `
      <p>Hola,</p>
      <p>El pedido de ${name} ha sido entregado.</p>
      <p>SLDS</p>
      `
  })
}
