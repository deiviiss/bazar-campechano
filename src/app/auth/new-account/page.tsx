import { RegisterForm } from './ui/RegisterForm'
import { titleFont } from '@/config/fonts'

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32">

      <h1 className={`${titleFont.className} text-center text-4xl mb-5`}>Nueva cuenta</h1>
      <p className='text-center pb-10'>Compra rápido y gestiona tus pedidos en un solo lugar.</p>
      <RegisterForm />

    </div>
  )
}
