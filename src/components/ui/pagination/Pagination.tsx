'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { generatePagination } from '@/utils'

interface Props {
  totalPages: number
  gender?: string
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page') ?? 1

  let currentPage = isNaN(+pageString) ? 1 : +pageString

  if (currentPage <= 1) {
    currentPage = 1
  }

  const allPages = generatePagination(+currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`
    }

    if (+pageNumber <= 0) {
      return `${pathName}`
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())
    return `${pathName}?${params.toString()}`
  }

  return (
    <div className="flex text-center justify-center mt-10 mb-24">
      <nav aria-label="Page navigation">
        <ul className="flex list-style-none">
          <Button
            asChild
            size={'sm'}
            className='mr-5 hover:text-primary/80'
            variant={'link'}
          >
            <Link
              href={createPageUrl(+currentPage - 1)}>
              <IoChevronBackOutline size={30} />
            </Link>
          </Button>

          {allPages.map((page, index) => {
            return (
              <li key={index} className="page-item">
                <Link
                  className={
                    clsx(
                      'page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded-none text-primary hover:bg-gray-200 focus:shadow-none',
                      {
                        'bg-primary text-white hover:text-white hover:bg-primary/70': page === currentPage
                      }
                    )
                  }
                  href={createPageUrl(page)}>
                  {page}
                </Link>
              </li>
            )
          })}

          <Button
            asChild
            size={'sm'}
            className='ml-5 hover:text-primary/80'
            variant={'link'}
          >
            <Link
              href={createPageUrl(+currentPage + 1)}>
              <IoChevronForwardOutline size={30} />
            </Link>
          </Button>

        </ul>
      </nav>
    </div>

  )
}
