'use client'

import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { Image, PortableTextBlock } from 'sanity'
import * as THREE from 'three'
import AllCategories from '../../components/three/AllCategories'
import { useCategory } from '../../components/three/CategoryContext'
import Sidebar from '../../components/three/Sidebar'
import Stars from '../../components/three/Stars'

export interface PostsPayload {
  title?: any
  position?: any
  layout?: string
  slug?: {
    current?: string
  }
  excerpt?: string
  author?: string
  tags?: string[]
  category?: string
  publicationDate?: string
  lightLayout?: {
    image?: Image
    description?: PortableTextBlock[]
  }
  darkLayout?: {
    image?: Image
    description?: PortableTextBlock[]
  }
}

export interface CategoryPayload {
  _id: string
  _type: string
  title?: string
  name?: string
  slug?: {
    current?: string
  }
  isMain?: boolean
  sceneIdentifier?: string
  subCategories?: CategoryPayload[]
  shape: {
    name: string
    title: string
    scale: [number, number, number]
    color: string
    emissiveIntensity: number
  }

  associatedPosts?: PostsPayload[]
}

const CAMERA_POSITION: [number, number, number] = [0, 0, 30]

interface InteractiveWorldSceneProps {
  category: CategoryPayload[]
}

interface Category {
  title: string
  isMain: boolean
  subCategories?: Category[]
}
const InteractiveWorldScene: React.FC<InteractiveWorldSceneProps> = ({
  category,
}) => {
  const { navigation, setNavigation } = useCategory()
  const orbitControlsRef = useRef<any>(null)

  // State variables

  const [highlightedWorld, setHighlightedWorld] = useState<string | null>(null)
  const [hoveredWorld, setHoveredWorld] = useState<string | null>(null)

  const [cameraPosition, setCameraPosition] =
    useState<[number, number, number]>(CAMERA_POSITION)
  const [selectedMainWorld, setSelectedMainWorld] = useState<string | null>(
    null,
  )
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(
    null,
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [selectedSubWorld, setSelectedSubWorld] = useState<string | null>(null)

  const [currentContent, setCurrentContent] = useState<PostsPayload[]>([])

  const [activeBackgroundScene, setActiveBackgroundScene] = useState<
    string | null
  >(null)

  const handleMainWorldInteraction = useCallback(
    (
      worldName: string,
      position: [number, number, number],
      childCategoryName?: string,
    ) => {
      setSelectedMainWorld(worldName)
      setHighlightedWorld(worldName)
      setHighlightedCategory(worldName)

      const currentCategory = category.find((cat) => cat.title === worldName)
      if (currentCategory && currentCategory.sceneIdentifier) {
        setActiveBackgroundScene(currentCategory.sceneIdentifier)
      }

      if (currentCategory && currentCategory.associatedPosts) {
        setCurrentContent(currentCategory.associatedPosts)
      } else {
        setCurrentContent([])
      }

      setSidebarOpen(true)

      if (childCategoryName) {
        setHighlightedWorld(childCategoryName)
      }

      setNavigation((prev: any) => ({
        ...prev,
        mainWorld: worldName,
        category: prev.category,
      }))
    },
    [category, setNavigation],
  )

  const mainCategories = category.filter(
    (cat) => Boolean(cat.title) && cat.isMain,
  ) as Category[]

  const shouldShowSidebar = sidebarOpen && currentContent.length > 0

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Sidebar content={currentContent} isVisible={shouldShowSidebar} />

      <Canvas
        style={{ height: '100vh', width: '100vw' }}
        gl={{ outputEncoding: THREE.sRGBEncoding }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} zoom={0.7} />
        <OrbitControls ref={orbitControlsRef} />

        {/*   
        {activeBackgroundScene === 'humanScene' && <HumanScene />}
        {activeBackgroundScene === 'cultureScene' && <CultureScene />}
        */}

        <AllCategories
          categories={mainCategories}
          highlightedCategory={highlightedCategory}
          handleMainWorldInteraction={handleMainWorldInteraction}
          selectedMainWorld={selectedMainWorld}
          highlightedWorld={highlightedWorld}
        />
        <Stars />
      </Canvas>
    </div>
  )
}

export default InteractiveWorldScene
