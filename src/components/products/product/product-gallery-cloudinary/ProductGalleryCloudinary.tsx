'use client'

import Script from 'next/script'
import { useEffect, useRef } from 'react'
// import { useEffect } from 'react'

interface ProductGalleryProps {
  cloudName: string // Your Cloudinary cloud name
  mediaAssets: Array<{ tag: string } | { publicId: string }> // Array of media assets (tags or publicIds)
  aspectRatio?: string // Aspect ratio for the gallery
}

export const ProductGalleryCloudinary = ({
  cloudName,
  mediaAssets
}: ProductGalleryProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null) // Reference to the container
  // const scriptLoaded = useRef(false)

  useEffect(() => {
    const cloudinary = (window as any)?.cloudinary

    if (!cloudinary?.galleryWidget) {
      // eslint-disable-next-line no-console
      console.error('Cloudinary Product Gallery could not be initialized. Please check your Cloudinary configuration.')
      return
    }

    if (cloudinary && containerRef.current) {
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
  }, [cloudName, mediaAssets])

  return (
    <>
      <Script
        src="https://product-gallery.cloudinary.com/latest/all.js"
      /><div
        ref={containerRef}
        className='pt-2 md:pt-0'
        style={{
          maxWidth: '95%',
          width: '100%',
          margin: '0 auto'
        }}
      >
      </div>
    </>
  )
}
