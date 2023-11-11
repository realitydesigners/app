import { useState, useCallback } from 'react';
import { useCategory } from './CategoryContext';

export const useCategoryInteraction = (category) => {
  const { navigation, setNavigation } = useCategory();

  // State variables
  const [highlightedWorld, setHighlightedWorld] = useState(null);
  const [selectedMainWorld, setSelectedMainWorld] = useState(null);
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSubWorld, setSelectedSubWorld] = useState(null);
  const [currentContent, setCurrentContent] = useState([]);
  const [activeBackgroundScene, setActiveBackgroundScene] = useState(null);

  // Handler for when a category is hovered
  const handleCategoryHover = useCallback((childCategoryName) => {
    console.log('Hovered over:', childCategoryName);
    const relatedPosts = category.subCategories.find(
      (sub) => sub.slug.current === childCategoryName
    )?.associatedPosts || [];
  
    console.log('Related posts:', relatedPosts);
    setCurrentContent(relatedPosts);
    setSidebarOpen(true); // Show the sidebar
  }, [category.subCategories]);
  

  // Handler for when hover is removed from a category
  const handleCategoryLeave = useCallback(() => {
    setSidebarOpen(false); // Hide the sidebar
  }, []);

  const handleMainWorldInteraction = useCallback(
    (worldName, position, childCategoryName) => {
      setSelectedMainWorld(worldName);
      setHighlightedWorld(worldName);
      setHighlightedCategory(worldName);

      const currentCategory = category.subCategories.find(
        (sub) => sub.slug.current === childCategoryName
      );

      if (currentCategory?.sceneIdentifier) {
        setActiveBackgroundScene(currentCategory.sceneIdentifier);
      }

      setCurrentContent(currentCategory?.associatedPosts || []);

      if (childCategoryName) {
        setSelectedSubWorld(childCategoryName);
      } else {
        setSelectedSubWorld(null);
      }

      setNavigation((prev) => ({
        ...prev,
        mainWorld: worldName,
        category: prev.category,
      }));
    },
    [category.subCategories, setNavigation],
  );

  const subCategories = Array.isArray(category.subCategories)
    ? category.subCategories.filter((subCat) => Boolean(subCat.title))
    : [];

  // Debugging logs
  console.log('Category data Fetched From Parent Page:', category);
  console.log("subCategories", subCategories);

  return {
    handleMainWorldInteraction,
    handleCategoryHover,
    handleCategoryLeave,
    subCategories,
    highlightedCategory,
    selectedMainWorld,
    highlightedWorld,
    sidebarOpen,
    currentContent,
    activeBackgroundScene,
  };
};

export default useCategoryInteraction;
