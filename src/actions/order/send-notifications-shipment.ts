'use server'

import { sendWhatsappMessage, sendSmsMessage, getUserSessionServer, getPhoneNumberAdmin, getEmailAdmin, sendEmail } from '@/actions'

interface Props {
  userPhoneNumber?: string
  userEmail?: string
  userName?: string
}

export const sendNotificationsShipment = async ({ userEmail, userName, userPhoneNumber }: Props) => {
  const user = await getUserSessionServer()

  if (!user) {
    return {
      ok: false,
      message: 'No se pudo enviar la notificación de pago'
    }
  }

  const email = userEmail || user.email
  const phoneNumber = userPhoneNumber || user.phoneNumber
  const name = userName || user.name

  const { phoneNumberAdmin } = await getPhoneNumberAdmin()
  const { emailAdmin } = await getEmailAdmin()

  if (!user || phoneNumberAdmin === null || emailAdmin === null) {
    return {
      ok: false,
      message: 'No se pudo enviar la notificación de pago'
    }
  }

  // send whatsapp to user to notify shipment
  await sendWhatsappMessage(phoneNumber, `¡${name}, su pedido ha sido enviado y llegará al final del día! Si no recibe su pedido hoy, por favor contáctenos.`)

  // send whatsapp to admin to notify shipment
  await sendWhatsappMessage(`${phoneNumberAdmin.phoneNumber}`, `¡El pedido de ${name} ha sido enviado y debe llegar al final del día! Si no se ha recibido, por favor revise.`)

  // send sms to user to notify shipment
  await sendSmsMessage(phoneNumber, `¡${name}, su pedido ha sido enviado y llegará al final del día! Si no recibe su pedido hoy, por favor contáctenos.`)

  // send sms to admin to notify shipment
  await sendSmsMessage(`${phoneNumberAdmin.phoneNumber}`, `¡El pedido de ${name} ha sido enviado y debe llegar al final del día! Si no se ha recibido, por favor revise.`)

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
