import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/* ─── constants ─── */
const BUG_COLOR = '#3B1F0A';
const SHIELD_ORANGE = '#E85D24';
const SHIELD_GREEN = '#1B4332';
const SCENE_BG = '#0D2B1E';
const NUM_BUGS = 8;

/* ─── helpers ─── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

/* ─── single insect group ─── */
function Insect({
  startX,
  startZ,
  speed,
  scatterDir,
  phase,
  triggerTime,
}: {
  startX: number;
  startZ: number;
  speed: number;
  scatterDir: [number, number, number];
  phase: number;
  triggerTime: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Group>(null!);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: BUG_COLOR, roughness: 0.4, metalness: 0.3 }), []);
  const crawlX = useRef(startX);
  const scattered = useRef(false);
  const scatterStart = useRef(0);
  const scatterPos = useRef(new THREE.Vector3());
  const scatterRot = useRef(new THREE.Euler());

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const trigger = triggerTime.current;

    if (trigger > 0 && t - trigger > 0.05 && !scattered.current) {
      scattered.current = true;
      scatterStart.current = t;
      scatterPos.current.copy(ref.current.position);
      scatterRot.current.copy(ref.current.rotation);
    }

    if (!scattered.current) {
      // Crawling loop
      crawlX.current += speed * 0.008;
      if (crawlX.current > 7) crawlX.current = -7;
      ref.current.position.set(crawlX.current, -1.4, startZ);
      // Subtle bobbing
      ref.current.position.y += Math.sin(t * 3 + phase) * 0.03;
      ref.current.rotation.y = speed > 0 ? 0 : Math.PI;
    } else {
      // Scatter animation — fly off in 1.2s
      const elapsed = t - scatterStart.current;
      const progress = Math.min(elapsed / 1.2, 1);
      const eased = progress * progress; // accelerate out
      ref.current.position.set(
        scatterPos.current.x + scatterDir[0] * eased * 12,
        scatterPos.current.y + scatterDir[1] * eased * 8 + Math.sin(progress * Math.PI) * 2,
        scatterPos.current.z + scatterDir[2] * eased * 6,
      );
      ref.current.rotation.x += 0.15;
      ref.current.rotation.z += 0.12;
      if (progress >= 1) {
        ref.current.visible = false;
      }
    }
  });

  const legPositions: [number, number, number, number][] = [
    [-0.12, -0.06, 0.08, -0.5],
    [0, -0.06, 0.08, -0.5],
    [0.12, -0.06, 0.08, -0.5],
    [-0.12, -0.06, -0.08, 0.5],
    [0, -0.06, -0.08, 0.5],
    [0.12, -0.06, -0.08, 0.5],
  ];

  return (
    <group ref={ref} scale={1.1}>
      {/* Body - elongated capsule */}
      <mesh material={mat} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.06, 0.28, 8, 12]} />
      </mesh>
      {/* Head */}
      <mesh material={mat} position={[0.22, 0.01, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
      </mesh>
      {/* 6 Legs */}
      {legPositions.map(([x, y, z, rotZ], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, 0, rotZ]} material={mat}>
          <cylinderGeometry args={[0.008, 0.008, 0.14, 4]} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Shield ─── */
function Shield({ triggerTime }: { triggerTime: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const glowRef = useRef<THREE.PointLight>(null!);
  const dropped = useRef(false);
  const dropStart = useRef(0);

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

    if (elapsed < 0.3) {
      // Drop fast
      const progress = elapsed / 0.3;
      const eased = progress * progress * progress;
      ref.current.position.y = lerp(8, 0.3, eased);
      matRef.current.color.set(SHIELD_ORANGE);
      matRef.current.emissive.set(SHIELD_ORANGE);
      matRef.current.emissiveIntensity = 2.0 * (1 - progress);
      if (glowRef.current) glowRef.current.intensity = 8 * (1 - progress);
    } else if (elapsed < 0.7) {
      // Flash and settle
      const settleT = (elapsed - 0.3) / 0.4;
      ref.current.position.y = 0.3;
      const orange = new THREE.Color(SHIELD_ORANGE);
      const green = new THREE.Color(SHIELD_GREEN);
      matRef.current.color.lerpColors(orange, green, settleT);
      matRef.current.emissive.set(SHIELD_GREEN);
      matRef.current.emissiveIntensity = lerp(1.5, 0.3, settleT);
      if (glowRef.current) {
        glowRef.current.color.set(SHIELD_GREEN);
        glowRef.current.intensity = lerp(6, 2, settleT);
      }
    } else {
      // Idle rotate
      ref.current.position.y = 0.3;
      ref.current.rotation.y = (elapsed - 0.7) * 0.3;
      matRef.current.color.set(SHIELD_GREEN);
      matRef.current.emissive.set(SHIELD_GREEN);
      matRef.current.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.1;
      if (glowRef.current) {
        glowRef.current.color.set('#2D6A4F');
        glowRef.current.intensity = 2 + Math.sin(t * 2) * 0.5;
      }
    }
  });

  return (
    <group ref={ref} position={[0, 8, 0]} visible={false}>
      <mesh rotation={[0, 0, 0]}>
        <extrudeGeometry args={[shieldShape, extrudeSettings]} />
        <meshStandardMaterial ref={matRef} color={SHIELD_ORANGE} roughness={0.3} metalness={0.5} />
      </mesh>
      <pointLight ref={glowRef} color={SHIELD_GREEN} intensity={0} distance={6} position={[0, 0, 0.5]} />
    </group>
  );
}

/* ─── Camera shake ─── */
function CameraShake({ triggerTime }: { triggerTime: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const originalPos = useRef(new THREE.Vector3(0, 0, 5));

  useFrame((state) => {
    const trigger = triggerTime.current;
    if (trigger <= 0) {
      camera.position.copy(originalPos.current);
      return;
    }
    const elapsed = state.clock.getElapsedTime() - trigger;
    if (elapsed > 0.25 && elapsed < 0.65) {
      const shakeT = (elapsed - 0.25) / 0.4;
      const intensity = (1 - shakeT) * 0.12;
      camera.position.set(
        originalPos.current.x + (Math.random() - 0.5) * intensity,
        originalPos.current.y + (Math.random() - 0.5) * intensity,
        originalPos.current.z,
      );
    } else {
      camera.position.copy(originalPos.current);
    }
  });

  return null;
}

/* ─── main scene ─── */
interface SceneContentProps {
  triggerTime: React.MutableRefObject<number>;
}

function SceneContent({ triggerTime }: SceneContentProps) {
  const bugData = useMemo(() => {
    const dirs: [number, number, number][] = [
      [-1, 1, -1], [1, 1, 1], [-1, 0.5, 0.5], [1, 1.5, -0.5],
      [-1.5, 0.8, 0], [1.5, 0.6, 0.3], [-0.8, 1.2, -0.8], [0.8, 1, 0.7],
    ];
    return Array.from({ length: NUM_BUGS }, (_, i) => ({
      startX: -6 + (i / NUM_BUGS) * 10 + (Math.random() - 0.5) * 2,
      startZ: (Math.random() - 0.5) * 2,
      speed: 0.4 + Math.random() * 0.6 * (i % 2 === 0 ? 1 : -1),
      scatterDir: dirs[i] as [number, number, number],
      phase: i * 0.8,
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={0.8} />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#2D6A4F" />
      <CameraShake triggerTime={triggerTime} />
      <Shield triggerTime={triggerTime} />
      {bugData.map((bug, i) => (
        <Insect key={i} {...bug} triggerTime={triggerTime} />
      ))}
    </>
  );
}

/* ─── exported component ─── */
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
    // small delay so bugs re-mount
    requestAnimationFrame(() => {
      triggerTime.current = performance.now() / 1000; // will be overridden by clock
    });
    // We need to set triggerTime relative to the Three.js clock.
    // We'll use a ref that the scene reads and sets once.
    triggerTime.current = -1; // signal to set on next frame
    setTimeout(() => setShowText(true), 900);
    setTimeout(() => setShowButton(true), 1400);
  }, []);

  const replay = useCallback(() => {
    triggerTime.current = 0;
    hasTriggered.current = false;
    setShowText(false);
    setShowButton(false);
    setCanvasKey((k) => k + 1);
    // Re-trigger after remount
    setTimeout(() => trigger(), 100);
  }, [trigger]);

  // Intersection observer for scroll trigger
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          trigger();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  // The triggerTime needs to be set in Three.js clock time.
  // We use a special -1 sentinel that the scene picks up.
  const TriggerSync = useCallback(
    function TriggerSync() {
      useFrame((state) => {
        if (triggerTime.current === -1) {
          triggerTime.current = state.clock.getElapsedTime();
        }
      });
      return null;
    },
    [],
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: SCENE_BG, height: '520px' }}
    >
      <Canvas
        key={canvasKey}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(SCENE_BG);
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <TriggerSync />
        <SceneContent triggerTime={triggerTime} />
      </Canvas>

      {/* Overlay text */}
      <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-4 pointer-events-none z-10">
        <h3
          className="font-display text-2xl md:text-[28px] font-bold text-primary-foreground text-center transition-all duration-700"
          style={{
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          Guaranteed Results. Every Time.
        </h3>
        <a
          href="/quote"
          className="pointer-events-auto inline-flex items-center justify-center bg-accent text-accent-foreground font-bold text-lg px-8 h-14 rounded-md hover:brightness-110 transition-all active:scale-[0.97] shadow-lg shadow-accent/30 animate-cta-pulse"
          style={{
            opacity: showButton ? 1 : 0,
            transform: showButton ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          Get a Free Quote
        </a>
      </div>

      {/* Replay button */}
      <button
        onClick={replay}
        className="absolute bottom-4 right-4 z-20 bg-muted-foreground/20 hover:bg-muted-foreground/40 text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors active:scale-95"
      >
        ↻ Replay
      </button>
    </section>
  );
}
