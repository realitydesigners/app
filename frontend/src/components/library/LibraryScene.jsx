import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import SplineCode  from '../three/SplineCode.jsx'

import {
  LibraryCategories,
  useCategoryInteraction,
  Sidebar,
} from './index.ts'

const CAMERA_POSITION = [0, 25, 40];

const LibraryScene = ({ category = [] }) => {

  const {
    onCategorySelect,
    highlightedCategory,
    selectedCategory,
    isSidebarVisible,
    subcategoryContent,
  } = useCategoryInteraction(category);

  return (
    <div>
      <Sidebar content={subcategoryContent} isVisible={isSidebarVisible} />
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <PerspectiveCamera makeDefault position={CAMERA_POSITION} zoom={1} />
        <OrbitControls />
        <LibraryCategories
          categories={category.filter(cat => Boolean(cat.title) && cat.isMain)} // Assuming this is how you define main categories
          highlightedCategory={highlightedCategory}
          onCategorySelect={onCategorySelect}
          selectedCategory={selectedCategory}
        
        />
      </Canvas>
    </div>
  );
};

export default LibraryScene;
