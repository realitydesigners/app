import '../../../globals.css';
import { getSanityImageURL } from '../../lib/helpers';

const ImageCard = ({ title, slug, image, className }) => {
   // Change 'img' to 'image' as the prop name
   switch (className) {
      case 'card-1':
         return (
            <div className="relative p-4 mb-8 ">
               <div className="relative flex h-auto w-full">{image?.image && <img src={getSanityImageURL(image.image).url()} alt={title || 'Article image'} className="relative h-[325px] md:h-[600px] lg:h-[800px] w-full object-cover rounded-2xl shadow-xl" />}</div>
               {image?.team && (
                  <div className="relative rounded-b-xl -mt-12  pt-4 bottom-0 flex h-auto w-full  bg-gradient-to-t from-black to-transparent pl-4  text-white">
                     <img src={getSanityImageURL(image.team.image).url()} alt={image.team.name || 'Team image'} className="mr-2 h-6 w-6 rounded-full" />
                     <div className="font-rajdhani relative flex flex-col items-start text-xs uppercase leading-none">
                        <a href="/" className="text-gray-400">
                           Artist
                        </a>
                        <a href="/" className="text-white">
                           {image.team.name}
                        </a>
                     </div>
                     <a href={`/media/${slug}`} className=" ml-4 inline-block cursor-pointer text-2xl font-bold text-white">
                        →
                     </a>
                  </div>
               )}
            </div>
         );
      case 'card-2':
      default:
         return (
            <div className="relative">
               <div className="relative flex h-auto w-full">{image?.image && <img src={getSanityImageURL(image.image).url()} alt={title || 'Article image'} className="relative h-[325px] md:h-[600px] lg:h-[800px] w-full object-cover rounded-2xl shadow-xl" />}</div>
            </div>
         );
   }
};

const ImageRefWrapper = ({ value }) => {
   const { image, className } = value; // Destructure 'image' from 'value'

   return (
      <div>
         <div className={className}>
            <ImageCard
               image={image} // Pass 'image' as a prop
               className={className}
            />
         </div>
      </div>
   );
};

export default ImageRefWrapper;
