import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

export const Stars: React.FC = () => {
  const { scene } = useThree()
  const starFieldRef = useRef<THREE.Group>()

  React.useEffect(() => {
    let group = new THREE.Group()
    let geometry = new THREE.BufferGeometry()
    let vertices: number[] = []

    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 1000
      const y = (Math.random() - 0.5) * 1000
      const z = (Math.random() - 0.5) * 1000
      vertices.push(x, y, z)
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3),
    )

    let material = new THREE.PointsMaterial({ size: 0.5, color: 0xffffff })

    let stars = new THREE.Points(geometry, material)
    group.add(stars)

    starFieldRef.current = group // Store the reference to the star field
    scene.add(group)

    return () => {
      scene.remove(group)
    }
  }, [scene])

  useFrame(({ clock }) => {
    console.log('Frame update')
    console.log(starFieldRef.current)

    if (starFieldRef.current) {
      const elapsedTime = clock.getElapsedTime()

      starFieldRef.current.rotation.x = Math.sin(elapsedTime * 0.003) * Math.PI
      starFieldRef.current.rotation.y = Math.cos(elapsedTime * 0.002) * Math.PI
    }
  })

  return null // This component doesn't render anything itself
}

export default Stars
