export default async function OrdersLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='mt-16 pt-10 px-1 sm:px-5 md:px-10 lg:px-14 xl:px-20'>
      {
        children
      }
    </div>
  )
}
