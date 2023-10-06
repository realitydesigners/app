import { Box, Text } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'

const PostBox = ({ post, position, rotationY }) => {
  console.log('Post:', post) // Debugging line

  const [texture, setTexture] = useState(null)

  useEffect(() => {
    const loadImageTexture = () => {
      if (post.image) {
        let imageUrl

        if (post.image.asset && post.image.asset.url) {
          imageUrl = post.image.asset.url
        } else if (post.image.asset && post.image.asset._ref) {
          // If the URL is not directly available, you can construct it based on the reference
          imageUrl = `https://cdn.sanity.io/images/fovvfda4/production/${post.image.asset._ref
            .split('-')
            .join('.')}`
        }

        if (imageUrl) {
          const loader = new THREE.TextureLoader()

          loader.load(imageUrl, (texture) => {
            texture.repeat.set(2, 2)
            setTexture(texture)
          })
        }
      }
    }

    if (post.image) {
      loadImageTexture()
    }
  }, [post.image])

  return (
    <group position={position} rotation={[0, rotationY + Math.PI, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <Box args={[1.5, 1, 0.1]} />
        {texture && <meshBasicMaterial attach="material" map={texture} />}
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
