import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useCallback, useState } from 'react'
import AllCategories from './AllCategories'
import { useCategory } from './CategoryContext'
import Stars from './Stars'

const Description = () => {
  return (
    <div className="w-full lg:w-1/4top-20 left-8 flex flex-col h-full p-8 backdrop-blur-sm bg-black/50 rounded-lg shadow-lg">
      <h2 className="text-gray-200  text-4xl font-extrabold mb-2 leading-tight">
        Topic Exploration
      </h2>
      <p className="text-gray-300   text-md leading-tight mb-4 opacity-80">
        A 3D expanding grid of categories with hover effects and spatial
        popovers.
      </p>
      <h3 className="text-gray-200 text-2xl font-bold mb-2 leading-snug">
        Data Integration
      </h3>
      <p className="text-gray-300 rajdhani text-md leading-tight mb-4 opacity-80">
        The visualization is made using react-three-fiber. All content is
        sourced from our Sanity API ensuring a real-time experience.
      </p>
      <h3 className="text-gray-200  text-xl font-bold mb-2 leading-snug">
        Use Cases
      </h3>
      <ul className="text-gray-300  text-md mb-2 leading-tight pl-8 list-disc opacity-80">
        <li className="mb-1">
          Interactive Blog Exploration: Topics are shown as an object that can
          be hovered and show related topics from the main.
        </li>
      </ul>
    </div>
  )
}

const InteractiveWorldScene = ({ category = [] }) => {
  const { navigation, setNavigation } = useCategory()

  // State variables
  const [highlightedWorld, setHighlightedWorld] = useState(null)

  const [selectedMainWorld, setSelectedMainWorld] = useState(null)
  const [highlightedCategory, setHighlightedCategory] = useState(null)

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
    <div className="relative flex flex-col-reverse lg:flex-row justify-center items-center w-full h-auto p-4 lg:p-20 gap-8">
      <Description />
      <div className="w-full lg:w-3/4 flex lg:h-[80vh] h-[50vh] shadow-2xl">
        <Canvas
          camera={{ position: [0, 0, 40], fov: 45 }}
          style={{ height: 'full', width: '100vw', background: 'black' }}
          className="border rounded-xl border-black"
        >
          <OrbitControls />
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
    </div>
  )
}

export default InteractiveWorldScene
