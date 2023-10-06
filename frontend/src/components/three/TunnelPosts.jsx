import { Box, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import PostsList from './PostsList' // This component should be created to display a list of posts in a 3D manner.
import Stars from './Stars'

const CAMERA_POSITION = [0, 0, 10]

const Tunnel = ({ posts }) => {
  const [cameraPosition, setCameraPosition] = useState(CAMERA_POSITION)

  console.log(
    'Posts:',
    posts.map((post) => post.image.asset.url),
  )

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <PerspectiveCamera makeDefault position={cameraPosition} zoom={1} />
        <OrbitControls />
        <PostsList posts={posts} />
        <Stars />
      </Canvas>
    </div>
  )
}

export default Tunnel
