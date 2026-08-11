import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

// Procedural noise function
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st.x *= uResolution.x / uResolution.y;

  // Basic time-based animated gradient
  vec3 color1 = vec3(0.01, 0.03, 0.08); // deep dark blue space
  vec3 color2 = vec3(0.04, 0.12, 0.25); // subtle cyan-blue glow
  vec3 color3 = vec3(0.06, 0.02, 0.12); // subtle purple glow
  
  float dist = distance(st, uMouse * 0.5 + 0.5);
  
  // Mix colors based on UV, Time and Mouse Distance
  vec3 mixColor = mix(color1, color2, sin(uTime * 0.2 + st.y * 2.0) * 0.5 + 0.5);
  mixColor = mix(mixColor, color3, cos(uTime * 0.3 - st.x * 3.0) * 0.5 + 0.5);
  
  // Add interactive glowing aura near mouse
  float glow = smoothstep(0.5, 0.0, dist);
  mixColor += vec3(0.0, 0.2, 0.3) * glow * 0.5;

  // Add subtle static noise to prevent banding
  float n = noise(st * uTime) * 0.03;
  mixColor += n;

  gl_FragColor = vec4(mixColor, 1.0);
}
`;

function ShaderPlane() {
  const meshRef = useRef();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    
    // Smoothly track mouse normalized coordinates (-1 to +1)
    const targetX = (state.pointer.x);
    const targetY = (state.pointer.y);
    
    uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.05;
    uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.05;
    
    // Update resolution in case of resize
    uniforms.uResolution.value.x = window.innerWidth;
    uniforms.uResolution.value.y = window.innerHeight;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        vertexShader={vertexShader} 
        fragmentShader={fragmentShader} 
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* 
        OrthographicCamera creates a 2D flat canvas filling the screen 
        for our post-processing-like background shader.
      */}
      <Canvas 
        orthographic 
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 1.5)]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
