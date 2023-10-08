import { CameraControls, OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import PostsList from './PostsList'
import Stars from './Stars'

const Tunnel = ({ posts }) => {
  return (
    <>
      <PostsList posts={posts} />
    </>
  )
}

const Scene = ({ posts }) => {
  return (
    <div className="relative flex flex-wrap flex-col-reverse lg:flex-row-reverse justify-center  w-full h-auto   border border-gray-600 mb-20 ">
      <TopBar />
      <Description />
      <div className="w-full lg:w-3/4 flex lg:h-[90vh] h-[80vh]  shadow-2xl border-b lg:border-b-0 lg:border-r border-gray-600">
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
      <Bar />
    </div>
  )
}

export default Scene

const Description = () => {
  return (
    <div className="w-full lg:w-1/4 font-mono flex flex-col h-full p-6 b border-b border-gray-600 shadow-lg ">
      <div class="flex flex-row text-xs font-bold gap-2 mb-8 ">
        <span class="text-teal-200 flex w-auto bg-teal-200/50  rounded pl-2 pr-2 p-1 border border-teal-200">
          3D
        </span>
        <span class="text-yellow-200 flex w-auto bg-yellow-200/50  rounded pl-2 pr-2 p-1 border border-yellow-200">
          CMS
        </span>
      </div>
      <h2 className="text-gray-200  text-3xl font-extrabold mb-2 leading-tight">
        Tunnel
      </h2>
      <p className="text-gray-300  text-sm leading-tight mb-12 opacity-80">
        A spatial representation where each post transforms into a navigable box
        within a cosmic tunnel.
      </p>
      <h3 className="text-gray-200   text-lg font-bold mb-2 leading-snug">
        Use Cases
      </h3>
      <ul className="text-gray-300  text-sm mb-2 leading-tight pl-8 list-disc opacity-80 ">
        <li className="mb-1">
          Interactive Blog Exploration: Posts are shown as a card in an ethereal
          gallery, with hover effects and popovers when interacting with the
          post.
        </li>
      </ul>
      <div class="flex flex-row text-xs font-bold gap-2 my-4">
        <span class="text-black flex w-auto te bg-white p-2">
          React-Three-Fiber
        </span>
        <span class="text-black flex w-auto bg-white p-2">Sanity</span>
      </div>
    </div>
  )
}

const Bar = () => {
  return (
    <div className="w-full h-8 flex text-gray-600 font-mono uppercase tracking-widest text-xs items-center justify-center lg:border-t border-gray-600"></div>
  )
}

const TopBar = () => {
  return (
    <div className="w-full h-8 flex text-gray-600 font-mono uppercase tracking-widest text-xs items-center justify-center lg:border-b border-gray-600">
      <p>Reality Designers | Tunnel </p>
    </div>
  )
}
