import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text, TrackballControls } from '@react-three/drei';
import { generate } from 'random-words';
import React from 'react'; // Importe React

interface WordProps {
  children: React.ReactNode;
  [key: string]: any; // Permite outras props
}

function Word({ children, ...props }: WordProps) {
  const color = new THREE.Color();
  const fontProps = {fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
  const ref = useRef<THREE.Mesh>(null); // Ref pode ser um Mesh
  const [hovered, setHovered] = useState(false);
  const over = (e: React.PointerEvent) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  // Change the mouse cursor on hover¨
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { // Retorna uma função de limpeza
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    if (ref.current && ref.current.material && ref.current.material instanceof THREE.MeshStandardMaterial) {
      ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1);
    }
  });
  return (
    <Billboard {...props}>
      <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...fontProps} children={children} />
    </Billboard>
  );
}

function Cloud({ count = 4, radius = 20 }) {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++) temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), generate()]);
    return temp;
  }, [count, radius]);
  return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />);
}

export default function App() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={['#202025', 0, 80]} />
      <Suspense fallback={null}>
        <group rotation={[10, 10.5, 10]}>
          <Cloud count={8} radius={20} />
        </group>
      </Suspense>
      <TrackballControls />
    </Canvas>
  );
}