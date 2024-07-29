'use server'

import { type UserAddress } from '@/interfaces'
import prisma from '@/lib/prisma'

export const setUserAddress = async (address: UserAddress, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId)

    return {
      ok: true,
      address: newAddress
    }
  } catch (error) {
    return error
  }
}

export const createOrReplaceAddress = async (address: UserAddress, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId }
    })

    const addressToSave = {
      userId,
      address: address.address,
      address2: address.address2,
      city: address.city,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode
    }

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })

      return newAddress
    }

    const updateAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave
    })

    return updateAddress
  } catch (error) {
    return error
  }
}
