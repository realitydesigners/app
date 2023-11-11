import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import SplineCode  from '../three/SplineCode.jsx'

import {
  LibraryCategories,
  useMainWorldInteraction,
  Sidebar,
} from './index.ts'

const CAMERA_POSITION = [0, 25, 40];

const LibraryScene = ({ category = [] }) => {

  const {
    handleMainWorldInteraction,
    highlightedCategory,
    selectedMainWorld,
    highlightedWorld,
    sidebarOpen,
    currentContent,
  } = useMainWorldInteraction(category);

  return (
    <div>
      <Sidebar content={currentContent} isVisible={sidebarOpen} />
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <PerspectiveCamera makeDefault position={CAMERA_POSITION} zoom={1} />
        <OrbitControls />
        <LibraryCategories
          categories={category.filter(cat => Boolean(cat.title) && cat.isMain)} // Assuming this is how you define main categories
          highlightedCategory={highlightedCategory}
          handleMainWorldInteraction={handleMainWorldInteraction}
          selectedMainWorld={selectedMainWorld}
          highlightedWorld={highlightedWorld}
        />
        <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" />
        <SplineCode />
      </Canvas>
    </div>
  );
};

export default LibraryScene;
