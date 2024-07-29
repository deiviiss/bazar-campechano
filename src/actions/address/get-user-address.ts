import prisma from '@/lib/prisma'

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId }
    })

    if (!address) return null

    const { countryId, id, address2, ...restAddress } = address

    return {
      ...restAddress,
      country: countryId,
      address2: address2 || ''
    }
  } catch (error) {
    return null
  }
}
