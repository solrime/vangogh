import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

interface ModelProps {
  autoRotate?: boolean
}

function Model({ autoRotate }: ModelProps) {
  const gltf = useGLTF('/vangogh.glb')
  const meshRef = useRef<THREE.Group>(null)

  return (
    <group ref={meshRef}>
      <primitive object={gltf.scene} scale={1} />
    </group>
  )
}

export default Model
