import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Html } from '@react-three/drei';
import * as THREE from 'three';

// Interface for floating node data
interface NodeData {
  id: string;
  label: string;
  category: string;
  color: string;
  position: [number, number, number];
  orbitSpeed: number;
  orbitRadius: number;
}

const NODES: NodeData[] = [
  { id: 'mcp', label: 'MCP Protocol', category: 'Tool Calling', color: '#00f2fe', position: [2.8, 0.8, 0], orbitSpeed: 0.4, orbitRadius: 2.8 },
  { id: 'python', label: 'Python Backend', category: 'Async Architecture', color: '#3b82f6', position: [-2.6, 1.2, 0.8], orbitSpeed: 0.35, orbitRadius: 2.7 },
  { id: 'ai', label: 'AI Orchestration', category: 'Multi-Model', color: '#a855f7', position: [0.5, -2.2, 1.5], orbitSpeed: 0.45, orbitRadius: 2.5 },
  { id: 'data', label: 'Data Migration', category: '~2M Records', color: '#22d3ee', position: [-2.2, -1.2, -1.0], orbitSpeed: 0.3, orbitRadius: 2.6 },
  { id: 'postgres', label: 'PostgreSQL & RBAC', category: 'Flyway Versioned', color: '#818cf8', position: [2.2, -1.5, -0.8], orbitSpeed: 0.38, orbitRadius: 2.7 },
  { id: 'fastapi', label: 'FastAPI Engine', category: 'High-Throughput', color: '#06b6d4', position: [-0.8, 2.4, -1.2], orbitSpeed: 0.42, orbitRadius: 2.6 },
];

// Inner Central Futuristic Core
function CentralCore({ hoveredNode }: { hoveredNode: string | null }) {
  const coreRef = useRef<THREE.Group>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
    if (outerCageRef.current) {
      outerCageRef.current.rotation.x -= delta * 0.35;
      outerCageRef.current.rotation.z += delta * 0.2;
    }
    if (innerSphereRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.06;
      innerSphereRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const coreColor = hoveredNode ? '#00f2fe' : '#38bdf8';
  const cageColor = hoveredNode ? '#c084fc' : '#818cf8';

  return (
    <group ref={coreRef}>
      {/* Central glowing emissive orb */}
      <Sphere ref={innerSphereRef} args={[0.9, 32, 32]}>
        <meshStandardMaterial
          color="#0f172a"
          emissive={coreColor}
          emissiveIntensity={hoveredNode ? 1.6 : 0.9}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Futuristic wireframe icosahedron cage */}
      <mesh ref={outerCageRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color={cageColor}
          wireframe
          wireframeLinewidth={1.5}
          emissive={cageColor}
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <Torus args={[1.7, 0.02, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.4} />
      </Torus>

      {/* Orbital Ring 2 */}
      <Torus args={[2.0, 0.015, 16, 100]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
      </Torus>

      {/* Point light localized at core center */}
      <pointLight color="#00f2fe" intensity={3} distance={6} />
      <pointLight color="#a855f7" intensity={2} distance={5} />
    </group>
  );
}

// Orbiting Interactive Node
function OrbitingNode({
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
  const groupRef = useRef<THREE.Group>(null);
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime * node.orbitSpeed + initialAngle;
      const x = Math.cos(time) * node.orbitRadius;
      const z = Math.sin(time) * node.orbitRadius;
      const y = Math.sin(time * 1.5) * 0.6;
      groupRef.current.position.set(x, y, z);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(node.id);
      }}
      onPointerOut={() => onLeave()}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[0.18, 16, 16]}>
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={isHovered ? 2.2 : 1.2}
            roughness={0.1}
          />
        </Sphere>
        <Torus args={[0.26, 0.015, 8, 32]}>
          <meshBasicMaterial color={node.color} transparent opacity={0.6} />
        </Torus>

        {/* 3D Label overlay */}
        <Html distanceFactor={10} position={[0, 0.35, 0]} center>
          <div
            className={`pointer-events-none transition-all duration-300 transform ${
              isHovered ? 'scale-110 opacity-100' : 'opacity-80 scale-90'
            }`}
          >
            <div className="px-2.5 py-1 rounded-md text-xs font-mono font-medium backdrop-blur-md bg-slate-900/80 border border-cyan-500/30 text-cyan-200 shadow-lg whitespace-nowrap">
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 bg-cyan-400 animate-pulse"></span>
              {node.label}
              <span className="block text-[10px] text-gray-400 font-sans">{node.category}</span>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Particle field
function Particles({ count = 280 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00f2fe'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#94a3b8'),
    ];

    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

// Camera Mouse Parallax Controller
function MouseParallax() {
  useFrame((state) => {
    const targetX = state.pointer.x * 0.8;
    const targetY = state.pointer.y * 0.5;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// Fallback component for devices without WebGL or reduced motion
export function HeroFallback2D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping"></div>
          <div className="w-36 h-36 rounded-full border border-cyan-500/40 border-dashed animate-spin flex items-center justify-center [animation-duration:15s]">
            <div className="w-24 h-24 rounded-full border border-violet-500/50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 shadow-lg shadow-cyan-500/50"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
          {NODES.map((n) => (
            <span
              key={n.id}
              className="px-2.5 py-1 text-xs font-mono rounded-full bg-slate-800/80 border border-cyan-500/30 text-cyan-300"
            >
              {n.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Error Boundary for WebGL
class WebGLErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  override componentDidCatch(error: Error) {
    console.warn('WebGL Rendering fallback triggered:', error);
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
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]} // Performance optimization: cap at 1.5 for retina
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />

          <CentralCore hoveredNode={hoveredNode} />

          {NODES.map((node) => (
            <OrbitingNode
              key={node.id}
              node={node}
              isHovered={hoveredNode === node.id}
              onHover={handleHover}
              onLeave={handleLeave}
            />
          ))}

          <Particles count={240} />
          <MouseParallax />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
