import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { fileUrlFor } from '../../lib/urlFor'

const GLBFile = ({ model }) => {
  const modelUrl = fileUrlFor(model[0]?.file?.asset._ref)

  const gltf = useLoader(GLTFLoader, modelUrl)

  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.z += 0.002
    }
  })

  return <primitive ref={meshRef} object={gltf.scene} scale={0.5} />
}

const Scene = ({ model }) => {
  return (
    <div className="relative flex flex-wrap flex-col-reverse lg:flex-row-reverse justify-center w-full h-auto border border-gray-600 mb-20">
      <Description />
      <div className="w-full lg:w-3/4 flex lg:h-[90vh] h-[70vh] shadow-md border-b  lg:border-b-0 lg:border-r border-gray-600">
        <Canvas
          camera={{ position: [0.5, 0.4, 1], fov: 75 }}
          style={{ height: 'full', width: '100vw' }}
        >
          <OrbitControls />
          <pointLight
            intensity={5}
            position={[0, 1, 0]} // UP
            color={'#7668e0'} // Pink
            castShadow={true}
          />
          <pointLight
            intensity={5}
            position={[0, -1, 0]} // DOWN
            color={'#7668e0'} // Pink
            castShadow={true}
          />

          <GLBFile model={model} />
          <hemisphereLight />
        </Canvas>
      </div>
    </div>
  )
}

export default Scene

const Description = () => {
  return (
    <div className="w-full lg:w-1/4 font-mono flex flex-col h-full p-6 b border-b border-gray-600 shadow-lg ">
      <div className="flex flex-row text-xs font-bold gap-2 mb-8 ">
        <span className="text-black flex w-auto bg-teal-200/50  rounded pl-2 pr-2 p-1 border border-teal-200">
          3D
        </span>
        <span className="text-black flex w-auto bg-yellow-200/50  rounded pl-2 pr-2 p-1 border border-yellow-200">
          GLB/GLTF
        </span>
      </div>
      <h2 className="text-black  text-3xl font-extrabold mb-2 leading-tight">
        GLB Sanity Model
      </h2>
      <p className="text-black  text-sm leading-tight mb-12 opacity-80">
        This model was made in Spline, exported as a .glb file, and uploaded to
        Sanity. This is a proof of concept for using Sanity as a CMS for 3D
        objects. The animation can also be controlled from Sanity.
      </p>
      <h3 className="text-gray-200   text-lg font-bold mb-2 leading-snug">
        Use Cases
      </h3>
      <ul className="text-black  text-sm mb-2 leading-tight pl-8 list-disc opacity-80 ">
        <li className="mb-1">
          Asset in a 3D scene: This model can be used as a prop in a 3D scene.
        </li>
      </ul>
      <div className="flex flex-row flex-wrap text-xs font-bold gap-2 my-4">
        <span className="text-black flex w-auto te bg-white p-2">Spline</span>
        <span className="text-black flex w-auto te bg-white p-2">
          React-Three-Fiber
        </span>
      </div>
    </div>
  )
}
