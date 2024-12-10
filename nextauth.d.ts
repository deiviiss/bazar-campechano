import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      emailVerified: boolean
      phoneNumber: string
      role: string
      image?: string
    } & DefaultSession['user']
  }
}

// /types/global.d.ts

interface Cloudinary {
  galleryWidget: (options: {
    container: HTMLElement | null
    cloudName: string
    mediaAssets: Array<{ publicId: string }>
    navigationButtonProps?: { shape: string, size: number, color: string, iconColor: string }
    themeProps?: { active: string, primary: string }
    thumbnailProps?: { selectedBorderWidth: number }
  }) => { render: () => void, destroy: () => void }
}

declare global {
  interface Window {
    cloudinary?: Cloudinary
  }
}
