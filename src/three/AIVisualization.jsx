import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const nodes = [
  { id: 'data', label: 'DATA INPUT', pos: [-4, 0, 0], color: '#38bdf8' },
  { id: 'process', label: 'PROCESSING', pos: [-2, 1.5, 0], color: '#06b6d4' },
  { id: 'core', label: 'ENGINE LOGIC', pos: [0, 0, 0], color: '#8b5cf6' },
  { id: 'analytics', label: 'ANALYTICS', pos: [2, 1.5, 0], color: '#a855f7' },
  { id: 'output', label: 'INSIGHTS & UI', pos: [4, 0, 0], color: '#10b981' }
];

function PipelinePacket({ startPos, endPos, speed = 1, delay = 0 }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = ((state.clock.getElapsedTime() * speed + delay) % 2) / 2;
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(startPos[0], endPos[0], t);
      meshRef.current.position.y = THREE.MathUtils.lerp(startPos[1], endPos[1], t);
      meshRef.current.position.z = THREE.MathUtils.lerp(startPos[2], endPos[2], t);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color="#67e8f9" />
    </mesh>
  );
}

function PipelineGraph() {
  const groupRef = useRef();

  // Create connecting line geometry
  const linesGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      points.push(new THREE.Vector3(...nodes[i].pos));
      points.push(new THREE.Vector3(...nodes[i + 1].pos));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing Connection Lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.5} linewidth={2} />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((node) => (
        <group key={node.id} position={node.pos}>
          <mesh>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>
          <Html distanceFactor={10}>
            <div className="pointer-events-none px-2 py-1 rounded bg-slate-950/90 border border-slate-700/80 text-[10px] font-mono font-bold text-cyan-300 tracking-wider whitespace-nowrap -translate-x-1/2 mt-2">
              {node.label}
            </div>
          </Html>
        </group>
      ))}

      {/* Data Packets continuously flowing */}
      {nodes.slice(0, -1).map((node, i) => (
        <React.Fragment key={`packets-${i}`}>
          <PipelinePacket startPos={node.pos} endPos={nodes[i + 1].pos} speed={0.8} delay={0} />
          <PipelinePacket startPos={node.pos} endPos={nodes[i + 1].pos} speed={0.8} delay={1} />
        </React.Fragment>
      ))}
    </group>
  );
}

export default function AIVisualization() {
  return (
    <div className="w-full h-[380px] sm:h-[450px]">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />

        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          <PipelineGraph />
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
