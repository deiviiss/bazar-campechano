export const validatePageNumber = (page: number): number => {
  if (isNaN(Number(page)) || page < 1) {
    return 1
  }
  return page
}
