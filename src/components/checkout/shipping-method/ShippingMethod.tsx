'use client'

import { useEffect, useState } from 'react'
import { getCountries } from '@/actions'
import { AddressForm } from '@/components/checkout'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SHIPPING_METHODS, PICKUP_LOCATION } from '@/config/checkoutConfig'
import { type Country } from '@/interfaces'
import { useCheckoutStore } from '@/store'

export function ShippingMethod() {
  const { shippingMethod, setShippingMethod } = useCheckoutStore()

  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchedCountries = await getCountries()
      setCountries(fetchedCountries)
    }

    fetchCountries()
  }, [])

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Método de envío</h2>
      <RadioGroup
        value={shippingMethod || undefined}
        onValueChange={(value: 'pickup' | 'delivery') => { setShippingMethod(value) }}
      >
        {SHIPPING_METHODS.map((method) => (
          <div key={method.id} className="flex items-center space-x-2">
            <RadioGroupItem value={method.id} id={method.id} />
            <Label htmlFor={method.id}>{method.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {shippingMethod === 'pickup' && (
        <div className="mt-4 p-4 bg-gray-100 rounded">

          <h3 className='font-semibold'>{PICKUP_LOCATION.place}</h3>
          <p>{PICKUP_LOCATION.address}</p>
          <p>{PICKUP_LOCATION.city}, {PICKUP_LOCATION.country} {PICKUP_LOCATION.postalCode}</p>
          <p className='mb-2'>Teléfono: {PICKUP_LOCATION.phone}</p>
          <p>{PICKUP_LOCATION.hours}</p>
          <p className="my-2">Recuerda presentar tu DNI al momento de recibir tu pedido.</p>
        </div>
      )}
      {shippingMethod === 'delivery' && <AddressForm countries={countries} />}
    </div>
  )
}
