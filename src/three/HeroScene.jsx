import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import { editable as e, SheetProvider, PerspectiveCamera } from '@theatre/r3f';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// Initialize Theatre.js Studio to prevent empty state crashes
studio.initialize().then(() => studio.ui.hide());

// Setup Theatre.js project and sheet
const theatreProject = getProject('HeroCinematic');
const theatreSheet = theatreProject.sheet('Intro Sequence');

const cyberVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
uniform float uTime;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  
  // Subtle liquid distortion based on time and position
  vec3 pos = position;
  float noiseFreq = 2.0;
  float noiseAmp = 0.1;
  vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y * noiseFreq + uTime, pos.z);
  pos.x += sin(noisePos.y) * noiseAmp;
  pos.y += cos(noisePos.z) * noiseAmp;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const cyberFragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  // Glass/Hologram fresnel effect
  float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 3.0);
  
  // Animated plasma color
  vec3 color1 = vec3(0.02, 0.71, 0.83); // cyan
  vec3 color2 = vec3(0.54, 0.36, 0.96); // purple
  
  float mixValue = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
  vec3 baseColor = mix(color1, color2, mixValue);
  
  // Combine base with intense fresnel glow
  vec3 finalColor = baseColor + (fresnel * 1.5);
  
  gl_FragColor = vec4(finalColor, 0.8 * fresnel + 0.2);
}
`;

function CyberMesh({ mouse, isMobile }) {
  const outerMeshRef = useRef();
  const innerMeshRef = useRef();
  const ringRef = useRef();

  const customShaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: cyberVertexShader,
    fragmentShader: cyberFragmentShader,
    uniforms: {
      uTime: { value: 0 }
    },
    transparent: true,
    side: THREE.DoubleSide
  }), []);

  useFrame((state, delta) => {
    customShaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Interactive mouse rotation tracking (reduce on mobile)
    const interactionSpeed = isMobile ? 0.02 : 0.05;
    const targetX = (mouse.current[0] * Math.PI) / 6;
    const targetY = (mouse.current[1] * Math.PI) / 6;

    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.4;
      outerMeshRef.current.rotation.y += delta * 0.5;
      outerMeshRef.current.rotation.x = THREE.MathUtils.lerp(outerMeshRef.current.rotation.x, targetY, interactionSpeed);
      outerMeshRef.current.rotation.y = THREE.MathUtils.lerp(outerMeshRef.current.rotation.y, targetX, interactionSpeed);
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * 0.8;
      innerMeshRef.current.rotation.z += delta * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.2;
      ringRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <e.group theatreKey="CyberMeshGroup" scale={1.2}>
      {/* Outer Wireframe Torus Knot */}
      <mesh ref={outerMeshRef}>
        <torusKnotGeometry args={[1.5, 0.45, 128, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.4}
          emissive="#06b6d4"
          emissiveIntensity={1.5} // High emissive for Postprocessing Bloom
        />
      </mesh>

      {/* Inner Experimental Shader Core */}
      <mesh ref={innerMeshRef} material={customShaderMaterial}>
        <icosahedronGeometry args={[1.1, isMobile ? 1 : 2]} />
      </mesh>

      {/* Futuristic Orbit Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>
    </e.group>
  );
}

function ParticleCloud({ count, isMobile }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
      // Add subtle wave oscillation to particles on desktop
      if (!isMobile) {
        pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.04 : 0.06}
        color="#06b6d4"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  const mouse = useRef([0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile for performance optimization
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleResize = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleResize);
    
    // Play Theatre.js sequence on mount if not mobile
    if (!mediaQuery.matches) {
      theatreProject.ready.then(() => {
        theatreSheet.sequence.play({ iterationCount: 1, range: [0, 2] });
      });
    }
    
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handlePointerMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouse.current = [
      (clientX / innerWidth) * 2 - 1,
      -(clientY / innerHeight) * 2 + 1,
    ];
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="w-full h-full min-h-[400px] lg:min-h-[600px] cursor-grab active:cursor-grabbing relative"
    >
      <Canvas
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }} // Antialias false is better for Postprocessing
      >
        <SheetProvider sheet={theatreSheet}>
          <PerspectiveCamera
            theatreKey="Main Camera"
            makeDefault
            position={[0, 0, isMobile ? 9 : 7]}
            fov={50}
          />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#06b6d4" />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#9333ea" />

          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <CyberMesh mouse={mouse} isMobile={isMobile} />
            <ParticleCloud count={isMobile ? 150 : 400} isMobile={isMobile} />
          </Float>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </SheetProvider>

        {/* Post Processing Effects - Optimized for performance */}
      </Canvas>
    </div>
  );
}
