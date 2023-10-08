import useSpline from '@splinetool/r3f-spline'

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(
    'https://prod.spline.design/LCNQpF-EzZ5RMIeb/scene.splinecode',
  )
  const sceneScale = [0.03, 0.03, 0.03]
  return (
    <>
      <color attach="background" args={['#000000']} />
      <group {...props} scale={sceneScale} dispose={null} position={[0, -1, 0]}>
        <scene name="Scene 1">
          <directionalLight
            name="Directional Light"
            castShadow
            intensity={0.57}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[0, 746.31, 0]}
          />
          <mesh
            name="Ellipse"
            geometry={nodes.Ellipse.geometry}
            material={materials['My Material']}
            castShadow
            receiveShadow
            position={[-1, -32.56, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={0.86}
          />
          <mesh
            name="Ellipse1"
            geometry={nodes.Ellipse1.geometry}
            material={materials['My Material']}
            castShadow
            receiveShadow
            position={[0, -50.34, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          />

          <hemisphereLight
            name="Default Ambient Light"
            intensity={0.75}
            color="#eaeaea"
          />
        </scene>
      </group>
    </>
  )
}
