'use server'

import * as brevo from '@getbrevo/brevo'
const apiInstance = new brevo.TransactionalEmailsApi()

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ''
)

interface EmailOptionsParams {
  email: string
  subject: string
  message: string
}

export const sendEmail = async ({ email, subject, message }: EmailOptionsParams) => {
  try {
    const smtpEmail = new brevo.SendSmtpEmail()
    smtpEmail.subject = subject
    smtpEmail.to = [{ email, name: email }]
    smtpEmail.htmlContent = `<html><body>${message}</body></html>`
    smtpEmail.sender = { name: 'Bazar Campechano', email: 'bazar.campechano@hotmail.com' }

    await apiInstance.sendTransacEmail(smtpEmail)

    return {
      ok: true,
      message: 'Correo enviado'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al enviar este correo'
    }
  }
}
