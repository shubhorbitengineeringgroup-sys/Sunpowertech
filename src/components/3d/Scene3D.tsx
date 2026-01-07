import { Suspense, useRef, memo, lazy } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Memoized Sun Component with reduced complexity
const Sun = memo(() => {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[4, 3, -5]}>
      <Sphere ref={sunRef} args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#FF8C00" />
      </Sphere>
      <Sphere ref={glowRef} args={[2.0, 16, 16]}>
        <meshBasicMaterial color="#FFD700" transparent opacity={0.2} />
      </Sphere>
      <pointLight color="#FF8C00" intensity={2} distance={20} />
    </group>
  );
});

Sun.displayName = 'Sun';

// Memoized Earth Component with reduced complexity
const Earth = memo(() => {
  const earthRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={[-2, -0.5, 0]}>
      <Sphere ref={earthRef} args={[2, 32, 32]}>
        <meshStandardMaterial color="#1a5276" roughness={0.8} metalness={0.2} />
      </Sphere>
      <Sphere args={[2.2, 16, 16]}>
        <meshBasicMaterial color="#00CED1" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3, 0.05, 8, 50]} />
        <meshStandardMaterial color="#FF8C00" emissive="#FF6600" emissiveIntensity={0.5} />
      </mesh>
      <group ref={orbitRef}>
        {[0, 1, 2, 3].map((i) => (
          <group key={i} rotation={[0, (Math.PI * 2 * i) / 4, 0]}>
            <mesh position={[3.5, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
              <boxGeometry args={[0.4, 0.02, 0.25]} />
              <meshStandardMaterial color="#1a237e" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
});

Earth.displayName = 'Earth';

// Memoized Energy Particles with reduced count
const EnergyParticles = memo(() => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100; // Reduced from 200
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 5 + Math.random() * 10;
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#FFD700" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
});

EnergyParticles.displayName = 'EnergyParticles';

// Main Scene Component - Memoized
export const Scene3D = memo(() => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: false, // Disable for performance
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]} // Limit pixel ratio
        style={{ background: 'transparent' }}
        frameloop="demand" // Only render when needed
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#FFF4E0" />
          
          <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />
          
          <Sun />
          <Earth />
          <EnergyParticles />
        </Suspense>
      </Canvas>
    </div>
  );
});

Scene3D.displayName = 'Scene3D';

export default Scene3D;