import PostsCardLight from './PostsCardLight.jsx'

const PostsRefWrapper = ({ value }) => {
  const { postsRef } = value

  if (!postsRef || !postsRef.postsTitle || !postsRef.postsSlug) return null

  return (
    <PostsCardLight
      title={postsRef.postsTitle}
      slug={postsRef.postsSlug}
      image={postsRef.postsImage}
    />
  )
}

export default PostsRefWrapper
