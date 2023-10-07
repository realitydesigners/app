import { Box, CameraControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import PostsList from './PostsList'
import Stars from './Stars'

const Scene = ({ posts }) => {
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
      camera={{ position: [0, 0, 20], fov: 45 }}
      style={{ height: 'full', width: '100vw', background: 'black' }}
      className="border rounded-xl border-black"
    >
      <Scene posts={posts} />
    </Canvas>
  )
}

export default Tunnel
