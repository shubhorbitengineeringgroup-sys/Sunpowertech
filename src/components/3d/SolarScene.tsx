import { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Glowing Sun with animated rays
const Sun = memo(() => {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      const scale = 1.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
    if (raysRef.current) {
      raysRef.current.rotation.z += 0.003;
    }
  });

  return (
    <group position={[-4, 3, -5]}>
      {/* Main Sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#FF6B00" />
      </mesh>
      
      {/* Inner Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color="#FFAA00" transparent opacity={0.4} />
      </mesh>
      
      {/* Outer Glow */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.15} />
      </mesh>

      {/* Sun Rays */}
      <group ref={raysRef}>
        {[...Array(12)].map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 6]}>
            <planeGeometry args={[0.1, 3]} />
            <meshBasicMaterial color="#FFD700" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* Point Light from Sun */}
      <pointLight color="#FF8800" intensity={3} distance={20} />
    </group>
  );
});

// Energy beam particles flowing from sun to earth
const EnergyBeam = memo(({ startPos, endPos, delay }: { startPos: [number, number, number]; endPos: [number, number, number]; delay: number }) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (particleRef.current) {
      const time = (state.clock.elapsedTime + delay) % 3;
      const progress = time / 3;
      
      particleRef.current.position.x = THREE.MathUtils.lerp(startPos[0], endPos[0], progress);
      particleRef.current.position.y = THREE.MathUtils.lerp(startPos[1], endPos[1], progress) + Math.sin(progress * Math.PI) * 0.5;
      particleRef.current.position.z = THREE.MathUtils.lerp(startPos[2], endPos[2], progress);
      
      const scale = 0.1 + Math.sin(progress * Math.PI) * 0.1;
      particleRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Trail
      width={0.5}
      length={8}
      color="#FFD700"
      attenuation={(t) => t * t}
    >
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#FFAA00" />
      </mesh>
    </Trail>
  );
});

// Earth with houses and solar panels
const Earth = memo(() => {
  const earthRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= 0.0005;
    }
  });

  return (
    <group position={[3, -1, -3]} ref={earthRef}>
      {/* Earth Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#1a5f7a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Continents (simplified) */}
      <mesh rotation={[0.2, 0.5, 0]}>
        <sphereGeometry args={[1.52, 32, 32]} />
        <meshStandardMaterial 
          color="#2d6a4f"
          roughness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial 
          color="#87CEEB"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Houses with Solar Panels on Earth surface */}
      {[0, 1, 2, 3].map((i) => (
        <House key={i} index={i} />
      ))}
    </group>
  );
});

// Individual house with solar panel
const House = memo(({ index }: { index: number }) => {
  const houseRef = useRef<THREE.Group>(null);
  const panelRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  
  const angle = (index * Math.PI) / 2 + 0.3;
  const x = Math.cos(angle) * 1.55;
  const y = Math.sin(angle * 0.5) * 0.5 + 0.8;
  const z = Math.sin(angle) * 1.55;

  useFrame((state) => {
    if (panelRef.current && panelRef.current.material && 'emissiveIntensity' in panelRef.current.material) {
      (panelRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.3;
    }
  });

  return (
    <group ref={houseRef} position={[x, y, z]} rotation={[0, angle, 0]}>
      {/* House Base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.15, 0.1, 0.12]} />
        <meshStandardMaterial color="#E8DCC4" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 0.12, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.12, 0.08, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Solar Panel on Roof */}
      <mesh ref={panelRef} position={[0, 0.14, 0.03]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.1, 0.01, 0.06]} />
        <meshStandardMaterial 
          color="#1a237e"
          emissive="#4FC3F7"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Electricity Glow */}
      <pointLight ref={glowRef} position={[0, 0.2, 0]} color="#4FC3F7" intensity={0.5} distance={0.5} />
    </group>
  );
});

// Electricity particles from panels
const ElectricityParticles = memo(() => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    const colors = new Float32Array(50 * 3);
    
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = 2.5 + Math.random() * 1.5;
      positions[i * 3 + 1] = -0.5 + Math.random() * 1;
      positions[i * 3 + 2] = -2.5 + Math.random() * 1;
      
      colors[i * 3] = 0.3 + Math.random() * 0.2;
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
      colors[i * 3 + 2] = 1;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < 50; i++) {
        positions[i * 3 + 1] += 0.01;
        
        if (positions[i * 3 + 1] > 1) {
          positions[i * 3 + 1] = -0.5;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += 0.002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={50}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={50}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
});

// Orbiting solar panel satellite
const SolarSatellite = memo(({ orbitRadius, speed, offset }: { orbitRadius: number; speed: number; offset: number }) => {
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (satelliteRef.current) {
      const time = state.clock.elapsedTime * speed + offset;
      satelliteRef.current.position.x = 3 + Math.cos(time) * orbitRadius;
      satelliteRef.current.position.z = -3 + Math.sin(time) * orbitRadius;
      satelliteRef.current.rotation.y = -time;
    }
  });

  return (
    <group ref={satelliteRef} position={[3 + orbitRadius, 0.5, -3]}>
      {/* Satellite Body */}
      <mesh>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial color="#888888" metalness={0.8} />
      </mesh>
      
      {/* Solar Panels */}
      <mesh position={[-0.15, 0, 0]}>
        <boxGeometry args={[0.2, 0.01, 0.1]} />
        <meshStandardMaterial color="#1a237e" emissive="#4FC3F7" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.15, 0, 0]}>
        <boxGeometry args={[0.2, 0.01, 0.1]} />
        <meshStandardMaterial color="#1a237e" emissive="#4FC3F7" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
});

// Floating energy orbs
const EnergyOrbs = memo(() => {
  const orbsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.children.forEach((orb, i) => {
        orb.position.y = Math.sin(state.clock.elapsedTime + i) * 0.3 + (i % 2 === 0 ? 1 : 2);
        orb.rotation.x += 0.01;
        orb.rotation.y += 0.015;
      });
    }
  });

  return (
    <group ref={orbsRef}>
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[-2 + i * 1.5, 1, -4 + i * 0.5]}>
            <octahedronGeometry args={[0.1]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#FF8800" : "#4FC3F7"} />
          </mesh>
        </Float>
      ))}
    </group>
  );
});

const SolarScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: false,
          alpha: true, 
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: true
        }}
        dpr={[1, 1.5]}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        {/* Ambient Light */}
        <ambientLight intensity={0.3} />
        
        {/* Directional Light */}
        <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#FFF5E1" />

        {/* Stars Background */}
        <Stars 
          radius={50} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5}
        />

        {/* Main Sun */}
        <Sun />
        
        {/* Earth with Houses */}
        <Earth />

        {/* Energy Beams from Sun to Earth */}
        {[0, 0.5, 1, 1.5, 2, 2.5].map((delay, i) => (
          <EnergyBeam 
            key={i}
            startPos={[-3, 2.5, -5]}
            endPos={[2.5, -0.5, -3]}
            delay={delay}
          />
        ))}

        {/* Electricity Particles */}
        <ElectricityParticles />

        {/* Orbiting Satellites */}
        <SolarSatellite orbitRadius={2.5} speed={0.3} offset={0} />
        <SolarSatellite orbitRadius={3} speed={0.2} offset={Math.PI} />

        {/* Floating Energy Orbs */}
        <EnergyOrbs />
      </Canvas>
    </div>
  );
};

export default memo(SolarScene);
