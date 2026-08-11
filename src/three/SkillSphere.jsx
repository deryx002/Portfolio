import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import { Physics, RigidBody, BallCollider } from '@react-three/rapier';
import * as THREE from 'three';

const PhysicsSkillNode = React.forwardRef(({ skill, position, onHover, isMobile }, ref) => {
  const [hovered, setHovered] = useState(false);
  const rigidBodyRef = useRef();

  useFrame((state) => {
    if (rigidBodyRef.current && !isMobile) {
      // Apply a subtle gravitational pull towards the center [0, 0, 0]
      const pos = rigidBodyRef.current.translation();
      const distance = Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2);
      
      // Pull strength decreases if they get too close to center
      const pullStrength = distance > 2 ? 0.5 : 0.1;
      
      rigidBodyRef.current.applyImpulse({
        x: -pos.x * pullStrength * 0.01,
        y: -pos.y * pullStrength * 0.01,
        z: -pos.z * pullStrength * 0.01
      }, true);
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    onHover(skill);
    // Add a little pop impulse when hovered
    if (rigidBodyRef.current && !isMobile) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(null);
  };

  // If mobile, we disable heavy physics simulation and just render static floating meshes
  if (isMobile) {
    return (
      <group position={position} ref={ref}>
        <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color={hovered ? "#06b6d4" : skill.color}
            emissive={hovered ? "#06b6d4" : "#1e293b"}
            emissiveIntensity={hovered ? 0.8 : 0.2}
          />
        </mesh>
      </group>
    );
  }

  return (
    <RigidBody
      ref={(node) => {
        rigidBodyRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      position={position}
      colliders={false}
      linearDamping={1}
      angularDamping={1}
      restitution={0.8}
      friction={0.2}
    >
      <BallCollider args={[hovered ? 0.4 : 0.3]} />
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[hovered ? 0.35 : 0.25, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? "#06b6d4" : skill.color || "#38bdf8"}
          emissive={hovered ? "#06b6d4" : "#1e293b"}
          emissiveIntensity={hovered ? 0.8 : 0.2}
          roughness={0.2}
        />
      </mesh>

      {/* HTML Tag label in 3D space */}
      <Html distanceFactor={12} zIndexRange={[100, 0]}>
        <div
          className={`pointer-events-none px-2.5 py-1 rounded-md text-xs font-mono font-bold tracking-wide whitespace-nowrap transition-all duration-300 ${
            hovered
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/50 scale-125 z-50'
              : 'bg-slate-900/90 text-slate-200 border border-slate-700/60 backdrop-blur-sm'
          }`}
        >
          {skill.name}
        </div>
      </Html>
    </RigidBody>
  );
});

const SphereContent = React.forwardRef(({ skills, onHoverSkill, isMobile }, externalRef) => {
  const groupRef = useRef();

  // Distribute skills evenly on a sphere using Fibonacci sphere algorithm
  const nodes = useMemo(() => {
    const radius = 3.5;
    const count = skills.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    return skills.map((skill, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      const posY = y * radius;

      return {
        skill,
        position: [x, posY, z]
      };
    });
  }, [skills]);

  useFrame((state, delta) => {
    if (groupRef.current && isMobile) {
      // On mobile without physics, manually rotate the group
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Collision Core */}
      {!isMobile ? (
        <RigidBody type="fixed" colliders="ball">
          <mesh>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial color="#0f172a" wireframe emissive="#3b82f6" emissiveIntensity={0.2} />
          </mesh>
        </RigidBody>
      ) : (
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#0f172a" wireframe emissive="#3b82f6" emissiveIntensity={0.2} />
        </mesh>
      )}

      {/* Orbit Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
      </mesh>

      {/* 3D Nodes */}
      {nodes.map(({ skill, position }) => (
        <PhysicsSkillNode
          key={skill.name}
          skill={skill}
          position={position}
          onHover={onHoverSkill}
          isMobile={isMobile}
        />
      ))}
    </group>
  );
});

export default function SkillSphere({ skills, onSelectSkill }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleResize = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleHover = (skill) => {
    setHoveredSkill(skill);
    if (onSelectSkill) onSelectSkill(skill);
  };

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 50 }}
        dpr={[1, isMobile ? 1 : 1.5]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        
        {isMobile ? (
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <SphereContent skills={skills} onHoverSkill={handleHover} isMobile={isMobile} />
          </Float>
        ) : (
          <Physics gravity={[0, 0, 0]}>
            <SphereContent skills={skills} onHoverSkill={handleHover} isMobile={isMobile} />
          </Physics>
        )}
      </Canvas>

      {/* Hover Info Overlay */}
      {hoveredSkill && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel px-5 py-2.5 rounded-full border border-cyan-500/40 text-center animate-fadeIn">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            {hoveredSkill.category} • Proficiency {hoveredSkill.level}%
          </span>
        </div>
      )}
    </div>
  );
}
