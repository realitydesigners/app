import SplineCard from './SplineCard.jsx'

const SplineRefWrapper = ({ value }) => {
  const { url } = value
  if (!url) return null

  return <SplineCard url={url} />
}

export default SplineRefWrapper
