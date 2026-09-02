import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
}

export function StarField({ count = 1400 }: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    // Natural night sky star palette: pure white, diamond silver, soft pale gold, faint warm cream
    const palette = [
      new THREE.Color('#FFFFFF'), // Pure diamond white
      new THREE.Color('#F8FAFC'), // Crisp celestial white
      new THREE.Color('#FEF3C7'), // Soft pale gold
      new THREE.Color('#FFFBEB'), // Warm starlight cream
      new THREE.Color('#E2E8F0'), // Soft silver starlight
    ];

    for (let i = 0; i < count; i++) {
      // Natural spatial distribution in the deep background hemisphere
      const r = 10 + Math.random() * 32;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - 1.5;

      const chosen = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;

      // Realistic variation: mostly fine tiny distant stars, with a few slightly brighter anchor stars
      const isBright = Math.random() < 0.08;
      sz[i] = isBright ? 0.09 + Math.random() * 0.05 : 0.04 + Math.random() * 0.03;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  useFrame(({ clock }, delta) => {
    if (pointsRef.current) {
      // Very slow natural celestial drift
      pointsRef.current.rotation.y += delta * 0.006;
      pointsRef.current.rotation.x += delta * 0.002;

      // Subtle atmospheric twinkling
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.78 + Math.sin(clock.getElapsedTime() * 1.5) * 0.08;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.82}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
