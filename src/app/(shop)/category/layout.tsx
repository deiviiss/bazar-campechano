export default function CategoryLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="px-1 md:px-12 xl:px-24">
      {children}
    </div>
  )
}
