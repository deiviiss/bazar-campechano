'use server'

import jwt from 'jsonwebtoken'
import { sendEmail } from '@/actions/notifications/email/send-email-message'
import prisma from '@/lib/prisma'

export async function sendValidationEmail(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return {
      ok: false,
      message: 'No se encontró el usuario'
    }
  }

  if (user.emailVerified) {
    return {
      ok: false,
      message: 'El correo ya ha sido verificado'
    }
  }

  // Validate that the AUTH_SECRET environment variable is set
  if (!process.env.AUTH_SECRET) {
    throw new Error('La variable de entorno AUTH_SECRET no está definida')
  }
  // Generate the token
  const token = jwt.sign(
    { userId: user.id },
    process.env.AUTH_SECRET,
    { expiresIn: '1h' } // Expire in 1 hour
  )

  // Create the validation link
  const validationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/validate-email?token=${token}`

  // Send the email
  await sendEmail({
    email: user.email,
    subject: 'Valida tu correo',
    message: `<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifica tu cuenta</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #111;
            color: #fff;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #222;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
        h1 {
            color: #fff;
            text-align: center;
        }
        p {
            line-height: 1.6;
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin: 20px 0;
        }
        .button {
            background-color: #272E3F;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #aaa;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Valida tu correo!</h1>
        <p>Gracias por registrarte en nuestra plataforma. Para completar tu registro, haz clic en el botón a continuación:</p>
        <div class="button-container">
            <a href="${validationUrl}" class="button">Verificar cuenta</a>
        </div>
        <p>O copia y pega este enlace en tu navegador:</p>
        <p><a href="${validationUrl}" style="color: #fff;">${validationUrl}</a></p>
        <div class="footer">
            <p>Por favor, no respondas a este correo, ya que es un mensaje automático.</p>
        </div>
    </div>
</body>
</html>`
  })

  return {
    ok: true,
    message: 'Correo enviado. Revisa spam si no está en tu bandeja de entrada.'
  }
}
