import MediaCard from './MediaCard.jsx'

const MediaRefWrapper = ({ value }) => {
  const { media, className } = value

  if (!media || media.type !== 'image') {
    return null
  }

  return (
    <MediaCard media={media} slug={media.slug.current} className={className} />
  )
}

export default MediaRefWrapper
