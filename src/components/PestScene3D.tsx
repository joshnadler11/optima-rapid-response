import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SCENE_BG = '#0D2B1E';
const SHIELD_GREEN = '#1B4332';
const SHIELD_LIME = '#84CC16';
const PARTICLE_COUNT = 120;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

/* ─── Floating particles ─── */
function Particles({ triggerTime }: { triggerTime: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    const pos: number[] = [];
    const vel: number[] = [];
    const sizes: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos.push((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6);
      vel.push((Math.random() - 0.5) * 0.004, 0.003 + Math.random() * 0.008, (Math.random() - 0.5) * 0.003);
      sizes.push(0.02 + Math.random() * 0.04);
    }
    return { pos: new Float32Array(pos), vel, sizes };
  }, []);

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#84CC16', emissive: '#84CC16', emissiveIntensity: 0.6,
    roughness: 0.3, transparent: true, opacity: 0.5,
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const trigger = triggerTime.current;
    const isTriggered = trigger > 0;
    const elapsed = isTriggered ? t - trigger : 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      data.pos[i3] += data.vel[i3];
      data.pos[i3 + 1] += data.vel[i3 + 1];
      data.pos[i3 + 2] += data.vel[i3 + 2];

      if (data.pos[i3 + 1] > 5) data.pos[i3 + 1] = -5;
      if (data.pos[i3] > 9) data.pos[i3] = -9;
      if (data.pos[i3] < -9) data.pos[i3] = 9;

      // After trigger, particles accelerate outward
      if (isTriggered && elapsed < 1.5) {
        const pushT = Math.min(elapsed / 1.0, 1);
        const dx = data.pos[i3];
        const dy = data.pos[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
        data.pos[i3] += (dx / dist) * pushT * 0.04;
        data.pos[i3 + 1] += (dy / dist) * pushT * 0.03;
      }

      dummy.position.set(data.pos[i3], data.pos[i3 + 1], data.pos[i3 + 2]);
      const pulse = isTriggered && elapsed < 1.0 ? 1.5 : 1;
      dummy.scale.setScalar(data.sizes[i] * pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    if (isTriggered && elapsed < 1.0) {
      mat.emissiveIntensity = lerp(0.6, 2.0, elapsed);
      mat.opacity = lerp(0.5, 0.9, elapsed);
    } else if (isTriggered) {
      mat.emissiveIntensity = lerp(2.0, 0.6, Math.min((elapsed - 1.0) / 1.5, 1));
      mat.opacity = lerp(0.9, 0.5, Math.min((elapsed - 1.0) / 1.5, 1));
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]} material={mat}>
      <sphereGeometry args={[1, 6, 6]} />
    </instancedMesh>
  );
}

/* ─── Shield ─── */
function Shield({ triggerTime }: { triggerTime: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const glowRef = useRef<THREE.PointLight>(null!);

  const shieldShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.2);
    shape.quadraticCurveTo(1.0, 1.0, 1.0, 0.2);
    shape.quadraticCurveTo(1.0, -0.6, 0, -1.2);
    shape.quadraticCurveTo(-1.0, -0.6, -1.0, 0.2);
    shape.quadraticCurveTo(-1.0, 1.0, 0, 1.2);
    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({ depth: 0.15, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3 }),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const trigger = triggerTime.current;

    if (trigger <= 0) {
      ref.current.position.y = 8;
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const elapsed = t - trigger;

    if (elapsed < 0.4) {
      const progress = elapsed / 0.4;
      const eased = 1 - Math.pow(1 - progress, 3);
      ref.current.position.y = lerp(6, 0.3, eased);
      ref.current.scale.setScalar(lerp(0.5, 1.05, eased));
      matRef.current.color.set(SHIELD_LIME);
      matRef.current.emissive.set(SHIELD_LIME);
      matRef.current.emissiveIntensity = lerp(2.0, 0.8, progress);
      if (glowRef.current) glowRef.current.intensity = lerp(8, 3, progress);
    } else if (elapsed < 0.7) {
      const settleT = (elapsed - 0.4) / 0.3;
      ref.current.scale.setScalar(lerp(1.05, 1.0, settleT));
      ref.current.position.y = 0.3;
      const lime = new THREE.Color(SHIELD_LIME);
      const green = new THREE.Color(SHIELD_GREEN);
      matRef.current.color.lerpColors(lime, green, settleT);
      matRef.current.emissiveIntensity = lerp(0.8, 0.3, settleT);
    } else {
      ref.current.position.y = 0.3;
      ref.current.rotation.y = (elapsed - 0.7) * 0.2;
      matRef.current.color.set(SHIELD_GREEN);
      matRef.current.emissive.set(SHIELD_GREEN);
      matRef.current.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.1;
      if (glowRef.current) {
        glowRef.current.color.set('#84CC16');
        glowRef.current.intensity = 2 + Math.sin(t * 2) * 0.5;
      }
    }
  });

  return (
    <group ref={ref} position={[0, 8, 0]} visible={false}>
      <mesh>
        <extrudeGeometry args={[shieldShape, extrudeSettings]} />
        <meshStandardMaterial ref={matRef} color={SHIELD_LIME} roughness={0.3} metalness={0.5} />
      </mesh>
      <pointLight ref={glowRef} color={SHIELD_LIME} intensity={0} distance={6} position={[0, 0, 0.5]} />
    </group>
  );
}

