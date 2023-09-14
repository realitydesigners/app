import useSpline from '@splinetool/r3f-spline'

export default function Scene(props) {
  const { nodes, materials } = useSpline(
    'https://prod.spline.design/QPJgvHx7h30OGGJz/scene.splinecode',
  )

  const sceneScale = [0.1, 0.1, 0.1]

  return (
    <>
      <color attach="background" args={['#000000']} />
      <group {...props} scale={sceneScale} dispose={null} position={[0, 0, 0]}>
        <scene name="Scene 1">
          <directionalLight
            name="Directional Light"
            castShadow
            intensity={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[0, 189.71, 82.34]}
          />
          <mesh
            name="Rectangle"
            geometry={nodes.Rectangle.geometry}
            material={materials['Rectangle Material']}
            castShadow
            receiveShadow
            position={[93.5, 26, 98.5]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          />
          <group name="Group" position={[0, -9.1, 0]}>
            <mesh
              name="Cube 3"
              geometry={nodes['Cube 3'].geometry}
              material={materials['Cube 3 Material']}
              castShadow
              receiveShadow
              position={[58.61, -87.85, 121.52]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={0.22}
            />
            <mesh
              name="Cube 2"
              geometry={nodes['Cube 2'].geometry}
              material={materials['Cube 2 Material']}
              castShadow
              receiveShadow
              position={[99.47, -69.64, -86.53]}
              scale={0.22}
            />
            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={materials['Cube Material']}
              castShadow
              receiveShadow
              position={[-106.07, -48.78, 44.6]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={0.22}
            />
            <mesh
              name="Rectangle1"
              geometry={nodes.Rectangle1.geometry}
              material={materials['Rectangle1 Material']}
              castShadow
              receiveShadow
              position={[0, -88.62, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={[0.56, 0.29, 0.22]}
            />
          </group>

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
