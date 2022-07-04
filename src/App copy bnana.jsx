import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'

function Box({ z }) {
  const ref = useRef()
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])
  
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
  })

  useFrame((state) => {
       ref.current.position.set(data.x * width, (data.y += 0.5), z)
       if (data.y > height / 1.5) {
        data.y = -height / 1.5
       }
   // ref.current.position.x = Math.sin(state.clock.elapsedTime*2) // -1 to 1
    // ref.current.rotation.y = Math.sin(state.clock.elapsedTime*2) // -1 to 1   
  })

  return (
    <mesh ref={ref}>
    <boxGeometry />
    <meshBasicMaterial color="orange" />
    </mesh>
  )
}


function Banana({...props}){
const group = useRef()
const  { nodes,materials } = useGLTF('/banana-skin-v1.glb')

return  (
  <group ref={group}{...props} dispose={null}>
    <mesh 
    geometry={nodes.banana.geometry} material={materials.skin} rotation={[-Math.PI/2,0,0]} 
    material-emissive="orange"
    />
  </group>

)
}


export default function App({ count = 100 }) { 
  return (
  <Canvas>
    <ambientLight intensity={0.2} />
    <spotLight position={[10,10,10]}  intensity={2} />
    <Suspense fallback={null}>
    <Banana   scale={0.5} position={[-0.3,0,-0.5]}   />
    <Banana scale={0.5}  position={[0.4,0,0.5]}  />
    <Environment preset="sunset" />
    </Suspense>
   {/*Array.from({ length: count}, (_,i) => (<Box key={i} z={-i} />))*/}
  </Canvas>
    )
}