import { AddressForm } from './ui/AddressForm'
import { getCountries, getUserAddress, getUserSessionServer } from '@/actions'
import { Title } from '@/components'

export default async function AddressPage() {
  const countries = await getCountries()
  const user = await getUserSessionServer()

  if (!user) {
    return (
      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <p className="text-center text-lg text-gray-600">Inicia sesión para continuar con tu compra.</p>
      </div>
    )
  }

  const address = await getUserAddress(user.id)

  return (
    <>
      <Title title="Dirección" subtitle="Dirección de entrega" />
      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

        <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

          <AddressForm countries={countries} userStoredAddress={address} />

        </div>
      </div>
    </>
  )
}
