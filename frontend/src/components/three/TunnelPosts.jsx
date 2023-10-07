import { CameraControls, OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import PostsList from './PostsList'
import Stars from './Stars'

const Description = () => {
  return (
    <div className="w-full lg:w-1/4top-20 left-8 flex flex-col h-full p-8 backdrop-blur-sm  bg-black/50 rounded-lg shadow-lg">
      <h2 className="text-gray-200  text-4xl font-extrabold mb-2 leading-tight">
        Tunnel
      </h2>
      <p className="text-gray-300  text-md leading-tight mb-4 opacity-80">
        A spatial representation where each post transforms into a navigable box
        within a cosmic tunnel.
      </p>
      <h3 className="text-gray-200  text-2xl font-bold mb-2 leading-snug">
        Data Integration
      </h3>
      <p className="text-gray-300  rajdhani text-md leading-tight mb-4 opacity-80">
        The visualization is made using react-three-fiber. The content including
        the images, title, and other meta information is sourced from our Sanity
        API ensuring a real-time experience.
      </p>
      <h3 className="text-gray-200   text-xl font-bold mb-2 leading-snug">
        Use Cases
      </h3>
      <ul className="text-gray-300  text-md mb-2 leading-tight pl-8 list-disc opacity-80">
        <li className="mb-1">
          Interactive Blog Exploration: Posts are shown as a card in an ethereal
          gallery, with hover effects and popovers when interacting with the
          post.
        </li>
      </ul>
    </div>
  )
}

const Tunnel = ({ posts }) => {
  return (
    <>
      <PostsList posts={posts} />
    </>
  )
}

const Scene = ({ posts }) => {
  return (
    <div className="relative flex flex-col-reverse lg:flex-row-reverse justify-center items-center w-full h-auto p-4 lg:p-20 gap-8 ">
      <Description />
      <div className="w-full lg:w-3/4 flex lg:h-[80vh] h-[50vh] shadow-2xl">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 45 }}
          style={{ height: 'full', width: '100vw', background: 'black' }}
          className="border rounded-xl border-black"
        >
          <OrbitControls />
          <Stars />
          <ambientLight intensity={0.5} />
          <Tunnel posts={posts} />
        </Canvas>
      </div>
    </div>
  )
}

export default Scene
