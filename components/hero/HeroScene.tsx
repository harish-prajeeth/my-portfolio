"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 300;
const CONNECT_DIST = 1.38;

function generateNodes(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = ((1 + Math.sqrt(5)) * Math.PI) * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const jitter = 0.16;
    positions[i * 3] = (x + (Math.random() - 0.5) * jitter) * radius;
    positions[i * 3 + 1] = (y + (Math.random() - 0.5) * jitter) * radius;
    positions[i * 3 + 2] = (z + (Math.random() - 0.5) * jitter) * radius;
  }
  return positions;
}

function NeuralGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { viewport } = useThree();
  const radius = 2.75;

  const positions = useMemo(() => generateNodes(NODE_COUNT, radius), []);

  const linePositions = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const ax = positions[i * 3];
      const ay = positions[i * 3 + 1];
      const az = positions[i * 3 + 2];
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const bx = positions[j * 3];
        const by = positions[j * 3 + 1];
        const bz = positions[j * 3 + 2];
        const d = Math.hypot(ax - bx, ay - by, az - bz);
        if (d < CONNECT_DIST) {
          pts.push(ax, ay, az, bx, by, bz);
        }
      }
    }
    return new Float32Array(pts);
  }, [positions]);

  const autoRotation = useRef(0);

  useEffect(() => {
    const onPointerMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth mouse lerp
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    autoRotation.current += delta * 0.14;
    groupRef.current.rotation.y = autoRotation.current + mouse.current.x * 0.45;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.current.y * 0.35,
      0.05
    );

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.25;
      coreRef.current.rotation.z += delta * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.3;
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.4 + 0.8;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.22;
      ring2Ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.3 - 0.7;
    }

    if (pointLightRef.current) {
      pointLightRef.current.position.x = mouse.current.x * 4;
      pointLightRef.current.position.y = mouse.current.y * 4;
    }
  });

  return (
    <group ref={groupRef} scale={viewport.width < 6 ? 0.75 : 1.08}>
      {/* Node Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#10B981"
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>

      {/* Connection Lines with Gold & Emerald Glow */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.2} />
      </lineSegments>

      {/* Orbital Ring 1 - Emerald Starlight */}
      <mesh ref={ring1Ref} rotation={[0.9, 0.4, 0]}>
        <torusGeometry args={[radius * 1.25, 0.012, 16, 100]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.4} />
      </mesh>

      {/* Orbital Ring 2 - Cyber Gold */}
      <mesh ref={ring2Ref} rotation={[-0.7, 0.5, 0.6]}>
        <torusGeometry args={[radius * 1.38, 0.009, 16, 100]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.35} />
      </mesh>

      {/* Inner Glowing Wireframe Sphere Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[radius * 0.55, 32, 32]} />
        <meshBasicMaterial
          color="#10B981"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Interactive Dynamic Light Follower */}
      <pointLight ref={pointLightRef} color="#10B981" intensity={3.5} distance={7} position={[0, 0, 3]} />
      <pointLight color="#D4AF37" intensity={2.2} distance={9} position={[2.5, 2, 2.5]} />
      <pointLight color="#06B6D4" intensity={1.8} distance={8} position={[-2.5, -2, 2]} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.9} />
      <NeuralGlobe />
    </Canvas>
  );
}
