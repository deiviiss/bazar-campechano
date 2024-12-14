'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { deleteUserAddress, getUserAddress, setUserAddress } from '@/actions'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Country } from '@/interfaces'
import { useAddressStore } from '@/store'

const addressSchema = z.object({
  firstName: z
    .string({
      required_error: 'El nombre es requerido.',
      message: 'El nombre debe tener entre 1 y 50 caracteres.'
    }).min(1, {
      message: 'El nombre debe tener al menos 1 carácter.'
    }
    ).max(50, {
      message: 'El nombre debe tener máximo 50 caracteres.'
    }),
  lastName: z
    .string({
      required_error: 'El apellido es requerido.',
      message: 'El apellido debe tener entre 1 y 50 caracteres.'
    }).min(1, {
      message: 'El apellido debe tener al menos 1 carácter.'
    }
    ).max(50, {
      message: 'El apellido debe tener máximo 50 caracteres.'
    }),
  address: z
    .string({
      required_error: 'La dirección es requerido.',
      message: 'La dirección debe tener entre 1 y 50 caracteres.'
    }).min(1, {
      message: 'La dirección debe tener al menos 1 carácter.'
    }
    ).max(50, {
      message: 'La dirección debe tener máximo 50 caracteres.'
    }),
  address2: z.string().optional(),
  postalCode: z
    .string({
      message: 'El código postal es requerido.'
    })
    .min(5, {
      message: 'El código postal debe tener mínimo 5 caracteres.'
    })
    .max(5, {
      message: 'El código postal debe tener máximo 5 caracteres.'
    }),
  city: z
    .string({
      required_error: 'La ciudad es requerida.',
      message: 'La ciudad debe tener entre 1 y 50 caracteres.'
    }).min(1, {
      message: 'La ciudad debe tener al menos 1 carácter.'
    }
    ).max(50, {
      message: 'La ciudad debe tener máximo 50 caracteres.'
    }),
  country: z
    .string({
      required_error: 'El país es requerido.',
      message: 'El país debe tener entre 1 y 50 caracteres.'
    }).min(1, {
      message: 'El país debe tener al menos 1 carácter.'
    }
    ).max(50, {
      message: 'El país debe tener máximo 50 caracteres.'
    }),
  phone: z
    .string({
      required_error: 'El teléfono es requerido.',
      message: 'El teléfono es requerido.'
    }).min(10, {
      message: 'El teléfono debe tener 10 dígitos.'
    }
    ).max(10, {
      message: 'El teléfono debe tener 10 dígitos.'
    }),
  userId: z.string().uuid()
})

interface Props {
  countries: Country[]
}

export const AddressForm = ({ countries }: Props) => {
  const { data: session } = useSession()
  const userId = session?.user?.id || ''

  const [loaded, setLoaded] = useState(false)

  const { address, setAddress } = useAddressStore()
  const [rememberAddress, setRememberAddress] = useState(false)
  // To verify if the form has changed
  const previousValues = useRef<z.infer<typeof addressSchema> | null>(null)

  const defaultValuesForm = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    userId
  }

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      ...defaultValuesForm
    },
    mode: 'onChange'
  })

  useEffect(() => {
    const initializeAddress = async () => {
      if (!userId) return
      const userStoredAddress = await getUserAddress(userId)

      if (userStoredAddress) {
        form.reset(userStoredAddress)
        previousValues.current = userStoredAddress // Initialize previousValues
        setRememberAddress(true) // Set the initial state of rememberAddress
        setAddress(userStoredAddress)
        return
      }

      if (address.firstName) {
        form.reset(address)
        previousValues.current = address // Initialize previousValues
      }
    }

    initializeAddress()
    setLoaded(true)
  }, [userId])

  const handleRememberAddressChange = async () => {
    const data = form.getValues()

    if (!rememberAddress) {
      await setUserAddress(data, userId)
    }

    if (rememberAddress) {
      await deleteUserAddress(userId)
    }
  }

  const handleBlur = async () => {
    const data = form.getValues()

    if (form.formState.isValid && JSON.stringify(data) !== JSON.stringify(previousValues.current)) {
      setAddress(data)
      previousValues.current = data // Update previousValues
    }

    if (rememberAddress) {
      await setUserAddress(data, userId)
    }
  }

  if (!loaded) {
    return (
      <p className='animate-pulse py-3 text-sm'>Cargando formulario...</p>
    )
  }

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 mt-4">
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} value={field.value ?? ''} onBlur={handleBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} value={field.value ?? ''} onBlur={handleBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} value={field.value ?? ''} onBlur={handleBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address2'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección 2 (opcional)</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} value={field.value ?? ''} onBlur={handleBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='postalCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código postal</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} value={field.value ?? ''} onBlur={handleBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} value={field.value ?? ''} onBlur={handleBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    handleBlur()
                  }}
                  value={`${field.value}`}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {countries.find(country => country.id === field.value)?.name}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {
                        countries.map((country) => (
                          <SelectItem
                            className='capitalize'
                            key={country.id}
                            value={country.id}>
                            {country.name}
                          </SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input
                  placeholder='' {...field}
                  value={field.value ?? ''}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>

      <div className="flex flex-col mt-4">
        <div className="inline-flex items-center mb-5">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <Input
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-none border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-none before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary/80 checked:bg-primary/90 checked:before:bg-primary/90"
              id="checkbox"
              checked={rememberAddress}
              onChange={() => {
                setRememberAddress((prev) => !prev)
                handleRememberAddressChange()
              }}
              disabled={!form.formState.isValid}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>

          <span>¿Recordar dirección?</span>
        </div>
      </div>

    </Form>
  )
}
