import React from 'react';
import FlatCard from './FlatCard';

const Sidebar = ({ content, isVisible }) => {
   return (
      <div className={`sidebar fixed top-0 left-0 z-10 h-full ${isVisible ? 'block' : 'hidden'}`}>
         <div className="absolute top-0 left-0 h-full w-48 overflow-y-auto border-r border-gray-200/20 bg-black bg-opacity-70 shadow-lg lg:block lg:w-64">
            <h2 className="text-md pl-8 pt-20 font-mono font-normal tracking-wide text-gray-400">Related Articles</h2>
            <div className="grid grid-cols-1 gap-2 p-4">
               {content.map(contentItem => (
                  <FlatCard key={contentItem.title} title={contentItem.title} author={contentItem.author} excerpt={contentItem.excerpt} publicationDate={contentItem.publicationDate} slug={contentItem.slug?.current} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
