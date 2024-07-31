'use server'

import { getUserSessionServer, getEmailAdmin, sendEmail } from '@/actions'

interface Props {
  userEmail?: string
  userName?: string
}

export const sendNotificationsShipment = async ({ userEmail, userName }: Props) => {
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
      message: 'No se pudo enviar la notificación de pago'
    }
  }

  // send email to user to notify shipment
  await sendEmail({
    email,
    subject: 'Pedido enviado',
    message: `
      <p>Hola ${name},</p>
      <p>Su pedido ha sido enviado y llegará al final del día. Si no recibe su pedido hoy, por favor contáctenos.</p>
      <p>Gracias por su compra.</p>
      <p>SLDS</p>
      `
  })

  // send email to admin to notify shipment
  await sendEmail({
    email: emailAdmin.email,
    subject: `Pedido de ${name} enviado`,
    message: `
      <p>Hola,</p>
      <p>El pedido de ${name} ha sido enviado y debe llegar al final del día. Si no se ha recibido, por favor revise.</p>
      <p>SLDS</p>
      `
  })
}
