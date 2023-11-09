import { a, useSpring } from '@react-spring/three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useCallback, useState } from 'react'
import { useCategory } from './CategoryContext'
import { getPostsBySubcategory } from '../../lib/api.js'
import {
  AllCategories,

} from './index.ts'

const CAMERA_POSITION = [0, 0, 70]

const Scene = ({ category = [] }) => {
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
      setSelectedMainWorld(worldName);
      setHighlightedWorld(worldName);
      setHighlightedCategory(worldName);

      const currentCategory = category;
      
      if (currentCategory && currentCategory.sceneIdentifier) {
        setActiveBackgroundScene(currentCategory.sceneIdentifier);
      }
  
      if (currentCategory && currentCategory.associatedPosts) {
        setCurrentContent(currentCategory.associatedPosts);
      } else {
        setCurrentContent([]);
      }
  
      setSidebarOpen(true);
  
      if (childCategoryName) {
        setHighlightedWorld(childCategoryName);
        setSelectedSubWorld(childCategoryName);
      } else {
        setSelectedSubWorld(null);
      }
  
      setNavigation((prev) => ({
        ...prev,
        mainWorld: worldName,
        category: prev.category,
      }));


      if (childCategoryName) {
        // Fetch posts associated with the selected subcategory
        getPostsBySubcategory(childCategoryName)
          .then((posts) => {
            // Handle posts data as needed
            console.log('Posts associated with subcategory:', posts);
            // Update state or perform other actions with the posts data
          })
          .catch((error) => {
            // Handle error if needed
            console.error('Error fetching posts:', error);
          });
      }
    },
    [category, setNavigation],
  );
  
  

  const subCategories = Array.isArray(category.subCategories)
    ? category.subCategories.filter((subCat) => Boolean(subCat.title))
    : [];

    console.log(subCategories)
 

  return (
    <div style={{ height: '100vh', width: '100vw' }}>

      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <PerspectiveCamera makeDefault position={cameraPosition} zoom={1} />
        <OrbitControls />

        <AllCategories
          categories={subCategories}
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
