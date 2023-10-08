import { Box, Html, Plane, Text, useTexture } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'
import * as THREE from 'three'
import { urlFor } from '../../utils/urlFor'

const QuoteBox = ({ quote, position, rotationY }) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={[5, 4, 0.1]}>
      <mesh>
        <Text
          name="PostTitle"
          position={[0, 0.25, 0]}
          fontSize={0.1}
          color="white"
          maxWidth={0.8}
          anchorX="center"
          anchorY="middle"
          font={'/fonts/monomaniac.ttf'}
        >
          {quote.quote}
        </Text>
      </mesh>
    </group>
  )
}

const QuoteList = ({ quotes }) => {
  const radius = quotes.length * 2 // Adjust this for the desired curvature
  const angleIncrement = Math.PI / (quotes.length - 1) // Distribute the quotes over a half-circle

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {' '}
      {/* Rotating the group 90 degrees to the left */}
      {quotes.map((quote, id) => {
        const angle = angleIncrement * id
        const position = [
          radius * Math.sin(angle),
          0,
          -radius * Math.cos(angle),
        ]
        return (
          <QuoteBox
            key={id}
            quote={quote}
            position={position}
            rotationY={-angle}
          />
        )
      })}
    </group>
  )
}

export default QuoteList
