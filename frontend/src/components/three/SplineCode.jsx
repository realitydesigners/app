
import useSpline from '@splinetool/r3f-spline'


export default function Scene({ ...props }) {
  
  const { nodes, materials } = useSpline('https://prod.spline.design/gJivIobSxJAkJ-pH/scene.splinecode')
  
  const sceneScale = [.3,.3,.3  ]
  
  
  return (
    <>
     
      <group {...props} scale={sceneScale} dispose={null} position={[0, -80, 0]}>

      
      <mesh
            name="Cube 3"
            geometry={nodes['Cube 3'].geometry}
            material={materials['Metal Colorful Rainbow 04']}
            castShadow
            receiveShadow
            position={[0,0,0]}
          />
  
      
      </group>
    </>
  )
}
