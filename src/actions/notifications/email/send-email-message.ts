'use server'

import nodemailer from 'nodemailer'

const smtpEmail = process.env.SMTP_EMAIL
const smtpPassword = process.env.SMTP_PASSWORD
const smtpUser = process.env.SMTP_USER

interface IEmailOptions {
  email: string
  subject: string
  message: string
}

export const sendEmail = async ({ message, subject, email }: IEmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: smtpEmail,
      pass: smtpPassword
    }
  })

  // send mail
  try {
    await transporter.sendMail(createEmailOptions(email, subject, message))

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

const createEmailOptions = (email: string, subject: string, message: string) => {
  const emailOptions = {
    from: `${smtpUser} <${smtpEmail}>`,
    to: email,
    subject,
    html: message
  }

  return emailOptions
}
