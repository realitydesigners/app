import '../../../globals.css';
import { getSanityImageURL } from '../../lib/helpers.js';

const ArticleCard = ({ title, slug, image, excerpt }) => {
   return (
      <div className="flex w-full  items-center justify-center p-8">
         <div className="transition-border w-full  md:w-1/2 group flex h-auto flex-row border border-gray-500 p-4 transition-shadow duration-300 hover:border-gray-200 hover:shadow-xl lg:w-1/2">
            {image && (
               <div className="relative w-1/4">
                  <img src={getSanityImageURL(image).url()} alt={title || 'Article image'} width={100} height={100} className="h-full w-full transform rounded-md object-cover transition-transform duration-300 group-hover:scale-110" />
               </div>
            )}

            <div className="relative flex w-3/4 flex-col pl-4">
               <p className="mb-2 font-rajdhani text-sm uppercase leading-none tracking-wide text-gray-500">Article</p>
               <a className="duration-3 font-rajdhani text-xl tracking-wide text-gray-300 transition-colors group-hover:text-white group-hover:underline" href={`/article/${slug}`}>
                  {title}
               </a>
               <p className="text-white"> {excerpt}</p>
            </div>
         </div>
      </div>
   );
};

const ArticleRefWrapper = ({ value }) => {
   const { articleRef } = value;

   if (!articleRef || !articleRef.articleTitle || !articleRef.articleSlug) return null;

   return <ArticleCard title={articleRef.articleTitle} slug={articleRef.articleSlug} image={articleRef.articleImage} />;
};

export default ArticleRefWrapper;
