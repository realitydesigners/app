import '../../../globals.css'
import { getSanityImageURL } from '../../utils/helpers.js'

const PostsCardLight = ({ title, slug, image, excerpt }) => {
  return (
    <div className="flex w-full  items-center justify-center p-4 mb-8 lg:p-12">
      <div className=" bg-gray-300 w-full rounded-xl md:w-1/2 group flex h-auto flex-row p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl lg:w-1/2">
        {image && (
          <div className="relative w-1/3">
            <img
              src={getSanityImageURL(image).url()}
              alt={title || 'Article image'}
              width={100}
              height={100}
              className="h-full w-full transform rounded-md object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}

        <div className="relative flex w-3/4 flex-col pl-4">
          <p className="mb-2 font-rajdhani text-sm uppercase leading-none tracking-wide text-black">
            Article
          </p>
          <a
            className="duration-3 scramble-title font-rajdhani text-xl tracking-wide text-black transition-colors group-hover:text-gray-800 group-hover:underline"
            href={`/posts/${slug}`}
          >
            {title}
          </a>
          <p className="text-white"> {excerpt}</p>
        </div>
      </div>
    </div>
  )
}

export default PostsCardLight
