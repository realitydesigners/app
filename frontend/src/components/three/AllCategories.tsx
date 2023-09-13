import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Crystal } from '../../components/three/Crystal'

type Position = [number, number, number]
type WorldInteractionHandler = (worldName: string, position: Position) => void

export function getMainCategoryPositions(
  count: number,
  offset: [number, number, number] = [0, 0, 0],
  radius: number = 15,
): [number, number, number][] {
  const phi = Math.PI * (43 - Math.sqrt(5)) // golden angle
  const positions: [number, number, number][] = []

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2 // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y) // radius at y position

    const theta = phi * i

    const x = Math.cos(theta) * radiusAtY * radius + offset[0]
    const z = Math.sin(theta) * radiusAtY * radius + offset[2]
    const offsetY = y * radius + offset[1]

    positions.push([x, offsetY, z])
  }

  return positions
}

export function getSubCategoryPositions(
  count: number,
  radius: number,
  mainCategoryPosition: [number, number, number],
): [number, number, number][] {
  return Array.from({ length: count }, (_, index) => {
    const angle = (Math.PI * 2 * index) / count
    const x = mainCategoryPosition[0] + Math.cos(angle) * radius
    const y = mainCategoryPosition[1] + Math.sin(angle) * radius
    return [x, y, mainCategoryPosition[2]] as [number, number, number]
  })
}

interface Category {
  title?: string
  isMain: boolean
  subCategories?: Category[]
}

interface BaseCategoryProps {
  title: string
  position: Position
  isHighlighted: boolean
}

interface MainCategoryProps extends BaseCategoryProps {
  onClick: WorldInteractionHandler
  onPointerOver?: WorldInteractionHandler
  onPointerOut: () => void
  hoveredWorld: string | null
  onHover: () => void
  onLeave: () => void
  selectedMainWorld: string | null
}

interface SubCategoryProps extends BaseCategoryProps {
  onClick: WorldInteractionHandler
  onPointerOver: (subWorldName: string) => void
  onPointerOut: () => void
}

interface MainCategoriesProps {
  categories: Category[]
  highlightedCategory: string | null
  handleMainWorldInteraction: WorldInteractionHandler
  hoveredWorld: string | null
  setHoveredWorld: (world: string | null) => void
  selectedMainWorld: string | null
}

interface SubCategoriesProps {
  mainWorldPosition: Position
  subCategories: Omit<SubCategoryProps, 'position'>[]
}

interface AllCategoriesProps {
  categories: Category[]
  highlightedCategory: string | null
  handleMainWorldInteraction: WorldInteractionHandler
  selectedMainWorld: string | null
  highlightedWorld: string | null
}

const playSound = (soundPath: string) => {
  const audio = new Audio(soundPath)
  audio.play()
}

export const MainCategory: React.FC<MainCategoryProps> = (props) => {
  const {
    title,
    position,
    isHighlighted,
    onClick,
    onPointerOver,
    onPointerOut,
    hoveredWorld,
    onHover,
    onLeave,
    selectedMainWorld,
  } = props

  const isDimmed =
    (hoveredWorld && hoveredWorld !== title) ||
    (selectedMainWorld && selectedMainWorld !== title)

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

  const textRef = useRef<THREE.Object3D>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position)
    }
  })

  return (
    <group onPointerOver={onHover} onPointerOut={onLeave}>
      <Crystal
        className="main-crystal"
        position={position}
        scale={[1, 1, 1]}
        onPointerOver={handleHover}
        onPointerOut={onPointerOut}
        onClick={handleClick}
        emissiveIntensity={isDimmed ? 0.25 : isHighlighted ? 1.5 : 1}
      />
      <Text
        ref={textRef}
        position={[position[0], position[1], position[2] + 2.5]}
        color="white"
        fontSize={0.6}
        font={'/fonts/monomaniac.ttf'}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  )
}

