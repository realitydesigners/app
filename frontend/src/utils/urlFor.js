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

export function fileUrlFor(ref) {
  const projectId = 'fovvfda4'
  const dataset = 'production'

  const parts = ref.split('-')
  const fileId = parts[1]
  const fileExtension = parts[parts.length - 1] // This extracts 'glb' from your ref

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${fileExtension}`
}
