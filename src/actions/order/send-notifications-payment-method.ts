'use server'

import { type PaymentMethod } from '@prisma/client'
import { getEmailAdmin, sendEmail } from '@/actions'
import { paymentMethodNameSpanish } from '@/components'

interface Props {
  userName: string
  userEmail: string
  paymentMethod: PaymentMethod
}

export const sendNotificationsPaymentMethod = async ({ paymentMethod, userName, userEmail }: Props) => {
  const name = userName

  const { emailAdmin } = await getEmailAdmin()

  if (emailAdmin === null) {
    return {
      ok: false,
      message: 'No se pudo enviar la notificación de método de pago'
    }
  }

  // Send email to admin to notify payment method
  await sendEmail({
    email: emailAdmin.email,
    subject: `Pedido de ${name}: Método de pago seleccionado: ${paymentMethodNameSpanish[paymentMethod]}`,
    message: `
      <p>Hola,</p>
      <p>El cliente <strong>${name}</strong> ha seleccionado <strong>${paymentMethodNameSpanish[paymentMethod]}</strong> como método de pago.</p>
      <p>Te recomendamos realizar las siguientes acciones:</p>
      <ul>
        <li>Validar que el pago ha sido realizado correctamente (si aplica).</li>
        <li>Preparar el pedido para su envío o entrega.</li>
        <li>Notificar al cliente sobre el estado del pedido.</li>
      </ul>
      <p>Es importante que mantengas una comunicación clara con el cliente para garantizar una buena experiencia de compra.</p>
      <p>Si necesitas ayuda, estamos aquí para apoyarte.</p>
      <p>Saludos,</p>
      <p>El equipo de Bazar Campechano</p>
    `
  })

  // Send email to customer
  const customerMessage =
    paymentMethod === 'cash'
      ? `
        <p>Hola ${name},</p>
        <p>Has seleccionado <strong>efectivo</strong> como método de pago para tu pedido.</p>
        <p>Por favor, ten preparado el monto exacto al momento de la entrega.</p>
        <p>Si tienes dudas, no dudes en contactarnos.</p>
        <p>Saludos,</p>
        <p>El equipo de Bazar Campechano</p>
      `
      : `
        <p>Hola ${name},</p>
        <p>Has seleccionado <strong>transferencia</strong> como método de pago para tu pedido.</p>
        <p>Por favor, realiza la transferencia lo antes posible para que podamos procesar tu pedido.</p>
        <p>Si necesitas los datos bancarios o tienes alguna duda, no dudes en contactarnos.</p>
        <p>Saludos,</p>
        <p>El equipo de Bazar Campechano</p>
      `

  await sendEmail({
    email: userEmail,
    subject: paymentMethod === 'cash' ? 'Método de pago: Efectivo' : 'Método de pago: Transferencia',
    message: customerMessage
  })

  return {
    ok: true,
    message: 'Notificaciones enviadas correctamente'
  }
}
