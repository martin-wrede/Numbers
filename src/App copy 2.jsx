import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

function Box() {
  const ref = useRef()
  const { viewport } = useThree()
  
  const [data] = useState({
    x : THREE.MathUtils.randFloatSpread(viewport.width),
    y : 0
  })

  useFrame((state) => {
       ref.current.position.set(data.x, (data.y += 0.1), 0)
       if (data.y > viewport.height/1.5){
        data.y = - viewport.height/1.5
       }
   // ref.current.position.x = Math.sin(state.clock.elapsedTime*2) // -1 to 1
    // ref.current.rotation.y = Math.sin(state.clock.elapsedTime*2) // -1 to 1
     
  })

  return (
    <mesh ref={ref} >
    <boxGeometry />
    <meshBasicMaterial color="orange" />
    </mesh>
  )
}

export default function App() {
  return (
  <Canvas>
    <Box />
    </Canvas>
    )
}