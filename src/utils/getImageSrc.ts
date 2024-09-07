export const isValidFileSystemUrl = (src: string) => {
  return typeof src === 'string' && src.startsWith('file-system')
}

export const getImageSrc = (src: string) => {
  if (!src) return '/imgs/placeholder.jpg'

  const isFileSystem = src.startsWith('file-system')
  return isFileSystem ? `/products/${src}` : src
}
