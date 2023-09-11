import ArticleCard from './ArticleCard.jsx'

const ArticleRefWrapper = ({ value }) => {
  const { articleRef } = value

  if (!articleRef || !articleRef.articleTitle || !articleRef.articleSlug)
    return null

  return (
    <ArticleCard
      title={articleRef.articleTitle}
      slug={articleRef.articleSlug}
      image={articleRef.articleImage}
    />
  )
}

export default ArticleRefWrapper
