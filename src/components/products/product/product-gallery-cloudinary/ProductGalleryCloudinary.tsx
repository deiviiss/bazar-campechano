'use client'

import Script from 'next/script'
import { useEffect, useRef } from 'react'

interface ProductGalleryProps {
  cloudName: string // Cloud name
  mediaAssets: Array<{ tag: string } | { publicId: string }> // Array of media assets (tags or publicIds)
  aspectRatio?: string // Aspect ratio for the gallery
}

export const ProductGalleryCloudinary = ({
  cloudName,
  mediaAssets
}: ProductGalleryProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null) // Reference to the container

  const initializeGallery = () => {
    const cloudinary = (window as any)?.cloudinary

    if (!cloudinary?.galleryWidget || !containerRef.current) {
      // eslint-disable-next-line no-console
      console.error('Cloudinary Product Gallery could not be initialized. Please check your Cloudinary configuration.')
      return
    }

    // clear the container
    containerRef.current.innerHTML = ''

    // Initialize the Cloudinary gallery widget
    const gallery = cloudinary.galleryWidget({
      container: containerRef.current,
      cloudName,
      mediaAssets,
      navigationButtonProps: {
        shape: 'square',
        size: 50,
        color: '#171717',
        iconColor: '#ffffff'
      },
      themeProps: {
        active: '#000000',
        primary: '#979797'
      },
      thumbnailProps: {
        selectedBorderWidth: 3
      }
    })

    gallery.render()
  }

  useEffect(() => {
    const cloudinary = (window as any)?.cloudinary
    if (cloudinary?.galleryWidget) {
      initializeGallery()
    }
  }, [cloudName, mediaAssets])

  return (
    <>
      <Script
        src="https://product-gallery.cloudinary.com/latest/all.js"
        onReady={initializeGallery}
        strategy="lazyOnload"
        onError={() => { console.error('Failed to load Cloudinary script.') }}
      /><div
        ref={containerRef}
        className='pt-2 md:pt-0'
        style={{
          maxWidth: '95%',
          width: '100%',
          margin: '0 auto'
        }}
      >
      </div >
    </>
  )
}
