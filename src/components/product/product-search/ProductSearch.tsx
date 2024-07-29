'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { CiSearch } from 'react-icons/ci'
import { useDebouncedCallback } from 'use-debounce'

export function ProductSearch({
  placeholder
}: {
  placeholder: string
}): JSX.Element {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', '1')

    term.length > 0 ? params.set('query', term) : params.delete('query')
    // replace route with a route that gets from the input that was converted into query
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className='relative flex flex-1 flex-shrink-0 max-w-60'>
      <label htmlFor='search' className='sr-only'>
        Buscar
      </label>
      <input
        className='peer block w-full rounded border border-blue-600 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:border-blue-800 transition-colors duration-200 ease-in-out'
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString() ?? ''}
      />
      <CiSearch className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-blue-600 peer-focus:text-gray-900' />
    </div>
  )
}
