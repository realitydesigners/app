import { CameraControls, OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import QuoteList from './QuoteList';

const Quote = ({ quotes }) => {
   return (
      <>
         <QuoteList quotes={quotes} />
      </>
   );
};

const Scene = ({ quotes }) => {
   return (
      <div className="relative flex flex-wrap flex-col-reverse lg:flex-row-reverse justify-center  w-full h-auto   border border-gray-600 mb-20 ">
         <Description />
         <div className="w-full lg:w-3/4 flex lg:h-[90vh] h-[70vh] shadow-md border-b  lg:border-b-0 lg:border-r border-gray-600">
            <Canvas camera={{ position: [0, 0, 1], fov: 45 }} style={{ height: 'full', width: '100vw' }}>
               <OrbitControls />

               <Quote quotes={quotes} />
            </Canvas>
         </div>
      </div>
   );
};

export default Scene;

const Description = () => {
   return (
      <div className="w-full lg:w-1/4 font-mono flex flex-col h-full p-6 b border-b border-gray-600 shadow-lg ">
         <div className="flex flex-row text-xs font-bold gap-2 mb-8 ">
            <span className="text-black flex w-auto bg-teal-200/50  rounded pl-2 pr-2 p-1 border border-teal-200">3D</span>
            <span className="text-black flex w-auto bg-yellow-200/50  rounded pl-2 pr-2 p-1 border border-yellow-200">CMS</span>
         </div>
         <h2 className="text-black  text-3xl font-extrabold mb-2 leading-tight">Quote</h2>
         <p className="text-black  text-sm leading-tight mb-12 opacity-80">A group of quotes in a circle.</p>
         <h3 className="text-black   text-lg font-bold mb-2 leading-snug">Use Cases</h3>
         <ul className="text-black  text-sm mb-2 leading-tight pl-8 list-disc opacity-80 ">
            <li className="mb-1">Interactive Blog Exploration: These quotes are shown as a card in an ethereal gallery, with hover effects and popovers when interacting with the post.</li>
         </ul>
         <div className="flex flex-row text-xs font-bold gap-2 my-4">
            <span className="text-black flex w-auto te bg-white p-2">React-Three-Fiber</span>
            <span className="text-black flex w-auto bg-white p-2">Sanity</span>
         </div>
      </div>
   );
};
