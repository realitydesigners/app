const AudioPlayer = ({ audioTitle, audioFileUrl }) => {
  if (!audioFileUrl) {
    return <p>Audio file not found.</p>
  }

  return (
    <div className=" p-4 mb-8">
      <p className="mb-2 font-bold text-white-700 p-2">{audioTitle}</p>
      <audio controls className="w-full" src={audioFileUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default AudioPlayer
