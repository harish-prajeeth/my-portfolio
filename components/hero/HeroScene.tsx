"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 180;
const CONNECT_DIST = 1.45;

function generateNodes(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = ((1 + Math.sqrt(5)) * Math.PI) * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const jitter = 0.14;
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
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth mouse lerp
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.06;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.06;

    autoRotation.current += delta * 0.12;
    groupRef.current.rotation.y = autoRotation.current + mouse.current.x * 0.4;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.current.y * 0.3,
      0.05
    );

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.2;
      coreRef.current.rotation.z += delta * 0.1;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.25;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.2;
    }

    if (pointLightRef.current) {
      pointLightRef.current.position.x = mouse.current.x * 3.5;
      pointLightRef.current.position.y = mouse.current.y * 3.5;
    }
  });

  return (
    <group ref={groupRef} scale={viewport.width < 6 ? 0.75 : 1.05}>
      {/* Node Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#10B981"
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>

      {/* Connection Lines with Gold Glow */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.22} />
      </lineSegments>

      {/* Orbital Ring 1 - Emerald */}
      <mesh ref={ring1Ref} rotation={[0.9, 0.4, 0]}>
        <torusGeometry args={[radius * 1.25, 0.012, 8, 64]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.4} />
      </mesh>

      {/* Orbital Ring 2 - Cyber Gold */}
      <mesh ref={ring2Ref} rotation={[-0.7, 0.5, 0.6]}>
        <torusGeometry args={[radius * 1.38, 0.009, 8, 64]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.35} />
      </mesh>

      {/* Inner Glowing Wireframe Sphere Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[radius * 0.55, 20, 20]} />
        <meshBasicMaterial
          color="#10B981"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Dynamic Follower Light */}
      <pointLight ref={pointLightRef} color="#10B981" intensity={3} distance={7} position={[0, 0, 3]} />
      <pointLight color="#D4AF37" intensity={2} distance={8} position={[2, 2, 2]} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.9} />
      <NeuralGlobe />
    </Canvas>
  );
}
