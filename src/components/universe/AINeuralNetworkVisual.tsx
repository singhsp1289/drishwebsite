import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  opacity?: number;
  position?: [number, number, number];
}

export function AINeuralNetworkVisual({ opacity = 1, position = [2.0, 0, 0] }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const packetGroupRef = useRef<THREE.Group>(null);

  // Define neural node constellation with cinematic palette: electric cyan, warm gold/amber, violet/purple, starlight white
  const nodes = useMemo(() => [
    { pos: new THREE.Vector3(0, 0, 0), size: 0.32, color: '#22D3EE', isCore: true },
    { pos: new THREE.Vector3(-1.6, 0.4, 0.2), size: 0.16, color: '#38BDF8' },
    { pos: new THREE.Vector3(-0.9, 1.3, -0.3), size: 0.14, color: '#A78BFA' }, // Subtle violet
    { pos: new THREE.Vector3(1.4, 1.2, 0.1), size: 0.17, color: '#FBBF24' },  // Warm amber gold
    { pos: new THREE.Vector3(1.9, -0.8, -0.2), size: 0.16, color: '#22D3EE' }, // Electric cyan
    { pos: new THREE.Vector3(-0.7, -1.3, 0.3), size: 0.15, color: '#F59E0B' }, // Warm gold
    { pos: new THREE.Vector3(-1.8, -1.0, -0.1), size: 0.13, color: '#818CF8' }, // Indigo violet
    { pos: new THREE.Vector3(0.9, 1.7, -0.4), size: 0.14, color: '#38BDF8' },
    { pos: new THREE.Vector3(2.2, 1.5, 0.2), size: 0.15, color: '#FBBF24' },  // Gold
    { pos: new THREE.Vector3(1.8, 0.3, -0.3), size: 0.16, color: '#E0E7FF' }, // Diamond white
    { pos: new THREE.Vector3(2.5, -0.4, 0.1), size: 0.14, color: '#A78BFA' }, // Violet
    { pos: new THREE.Vector3(0.1, -1.9, -0.2), size: 0.15, color: '#22D3EE' },
  ], []);

  // Neural network connections / synaptic pathways
  const connections = useMemo(() => [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [1, 6], [2, 7], [3, 7], [3, 8],
    [4, 9], [4, 10], [5, 6], [5, 11], [8, 9],
    [9, 10], [10, 11]
  ], []);

  // Generate connection line geometry
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    connections.forEach(([startIdx, endIdx]) => {
      points.push(nodes[startIdx].pos);
      points.push(nodes[endIdx].pos);
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes, connections]);

  // Data pulse packets traveling along synaptic lines with multi-chromatic glow
  const packets = useMemo(() => {
    const packetPalette = ['#FBBF24', '#22D3EE', '#FFFFFF', '#A78BFA', '#38BDF8'];
    return connections.map(([startIdx, endIdx], i) => ({
      start: nodes[startIdx].pos,
      end: nodes[endIdx].pos,
      speed: 0.45 + (i % 5) * 0.18,
      offset: (i * 0.17) % 1,
      color: packetPalette[i % packetPalette.length],
      size: 0.055
    }));
  }, [nodes, connections]);

  // Hexagon cyber decor particles
  const hexagons = useMemo(() => {
    return [
      { pos: [-1.2, 1.8, -0.5], scale: 0.22, rot: 0.2, color: '#22D3EE' },
      { pos: [2.8, 1.9, -0.6], scale: 0.28, rot: 0.5, color: '#FBBF24' },
      { pos: [-1.1, -1.9, -0.4], scale: 0.24, rot: -0.3, color: '#A78BFA' },
      { pos: [2.7, -1.6, -0.5], scale: 0.26, rot: 0.4, color: '#38BDF8' },
    ] as const;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.12) * 0.08;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.06;
    }

    // Rotating and pulsing concentric radar rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.25;
      const s = 1 + Math.sin(t * 2) * 0.05;
      ring1Ref.current.scale.set(s, s, s);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.18;
      const s = 1 + Math.sin(t * 1.5 + 1) * 0.04;
      ring2Ref.current.scale.set(s, s, s);
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.12;
    }

    // Core pulsing glow
    if (coreRef.current) {
      const coreScale = 1 + Math.sin(t * 3) * 0.08;
      coreRef.current.scale.set(coreScale, coreScale, coreScale);
    }

    // Animate data packet positions
    if (packetGroupRef.current) {
      const children = packetGroupRef.current.children;
      packets.forEach((p, idx) => {
        const mesh = children[idx] as THREE.Mesh | undefined;
        if (mesh) {
          const progress = ((t * p.speed + p.offset) % 1);
          mesh.position.lerpVectors(p.start, p.end, progress);
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[1, 1, 1]}>
      {/* Central Radiant Glow Core (Diamond White + Electric Cyan Corona) */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.92 * opacity} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.98 * opacity} />
      </mesh>

      {/* Outer Luminous Atmospheric Halo */}
      <mesh position={[0, 0, -0.05]}>
        <ringGeometry args={[0.35, 0.48, 36]} />
        <meshBasicMaterial color="#FBBF24" transparent opacity={0.65 * opacity} side={THREE.DoubleSide} />
      </mesh>

      {/* Concentric Radar / Sonar Energy Rings — Cyan, Violet, Warm Gold */}
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <ringGeometry args={[0.55, 0.58, 48]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.85 * opacity} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, 0]}>
        <ringGeometry args={[0.85, 0.88, 48]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.7 * opacity} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={ring3Ref} position={[0, 0, 0]}>
        <ringGeometry args={[1.2, 1.22, 64]} />
        <meshBasicMaterial color="#FBBF24" transparent opacity={0.55 * opacity} side={THREE.DoubleSide} />
      </mesh>

      {/* Synaptic Connection Lines — Bright Cyan & Electric Blue */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#38BDF8" transparent opacity={0.75 * opacity} />
      </lineSegments>

      {/* Constellation Nodes */}
      {nodes.map((n, i) => (
        <group key={i} position={n.pos}>
          <mesh>
            <sphereGeometry args={[n.size, 16, 16]} />
            <meshBasicMaterial color={n.color} transparent opacity={0.95 * opacity} />
          </mesh>
          <mesh>
            <ringGeometry args={[n.size * 1.25, n.size * 1.45, 24]} />
            <meshBasicMaterial color={n.color} transparent opacity={0.75 * opacity} side={THREE.DoubleSide} />
          </mesh>
          {/* Glowing Center Point */}
          <mesh position={[0, 0, 0.02]}>
            <circleGeometry args={[n.size * 0.45, 16]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9 * opacity} />
          </mesh>
        </group>
      ))}

      {/* Flowing Synaptic Data Packets */}
      <group ref={packetGroupRef}>
        {packets.map((p, idx) => (
          <mesh key={idx}>
            <sphereGeometry args={[p.size, 12, 12]} />
            <meshBasicMaterial color={p.color} transparent opacity={0.98 * opacity} />
          </mesh>
        ))}
      </group>

      {/* Background Cyber Hexagons */}
      {hexagons.map((hex, idx) => (
        <mesh key={idx} position={hex.pos as [number, number, number]} rotation={[0, 0, hex.rot]}>
          <ringGeometry args={[hex.scale * 0.8, hex.scale, 6]} />
          <meshBasicMaterial color={hex.color} transparent opacity={0.45 * opacity} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Subtle Perspective Cyber Ray Lines */}
      <group position={[0, -2.2, -0.5]}>
        {[-0.6, -0.3, 0, 0.3, 0.6].map((angle, i) => (
          <lineSegments key={i} rotation={[0, 0, angle]}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attach="attributes-position"
                count={2}
                args={[new Float32Array([0, 0, 0, 0, 1.8, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={i % 2 === 0 ? '#38BDF8' : '#FBBF24'} transparent opacity={0.35 * opacity} />
          </lineSegments>
        ))}
      </group>
    </group>
  );
}
