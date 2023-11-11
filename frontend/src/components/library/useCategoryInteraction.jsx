import { useState, useCallback } from 'react';
import { useCategory } from './CategoryContext';

export const useCategoryInteraction = (category) => {
  const { navigation, setNavigation } = useCategory();

  // State variables
  const [highlightedCategory, sethighlightedCategory] = useState(null);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [highlightedSubcategory, setHighlightedSubcategory] = useState(null);
  const [isSidebarVisible, setisSidebarVisible] = useState(false);
  const [selectedSubcategory, setselectedSubcategory] = useState(null);
  const [subcategoryContent, setsubcategoryContent] = useState([]);
  const [activeBackgroundScene, setActiveBackgroundScene] = useState(null);

  // Handler for when a category is hovered
  const onCategoryHover = useCallback((childCategoryName) => {
    console.log('Hovered over:', childCategoryName);
    const relatedPosts = category.subCategories.find(
      (sub) => sub.slug.current === childCategoryName
    )?.associatedPosts || [];
  
    console.log('Related posts:', relatedPosts);
    setsubcategoryContent(relatedPosts);
    setisSidebarVisible(true); // Show the sidebar
  }, [category.subCategories]);
  

  // Handler for when hover is removed from a category
  const onCategoryLeave = useCallback(() => {
    setisSidebarVisible(false); // Hide the sidebar
  }, []);

  const onCategorySelect = useCallback(
    (worldName, position, childCategoryName) => {
      setselectedCategory(worldName);
      sethighlightedCategory(worldName);
   

      const currentCategory = category.subCategories.find(
        (sub) => sub.slug.current === childCategoryName
      );

      if (currentCategory?.sceneIdentifier) {
        setActiveBackgroundScene(currentCategory.sceneIdentifier);
      }

      setsubcategoryContent(currentCategory?.associatedPosts || []);

      if (childCategoryName) {
        setselectedSubcategory(childCategoryName);
      } else {
        setselectedSubcategory(null);
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
    onCategorySelect,
    onCategoryHover,
    onCategoryLeave,
    subCategories,
    highlightedCategory,
    selectedCategory,
    highlightedCategory,
    isSidebarVisible,
    subcategoryContent,
    activeBackgroundScene,
  };
};

export default useCategoryInteraction;
