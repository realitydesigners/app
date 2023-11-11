import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useCallback, useState } from 'react'
import AllCategories from './AllCategories'
import { useCategory } from './CategoryContext'
import Stars from './Stars'

const InteractiveWorldScene = ({ category = [] }) => {
  const { navigation, setNavigation } = useCategory()

  // State variables
  const [highlightedWorld, setHighlightedWorld] = useState(null)

  const [selectedMainWorld, setSelectedMainWorld] = useState(null)
  const [highlightedCategory, setHighlightedCategory] = useState(null)

  const handleMainWorldInteraction = useCallback(
    (categoryName, position, subcategoryName) => {
      setSelectedMainWorld(categoryName)
      setHighlightedWorld(categoryName)
      setHighlightedCategory(categoryName)

      const currentCategory = category.find((cat) => cat.title === categoryName)
      if (currentCategory && currentCategory.sceneIdentifier) {
        setActiveBackgroundScene(currentCategory.sceneIdentifier)
      }

      if (currentCategory && currentCategory.associatedPosts) {
        setCurrentContent(currentCategory.associatedPosts)
      } else {
        setCurrentContent([])
      }

      setSidebarOpen(true)

      if (subcategoryName) {
        setHighlightedWorld(subcategoryName)
        setSelectedSubWorld(subcategoryName)
      } else {
        setSelectedSubWorld(null)
      }

      setNavigation((prev) => ({
        ...prev,
        mainCategory: categoryName,
        category: prev.category,
      }))
    },
    [category, setNavigation],
  )

  const mainCategories = category.filter(
    (cat) => Boolean(cat.title) && cat.isMain,
  )

  return (
    <div className="relative flex flex-wrap flex-col-reverse lg:flex-row-reverse justify-center  w-full h-auto   border border-gray-600 mb-20 ">
      <TopBar />
      <Description />
      <div className="w-full lg:w-3/4 flex lg:h-[90vh] h-[70vh]  shadow-2xl border-b lg:border-b-0 lg:border-r border-gray-600">
        <Canvas
          camera={{ position: [0, 0, 40], fov: 45 }}
          style={{ height: 'full', width: '100vw', background: 'black' }}
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
      <Bar />
    </div>
  )
}

export default InteractiveWorldScene

const Description = () => {
  return (
    <div className="w-full lg:w-1/4 font-mono flex flex-col h-full p-8 b border-b border-gray-600 shadow-lg ">
      <div className="flex flex-row text-xs font-bold gap-2 mb-8 ">
        <span className="text-teal-200 flex w-auto bg-teal-200/50  rounded pl-2 pr-2 p-1 border border-teal-200">
          3D
        </span>
        <span className="text-yellow-200 flex w-auto bg-yellow-200/50  rounded pl-2 pr-2 p-1 border border-yellow-200">
          CMS
        </span>
      </div>
      <h2 className="text-gray-200  text-3xl font-extrabold mb-2 leading-tight">
        Topic Exploration
      </h2>
      <p className="text-gray-300  text-sm leading-tight mb-12 opacity-80">
        A spatial representation of each topic with hover effects to reveal
        related topics.
      </p>

      <h3 className="text-gray-200   text-lg font-bold mb-2 leading-snug">
        Use Cases
      </h3>
      <ul className="text-gray-300  text-sm mb-2 leading-tight pl-8 list-disc opacity-80">
        <li className="mb-1">
          Explore topics and subtopics in a spatial representation, with popover
          and hover effects to reveal content.
        </li>
      </ul>
      <div className="flex flex-row text-xs font-bold gap-2 my-4">
        <span className="text-black flex w-auto te bg-white p-2">
          React-Three-Fiber
        </span>
        <span className="text-black flex w-auto bg-white p-2">Sanity</span>
      </div>
    </div>
  )
}

const Bar = () => {
  return (
    <div className="w-full h-8 flex text-gray-600 font-mono uppercase tracking-widest text-xs items-center justify-center lg:border-t border-gray-600"></div>
  )
}
const TopBar = () => {
  return (
    <div className="w-full h-8 flex text-gray-600 font-mono uppercase tracking-widest text-xs items-center justify-center lg:border-b border-gray-600">
      <p>Reality Designers | Topic Grid </p>
    </div>
  )
}
