import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, PerspectiveCamera, Center } from '@react-three/drei';
import * as THREE from 'three';
import orchrdLogo from '../../Orchrd_logo_no_bg.png';

function FloatingLogo({ position, scale = 1, speed = 1, opacity = 1 }) {
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, orchrdLogo);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.5 * speed) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(t * 1.2 * speed) * 0.2;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={texture} transparent={true} opacity={opacity} />
      </mesh>
    </Float>
  );
}

function Shape({ position, color, speed, opacity, args, type: Type }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2 * speed;
      meshRef.current.rotation.y = t * 0.3 * speed;
      meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <Type args={args} />
        <meshStandardMaterial color={color} transparent opacity={opacity} metalness={0.1} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function ThreeBackground() {
  const shapes = useMemo(() => [
    { type: 'sphereGeometry', args: [1, 32, 32], position: [-10, 5, -10], color: '#BA1A1A', speed: 0.5, opacity: 0.1 },
    { type: 'boxGeometry', args: [1.5, 1.5, 1.5], position: [12, 3, -8], color: '#005FAF', speed: 0.7, opacity: 0.1 },
    { type: 'torusGeometry', args: [2, 0.5, 16, 100], position: [-8, -6, -5], color: '#006A6A', speed: 0.4, opacity: 0.1 },
    { type: 'sphereGeometry', args: [0.8, 32, 32], position: [7, -7, -6], color: '#8B5000', speed: 0.6, opacity: 0.15 },
    { type: 'boxGeometry', args: [1, 1, 1], position: [-15, 0, -12], color: '#775652', speed: 0.3, opacity: 0.1 },
    { type: 'sphereGeometry', args: [2, 32, 32], position: [15, 8, -15], color: '#000000', speed: 0.2, opacity: 0.05 },
  ], []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, 10]} intensity={0.5} />
          
          <Center>
            <FloatingLogo position={[0, 0, 0]} scale={1.5} speed={1} opacity={0.6} />
          </Center>
          
          {shapes.map((shape, i) => (
            <Shape key={i} {...shape} />
          ))}
          
          {/* Subtle background logos */}
          <FloatingLogo position={[-12, 6, -8]} scale={0.7} speed={0.8} opacity={0.08} />
          <FloatingLogo position={[13, -8, -10]} scale={0.8} speed={0.6} opacity={0.08} />
        </Suspense>
      </Canvas>
    </div>
  );
}
