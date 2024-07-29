'use server'

import { sendWhatsappMessage, sendSmsMessage, getUserSessionServer, getPhoneNumberAdmin, getEmailAdmin, sendEmail } from '@/actions'

interface Props {
  userPhoneNumber?: string
  userEmail?: string
  userName?: string
}

export const sendNotificationsDelivered = async ({ userEmail, userName, userPhoneNumber }: Props) => {
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
      message: 'No se pudo enviar la notificación de entrega'
    }
  }

  // send whatsapp to user to notify delivery
  await sendWhatsappMessage(phoneNumber, `¡${name}, su pedido ha sido entregado! Gracias por su compra.`)

  // send whatsapp to admin to notify delivery
  await sendWhatsappMessage(`${phoneNumberAdmin.phoneNumber}`, `¡El pedido de ${name} ha sido entregado!`)

  // send sms to user to notify delivery
  await sendSmsMessage(phoneNumber, `¡${name}, su pedido ha sido entregado! Gracias por su compra.`)

  // send sms to admin to notify delivery
  await sendSmsMessage(`${phoneNumberAdmin.phoneNumber}`, `¡El pedido de ${name} ha sido entregado!`)

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
