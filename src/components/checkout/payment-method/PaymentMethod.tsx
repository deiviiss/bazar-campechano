'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PAYMENT_METHODS } from '@/config/checkoutConfig'
import { useCheckoutStore } from '@/store'

export function PaymentMethod() {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore()

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Método de pago</h2>
      <RadioGroup
        value={paymentMethod || undefined}
        onValueChange={setPaymentMethod}
      >
        {PAYMENT_METHODS.map((method) => (
          <div key={method.id} className="flex items-center space-x-2">
            <RadioGroupItem value={method.id} id={method.id} />
            <Label htmlFor={method.id}>{method.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
