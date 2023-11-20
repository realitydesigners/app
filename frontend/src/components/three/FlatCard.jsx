import React from 'react';

const FlatCard = ({ title, author, excerpt, publicationDate, slug }) => {
   return (
      <div className="mb-2 max-w-full rounded border border-gray-200/20 bg-black bg-opacity-50 p-4 font-mono text-gray-300 shadow-md transition duration-300 ease-in-out hover:bg-opacity-70">
         {publicationDate && <p className="mb-3 text-xs tracking-wide text-gray-600">{publicationDate}</p>}
         <a href={`/posts/${slug}`}>
            <h3 className="text-md mb-8 font-mono font-bold uppercase leading-none text-gray-200  hover:text-gray-400">{title}</h3>
            {author && <p className="mb-3 font-mono text-sm font-medium tracking-wide text-gray-400">By: {author}</p>}

            <button className="flex items-center font-mono text-xs text-gray-400 transition-colors duration-200 hover:text-gray-200">Read More</button>
         </a>
      </div>
   );
};

export default FlatCard;
