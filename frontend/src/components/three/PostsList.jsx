import { Box, Html, Plane, Text } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { urlFor } from '../../utils/urlFor'

const PostBox = ({ post, position, rotationY }) => {
  const meshRef = useRef()
  const texture = useLoader(THREE.TextureLoader, urlFor(post.image).url())

  console.log(texture)

  return (
    <group position={position} rotation={[0, rotationY + Math.PI, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <Box args={[1.5, 1, 0]} />
        <mesh ref={meshRef}>
          <Box args={[1.5, 1, 0.1]} />
          {texture && <meshBasicMaterial attach="material" map={texture} />}
        </mesh>
        <Text
          position={[0, 0, 0.07]}
          fontSize={0.1}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {post.title}
        </Text>
      </mesh>
    </group>
  )
}

const PostsList = ({ posts }) => {
  const circleRadius = 2
  const postsCount = posts.length
  const angleIncrement = (2 * Math.PI) / postsCount

  return (
    <group rotation={[Math.PI / 2, Math.PI, 0]}>
      {posts.map((post, id) => {
        const angle = angleIncrement * id
        const position = [
          circleRadius * Math.cos(angle),
          0,
          circleRadius * Math.sin(angle),
        ]
        return (
          <PostBox
            key={id}
            post={post}
            position={position}
            rotationY={-angle + Math.PI / 2}
          />
        )
      })}
    </group>
  )
}

export default PostsList
