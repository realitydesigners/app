import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { MeshPhongMaterial, MeshStandardMaterial } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const PlainGLB = () => {
  return (
    <>
      <Gltf src="/models/spline.glb" scale={0.1} />
    </>
  )
}

const MaterialGLB = () => {
  const gltf = useLoader(GLTFLoader, '/models/spline.glb')
  const material = new MeshPhongMaterial({
    color: 'gray',
    shininess: 300,
    specular: 0x222222,
  })

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.material = material // your material
    }
  })

  return <primitive object={gltf.scene} scale={0.2} />
}

const Scene = () => {
  return (
    <div className="relative flex flex-wrap flex-col-reverse lg:flex-row-reverse justify-center w-full h-auto border border-gray-600 mb-20">
      <TopBar />
      <Description />
      <div className="w-full lg:w-3/4 flex lg:h-[90vh] h-[70vh] shadow-2xl border-b lg:border-b-0 lg:border-r border-gray-600">
        <Canvas
          camera={{ position: [1, 1, 1], fov: 75 }}
          style={{ height: 'full', width: '100vw', background: 'black' }}
          className="border border-black"
        >
          <OrbitControls />
          <pointLight
            intensity={100}
            position={[0, 3, 0]} // UP
            color={'#54e7dc'} // Turquoise
            castShadow={true}
          />
          <pointLight
            intensity={100}
            position={[0, -3, 0]} // DOWN
            color={'#7668e0'} // Pink
            castShadow={true}
          />
          <pointLight
            intensity={100}
            position={[10, 1, 0]} // DOWN
            color={'#6782f2'} // Pink
            castShadow={true}
          />

          <MaterialGLB />
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
      <div className="flex flex-row text-xs font-bold gap-2 mb-8 ">
        <span className="text-teal-200 flex w-auto bg-teal-200/50  rounded pl-2 pr-2 p-1 border border-teal-200">
          3D
        </span>
        <span className="text-yellow-200 flex w-auto bg-yellow-200/50  rounded pl-2 pr-2 p-1 border border-yellow-200">
          GLB/GLTF
        </span>
      </div>
      <h2 className="text-gray-200  text-3xl font-extrabold mb-2 leading-tight">
        GLB Model
      </h2>
      <p className="text-gray-300  text-sm leading-tight mb-12 opacity-80">
        A glb model made in Spline, loaded in using react-three-fiber with point
        light and materials.
      </p>
      <h3 className="text-gray-200   text-lg font-bold mb-2 leading-snug">
        Use Cases
      </h3>
      <ul className="text-gray-300  text-sm mb-2 leading-tight pl-8 list-disc opacity-80 ">
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

const Bar = () => {
  return (
    <div className="w-full h-8 flex text-gray-600 font-mono uppercase tracking-widest text-xs items-center justify-center lg:border-t border-gray-600"></div>
  )
}

const TopBar = () => {
  return (
    <div className="w-full h-8 flex text-gray-600 font-mono uppercase tracking-widest text-xs items-center justify-center lg:border-b border-gray-600">
      <p>Reality Designers | 3D QUOTE </p>
    </div>
  )
}
