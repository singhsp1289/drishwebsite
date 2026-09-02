import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  opacity?: number;
  position?: [number, number, number];
}

export function IoTDeviceMeshVisual({ opacity = 1, position = [2.0, 0, 0] }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const chipRef = useRef<THREE.Group>(null);
  const wave1Ref = useRef<THREE.Mesh>(null);
  const wave2Ref = useRef<THREE.Mesh>(null);
  const wave3Ref = useRef<THREE.Mesh>(null);
  const busPacketsRef = useRef<THREE.Group>(null);

  // Satellite IoT edge device nodes
  const edgeNodes = useMemo(() => [
    { pos: new THREE.Vector3(-1.8, 1.1, 0.2), type: 'sensor', label: 'TEMP/HUM' },
    { pos: new THREE.Vector3(1.7, 1.3, -0.2), type: 'actuator', label: 'MOTOR' },
    { pos: new THREE.Vector3(2.1, -0.6, 0.1), type: 'telemetry', label: 'CAN-BUS' },
    { pos: new THREE.Vector3(-1.5, -1.2, -0.3), type: 'camera', label: 'OPTICAL' },
    { pos: new THREE.Vector3(0.2, -1.8, 0.2), type: 'rfid', label: 'BLE/ZIGBEE' },
    { pos: new THREE.Vector3(-0.3, 1.9, -0.2), type: 'gateway', label: 'EDGE-GW' },
  ], []);

  // Bus lines connecting central chip to edge nodes
  const busLines = useMemo(() => {
    return edgeNodes.map(node => {
      // Orthogonal PCB trace path (from 0,0,0 -> bend -> node.pos)
      const mid = new THREE.Vector3(node.pos.x * 0.5, node.pos.y * 0.2, node.pos.z * 0.5);
      const points = [new THREE.Vector3(0, 0, 0), mid, node.pos];
      return {
        geometry: new THREE.BufferGeometry().setFromPoints(points),
        start: new THREE.Vector3(0, 0, 0),
        mid,
        end: node.pos,
        speed: 0.8 + Math.random() * 0.4
      };
    });
  }, [edgeNodes]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.05;
      groupRef.current.rotation.y = 0.25 + Math.sin(t * 0.2) * 0.1;
      groupRef.current.rotation.x = 0.2 + Math.cos(t * 0.15) * 0.05;
    }

    if (chipRef.current) {
      chipRef.current.rotation.z = Math.sin(t * 0.3) * 0.02;
    }

    // Expanding RF / Wireless transmission waves
    if (wave1Ref.current) {
      const s1 = 1 + (t * 0.8 % 1.5);
      wave1Ref.current.scale.set(s1, s1, s1);
      (wave1Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.8 - (s1 - 1) * 0.5) * opacity;
    }
    if (wave2Ref.current) {
      const s2 = 1 + ((t * 0.8 + 0.5) % 1.5);
      wave2Ref.current.scale.set(s2, s2, s2);
      (wave2Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.8 - (s2 - 1) * 0.5) * opacity;
    }
    if (wave3Ref.current) {
      const s3 = 1 + ((t * 0.8 + 1.0) % 1.5);
      wave3Ref.current.scale.set(s3, s3, s3);
      (wave3Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.8 - (s3 - 1) * 0.5) * opacity;
    }

    // Animate bus data pulses
    if (busPacketsRef.current) {
      const children = busPacketsRef.current.children;
      busLines.forEach((bus, idx) => {
        const mesh = children[idx] as THREE.Mesh | undefined;
        if (mesh) {
          const prog = (t * bus.speed + idx * 0.2) % 1;
          if (prog < 0.5) {
            mesh.position.lerpVectors(bus.start, bus.mid, prog * 2);
          } else {
            mesh.position.lerpVectors(bus.mid, bus.end, (prog - 0.5) * 2);
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* ================= 1. CENTRAL MICROPROCESSOR / MCU CORE ================= */}
      <group ref={chipRef} position={[0, 0, 0]}>
        {/* Silicon Wafer / Package Base */}
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.12]} />
          <meshBasicMaterial color="#0A1828" transparent opacity={0.95 * opacity} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.9, 0.9, 0.12)]} />
          <lineBasicMaterial color="#22D3EE" transparent opacity={0.98 * opacity} />
        </lineSegments>

        {/* Central Silicon Die / Radiant Core */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[0.5, 0.5, 0.04]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.95 * opacity} />
        </mesh>
        <lineSegments position={[0, 0, 0.08]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.5, 0.04)]} />
          <lineBasicMaterial color="#FFFFFF" transparent opacity={0.98 * opacity} />
        </lineSegments>
        {/* Glowing Center Processor Flare */}
        <mesh position={[0, 0, 0.11]}>
          <circleGeometry args={[0.14, 16]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.95 * opacity} />
        </mesh>

        {/* MCU Pins (North, South, East, West) with High-Luminosity Gold & Cyan */}
        {[-0.35, -0.15, 0.15, 0.35].map((pos, idx) => (
          <group key={idx}>
            {/* Top Pins */}
            <mesh position={[pos, 0.52, 0]}>
              <boxGeometry args={[0.08, 0.14, 0.04]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#FBBF24' : '#22D3EE'} transparent opacity={0.98 * opacity} />
            </mesh>
            {/* Bottom Pins */}
            <mesh position={[pos, -0.52, 0]}>
              <boxGeometry args={[0.08, 0.14, 0.04]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#22D3EE' : '#FBBF24'} transparent opacity={0.98 * opacity} />
            </mesh>
            {/* Left Pins */}
            <mesh position={[-0.52, pos, 0]}>
              <boxGeometry args={[0.14, 0.08, 0.04]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#38BDF8' : '#A78BFA'} transparent opacity={0.98 * opacity} />
            </mesh>
            {/* Right Pins */}
            <mesh position={[0.52, pos, 0]}>
              <boxGeometry args={[0.14, 0.08, 0.04]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#A78BFA' : '#38BDF8'} transparent opacity={0.98 * opacity} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= 2. RADIATING RF SIGNAL WAVE RINGS ================= */}
      <mesh ref={wave1Ref} position={[0, 0, 0.05]}>
        <ringGeometry args={[0.6, 0.64, 48]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.85 * opacity} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={wave2Ref} position={[0, 0, 0.05]}>
        <ringGeometry args={[0.85, 0.89, 48]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.7 * opacity} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={wave3Ref} position={[0, 0, 0.05]}>
        <ringGeometry args={[1.15, 1.19, 64]} />
        <meshBasicMaterial color="#FBBF24" transparent opacity={0.55 * opacity} side={THREE.DoubleSide} />
      </mesh>

      {/* ================= 3. PCB BUS TRACES ================= */}
      {busLines.map((bus, idx) => (
        <lineSegments key={idx} geometry={bus.geometry}>
          <lineBasicMaterial color={idx % 2 === 0 ? '#38BDF8' : '#FBBF24'} transparent opacity={0.8 * opacity} />
        </lineSegments>
      ))}

      {/* Animated Bus Data Packets */}
      <group ref={busPacketsRef}>
        {busLines.map((bus, idx) => (
          <mesh key={idx}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color={idx % 3 === 0 ? '#FBBF24' : idx % 3 === 1 ? '#22D3EE' : '#FFFFFF'} transparent opacity={0.98 * opacity} />
          </mesh>
        ))}
      </group>

      {/* ================= 4. SATELLITE IOT EDGE NODES ================= */}
      {edgeNodes.map((node, idx) => (
        <group key={idx} position={node.pos}>
          {/* Node Hub Core */}
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
            <meshBasicMaterial color="#0A1828" transparent opacity={0.95 * opacity} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.CylinderGeometry(0.15, 0.15, 0.08, 16)]} />
            <lineBasicMaterial color={idx % 3 === 0 ? '#FBBF24' : idx % 3 === 1 ? '#22D3EE' : '#A78BFA'} transparent opacity={0.98 * opacity} />
          </lineSegments>

          {/* Node Indicator LED */}
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#FBBF24' : '#22D3EE'} transparent opacity={0.98 * opacity} />
          </mesh>

          {/* White LED Core Highlight */}
          <mesh position={[0, 0, 0.08]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.95 * opacity} />
          </mesh>

          {/* Halo Ring */}
          <mesh position={[0, 0, 0.02]}>
            <ringGeometry args={[0.2, 0.23, 24]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#22D3EE' : '#FBBF24'} transparent opacity={0.6 * opacity} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
