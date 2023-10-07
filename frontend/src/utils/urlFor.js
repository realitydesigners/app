import { createClient } from '@sanity/client'
import imageUrlFor from '@sanity/image-url/'

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlFor(
  createClient({
    name: 'default',
    title: 'website',
    projectId: 'fovvfda4',
    dataset: 'production',
    apiVersion: '2023-08-31',
    useCdn: true,
  }),
)

export function urlFor(source) {
  return builder.image(source)
}
