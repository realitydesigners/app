import { useState, useCallback } from 'react';
import { useCategory } from './CategoryContext';

export const useCategoryInteraction = (category) => {
  const { navigation, setNavigation } = useCategory();

  // State variables
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [highlightedSubcategory, setHighlightedSubcategory] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategoryContent, setSubcategoryContent] = useState([]);
  const [activeBackgroundScene, setActiveBackgroundScene] = useState(null);

  // Handler for when a category is hovered
  const onCategoryHover = useCallback((subcategoryName) => {
    console.log('Hovered over:', subcategoryName);
    const relatedPosts = category.subCategories.find(
      (sub) => sub.slug.current === subcategoryName
    )?.associatedPosts || [];
  
    console.log('Related posts:', relatedPosts);
    setSubcategoryContent(relatedPosts);
    setIsSidebarVisible(true); // Show the sidebar
  }, [category.subCategories]);
  

  // Handler for when hover is removed from a category
  const onCategoryLeave = useCallback(() => {
    setIsSidebarVisible(false); // Hide the sidebar
  }, []);

  const onCategorySelect = useCallback(
    (categoryName, subcategoryName) => {
      setSelectedCategory(categoryName);
      setHighlightedCategory(categoryName);
   

      const currentCategory = category.subCategories.find(
        (sub) => sub.slug.current === subcategoryName
      );

      if (currentCategory?.sceneIdentifier) {
        setActiveBackgroundScene(currentCategory.sceneIdentifier);
      }

      setSubcategoryContent(currentCategory?.associatedPosts || []);
      setSelectedSubcategory(subcategoryName || null);

      setNavigation((prev) => ({
        ...prev,
        mainCategory: categoryName,
        subCategory: subcategoryName || prev.subCategory,
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
