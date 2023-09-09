const SplineCard = ({ url }) => {
  return (
    <div className="h-screen w-full">
      <spline-viewer url={url}></spline-viewer>
    </div>
  )
}

export default SplineCard
