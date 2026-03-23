import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SHAPE_COUNT = 30;

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null!);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1B4332',
    transparent: true,
    opacity: 0.15,
    roughness: 0.6,
    metalness: 0.3,
  }), []);

  const shapes = useMemo(() => {
    return Array.from({ length: SHAPE_COUNT }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      rotSpeed: 0.1 + Math.random() * 0.4,
      scale: 0.1 + Math.random() * 0.25,
      type: i % 2 === 0 ? 'cube' : 'octa',
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const s = shapes[i];
      if (!s) return;
      child.rotation.x = t * s.rotSpeed * 0.5;
      child.rotation.y = t * s.rotSpeed;
      child.position.y = s.pos[1] + Math.sin(t * 0.3 + s.phase) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale} material={mat}>
          {s.type === 'cube' ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : (
            <octahedronGeometry args={[1]} />
          )}
        </mesh>
      ))}
    </group>
  );
}

export default function StatsBackground3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[-3, 4, 3]} intensity={0.5} />
      <FloatingShapes />
    </Canvas>
  );
}