export const MainCategories: React.FC<MainCategoriesProps> = ({
  categories,
  highlightedCategory,
  handleMainWorldInteraction,
  setHoveredWorld,
  hoveredWorld,
  selectedMainWorld,
}) => {
  const positions = getMainCategoryPositions(categories.length)

  return (
    <>
      {categories.map((cat, index) => {
        const [x, y, z] = positions[index]
        const world = cat.title || ''
        const isHovered = world === highlightedCategory
        return (
          <MainCategory
            key={world}
            title={world}
            position={[x, y, z]}
            isHighlighted={isHovered}
            onClick={handleMainWorldInteraction}
            onPointerOver={() => handleMainWorldInteraction(world, [x, y, z])}
            onPointerOut={() => {}}
            hoveredWorld={hoveredWorld}
            onHover={() => setHoveredWorld(world)}
            onLeave={() => setHoveredWorld(null)}
            selectedMainWorld={selectedMainWorld}
          />
        )
      })}
    </>
  )
}

export const SubCategory: React.FC<SubCategoryProps> = ({
  title,
  position,
  isHighlighted,
  onClick,
  onPointerOver,
  onPointerOut,
}) => {
  const textRef = useRef<THREE.Object3D>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position)
    }
  })

  return (
    <group>
      <Crystal
        className="sub-crystal"
        position={position}
        scale={[0.5, 0.5, 0.5]}
        onPointerOver={() => title && onPointerOver(title)}
        onPointerOut={onPointerOut}
        onClick={() => title && onClick(title, position)}
        emissiveIntensity={isHighlighted ? 1.5 : 1}
      />
      <Text
        ref={textRef}
        position={[position[0], position[1], position[2] + 1.5]}
        color="white"
        fontSize={0.3}
        font={'/fonts/monomaniac.ttf'}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  )
}

export const SubCategories: React.FC<SubCategoriesProps> = ({
  mainWorldPosition,
  subCategories,
}) => {
  const { camera } = useThree()

  const currentPositionsRef = useRef<THREE.Vector3[]>([])

  const positions = getSubCategoryPositions(
    subCategories.length,
    3,
    mainWorldPosition,
  )

  useFrame(() => {
    if (currentPositionsRef.current.length === 0) return
    const mainWorldVec = new THREE.Vector3(...mainWorldPosition)

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
      {subCategories
        .filter((subCat) => subCat.title)
        .map((subCat, index) => (
          <SubCategory
            key={subCat.title}
            title={subCat.title}
            position={positions[index]}
            isHighlighted={subCat.isHighlighted}
            onClick={subCat.onClick}
            onPointerOver={subCat.onPointerOver}
            onPointerOut={subCat.onPointerOut}
          />
        ))}
    </>
  )
}

const AllCategories: React.FC<AllCategoriesProps> = ({
  categories,
  highlightedCategory,
  handleMainWorldInteraction,
  selectedMainWorld,
}) => {
  const positions = getMainCategoryPositions(categories.length)
  const selectedMainWorldPosition =
    positions[categories.findIndex((cat) => cat.title === highlightedCategory)]
  const selectedMainWorldCategory = categories.find(
    (category) => category.title === highlightedCategory,
  )
  const subCategories = selectedMainWorldCategory?.subCategories || []
  const [highlightedWorld, setHighlightedWorld] = useState<string | null>(null)
  const [hoveredWorld, setHoveredWorld] = useState<string | null>(null)

  return (
    <group
      onPointerOut={() => {
        setHoveredWorld(null)
      }}
    >
      <MainCategories
        categories={categories}
        highlightedCategory={highlightedCategory}
        handleMainWorldInteraction={handleMainWorldInteraction}
        hoveredWorld={hoveredWorld}
        setHoveredWorld={setHoveredWorld}
        selectedMainWorld={selectedMainWorld}
      />
      {selectedMainWorld && (
        <SubCategories
          mainWorldPosition={selectedMainWorldPosition}
          subCategories={subCategories
            .filter((subCat) => subCat.title)
            .map((subCat) => ({
              title: subCat.title!,
              isHighlighted: highlightedWorld === subCat.title,
              onClick: handleMainWorldInteraction,
              onPointerOver: () => setHighlightedWorld(subCat.title!),
              onPointerOut: () => {}, // Do nothing when pointer leaves sub-world
            }))}
        />
      )}
    </group>
  )
}

export default React.memo(AllCategories)
