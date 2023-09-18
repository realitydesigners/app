// AudioRef.jsx

function AudioRef({ value }) {
  console.log('Received value in AudioRef:', value)
  const { title, audioFile } = value

  if (!audioFile || !audioFile.url) {
    return <p>Audio file not found.</p>
  }

  return (
    <div>
      <h3>{title}</h3>
      <audio controls>
        <source src={audioFile.url} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default AudioRef
