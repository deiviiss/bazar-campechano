export default async function ProfileLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='mt-16 pt-10'>
      {children}
    </div>
  )
}
