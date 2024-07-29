'use server'

import { revalidatePath } from 'next/cache'
import { sendNotificationsPayment } from '@/actions'
import { type PayPalOrdersStatusResponse } from '@/interfaces'
import prisma from '@/lib/prisma'

export const paypalCheckPayment = async (transactionId: string) => {
  const token = await getPayPalBearerToken()

  if (!token) {
    return {
      ok: false,
      message: 'No se pudo obtener el token'
    }
  }

  const paypalResponse = await verifyPayPalPayment(transactionId, token)

  if (!paypalResponse) {
    return {
      ok: false,
      message: 'No se pudo verificar el pago'
    }
  }

  const { status, purchase_units: purchaseUnits } = paypalResponse
  const { invoice_id: orderId } = purchaseUnits[0]

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Pago no completado'
    }
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        status: 'paided',
        paidAt: new Date()
      }
    })

    // send notifications to user and admin
    await sendNotificationsPayment({})

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
      message: 'Pago completado'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Pago no completado'
    }
  }
}

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const oauth2url = process.env.PAYPAL_OAUTH_URL ?? ''

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64')

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Basic ${base64Token}`)

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded
  }

  try {
    const response = await fetch(oauth2url, {
      ...requestOptions,
      cache: 'no-store'
    })
    const rta = await response.json()

    return rta.access_token
  } catch (error) {
    return null
  }
}

const verifyPayPalPayment = async (paypaltransactionId: string, bearerToken: string): Promise<PayPalOrdersStatusResponse | null> => {
  const PAYPAL_ORDERS_URL = `${process.env.PAYPAL_ORDERS_URL ?? ''}/${paypaltransactionId}`

  const myHeaders = new Headers()
  myHeaders.append(
    'Authorization',
    `Bearer ${bearerToken}`
  )

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  try {
    const response = await fetch(PAYPAL_ORDERS_URL, {
      ...requestOptions,
      cache: 'no-store'
    })
    const rta = await response.json()

    return rta
  } catch (error) {
    return null
  }
}
