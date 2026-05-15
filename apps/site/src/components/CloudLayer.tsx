"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

function useFadeIn(duration = 1.5) {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = (ts - start) / 1000;
      setOpacity(Math.min(elapsed / duration, 1) * 0.6);
      if (elapsed < duration) raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [duration]);
  return opacity;
}

function MovingClouds({ fadeOpacity }: { fadeOpacity: number }) {
  const cloudRefs = useRef<THREE.Mesh[]>([]);
  const cloudTexture = useMemo(() => new TextureLoader().load("/images/cloud10.png"), []);
  const initialPositions = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 100 - 50,
        y: Math.random() * 20 - 40,
        z: -100 + i * 10,
        scale: Math.random() * 3 + 1,
      })),
    []
  );
  const [, forceUpdate] = useState(0);
  const positionsRef = useRef(initialPositions);

  useFrame((_, delta) => {
    let changed = false;
    positionsRef.current.forEach((cloud, i) => {
      cloud.z += delta * 1.5;
      if (cloud.z > 50) {
        cloud.z = -50;
        cloud.x = Math.random() * 100 - 50;
        cloud.y = Math.random() * 20 - 40;
        changed = true;
      }
      const mesh = cloudRefs.current[i];
      if (mesh) mesh.position.set(cloud.x, cloud.y, cloud.z);
    });
    if (changed) forceUpdate((v) => v + 1);
  });

  return (
    <>
      {positionsRef.current.map((cloud, i) => (
        <mesh
          key={i}
          ref={(el) => { cloudRefs.current[i] = el!; }}
          position={[cloud.x, cloud.y, cloud.z]}
          scale={[cloud.scale, cloud.scale, 1]}
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent={true}
            opacity={fadeOpacity}
            color="#ffffff"
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

export default function CloudLayer({ active }: { active: boolean }) {
  const fadeOpacity = useFadeIn(1.5);
  if (!active) return null;
  return (
    <Canvas
      className="absolute inset-0 z-10 pointer-events-none"
      camera={{ position: [0, 0, 15], fov: 75 }}
      style={{
        backgroundColor: "#F8F8F8",
        backgroundImage: "url('/images/site-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <fog attach="fog" args={["#ffffff", 10, 150]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={25} />
      <MovingClouds fadeOpacity={fadeOpacity} />
    </Canvas>
  );
}
