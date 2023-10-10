import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const SANITY_CONFIG = {
  name: 'default',
  title: 'website',
  projectId: 'fovvfda4',
  dataset: 'production',
  apiVersion: '2023-08-31',
  useCdn: true,
}

const BASE_URL = `https://cdn.sanity.io/files/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}`

const client = createClient(SANITY_CONFIG)
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export function fileUrlFor(ref) {
  const parts = ref.split('-')
  const fileId = parts[1]
  const fileExtension = parts[parts.length - 1]

  return `${BASE_URL}/${fileId}.${fileExtension}`
}
