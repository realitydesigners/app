import React, { useState } from 'react';

const Menu = ({ categories, onCategorySelect, onCategoryHighlight, onSubCategoryHighlight }) => {
   const [expandedMainCategory, setExpandedMainCategory] = useState(null);
   const [isWorldSelectorVisible, setIsWorldSelectorVisible] = useState(false);
   const [selectedSubWorld, setSelectedSubWorld] = useState(null);

   const toggleMainCategoryExpansion = category => {
      if (expandedMainCategory === category.title) {
         setExpandedMainCategory(null);
      } else {
         setExpandedMainCategory(category.title);
      }
   };

   const toggleWorldSelector = () => {
      setIsWorldSelectorVisible(!isWorldSelectorVisible);
   };

   return (
      <div className="fixed bottom-0 right-0 z-10 mb-4 mr-4">
         {isWorldSelectorVisible && (
            <div className="absolute right-0 bottom-full mb-4 w-64 rounded-lg border border-gray-200/20 bg-black p-4 shadow-lg transition-transform hover:scale-105">
               <button onClick={toggleWorldSelector} className="absolute top-2 right-2 text-gray-400 transition-colors hover:text-white"></button>
               <h2 className="mb-4 font-mono text-lg font-semibold text-gray-300">Categories</h2>
               <ul className="divide-y divide-gray-200/20">
                  {categories.map(category => (
                     <li key={category.title} className="py-2">
                        <button
                           onClick={() => {
                              toggleMainCategoryExpansion(category);
                              onCategorySelect(category.title);
                              onCategoryHighlight(category.title);
                           }}
                           className="flex w-full items-center justify-between text-left"
                        >
                           <div className="flex items-center">
                              <span className={`font-mono font-semibold uppercase ${expandedMainCategory === category.title ? 'text-white' : 'text-gray-400'}`}>{category.title}</span>
                           </div>
                        </button>
                        {expandedMainCategory === category.title &&
                           category.subCategories &&
                           category.subCategories.map(subCategory => (
                              <button
                                 key={subCategory.title}
                                 onClick={() => {
                                    onCategorySelect(subCategory.title);
                                    setSelectedSubWorld(subCategory.title);
                                 }}
                                 onMouseEnter={() => onSubCategoryHighlight(subCategory.title)}
                                 onMouseLeave={() => onSubCategoryHighlight(null)}
                                 className={`mt-2 block w-full pl-8 text-left font-mono uppercase ${selectedSubWorld === subCategory.title ? 'text-white' : 'text-gray-500'} hover:text-gray-300`}
                              >
                                 {subCategory.title}
                              </button>
                           ))}
                     </li>
                  ))}
               </ul>
            </div>
         )}

         <button onClick={toggleWorldSelector} className="rounded-full bg-white px-4 py-4 text-black shadow hover:bg-gray-400 focus:outline-none"></button>
      </div>
   );
};
export default Menu;
