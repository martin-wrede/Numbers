import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box() {
  const ref = useRef()
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, clicked ? 1 : 0, 0.1)
  
    //   ref.current.rotation.x = Math.sin(state.clock.elapsedTime) // -1 to 1
   // ref.current.position.x = Math.sin(state.clock.elapsedTime*2) // -1 to 1
    // ref.current.rotation.y = Math.sin(state.clock.elapsedTime*2) // -1 to 1
     
  })

  return (
    <mesh ref={ref} onClick={() => setClicked(!clicked)}>
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