// AudioPlayer.jsx
const AudioPlayer = ({ audio, title, description }) => {
  return (
    <div className="audio-player">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <audio controls>
        <source src={audio} type="audio/mp3" />{' '}
        {/* Ensure the type matches your audio file format */}
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default AudioPlayer
