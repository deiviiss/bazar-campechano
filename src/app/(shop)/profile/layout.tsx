export default async function ProfileLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='mt-[60.67px] pt-10'>
      {children}
    </div>
  )
}
