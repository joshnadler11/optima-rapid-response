import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const BG = '#1B4332';

const pins = [
  { name: 'Montreal', x: 0, z: 0 },
  { name: 'Laval', x: -0.3, z: -1.8 },
  { name: 'Longueuil', x: 0.6, z: 1.4 },
  { name: 'Brossard', x: -0.9, z: 1.7 },
  { name: 'South Shore', x: 1.5, z: 2.2 },
  { name: 'North Shore', x: -1.5, z: -2.5 },
];

/* ─── Terrain ─── */
function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(10, 8, 60, 48);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const height = Math.sin(x * 0.8) * 0.15 + Math.cos(y * 0.6) * 0.12 + Math.sin(x * 1.5 + y * 1.2) * 0.08;
      pos.setZ(i, height);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * ((2 * Math.PI) / 40);
  });

  return (
    <group ref={meshRef}>
      <mesh geometry={geo} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1.2, 0]}>
        <meshStandardMaterial
          color="#143D2B"
          roughness={0.7}
          metalness={0.2}
          wireframe={false}
          flatShading
        />
      </mesh>
      {pins.map((pin) => (
        <LocationPin key={pin.name} name={pin.name} x={pin.x} z={pin.z} />
      ))}
    </group>
  );
}

/* ─── Location Pin ─── */
function LocationPin({ name, x, z }: { name: string; x: number; z: number }) {
  const ref = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // Floating bob
    ref.current.position.y = -0.4 + Math.sin(t * 1.5 + x * 2) * 0.08;

    // Pulse ring
    if (ringRef.current) {
      const pulse = ((t + x * 3) % 2) / 2; // 0-1 every 2s
      ringRef.current.scale.setScalar(0.3 + pulse * 1.2);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - pulse) * 0.4;
    }
  });

  return (
    <group
      ref={ref}
      position={[x, -0.4, z]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Pin sphere */}
      <mesh>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial
          color="#E85D24"
          emissive="#E85D24"
          emissiveIntensity={hovered ? 1.2 : 0.5}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
      {/* Pin stem */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 6]} />
        <meshStandardMaterial color="#E85D24" roughness={0.4} />
      </mesh>
      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
        <ringGeometry args={[0.12, 0.15, 24]} />
        <meshBasicMaterial color="#E85D24" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* Tooltip */}
      {hovered && (
        <Html position={[0, 0.35, 0]} center distanceFactor={5} style={{ pointerEvents: 'none' }}>
          <div className="bg-primary/95 text-primary-foreground px-3 py-2 rounded-md text-center whitespace-nowrap shadow-lg backdrop-blur-sm">
            <p className="font-bold text-sm">{name}</p>
            <p className="text-xs text-primary-foreground/70">Same-day service</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function ServiceAreaMap3D() {
  return (
    <Canvas
      camera={{ position: [0, 3, 5], fov: 40 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => gl.setClearColor(BG)}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[-3, 5, 4]} intensity={0.7} />
      <pointLight position={[2, 3, -2]} intensity={0.5} color="#2D6A4F" />
      <Terrain />
    </Canvas>
  );
}
