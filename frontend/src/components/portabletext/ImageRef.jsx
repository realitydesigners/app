import '../../../globals.css'
import { getSanityImageURL } from '../../utils/helpers'

const ImageCard = ({ value }) => {
  const imageClassName = value.className || ''

  return (
    <div>
      <div className={imageClassName}>
        <img
          src={getSanityImageURL(value).url()}
          alt={value.alt || 'Article image'}
          className="h-full w-full mb-8"
        />
      </div>
    </div>
  )
}

export default ImageCard
