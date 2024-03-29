import { a, useSpring } from '@react-spring/three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useCallback, useState } from 'react';
import { useCategory } from './CategoryContext';
import { AllCategories, Breadcrumb, Crystal, Menu, Sidebar, Stars } from './index.ts';

const CAMERA_POSITION = [0, 0, 30];

const InteractiveWorldScene = ({ category = [] }) => {
   const { navigation, setNavigation } = useCategory();

   // State variables
   const [highlightedWorld, setHighlightedWorld] = useState(null);
   const [cameraPosition, setCameraPosition] = useState(CAMERA_POSITION);
   const [selectedMainWorld, setSelectedMainWorld] = useState(null);
   const [highlightedCategory, setHighlightedCategory] = useState(null);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [selectedSubWorld, setSelectedSubWorld] = useState(null);
   const [currentContent, setCurrentContent] = useState([]);
   const [activeBackgroundScene, setActiveBackgroundScene] = useState(null);

   const handleMainWorldInteraction = useCallback(
      (categoryName, position, subcategoryName) => {
         setSelectedMainWorld(categoryName);
         setHighlightedWorld(categoryName);
         setHighlightedCategory(categoryName);

         const currentCategory = category.find(cat => cat.title === categoryName);
         if (currentCategory && currentCategory.sceneIdentifier) {
            setActiveBackgroundScene(currentCategory.sceneIdentifier);
         }

         if (currentCategory && currentCategory.associatedPosts) {
            setCurrentContent(currentCategory.associatedPosts);
         } else {
            setCurrentContent([]);
         }

         setSidebarOpen(true);

         if (subcategoryName) {
            setHighlightedWorld(subcategoryName);
            setSelectedSubWorld(childCategoryName);
         } else {
            setSelectedSubWorld(null);
         }

         setNavigation(prev => ({
            ...prev,
            mainCategory: categoryName,
            category: prev.category,
         }));
      },
      [category, setNavigation],
   );

   const mainCategories = category.filter(cat => Boolean(cat.title) && cat.isMain);

   const shouldShowSidebar = sidebarOpen && currentContent.length > 0;

   const props = useSpring({
      from: { scale: [0, 0, 0] },
      to: { scale: [1, 1, 1] },
   });

   return (
      <div style={{ height: '100vh', width: '100vw' }}>
         <Breadcrumb
            navigation={{
               mainCategory: selectedMainWorld,
               subWorld: selectedSubWorld,
            }}
         />
         <Menu categories={mainCategories} selectedMainWorld={selectedMainWorld} onSelectedMainWorldChange={setSelectedMainWorld} onCategorySelect={setSelectedMainWorld} onCategoryHighlight={setHighlightedCategory} setSelectedSubWorld={setSelectedSubWorld} onSubCategoryHighlight={setHighlightedWorld} />
         <Sidebar content={currentContent} isVisible={shouldShowSidebar} />

         <Canvas style={{ height: '100vh', width: '100vw' }}>
            <PerspectiveCamera makeDefault position={cameraPosition} zoom={0.7} />
            <OrbitControls />

            <AllCategories categories={mainCategories} highlightedCategory={highlightedCategory} handleMainWorldInteraction={handleMainWorldInteraction} selectedMainWorld={selectedMainWorld} highlightedWorld={highlightedWorld} />
            <Stars />
         </Canvas>
      </div>
   );
};

export default InteractiveWorldScene;
