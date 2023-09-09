import { createClient } from '@sanity/client'
import { createImageBuilder } from 'astro-sanity'
import { getImage } from 'astro:assets'

const builder = createImageBuilder(
  createClient({
    name: 'default',
    title: 'website',
    projectId: 'fovvfda4',
    dataset: 'production',
    useCdn: true,
  }),
)

export function getSanityImageURL(source) {
  return builder.image(source)
}

export async function getAstroOptimizedImage(source) {
  const sanityUrl = builder.image(source)
  const optimizedImage = await getImage({
    src: sanityUrl,
    format: 'webp', // Auto will let Astro decide the best format like webp or avif based on the context
    // you can set other attributes like width, height, quality, etc.
  })
  return optimizedImage.src // Returns the Astro-optimized image URL
}
