import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  id: string;
  label: string;
  category: string;
  orbitRadius: number;
  orbitSpeed: number;
  elevation: number;
  angleOffset: number;
}

const NODES: NodeData[] = [
  { id: 'mcp', label: 'MCP Protocol', category: 'Tool Calling Architecture', orbitRadius: 3.1, orbitSpeed: 0.28, elevation: 0.6, angleOffset: 0 },
  { id: 'python', label: 'Python Backend', category: 'Asynchronous Core', orbitRadius: 2.9, orbitSpeed: 0.22, elevation: -0.7, angleOffset: 1.05 },
  { id: 'ai', label: 'AI Orchestration', category: 'Multi-Model Routing', orbitRadius: 3.2, orbitSpeed: 0.32, elevation: 0.9, angleOffset: 2.1 },
  { id: 'data', label: 'Data Engineering', category: '~2M Records ETL', orbitRadius: 2.8, orbitSpeed: 0.25, elevation: -0.9, angleOffset: 3.14 },
  { id: 'postgres', label: 'PostgreSQL & RBAC', category: 'Flyway Versioned', orbitRadius: 3.0, orbitSpeed: 0.29, elevation: 0.3, angleOffset: 4.2 },
  { id: 'fastapi', label: 'FastAPI Engine', category: 'High-Throughput API', orbitRadius: 2.7, orbitSpeed: 0.35, elevation: -0.4, angleOffset: 5.2 },
];

// Luxury Obsidian & Titanium Central Architectural Core
function CentralArchitecturalCore({ hoveredNode }: { hoveredNode: string | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerPolyhedronRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
    if (innerPolyhedronRef.current) {
      innerPolyhedronRef.current.rotation.y -= delta * 0.25;
      innerPolyhedronRef.current.rotation.z += delta * 0.15;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.035;
      innerPolyhedronRef.current.scale.set(pulse, pulse, pulse);
    }
    if (outerCageRef.current) {
      outerCageRef.current.rotation.x += delta * 0.2;
      outerCageRef.current.rotation.y += delta * 0.12;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.35;
    if (ring2Ref.current) ring2Ref.current.rotation.y -= delta * 0.25;
    if (ring3Ref.current) ring3Ref.current.rotation.x += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* 1. Deep Obsidian Core Orb */}
      <Sphere ref={innerPolyhedronRef} args={[0.95, 32, 32]}>
        <meshPhysicalMaterial
          color="#09090b"
          emissive={hoveredNode ? '#ffffff' : '#27272a'}
          emissiveIntensity={hoveredNode ? 0.4 : 0.15}
          roughness={0.15}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </Sphere>

      {/* 2. Precision Crystalline Octahedral Cage */}
      <mesh ref={outerCageRef}>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          wireframeLinewidth={1.5}
          transparent
          opacity={hoveredNode ? 0.75 : 0.45}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* 3. Concentric Gyroscopic Titanium Rings */}
      <Torus ref={ring1Ref} args={[1.85, 0.018, 16, 120]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#e4e4e7" metalness={0.9} roughness={0.2} transparent opacity={0.6} />
      </Torus>

      <Torus ref={ring2Ref} args={[2.15, 0.012, 16, 120]} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
        <meshStandardMaterial color="#a1a1aa" metalness={0.95} roughness={0.1} transparent opacity={0.45} />
      </Torus>

      <Torus ref={ring3Ref} args={[2.45, 0.008, 16, 120]} rotation={[0, Math.PI / 2, Math.PI / 6]}>
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.05} transparent opacity={0.3} />
      </Torus>

      {/* Crisp White Studio Point Light Source */}
      <pointLight color="#ffffff" intensity={4.5} distance={7} decay={2} />
    </group>
  );
}

// Precision Machined Monolithic Orbiting Node
function OrbitingMonolith({
  node,
  isHovered,
  onHover,
  onLeave,
}: {
  node: NodeData;
  isHovered: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * node.orbitSpeed + node.angleOffset;
      const x = Math.cos(time) * node.orbitRadius;
      const z = Math.sin(time) * node.orbitRadius;
      const y = node.elevation + Math.sin(time * 1.6) * 0.25;
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y = -time;
      meshRef.current.rotation.x = Math.sin(time) * 0.2;
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(node.id);
      }}
      onPointerOut={() => onLeave()}
    >
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.4}>
        {/* Monolithic Gem-faceted Node */}
        <Octahedron args={[0.22, 0]}>
          <meshPhysicalMaterial
            color={isHovered ? '#ffffff' : '#18181b'}
            emissive={isHovered ? '#ffffff' : '#27272a'}
            emissiveIntensity={isHovered ? 1.2 : 0.2}
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
          />
        </Octahedron>

        {/* Fine Halo Ring */}
        <Torus args={[0.34, 0.012, 12, 48]}>
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={isHovered ? 0.9 : 0.25}
            metalness={1}
            roughness={0.1}
          />
        </Torus>
      </Float>
    </group>
  );
}

// Minimalist Starfield Particle Matrix (Pure White & Silver)
function ParticleMatrix({ count = 260 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 5.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.025;
      pointsRef.current.rotation.x += delta * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ffffff"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

// Camera Mouse Parallax Rig
function CameraParallax() {
  useFrame((state) => {
    const targetX = state.pointer.x * 0.9;
    const targetY = state.pointer.y * 0.6;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// Professional Monochrome 2D Fallback
export function HeroFallback2D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-architect-grid opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-ping [animation-duration:4s]"></div>
          <div className="w-40 h-40 rounded-full border border-white/20 border-dashed animate-spin flex items-center justify-center [animation-duration:24s]">
            <div className="w-28 h-28 rounded-full border border-white/40 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-white to-zinc-400 shadow-2xl shadow-white/30"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
          {NODES.map((n) => (
            <span
              key={n.id}
              className="px-3 py-1 text-xs font-mono rounded-full bg-zinc-900 border border-white/15 text-zinc-300"
            >
              {n.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

class WebGLErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  override componentDidCatch(error: Error) {
    console.warn('WebGL fallback activated:', error);
  }
  override render() {
    if (this.state.hasError) {
      return <HeroFallback2D />;
    }
    return this.props.children;
  }
}

export default function HeroScene3D({
  onHoverNode,
}: {
  onHoverNode?: (nodeId: string | null) => void;
}) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleHover = (id: string) => {
    setHoveredNode(id);
    onHoverNode?.(id);
  };

  const handleLeave = () => {
    setHoveredNode(null);
    onHoverNode?.(null);
  };

  if (prefersReducedMotion) {
    return <HeroFallback2D />;
  }

  return (
    <div className="w-full h-full relative">
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 6.4], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          {/* Studio Monochromatic Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[8, 12, 6]} intensity={3.0} color="#ffffff" />
          <directionalLight position={[-8, -6, -4]} intensity={1.2} color="#a1a1aa" />
          <pointLight position={[0, -3, 2]} intensity={1.5} color="#e4e4e7" />

          {/* Central Architectural Obsidian & Titanium Core */}
          <CentralArchitecturalCore hoveredNode={hoveredNode} />

          {/* Monolithic Orbiting Nodes */}
          {NODES.map((node) => (
            <OrbitingMonolith
              key={node.id}
              node={node}
              isHovered={hoveredNode === node.id}
              onHover={handleHover}
              onLeave={handleLeave}
            />
          ))}

          {/* Fine Particle Matrix */}
          <ParticleMatrix count={240} />

          {/* Parallax Camera Interaction */}
          <CameraParallax />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
