import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useCallback, useState } from 'react';
import { useCategory } from './CategoryContext.jsx';
import { LibraryCategories } from './index.ts';

const CAMERA_POSITION = [0, 0, 5];

const LibraryScene = ({ library = [] }) => {
  const { navigation, setNavigation } = useCategory();
  const [highlightedWorld, setHighlightedWorld] = useState(null);
  const [cameraPosition, setCameraPosition] = useState(CAMERA_POSITION);
  const [selectedMainWorld, setSelectedMainWorld] = useState(null);
  const [highlightedCategory, setHighlightedCategory] = useState(null);

  const handleMainWorldInteraction = useCallback(
    (worldName) => {
      setSelectedMainWorld(worldName);
      setHighlightedWorld(worldName);
      setHighlightedCategory(worldName);

      setNavigation((prev) => ({
        ...prev,
        mainWorld: worldName,
        category: prev.category,
      }));
    },
    [setNavigation]
  );

  const mainCategories = library.filter(
    (cat) => Boolean(cat.title) && cat.isMain
  );

  return (
    <div>
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <PerspectiveCamera makeDefault position={cameraPosition} zoom={1} />
        <OrbitControls />

        <LibraryCategories
          categories={mainCategories}
          highlightedCategory={highlightedCategory}
          handleMainWorldInteraction={handleMainWorldInteraction}
          selectedMainWorld={selectedMainWorld}
          highlightedWorld={highlightedWorld}
        />
      </Canvas>
    </div>
  );
};

export default LibraryScene;
