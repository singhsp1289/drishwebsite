import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  opacity?: number;
  position?: [number, number, number];
}

export function DevOpsPipelineVisual({ opacity = 1, position = [2.0, 0, 0] }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);
  const packetsRef = useRef<THREE.Group>(null);

  // Generate 3D Infinity (Lemniscate of Bernoulli) curve
  const { curvePoints, curveGeometry } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 120;
    const a = 1.6;

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const sinT = Math.sin(t);
      const cosT = Math.cos(t);
      const denom = 1 + sinT * sinT;

      const x = (a * cosT) / denom;
      const y = (a * sinT * cosT) / denom * 1.3;
      const z = Math.sin(t * 2) * 0.25;

      points.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return { curvePoints: points, curveGeometry: geometry };
  }, []);

  // Moving CI/CD pipeline packets with cinematic palette
  const packets = useMemo(() => {
    const packetColors = ['#22D3EE', '#FBBF24', '#FFFFFF', '#A78BFA', '#38BDF8', '#F59E0B', '#38BDF8', '#FFFFFF'];
    return Array.from({ length: 8 }, (_, i) => ({
      speed: 0.35,
      offset: i / 8,
      color: packetColors[i % packetColors.length],
      size: 0.065
    }));
  }, []);

  // Floating Microservice Container Cubes
  const containers = useMemo(() => [
    { pos: [-1.4, 1.1, 0.3], scale: 0.28, color: '#22D3EE', rotSpeed: 0.6 },
    { pos: [1.5, 1.0, -0.2], scale: 0.25, color: '#FBBF24', rotSpeed: -0.5 },
    { pos: [-1.3, -1.0, -0.2], scale: 0.24, color: '#A78BFA', rotSpeed: 0.4 },
    { pos: [1.4, -1.1, 0.3], scale: 0.26, color: '#38BDF8', rotSpeed: -0.6 },
  ], []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.05;
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.15) * 0.08;
    }

    // Rotating gears
    if (gear1Ref.current) {
      gear1Ref.current.rotation.z = t * 0.4;
    }
    if (gear2Ref.current) {
      gear2Ref.current.rotation.z = -t * 0.4;
    }

    // Animate infinity loop packets
    if (packetsRef.current) {
      const children = packetsRef.current.children;
      const numPts = curvePoints.length - 1;

      packets.forEach((p, idx) => {
        const mesh = children[idx] as THREE.Mesh | undefined;
        if (mesh) {
          const progress = ((t * p.speed + p.offset) % 1);
          const exactIdx = progress * numPts;
          const lowIdx = Math.floor(exactIdx);
          const highIdx = (lowIdx + 1) % numPts;
          const alpha = exactIdx - lowIdx;

          const p1 = curvePoints[lowIdx];
          const p2 = curvePoints[highIdx];
          if (p1 && p2) {
            mesh.position.lerpVectors(p1, p2, alpha);
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* ================= 1. 3D INFINITY CI/CD PIPELINE LOOP ================= */}
      {/* Main Glowing Pathway */}
      <lineLoop geometry={curveGeometry}>
        <lineBasicMaterial color="#22D3EE" transparent opacity={0.98 * opacity} linewidth={2} />
      </lineLoop>

      {/* Secondary Accent Ribbon Layer */}
      <lineLoop geometry={curveGeometry} scale={[0.96, 0.96, 0.96]}>
        <lineBasicMaterial color="#FBBF24" transparent opacity={0.65 * opacity} />
      </lineLoop>

      {/* Outer Ethereal Halo */}
      <lineLoop geometry={curveGeometry} scale={[1.04, 1.04, 1.04]}>
        <lineBasicMaterial color="#A78BFA" transparent opacity={0.35 * opacity} />
      </lineLoop>

      {/* Circulating CI/CD Release Packets */}
      <group ref={packetsRef}>
        {packets.map((p, idx) => (
          <mesh key={idx}>
            <sphereGeometry args={[p.size, 12, 12]} />
            <meshBasicMaterial color={p.color} transparent opacity={0.98 * opacity} />
          </mesh>
        ))}
      </group>

      {/* ================= 2. CENTRAL AUTOMATION GEAR HUBS ================= */}
      {/* Left Gear Hub (Build/Integration - Electric Cyan) */}
      <group ref={gear1Ref} position={[-0.8, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.06, 12]} />
          <meshBasicMaterial color="#0A1828" transparent opacity={0.92 * opacity} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.CylinderGeometry(0.3, 0.3, 0.06, 12)]} />
          <lineBasicMaterial color="#22D3EE" transparent opacity={0.98 * opacity} />
        </lineSegments>
        <mesh position={[0, 0, 0.04]}>
          <ringGeometry args={[0.12, 0.16, 24]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.85 * opacity} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <circleGeometry args={[0.06, 16]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.95 * opacity} />
        </mesh>
      </group>

      {/* Right Gear Hub (Deploy/Delivery - Warm Amber Gold) */}
      <group ref={gear2Ref} position={[0.8, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.06, 12]} />
          <meshBasicMaterial color="#0A1828" transparent opacity={0.92 * opacity} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.CylinderGeometry(0.3, 0.3, 0.06, 12)]} />
          <lineBasicMaterial color="#FBBF24" transparent opacity={0.98 * opacity} />
        </lineSegments>
        <mesh position={[0, 0, 0.04]}>
          <ringGeometry args={[0.12, 0.16, 24]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.85 * opacity} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <circleGeometry args={[0.06, 16]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.95 * opacity} />
        </mesh>
      </group>

      {/* ================= 3. FLOATING MICROSERVICE CONTAINER CUBES ================= */}
      {containers.map((c, idx) => (
        <group key={idx} position={c.pos as [number, number, number]}>
          <mesh>
            <boxGeometry args={[c.scale, c.scale, c.scale]} />
            <meshBasicMaterial color="#0A1828" transparent opacity={0.92 * opacity} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(c.scale, c.scale, c.scale)]} />
            <lineBasicMaterial color={c.color} transparent opacity={0.98 * opacity} />
          </lineSegments>
          {/* Inner core */}
          <mesh>
            <sphereGeometry args={[c.scale * 0.28, 12, 12]} />
            <meshBasicMaterial color={c.color} transparent opacity={0.98 * opacity} />
          </mesh>
          <mesh>
            <sphereGeometry args={[c.scale * 0.14, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.95 * opacity} />
          </mesh>
        </group>
      ))}

      {/* Orbiting Telemetry Rings */}
      <mesh position={[0, 0, -0.4]}>
        <ringGeometry args={[1.8, 1.83, 64]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.35 * opacity} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
