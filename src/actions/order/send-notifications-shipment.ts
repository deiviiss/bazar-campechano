'use server'

import { type ShippingMethod } from '@prisma/client'
import { getUserSessionServer, getEmailAdmin, sendEmail } from '@/actions'

interface Props {
  userEmail?: string
  userName?: string
  shippingMethod: ShippingMethod
}

export const sendNotificationsShipment = async ({ userEmail, userName, shippingMethod }: Props) => {
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

  // Message for type of shipping
  const userMessage =
    shippingMethod === 'delivery'
      ? `
        <p>Hola ${name},</p>
        <p>Su pedido ha sido enviado y llegará al final del día. Si no recibe su pedido hoy, por favor contáctenos.</p>
        <p>Gracias por su compra.</p>
        <p>Saludos,</p>
        <p>El equipo de Bazar Campechano</p>
      `
      : `
        <p>Hola ${name},</p>
        <p>Su pedido está listo para ser recogido en el punto de entrega seleccionado. Por favor, pase a recogerlo en los horarios establecidos.</p>
        <p>Gracias por su compra.</p>
        <p>Saludos,</p>
        <p>El equipo de Bazar Campechano</p>
      `

  const adminMessage =
    shippingMethod === 'delivery'
      ? `
        <p>Hola,</p>
        <p>El pedido de ${name} ha sido enviado y debe llegar al final del día. Si no se ha recibido, por favor revise.</p>
        <p>Saludos,</p>
        <p>El equipo de Bazar Campechano</p>
      `
      : `
        <p>Hola,</p>
        <p>El pedido de ${name} está listo para ser recogido en el punto de entrega seleccionado. Por favor, mantén comunicación con el cliente si es necesario.</p>
        <p>Saludos,</p>
        <p>El equipo de Bazar Campechano</p>
      `

  // send email to user to notify shipment
  await sendEmail({
    email,
    subject: shippingMethod === 'delivery' ? 'Pedido enviado' : 'Pedido listo para recoger',
    message: userMessage
  })

  // send email to admin to notify shipment
  await sendEmail({
    email: emailAdmin.email,
    subject: shippingMethod === 'delivery' ? `Pedido de ${name} enviado` : `Pedido de ${name} listo para recoger`,
    message: adminMessage
  })
}