/* ─── Pulse ring ─── */
function PulseRing({ triggerTime }: { triggerTime: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const trigger = triggerTime.current;
    if (trigger <= 0) { ref.current.visible = false; return; }
    ref.current.visible = true;
    const elapsed = state.clock.getElapsedTime() - trigger;
    if (elapsed < 0.3) return;
    const t = Math.min((elapsed - 0.3) / 1.2, 1);
    const scale = lerp(0.5, 8, t);
    ref.current.scale.set(scale, scale, 1);
    if (matRef.current) matRef.current.opacity = lerp(0.5, 0, t);
  });

  return (
    <mesh ref={ref} position={[0, 0.3, 0.2]} visible={false} rotation={[0, 0, 0]}>
      <ringGeometry args={[0.9, 1.0, 32]} />
      <meshBasicMaterial ref={matRef} color={SHIELD_LIME} transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ─── Scene content ─── */
function SceneContent({ triggerTime }: { triggerTime: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={0.7} />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#2D6A4F" />
      <Shield triggerTime={triggerTime} />
      <PulseRing triggerTime={triggerTime} />
      <Particles triggerTime={triggerTime} />
    </>
  );
}

/* ─── Exported component ─── */
export default function PestScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerTime = useRef(0);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const hasTriggered = useRef(false);
  const [canvasKey, setCanvasKey] = useState(0);

  const trigger = useCallback(() => {
    setShowText(false);
    setShowButton(false);
    hasTriggered.current = true;
    triggerTime.current = -1;
    setTimeout(() => setShowText(true), 700);
    setTimeout(() => setShowButton(true), 1200);
  }, []);

  const replay = useCallback(() => {
    triggerTime.current = 0;
    hasTriggered.current = false;
    setShowText(false);
    setShowButton(false);
    setCanvasKey((k) => k + 1);
    setTimeout(() => trigger(), 100);
  }, [trigger]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasTriggered.current) trigger(); },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  const TriggerSync = useCallback(function TriggerSync() {
    useFrame((state) => {
      if (triggerTime.current === -1) triggerTime.current = state.clock.getElapsedTime();
    });
    return null;
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden" style={{ backgroundColor: SCENE_BG, height: '520px' }}>
      <Canvas key={canvasKey} camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: false }} onCreated={({ gl }) => gl.setClearColor(SCENE_BG)} style={{ width: '100%', height: '100%' }}>
        <TriggerSync />
        <SceneContent triggerTime={triggerTime} />
      </Canvas>

      <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-4 pointer-events-none z-10">
        <h3 className="font-display text-2xl md:text-[28px] font-bold text-primary-foreground text-center transition-all duration-700" style={{ opacity: showText ? 1 : 0, transform: showText ? 'translateY(0)' : 'translateY(12px)' }}>
          Guaranteed Results. Every Time.
        </h3>
        <a href="/quote" className="pointer-events-auto inline-flex items-center justify-center bg-accent text-accent-foreground font-bold text-lg px-8 h-14 rounded-md hover:brightness-110 transition-all active:scale-[0.97] shadow-lg shadow-accent/30 animate-cta-pulse" style={{ opacity: showButton ? 1 : 0, transform: showButton ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}>
          Get a Free Quote
        </a>
      </div>

      <button onClick={replay} className="absolute bottom-4 right-4 z-20 bg-muted-foreground/20 hover:bg-muted-foreground/40 text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors active:scale-95">
        ↻ Replay
      </button>
    </section>
  );
}
