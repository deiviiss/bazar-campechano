'use server'

import twilio from 'twilio'

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const smsNumber = process.env.TWILIO_SMS_NUMBER

export const sendSmsMessage = async (phone: string, message: string) => {
  try {
    await client.messages
      .create({
        body: message,
        from: smsNumber,
        to: phone
      })

    return true
  } catch (error) {
    return false
  }
}
