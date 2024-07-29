'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { updateUser } from '@/actions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type User } from '@/interfaces'

const formUserSchema = z.object({
  id: z
    .string()
    .uuid(),
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255, { message: 'El nombre debe tener menos de 255 caracteres' }),
  email: z
    .string()
    .email({ message: 'El correo electrónico no es válido' }),
  phoneNumber: z
    .string()
    .min(14, { message: 'El número de teléfono debe ser de 14 caracteres incluyendo el código del país' })
    .max(14, { message: 'El número de teléfono debe ser de 14 caracteres incluyendo el código del país' }),
  password: z
    .string()
    .refine(value => value === '' || (value.length >= 6 && value.length <= 10), {
      message: 'La contraseña debe tener entre 6 y 10 caracteres si será cambiada'
    })
})

export const EditForm = (user: User) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValuesForm = {
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    password: ''
  }

  const form = useForm<z.infer<typeof formUserSchema>>({
    resolver: zodResolver(formUserSchema),
    defaultValues: defaultValuesForm
  })

  const onSubmit = async (values: z.infer<typeof formUserSchema>) => {
    setIsSubmitting(true)

    const { ok, message } = await updateUser({ ...values })
    if (!ok) {
      toast.error(message, {
        position: 'top-right',
        duration: 2000
      })
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)

    toast.success(message, {
      position: 'top-right',
      duration: 2000
    })

    router.replace('/profile')
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input
                    className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Incluir código de país
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Si captura la contraseña esta será restablecida
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-2 w-full text-center justify-end mb-10'>
            <Button
              size='sm'
              variant='primary'
              type="submit"
              disabled={isSubmitting}
            >
              Guardar
            </Button>

            <Button
              asChild
              size="sm"
              variant='destructive'
            >
              <Link
                href="/profile"
              >
                Cancelar
              </Link>
            </Button>
          </div>

        </form>
      </Form>
    </>
  )
}
