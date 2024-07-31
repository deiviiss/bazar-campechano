'use server'

import { getUserSessionServer, getEmailAdmin, sendEmail } from '@/actions'

interface Props {
  userEmail?: string
  userName?: string
}

export const sendNotificationsPayment = async ({ userEmail, userName }: Props) => {
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

  // send email to user to notify payment
  await sendEmail({
    email,
    subject: 'Pago confirmado',
    message: `
      <p>Hola</p>
      <p>¡${user.name} gracias por realizar el pago! Ya hemos verificado la información del mismo. Su pedido será enviado en el transcurso de 24 horas.</p>
      <p>SLDS</p>
      `
  })

  // send email to admin to notify payment
  await sendEmail({
    email: emailAdmin.email,
    subject: `Pago de ${name} confirmado`,
    message: `
      <p>Hola</p>
      <p>¡${name} ha realizado un pago!</p>
      <p>Prepara su pedido.</p>
      <p>SLDS</p>
      `
  })
}
