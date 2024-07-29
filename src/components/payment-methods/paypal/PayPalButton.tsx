'use client'

import { type CreateOrderData, type CreateOrderActions, type OnApproveActions, type OnApproveData } from '@paypal/paypal-js'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { paypalCheckPayment, setTransactionId } from '@/actions'

interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer()
  const router = useRouter()

  const rountedAmount = Math.round(amount * 100) / 100

  if (isPending) {
    return (
      <div className='animate-pulse flex flex-col gap-4 mt-12 mb-16'>
        <div className='h-10 bg-gray-300 rounded'></div>
        <div className='h-10 bg-gray-300 rounded'></div>
      </div>
    )
  }

  // const noticeConfirmPaid = async () => {
  //   await Swal.fire({
  //     text: 'Pago completado, estamos preparando tu pedido',
  //     background: '#ffffff',
  //     confirmButtonColor: '#3085d6',
  //     confirmButtonText: 'Ver pedidos',
  //     color: '#000000',
  //     preConfirm: () => {
  //       router.replace('/orders')
  //     }
  //   })
  // }

  const noticeConfirmPaid = async () => {
    toast('Pago completado', {
      description: 'Estamos preparando tu pedido',
      position: 'top-right',
      duration: Infinity,
      className: 'grid grid-cols-[1fr,110px] items-start justify-center text-sm p-2 col-span-2 pb-4',
      classNames: {
        content: 'flex items-start justify-center text-sm col-span-4 p-2'
      },
      actionButtonStyle: {
        color: 'white',
        backgroundColor: '#1E40AF',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      },
      action: {
        label: 'Ver pedidos',
        onClick: async () => { router.replace('/orders') }
      }
    })
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId: string = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'MXN',
            value: `${rountedAmount}`
          }
        }
      ]
    })

    const { ok } = await setTransactionId(orderId, transactionId)

    if (!ok) {
      throw new Error('No se pudo actualizar la pedido')
    }

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()

    if (!details) return

    await paypalCheckPayment(details?.id || '')

    noticeConfirmPaid()
  }

  return (
    <div className='pb-6 pt-12 relative z-0'>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}
