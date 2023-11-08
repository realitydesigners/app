import { a, useSpring } from '@react-spring/three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useCallback, useState } from 'react'
import { useCategory } from './CategoryContext'
import {
  AllCategories,

} from './index.ts'

const CAMERA_POSITION = [0, 0, 5]

const InteractiveWorldScene = ({ library = [] }) => {
  const { navigation, setNavigation } = useCategory()

  // State variables
  const [highlightedWorld, setHighlightedWorld] = useState(null)
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
        setSelectedSubWorld(childCategoryName)
      } else {
        setSelectedSubWorld(null)
      }

      setNavigation((prev) => ({
        ...prev,
        mainWorld: worldName,
        category: prev.category,
      }))
    },
    [library, setNavigation],
  )

  const mainCategories = library.filter(
    (cat) => Boolean(cat.title) && cat.isMain,
  )

  const shouldShowSidebar = sidebarOpen && currentContent.length > 0

  const props = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [1, 1, 1] },
  })

  return (
    <div style={{ height: '100vh', width: '100vw' }}>

      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <PerspectiveCamera makeDefault position={cameraPosition} zoom={1} />
        <OrbitControls />

        <AllCategories
          categories={mainCategories}
          highlightedCategory={highlightedCategory}
          handleMainWorldInteraction={handleMainWorldInteraction}
          selectedMainWorld={selectedMainWorld}
          highlightedWorld={highlightedWorld}
        />
      
      </Canvas>
    </div>
  )
}

export default InteractiveWorldScene
