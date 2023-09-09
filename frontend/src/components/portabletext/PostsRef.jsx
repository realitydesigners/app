import PostsCard from './PostsCard.jsx'

const PostsRefWrapper = ({ value }) => {
  const { postsRef } = value

  if (!postsRef || !postsRef.postsTitle || !postsRef.postsSlug) return null

  return (
    <PostsCard
      title={postsRef.postsTitle}
      slug={postsRef.postsSlug}
      image={postsRef.postsImage}
    />
  )
}

export default PostsRefWrapper
