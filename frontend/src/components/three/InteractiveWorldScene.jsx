'use client'

import { a, useSpring } from '@react-spring/three'
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useCallback, useEffect, useRef, useState } from 'react'
import AllCategories from './AllCategories'
import Breadcrumb from './Breadcrumb'
import { useCategory } from './CategoryContext'
import HumanScene from './HumanScene'
import { Menu } from './Menu'
import Sidebar from './Sidebar'
import Stars from './Stars'

const CAMERA_POSITION = [0, 0, 30]

const InteractiveWorldScene = ({ category = [] }) => {
  const { navigation, setNavigation } = useCategory()
  const orbitControlsRef = useRef(null)

  // State variables

  const [highlightedWorld, setHighlightedWorld] = useState(null)
  const [hoveredWorld, setHoveredWorld] = useState(null)
  const [cameraPosition, setCameraPosition] = useState(CAMERA_POSITION)
  const [selectedMainWorld, setSelectedMainWorld] = useState(null)
  const [highlightedCategory, setHighlightedCategory] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSubWorld, setSelectedSubWorld] = useState(null)
  const [currentContent, setCurrentContent] = useState([])
  const [activeBackgroundScene, setActiveBackgroundScene] = useState(null)

  const handleMainWorldInteraction = useCallback(
    (worldName, position, childCategoryName) => {
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

      setNavigation((prev) => ({
        ...prev,
        mainWorld: worldName,
        category: prev.category,
      }))
    },
    [category, setNavigation],
  )

  const mainCategories = category.filter(
    (cat) => Boolean(cat.title) && cat.isMain,
  )

  const shouldShowSidebar = sidebarOpen && currentContent.length > 0

  const props = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [1, 1, 1] },
  })
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Breadcrumb
        navigation={{
          mainWorld: highlightedCategory,
          subWorld: highlightedWorld,
        }}
      />
      <Menu
        categories={mainCategories}
        selectedMainWorld={selectedMainWorld}
        onSelectedMainWorldChange={setSelectedMainWorld}
        onCategorySelect={setSelectedMainWorld}
        onCategoryHighlight={setHighlightedCategory}
        setSelectedSubWorld={setSelectedSubWorld}
        onSubCategoryHighlight={setHighlightedWorld}
      />
      <Sidebar content={currentContent} isVisible={shouldShowSidebar} />

      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <PerspectiveCamera makeDefault position={cameraPosition} zoom={0.7} />
        <OrbitControls ref={orbitControlsRef} />
        {activeBackgroundScene === 'humanScene' && (
          <a.group scale={props.scale}>
            <HumanScene />
          </a.group>
        )}

        {/*   
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
