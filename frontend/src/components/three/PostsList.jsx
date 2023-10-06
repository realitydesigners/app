import { Box, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PostBox = ({ post, position, rotationY }) => {
  return (
    <group position={position} rotation={[0, rotationY + Math.PI, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <Box args={[1.5, 1, 0.1]} />
        <Text
          position={[0, 0, 0.07]}
          fontSize={0.1}
          color="red"
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
      {' '}
      {/* Rotate around the X-axis */}
      {posts.map((post, id) => {
        const angle = angleIncrement * id
        const position = [
          circleRadius * Math.cos(angle),
          0,
          circleRadius * Math.sin(angle),
        ]
        return (
          <PostBox
            key={post.id}
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
