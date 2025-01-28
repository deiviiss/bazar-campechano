'use server'

import { type PaymentMethod } from '@prisma/client'
import { getUserSessionServer, getEmailAdmin, sendEmail } from '@/actions'

interface Props {
  userEmail?: string
  userName?: string
  paymentMethod: PaymentMethod
}

export const sendNotificationsPayment = async ({ userEmail, userName, paymentMethod }: Props) => {
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

  if (paymentMethod !== 'cash') {
  // Send email to user
    await sendEmail({
      email,
      subject: 'Pago confirmado',
      message: `
      <p>Hola ${name},</p>
      <p>¡Gracias por realizar el pago! Hemos confirmado la transacción y su pedido será enviado en el transcurso de 24 horas.</p>
      <p>Saludos,</p>
      <p>El equipo de Bazar Campechano</p>
    `
    })

    // Send email to admin
    await sendEmail({
      email: emailAdmin.email,
      subject: `Pago de ${name} confirmado`,
      message: `
      <p>Hola,</p>
      <p>${name} ha realizado un pago mediante ${paymentMethod}. Prepara su pedido para ser enviado en el transcurso de 24 horas.</p>
      <p>Saludos,</p>
      <p>El equipo de Bazar Campechano</p>
    `
    })

    return {
      ok: true,
      message: 'Notificaciones enviadas correctamente para otros métodos de pago'
    }
  }

  // Send email to user
  await sendEmail({
    email,
    subject: 'Pago pendiente en efectivo',
    message: `
      <p>Hola ${name},</p>
      <p>Gracias por elegir pagar en efectivo. Su pedido será procesado y enviado una vez se realice el pago.</p>
      <p>Por favor, asegúrese de estar disponible para recibir su pedido.</p>
      <p>Saludos,</p>
      <p>El equipo de Bazar Campechano</p>
    `
  })

  // Send email to admin
  await sendEmail({
    email: emailAdmin.email,
    subject: `Pedido con pago en efectivo de ${name}`,
    message: `
      <p>Hola,</p>
      <p>${name} ha seleccionado pagar en efectivo. Por favor, asegúrate de coordinar correctamente la entrega y el cobro.</p>
      <p>Saludos,</p>
      <p>El equipo de Bazar Campechano</p>
    `
  })

  return {
    ok: true,
    message: 'Pago en efectivo'
  }
}
