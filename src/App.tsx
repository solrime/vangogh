import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Center } from '@react-three/drei'
import { Suspense, useState } from 'react'
import Model from './Model'

function Loading() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4a5568" wireframe />
    </mesh>
  )
}

function App() {
  const [rotation, setRotation] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={<Loading />}>
          <Center>
            <Model autoRotate={autoRotate} />
          </Center>
        </Suspense>

        <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        <Environment preset="city" />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
        />
      </Canvas>

      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        padding: '12px 20px',
        background: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
      }}>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          style={{
            padding: '10px 20px',
            background: autoRotate ? '#3b82f6' : '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'background 0.2s ease',
          }}
        >
          {autoRotate ? 'Stop Rotation' : 'Start Rotation'}
        </button>
        <button
          onClick={() => setRotation(r => r + Math.PI / 2)}
          style={{
            padding: '10px 20px',
            background: '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'background 0.2s ease',
          }}
        >
          Rotate 90°
        </button>
      </div>

      <h1 style={{
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '28px',
        fontWeight: 600,
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        margin: 0,
      }}>
        3D Model Viewer
      </h1>
    </div>
  )
}

export default App
