import type { Image, PortableTextBlock } from 'sanity'

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  ogImage?: Image
}

export interface PostsPayload {
  title?: any
  position?: any
  layout?: string
  slug?: {
    current?: string
  }
  excerpt?: string
  author?: string
  tags?: string[]
  category?: string
  publicationDate?: string
  lightLayout?: {
    image?: Image
    description?: PortableTextBlock[]
  }
  darkLayout?: {
    image?: Image
    description?: PortableTextBlock[]
  }
}

export interface CategoryPayload {
  _id: string
  _type: string
  title?: string
  name?: string
  slug?: {
    current?: string
  }
  isMain?: boolean
  sceneIdentifier?: string
  subCategories?: CategoryPayload[]
  shape: {
    name: string
    title: string
    scale: [number, number, number]
    color: string
    emissiveIntensity: number
  }

  associatedPosts?: PostsPayload[]
}

export interface TeamPayload {
  name?: string
  picture?: Image
  slug?: string
  tags?: string
}

export interface MediaPayload {
  title?: string
  slug?: {
    current?: string
  }
  image?: Image
  video?: string
  layout?: string
  category?: string
  author?: string
  excerpt?: string
  tags?: string[]
  scene?: PortableTextBlock[]
  description?: PortableTextBlock[]
}
