import { Line, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Crystal from './Crystal'
import ModelWithEffects from './ModelWithEffects'

export function getSubCategoryPositions(
  count,
  offset = [0, 0, 0],
  radius = 15,
) {
  const positions = []

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count // Evenly distribute around circle
    const x = Math.cos(angle) * radius + offset[0]
    const z = Math.sin(angle) * radius + offset[2]
    const y = offset[1] // Keep y fixed at the same height

    positions.push([x, y, z])
  }
  return positions
}

const getRefPostPosition = (index, count, subCategoryPosition) => {
  const radius = 10 // Adjust as needed
  const angle = (Math.PI * 2 * index) / count
  const x = subCategoryPosition[0] + Math.cos(angle) * radius
  const y = subCategoryPosition[1] + Math.sin(angle) * radius
  return [x, y, subCategoryPosition[2]]
}

const playSound = (soundPath) => {
  const audio = new Audio(soundPath)
  audio.play()
}

export const SubCategory = (props) => {
  const {
    title,
    model,
    position,
    isHighlighted,
    onClick,
    onPointerOver,
    onPointerOut,
    hoveredWorld,
    onHover,
    onLeave,
    selectedCategory,
    rotationY,
    textWidth = 21,
    textHeight = 15,
  } = props

  const isDimmed =
    (hoveredWorld && hoveredWorld !== title) ||
    (selectedCategory && selectedCategory !== title)

  const handleHover = () => {
    playSound('/sounds/click.mp3')
    if (onPointerOver) {
      onPointerOver(title, position)
    }
  }

  const handleClick = () => {
    playSound('/sounds/click.mp3')
    onClick(title, position)
  }

  const textRef = useRef(null)
  const { camera } = useThree()

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position)
    }
  })

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={onHover}
    >
      <ModelWithEffects
        model={model}
        className="model"
        position={[0, 0, 5]}
        scale={[3, 3, 3]}
        onPointerOut={onPointerOut}
        onClick={() => title && onClick(title, position)}
        emissiveIntensity={isHighlighted ? 1 : 0.6}
      />
      <Text
        ref={textRef}
        position={[0, 0, -3]}
        color="black"
        fontSize={1.5}
        font="/fonts/monomaniac.ttf"
        anchorY="middle"
        maxWidth={6}
        lineHeight={0.9}
        textAlign="center"
      >
        {title}
      </Text>
      <Line
        points={[
          [-textWidth / 2, textHeight / 2, 0],
          [textWidth / 2, textHeight / 2, 0],
          [textWidth / 2, -textHeight / 2, 0],
          [-textWidth / 2, -textHeight / 2, 0],
          [-textWidth / 2, textHeight / 2, 0],
        ]}
        position={[0, 0, 0]}
        color="gray"
        lineWidth={1}
        dashed={false}
      />
    </group>
  )
}

export const SubCategories = (props) => {
  const {
    categories,
    highlightedCategory,
    onCategorySelect,
    setHoveredWorld,
    hoveredWorld,
    selectedCategory,
  } = props

  const positions = getSubCategoryPositions(categories.length)

  return (
    <>
      {categories.map((cat, index) => {
        const [x, y, z] = positions[index]
        const world = cat.title || ''
        const isHovered = world === highlightedCategory
        const rotationY =
          -((Math.PI * 2 * index) / categories.length) + Math.PI / 2

        return (
          <SubCategory
            key={world}
            title={world}
            model={cat.model}
            position={[x, y, z]}
            isHighlighted={isHovered}
            onClick={onCategorySelect}
            onPointerOver={() => setHoveredWorld(world)}
            onHover={() => {
              setHoveredWorld(world)
            }}
            onLeave={() => {
              setHoveredWorld(null)
            }}
            hoveredWorld={hoveredWorld}
            selectedCategory={highlightedCategory}
            rotationY={rotationY}
          />
        )
      })}
    </>
  )
}

export const RefPost = (props) => {
  const {
    title,
    position, // This is the position relative to the subCategoryPosition
    isHighlighted,
    onClick,
    onPointerOver,
    onPointerOut,
  } = props

  const { camera } = useThree()
  const textRef = useRef()

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position)
    }
  })

  return (
    <group position={position}>
      <Crystal
        className="sub-crystal"
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        onPointerOut={onPointerOut}
        onClick={() => title && onClick(title, position)}
        emissiveIntensity={isHighlighted ? 1 : 0.6}
      />
      <Text
        ref={textRef}
        position={[0, 0, -3]}
        color="black"
        fontSize={0.5}
        font="/fonts/monomaniac.ttf"
        textAlign="center"
        anchorY="middle"
        maxWidth={6}
      >
        {title}
      </Text>
    </group>
  )
}

export const RefPosts = (props) => {
  const {
    subCategoryPosition,
    refPosts,
    highlightedCategory,
    setHighlightedCategory,
    onCategorySelect,
    setHoveredWorld,
    hoveredWorld,
  } = props

  const { camera } = useThree()
  const currentPositionsRef = useRef([])

  useFrame(() => {
    if (currentPositionsRef.current.length === 0) return
    const mainWorldVec = new THREE.Vector3(...subCategoryPosition)

    currentPositionsRef.current.forEach((currentPos, i) => {
      const relativePos = new THREE.Vector3().subVectors(
        currentPos,
        mainWorldVec,
      )
      relativePos.applyQuaternion(camera.quaternion)
      currentPos.copy(mainWorldVec).add(relativePos)
    })
  })

  return (
    <>
      {refPosts.map((postRef, index) => {
        const [x, y, z] = getRefPostPosition(
          index,
          refPosts.length,
          subCategoryPosition,
        )
        const isHighlighted = postRef.isHighlighted

        return (
          <RefPost
            key={postRef.title}
            title={postRef.title}
            position={[x, y, z]}
            isHighlighted={isHighlighted}
            onPointerOver={() => {
              onCategorySelect(world, [x, y, z])
            }}
            onPointerOut={() => {}}
            hoveredWorld={hoveredWorld}
          />
        )
      })}
    </>
  )
}

const PostsBySubCategory = (props) => {
  const { categories, onCategorySelect } = props

  const [hoveredWorld, setHoveredWorld] = useState(null)

  // Get positions for all subcategories
  const subCategoryPositions = getSubCategoryPositions(categories.length)

  // Find the hovered subcategory object
  const hoveredCategory = categories.find((cat) => cat.title === hoveredWorld)

  // Get the position for the hovered subcategory
  const hoveredSubCategoryPosition = hoveredCategory
    ? subCategoryPositions[categories.indexOf(hoveredCategory)]
    : null

  // Find the refPosts for the hoveredWorld
  const hoveredCategoryPosts = hoveredCategory?.refPosts || []

  return (
    <group>
      <SubCategories
        categories={categories}
        highlightedCategory={hoveredWorld}
        onCategorySelect={onCategorySelect}
        setHoveredWorld={setHoveredWorld}
        hoveredWorld={hoveredWorld}
      />
      {hoveredWorld && hoveredSubCategoryPosition && (
        <RefPosts
          subCategoryPosition={hoveredSubCategoryPosition}
          refPosts={hoveredCategoryPosts}
          highlightedCategory={hoveredWorld}
          onCategorySelect={onCategorySelect}
        />
      )}
    </group>
  )
}

export default React.memo(PostsBySubCategory)
