import { useCallback, useState } from 'react'
import * as THREE from 'three'
import { a, useSpring } from '@react-spring/three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import {
  PostsBySubCategory,
  useMainWorldInteraction

} from './index.ts'

const CAMERA_POSITION = [0, 0, 5]

const Scene = ({ category }) => {
  const {
    handleMainWorldInteraction,
    subCategories,
    highlightedCategory,
    selectedMainWorld,
    highlightedWorld
  } = useMainWorldInteraction(category);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas style={{ height: '100vh', width: '100vw' }}>
      <PerspectiveCamera makeDefault position={CAMERA_POSITION} zoom={1} />
        <OrbitControls />
        <PostsBySubCategory
          categories={subCategories}
          highlightedCategory={highlightedCategory}
          handleMainWorldInteraction={handleMainWorldInteraction}
          selectedMainWorld={selectedMainWorld}
          highlightedWorld={highlightedWorld}
        />
      </Canvas>
    </div>
  )
}

export default Scene
