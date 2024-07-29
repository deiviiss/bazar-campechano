import { type PaymentMethod, type Status } from '@prisma/client'
import { toast } from 'sonner'
import { changeOrderStatus, deleteOrderById, paidOrder } from '@/actions'
import { statusNameSpanish } from '@/utils'

export const openConfirmationDelete = (orderId: string, isPaid: boolean) => {
  if (isPaid) {
    toast.error('Pedido pagado no se puede eliminar', {
      position: 'top-right',
      duration: 2000
    })
    return
  }

  toast('Eliminar pedido', {
    description: `¿Estás seguro? Se eliminara el pedido #${orderId.split('-').at(-1)} el inventario se actualizara`,
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
      label: 'Confirmar',
      onClick: async () => { await handleDeleteOrder(orderId) }
    },
    cancel:
    {
      label: 'Cancelar',
      onClick: () => { toast.dismiss() }
    },
    cancelButtonStyle: {
      color: 'white',
      backgroundColor: 'red',
      font: 'message-box',
      padding: '0.5rem 1rem',
      height: '2rem'
    }
  })
}

export const handleDeleteOrder = async (orderId: string) => {
  const { ok, message } = await deleteOrderById(orderId)

  if (!ok) {
    toast.error(message, {
      position: 'top-right',
      duration: 2000
    })
    return
  }

  toast.success(message, {
    position: 'top-right',
    duration: 2000
  })
}

export const openConfirmationChangeStatus = async (orderId: string, status: Status) => {
  let statusUpdated: Status = status

  if (status === 'unpaid') {
    toast.error('El pedido no se ha pagado no se puede cambiar', {
      position: 'top-right',
      duration: 2000
    })
    return
  }

  if (status === 'paided') {
    statusUpdated = 'shipped'
  }

  if (status === 'shipped') {
    statusUpdated = 'delivered'
  }

  if (status === 'delivered') {
    toast.error('Pedido entregado no se puede cambiar', {
      position: 'top-right',
      duration: 2000
    })
    return
  }

  toast('Cambiar status', {
    description: `¿Estás seguro? Se cambiara el estado del pedido #${orderId.split('-').at(-1)} a '${statusNameSpanish[statusUpdated]}'`,
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
      label: 'Confirmar',
      onClick: async () => { await handleChangeStatus(orderId, statusUpdated) }
    },
    cancel:
    {
      label: 'Cancelar',
      onClick: () => { toast.dismiss() }
    },
    cancelButtonStyle: {
      color: 'white',
      backgroundColor: 'red',
      font: 'message-box',
      padding: '0.5rem 1rem',
      height: '2rem'
    }
  })
}

const handleChangeStatus = async (orderId: string, status: Status) => {
  const { ok, message } = await changeOrderStatus(orderId, status)

  if (!ok) {
    toast.error(message, {
      position: 'top-right',
      duration: 2000
    })
    return
  }

  toast.success(message, {
    position: 'top-right',
    duration: 2000
  })
}

export const openConfirmationPaid = async (orderId: string, isPaid: boolean, paymentMethod: PaymentMethod, userId: string) => {
  if (isPaid) {
    toast.error('El pedido ya se ha pagado', {
      position: 'top-right',
      duration: 2000
    })
    return
  }

  if (paymentMethod === 'paypal') {
    toast.error('Pedido pagado por Paypal ', {
      position: 'top-right',
      duration: 2000
    })
    return
  }

  if (paymentMethod === 'mercadopago') {
    toast.error('Pedido pagado por Mercado Pago ', {
      position: 'top-right',
      duration: 2000
    })
    return
  }

  toast('Pagar pedido', {
    description: `¿Estás seguro? Se marcara el pedido #${orderId.split('-').at(-1)} como 'Pagado'`,
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
      label: 'Confirmar',
      onClick: async () => { await handlePaidOrder(orderId, userId) }
    },
    cancel:
    {
      label: 'Cancelar',
      onClick: () => { toast.dismiss() }
    },
    cancelButtonStyle: {
      color: 'white',
      backgroundColor: 'red',
      font: 'message-box',
      padding: '0.5rem 1rem',
      height: '2rem'
    }
  })
}

export const handlePaidOrder = async (orderId: string, userId: string) => {
  const { ok, message } = await paidOrder(orderId, userId)

  if (!ok) {
    toast.error(message, {
      position: 'top-right',
      duration: 2000
    })
    return
  }

  toast.success(message, {
    position: 'top-right',
    duration: 2000
  })
}
