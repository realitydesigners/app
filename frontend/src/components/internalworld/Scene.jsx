import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useCallback, useState } from 'react'
import AllCategories from './AllCategories'
import { useCategory } from './CategoryContext'

const Scene = ({ category = [] }) => {
  const { navigation, setNavigation } = useCategory()

  // State variables

  const [highlightedWorld, setHighlightedWorld] = useState(null)

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
    [category, setNavigation],
  )

  const mainCategories = category.filter(
    (cat) => Boolean(cat.title) && cat.isMain,
  )

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 45 }}
        style={{ height: '100vh', width: '100vw', background: 'black' }}
        className="border  border-black"
      >
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

export default Scene
