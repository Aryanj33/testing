import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { FloatingPill } from './FloatingPill';

export const Scene = () => {
  return (
    <div className="h-screen w-full absolute top-0 left-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <FloatingPill position={[-2, 0, 0]} />
          <FloatingPill position={[2, 1, -2]} scale={0.8} />
          <FloatingPill position={[1, -1, -1]} scale={1.2} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};