'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Category, type CategoryName } from '@/interfaces'

interface Props {
  categories: Category[]
}

const labels: Record<CategoryName, string> = {
  toy: 'Juguetes',
  clothe: 'Ropa',
  shoe: 'Zapatos'
}

export function ProductFilter({ categories }: Props): JSX.Element {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    // Ensure that the category from the URL is reflected in the state
    const categoryFromUrl = searchParams.get('category') || 'all'
    setFilterCategory(categoryFromUrl)
  }, [searchParams])

  const handleFilterCategory = (filter: string) => {
    setFilterCategory(filter)
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')

    if (filter === 'all') {
      params.delete('category')

      // replace route with a route that gets from the input that was converted into query
      replace(`${pathname}?${params.toString()}`)

      return
    }

    params.set('category', filter)

    // replace route with a route that gets from the input that was converted into query
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='relative flex flex-1 flex-shrink-0 max-w-60'>
      <div >
        <Select
          onValueChange={(value) => {
            handleFilterCategory(value)
          }}
        >
          <SelectTrigger className="w-full border border-black flex gap-2">
            <SelectValue placeholder='Todos'>
              {filterCategory !== 'all' ? labels[filterCategory as CategoryName] : 'Todos'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
                categories.map(category => (
                  <SelectItem
                    key={category.id}
                    className='capitalize'
                    value={category.name}>
                    {labels[category.name as CategoryName]}
                  </SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
