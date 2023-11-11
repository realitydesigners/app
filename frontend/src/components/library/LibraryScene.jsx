import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import SplineCode from '../three/SplineCode.jsx'
import { LibraryCategories, Sidebar, useCategoryInteraction } from './index.ts'

const CAMERA_POSITION = [0, 25, 40]

const LibraryScene = ({ category = [] }) => {
  const {
    highlightedCategory,
    mainCategories,
    isSidebarVisible,
    onCategorySelect,
    selectedCategory,
    subcategoryContent,
  } = useCategoryInteraction(category)

  return (
    <div>
      <Sidebar isVisible={isSidebarVisible} content={subcategoryContent} />
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <PerspectiveCamera makeDefault position={CAMERA_POSITION} zoom={1} />
        <OrbitControls />
        <LibraryCategories
          categories={mainCategories}
          highlightedCategory={highlightedCategory}
          onCategorySelect={onCategorySelect}
          selectedCategory={selectedCategory}
        />
      </Canvas>
    </div>
  )
}

export default LibraryScene
