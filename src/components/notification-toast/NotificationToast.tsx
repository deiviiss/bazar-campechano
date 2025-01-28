import { toast } from 'sonner'

export const noticeFailure = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    duration: 2000
  })
}

export const noticeSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    duration: 2000
  })
}
