'use server'

import twilio from 'twilio'

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER

export const sendWhatsappMessage = async (phone: string, message: string) => {
  try {
    await client.messages
      .create({
        body: message,
        from: `whatsapp:${whatsappNumber}`,
        to: `whatsapp:${phone}`
      })

    return true
  } catch (error) {
    return false
  }
}
