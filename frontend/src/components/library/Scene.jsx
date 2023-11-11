import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import {
  PostsBySubCategory,
  useCategoryInteraction,
} from './index.ts'

const CAMERA_POSITION = [0, 0, 5]

const Scene = ({ category }) => {

  const {
    handleMainWorldInteraction,
    handleCategoryHover,
    handleCategoryLeave,
    subCategories,
    highlightedCategory,
    selectedMainWorld,
    highlightedWorld,
  } = useCategoryInteraction(category);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <PerspectiveCamera makeDefault position={CAMERA_POSITION} zoom={1} />
        <OrbitControls />
        <PostsBySubCategory
          categories={subCategories}
          highlightedCategory={highlightedCategory}
          handleMainWorldInteraction={handleMainWorldInteraction}
          handleCategoryHover={handleCategoryHover}
          handleCategoryLeave={handleCategoryLeave}
          selectedMainWorld={selectedMainWorld}
          highlightedWorld={highlightedWorld}
        />
      </Canvas>
    </div>
  );
};

export default Scene;