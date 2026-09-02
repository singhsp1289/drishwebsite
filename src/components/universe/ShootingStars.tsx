import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Meteor {
  active: boolean;
  start: THREE.Vector3;
  dir: THREE.Vector3;
  progress: number;
  speed: number;
  length: number;
  color: THREE.Color;
}

export function ShootingStars() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const colors = useMemo(() => [
    new THREE.Color('#FFFFFF'), // Starlight diamond white
    new THREE.Color('#38BDF8'), // Electric cyan
    new THREE.Color('#FBBF24'), // Warm amber gold
  ], []);

  const meteors = useRef<Meteor[]>([
    {
      active: false,
      start: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      progress: 0,
      speed: 3.5,
      length: 1.8,
      color: colors[0],
    },
    {
      active: false,
      start: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      progress: 0,
      speed: 4.2,
      length: 2.2,
      color: colors[1],
    },
  ]);

  const lastSpawnTime = useRef(0);

  const { positions, vertexColors } = useMemo(() => {
    const pos = new Float32Array(2 * 2 * 3); // 2 meteors, 2 vertices each
    const col = new Float32Array(2 * 2 * 3);
    return { positions: pos, vertexColors: col };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(vertexColors, 3));
    return geo;
  }, [positions, vertexColors]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Spawn meteor periodically every 4-7 seconds
    if (time - lastSpawnTime.current > 4.5 + Math.random() * 3) {
      lastSpawnTime.current = time;
      const inactive = meteors.current.find((m) => !m.active);
      if (inactive) {
        inactive.active = true;
        inactive.progress = 0;
        inactive.speed = 4 + Math.random() * 3;
        inactive.length = 1.6 + Math.random() * 1.2;
        inactive.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Spawn from upper right quadrant across to lower left
        inactive.start.set(
          2 + Math.random() * 6,
          2 + Math.random() * 4,
          -4 - Math.random() * 4
        );
        inactive.dir.set(-1.2, -0.7, 0.4).normalize();
      }
    }

    if (!lineRef.current) return;
    const posAttr = lineRef.current.geometry.attributes.position;
    const colAttr = lineRef.current.geometry.attributes.color;
    const posArray = posAttr.array as Float32Array;
    const colArray = colAttr.array as Float32Array;

    meteors.current.forEach((meteor, idx) => {
      const i = idx * 6; // 2 vertices * 3 coords
      if (meteor.active) {
        meteor.progress += delta * meteor.speed;

        const headX = meteor.start.x + meteor.dir.x * meteor.progress;
        const headY = meteor.start.y + meteor.dir.y * meteor.progress;
        const headZ = meteor.start.z + meteor.dir.z * meteor.progress;

        const tailProgress = Math.max(0, meteor.progress - meteor.length);
        const tailX = meteor.start.x + meteor.dir.x * tailProgress;
        const tailY = meteor.start.y + meteor.dir.y * tailProgress;
        const tailZ = meteor.start.z + meteor.dir.z * tailProgress;

        posArray[i] = headX;
        posArray[i + 1] = headY;
        posArray[i + 2] = headZ;

        posArray[i + 3] = tailX;
        posArray[i + 4] = tailY;
        posArray[i + 5] = tailZ;

        // Head bright, tail fading
        colArray[i] = meteor.color.r * 1.5;
        colArray[i + 1] = meteor.color.g * 1.5;
        colArray[i + 2] = meteor.color.b * 1.5;

        colArray[i + 3] = meteor.color.r * 0.1;
        colArray[i + 4] = meteor.color.g * 0.1;
        colArray[i + 5] = meteor.color.b * 0.1;

        if (meteor.progress > 14) {
          meteor.active = false;
        }
      } else {
        // Hidden off-screen
        posArray[i] = 0;
        posArray[i + 1] = 0;
        posArray[i + 2] = -999;
        posArray[i + 3] = 0;
        posArray[i + 4] = 0;
        posArray[i + 5] = -999;
      }
    });

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}
