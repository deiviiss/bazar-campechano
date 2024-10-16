export default async function ProfileLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='mt-[104.67px] sm:mt-[60.67px] pt-10 px-1 sm:px-5 md:px-10 lg:px-14 xl:px-20'>
      {children}
    </div>
  )
}
