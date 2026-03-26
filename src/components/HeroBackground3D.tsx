import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 200;
const BG_COLOR = '#0A1F13';
const SHIELD_GREEN = '#1B4332';
const LIME = '#84CC16';

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  const data = useMemo(() => {
    const positions: number[] = [];
    const velocities: number[] = [];
    const sizes: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8);
      velocities.push((Math.random() - 0.5) * 0.003, 0.002 + Math.random() * 0.006, (Math.random() - 0.5) * 0.002);
      sizes.push(0.015 + Math.random() * 0.035);
    }
    return { positions, velocities, sizes };
  }, []);

  const positionsRef = useRef(new Float32Array(data.positions));
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const pos = positionsRef.current;
    const vel = data.velocities;
    const clampDelta = Math.min(delta, 0.05);

    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.03;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.03;

    const mx = smoothMouse.current.x * 0.4;
    const my = smoothMouse.current.y * 0.3;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] += vel[i3] * 60 * clampDelta + mx * 0.003;
      pos[i3 + 1] += vel[i3 + 1] * 60 * clampDelta + my * 0.002;
      pos[i3 + 2] += vel[i3 + 2] * 60 * clampDelta;
      if (pos[i3 + 1] > 6) pos[i3 + 1] = -6;
      if (pos[i3] > 8) pos[i3] = -8;
      if (pos[i3] < -8) pos[i3] = 8;
      if (pos[i3 + 2] > 5) pos[i3 + 2] = -5;
      if (pos[i3 + 2] < -5) pos[i3 + 2] = 5;

      dummy.position.set(pos[i3], pos[i3 + 1], pos[i3 + 2]);
      dummy.scale.setScalar(data.sizes[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0.8,
    roughness: 0.3, metalness: 0.1, transparent: true, opacity: 0.6,
  }), []);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]} material={mat}>
      <sphereGeometry args={[1, 8, 8]} />
    </instancedMesh>
  );
}

function Shield() {
  const ref = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.6);
    shape.quadraticCurveTo(1.3, 1.3, 1.3, 0.2);
    shape.quadraticCurveTo(1.3, -0.8, 0, -1.6);
    shape.quadraticCurveTo(-1.3, -0.8, -1.3, 0.2);
    shape.quadraticCurveTo(-1.3, 1.3, 0, 1.6);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4 });
  }, []);

  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: SHIELD_GREEN, roughness: 0.3, metalness: 0.7, transparent: true, opacity: 0.35 }), []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * ((2 * Math.PI) / 12);
  });

  return <mesh ref={ref} geometry={geometry} material={mat} position={[3.5, 0, -2]} />;
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[-4, 5, 3]} intensity={0.6} color="#d4d4d4" />
      <pointLight position={[5.5, 1, -3]} intensity={1.5} color={LIME} distance={8} decay={2} />
      <pointLight position={[2, -2, -1]} intensity={0.5} color="#2D6A4F" distance={6} decay={2} />
      <Particles />
      <Shield />
    </>
  );
}

export default function HeroBackground3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(BG_COLOR)}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
    >
      <SceneContent />
    </Canvas>
  );
}
