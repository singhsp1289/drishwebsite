import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CosmicParticlesProps {
  count?: number;
}

export function CosmicParticles({ count = 220 }: CosmicParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#FFFFFF'), // Pure starlight
      new THREE.Color('#F1F5F9'), // Silver starlight
      new THREE.Color('#FEF3C7'), // Soft pale gold
      new THREE.Color('#FDBA74'), // Subtle warm amber speck
      new THREE.Color('#E2E8F0'), // Cosmic dust gray-white
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      vel[i * 3] = (Math.random() - 0.5) * 0.03;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.03 + 0.015;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      const chosen = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return { positions: pos, colors: col, velocities: vel };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3] * delta * 3;
      posArray[i * 3 + 1] += velocities[i * 3 + 1] * delta * 3;
      posArray[i * 3 + 2] += velocities[i * 3 + 2] * delta * 3;

      // Wrap around bounds
      if (posArray[i * 3 + 1] > 7) posArray[i * 3 + 1] = -7;
      if (posArray[i * 3 + 1] < -7) posArray[i * 3 + 1] = 7;
      if (posArray[i * 3] > 9) posArray[i * 3] = -9;
      if (posArray[i * 3] < -9) posArray[i * 3] = 9;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.11}
        vertexColors
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
