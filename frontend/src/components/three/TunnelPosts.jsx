import { Box, CameraControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import PostsList from './PostsList'
import Stars from './Stars'

const Scene = ({ posts }) => {
  const { controls } = useThree()
  const meshRef = useRef()

  return (
    <>
      <ambientLight intensity={0.5} />
      <PostsList posts={posts} />
      <Stars />

      <CameraControls />
    </>
  )
}

const Tunnel = ({ posts }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      style={{ height: '100vh', width: '100vw', background: 'black' }}
    >
      <Scene posts={posts} />
    </Canvas>
  )
}

export default Tunnel
