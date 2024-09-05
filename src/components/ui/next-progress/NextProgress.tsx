'use client'

import NextTopLoader from 'nextjs-toploader'

export function NextProgress() {
  return <NextTopLoader color='#000000' showSpinner={false} crawlSpeed={100} speed={100} />
}
