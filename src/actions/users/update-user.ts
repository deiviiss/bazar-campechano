'use server'

import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const userSchema = z.object({
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

interface IData {
  id: string
  email: string
  name: string
  password?: string | null
  phoneNumber: string
}

export const updateUser = async (data: IData) => {
  try {
    const userParsed = userSchema.safeParse(data)

    if (!userParsed.success) {
      return {
        ok: false,
        message: 'Error al actualizar usuario'
      }
    }

    const { name, email, password, id, phoneNumber } = userParsed.data

    const dataUserUpdated: {
      name: string
      email: string
      phoneNumber: string
      password?: string
    } = {
      name,
      email,
      phoneNumber
    }

    if (password.length > 0) {
      const encryptedPassword = bcrypt.hashSync(password)
      dataUserUpdated.password = encryptedPassword
    }

    const userUpdated = await prisma.user.update({
      where: { id },
      data: dataUserUpdated
    })

    if (!userUpdated) {
      return {
        ok: false,
        message: 'Usuario no actulizado'
      }
    }

    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${id}/edit`)
    revalidatePath('/profile')
    revalidatePath(`/profile/${id}/edit`)

    return {
      ok: true,
      message: 'Actualizado correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al actulizar usuario, contacta a soporte'
    }
  }
}
