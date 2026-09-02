import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  opacity?: number;
  position?: [number, number, number];
}

export function CloudInfrastructureVisual({ opacity = 1, position = [1.8, 0, 0] }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Group>(null);
  const dataStreamRef = useRef<THREE.Group>(null);

  // Cloud shape curve
  const cloudPoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      // Parametric organic cloud contour
      let r = 0.75 + Math.sin(theta * 3) * 0.18 + Math.cos(theta * 2) * 0.12;
      if (Math.sin(theta) < -0.3) {
        // Flatten bottom
        r *= 0.65;
      }
      pts.push([Math.cos(theta) * r * 1.3, Math.sin(theta) * r * 0.75 + 0.1, 0]);
    }
    return pts;
  }, []);

  const cloudGeometry = useMemo(() => {
    const v3 = cloudPoints.map(p => new THREE.Vector3(...p));
    return new THREE.BufferGeometry().setFromPoints(v3);
  }, [cloudPoints]);

  // Animated vertical data packets pouring from cloud to servers
  const verticalPackets = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      x: -0.3 + (i % 4) * 0.2,
      z: -0.1 + Math.floor(i / 4) * 0.1,
      speed: 1.2 + (i % 3) * 0.4,
      offset: (i * 0.23) % 1,
      size: 0.035,
      color: i % 2 === 0 ? '#38BDF8' : '#FB923C'
    }));
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.9) * 0.05;
      groupRef.current.rotation.y = 0.35 + Math.sin(t * 0.2) * 0.08;
      groupRef.current.rotation.x = 0.22 + Math.cos(t * 0.15) * 0.04;
    }

    if (cloudRef.current) {
      cloudRef.current.position.y = 1.6 + Math.sin(t * 1.5) * 0.05;
      cloudRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
    }

    if (dataStreamRef.current) {
      const children = dataStreamRef.current.children;
      verticalPackets.forEach((p, idx) => {
        const mesh = children[idx] as THREE.Mesh | undefined;
        if (mesh) {
          const progress = (t * p.speed + p.offset) % 1;
          // Falls from cloud (y=1.5) down to server top (y=0.7)
          mesh.position.y = 1.5 - progress * 0.9;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* ================= 1. HOVERING CYBER CLOUD ================= */}
      <group ref={cloudRef} position={[0, 1.6, 0]}>
        {/* Outer Glowing Cloud Wireframe */}
        <lineLoop geometry={cloudGeometry}>
          <lineBasicMaterial color="#22D3EE" transparent opacity={0.98 * opacity} linewidth={2} />
        </lineLoop>

        {/* Inner Glowing Cloud Accent */}
        <mesh scale={[0.85, 0.85, 0.85]}>
          <sphereGeometry args={[0.5, 24, 16]} />
          <meshBasicMaterial color="#0284C7" transparent opacity={0.35 * opacity} />
        </mesh>
        <mesh position={[0.4, 0.1, 0]} scale={[0.7, 0.7, 0.7]}>
          <sphereGeometry args={[0.4, 24, 16]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.4 * opacity} />
        </mesh>
        <mesh position={[-0.4, 0.05, 0]} scale={[0.65, 0.65, 0.65]}>
          <sphereGeometry args={[0.4, 24, 16]} />
          <meshBasicMaterial color="#A78BFA" transparent opacity={0.35 * opacity} />
        </mesh>

        {/* Cloud data core indicator (Warm Gold) */}
        <mesh position={[0, 0, 0.1]}>
          <ringGeometry args={[0.08, 0.14, 16]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.95 * opacity} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.12]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.98 * opacity} />
        </mesh>
      </group>

      {/* ================= 2. VERTICAL DOWNLINK DATA BEAMS ================= */}
      <group position={[0, 0, 0]}>
        {[-0.3, -0.1, 0.1, 0.3].map((xOffset, idx) => (
          <lineSegments key={idx} position={[xOffset, 1.1, 0]}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attach="attributes-position"
                count={2}
                args={[new Float32Array([0, 0.45, 0, 0, -0.45, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={idx % 2 === 0 ? '#22D3EE' : '#FBBF24'} transparent opacity={0.75 * opacity} />
          </lineSegments>
        ))}
      </group>

      {/* Animated Downlink Data Packets */}
      <group ref={dataStreamRef}>
        {verticalPackets.map((p, idx) => (
          <mesh key={idx} position={[p.x, 1.5, p.z]}>
            <sphereGeometry args={[p.size * 1.3, 12, 12]} />
            <meshBasicMaterial color={idx % 3 === 0 ? '#FBBF24' : idx % 3 === 1 ? '#22D3EE' : '#FFFFFF'} transparent opacity={0.98 * opacity} />
          </mesh>
        ))}
      </group>

      {/* ================= 3. PRIMARY SERVER BLADE TOWER (4 Stacks) ================= */}
      <group position={[-0.1, 0, 0]}>
        {/* Tier 1 (Top blade unit - Gold Cache Unit) */}
        <group position={[0, 0.52, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.26, 0.9]} />
            <meshBasicMaterial color="#0A1828" transparent opacity={0.92 * opacity} />
          </mesh>
          {/* Wireframe border */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.26, 0.9)]} />
            <lineBasicMaterial color="#FBBF24" transparent opacity={0.95 * opacity} />
          </lineSegments>
          {/* LED activity row */}
          {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((lx, li) => (
            <mesh key={li} position={[lx, 0, 0.46]}>
              <boxGeometry args={[0.08, 0.04, 0.01]} />
              <meshBasicMaterial color={li % 2 === 0 ? '#FBBF24' : '#22D3EE'} transparent opacity={0.98 * opacity} />
            </mesh>
          ))}
        </group>

        {/* Tier 2 (Compute Blade Unit) */}
        <group position={[0, 0.22, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.26, 0.9]} />
            <meshBasicMaterial color="#061220" transparent opacity={0.92 * opacity} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.26, 0.9)]} />
            <lineBasicMaterial color="#22D3EE" transparent opacity={0.95 * opacity} />
          </lineSegments>
          {/* Server status bar */}
          <mesh position={[-0.2, 0, 0.46]}>
            <boxGeometry args={[0.8, 0.05, 0.01]} />
            <meshBasicMaterial color="#22D3EE" transparent opacity={0.95 * opacity} />
          </mesh>
          <mesh position={[0.45, 0, 0.46]}>
            <circleGeometry args={[0.045, 16]} />
            <meshBasicMaterial color="#FBBF24" transparent opacity={0.98 * opacity} />
          </mesh>
        </group>

        {/* Tier 3 (Storage Unit - Violet Accent) */}
        <group position={[0, -0.08, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.26, 0.9]} />
            <meshBasicMaterial color="#0A1828" transparent opacity={0.92 * opacity} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.26, 0.9)]} />
            <lineBasicMaterial color="#A78BFA" transparent opacity={0.9 * opacity} />
          </lineSegments>
          {/* LED bar */}
          <mesh position={[-0.4, 0, 0.46]}>
            <boxGeometry args={[0.4, 0.05, 0.01]} />
            <meshBasicMaterial color="#A78BFA" transparent opacity={0.95 * opacity} />
          </mesh>
        </group>

        {/* Tier 4 (Base Networking Module) */}
        <group position={[0, -0.38, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.26, 0.9]} />
            <meshBasicMaterial color="#061220" transparent opacity={0.92 * opacity} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.26, 0.9)]} />
            <lineBasicMaterial color="#38BDF8" transparent opacity={0.95 * opacity} />
          </lineSegments>
          {/* Ventilation grilles */}
          {[-0.5, -0.35, -0.2, 0.2, 0.35, 0.5].map((vx, vi) => (
            <mesh key={vi} position={[vx, 0, 0.46]}>
              <boxGeometry args={[0.04, 0.12, 0.01]} />
              <meshBasicMaterial color="#22D3EE" transparent opacity={0.95 * opacity} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================= 4. SECONDARY STORAGE TOWER (Right Side) ================= */}
      <group position={[1.4, -0.15, 0.2]}>
        {/* Tier 1 */}
        <group position={[0, 0.28, 0]}>
          <mesh>
            <boxGeometry args={[1.0, 0.22, 0.7]} />
            <meshBasicMaterial color="#061220" transparent opacity={0.92 * opacity} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.0, 0.22, 0.7)]} />
            <lineBasicMaterial color="#22D3EE" transparent opacity={0.95 * opacity} />
          </lineSegments>
        </group>

        {/* Tier 2 */}
        <group position={[0, 0.04, 0]}>
          <mesh>
            <boxGeometry args={[1.0, 0.22, 0.7]} />
            <meshBasicMaterial color="#0A1828" transparent opacity={0.92 * opacity} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.0, 0.22, 0.7)]} />
            <lineBasicMaterial color="#FBBF24" transparent opacity={0.95 * opacity} />
          </lineSegments>
          <mesh position={[-0.2, 0, 0.36]}>
            <boxGeometry args={[0.35, 0.04, 0.01]} />
            <meshBasicMaterial color="#FBBF24" transparent opacity={0.98 * opacity} />
          </mesh>
        </group>

        {/* Tier 3 */}
        <group position={[0, -0.2, 0]}>
          <mesh>
            <boxGeometry args={[1.0, 0.22, 0.7]} />
            <meshBasicMaterial color="#061220" transparent opacity={0.92 * opacity} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.0, 0.22, 0.7)]} />
            <lineBasicMaterial color="#A78BFA" transparent opacity={0.92 * opacity} />
          </lineSegments>
        </group>
      </group>

      {/* ================= 5. INTERCONNECT BUS LINES BETWEEN RACKS ================= */}
      <lineSegments position={[0.65, -0.1, 0.2]}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={2}
            args={[new Float32Array([0, 0, 0, 0.7, 0, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#22D3EE" transparent opacity={0.85 * opacity} />
      </lineSegments>
      <lineSegments position={[0.65, 0.1, 0.2]}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={2}
            args={[new Float32Array([0, 0, 0, 0.7, 0, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FBBF24" transparent opacity={0.85 * opacity} />
      </lineSegments>

      {/* Floating Telemetry Beacons / Orbs */}
      <group position={[1.8, 1.4, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.98 * opacity} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.14, 0.18, 24]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.8 * opacity} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group position={[-1.6, -0.9, 0.3]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.95 * opacity} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.12, 0.15, 24]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.75 * opacity} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group position={[2.0, -0.8, -0.2]}>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#A78BFA" transparent opacity={0.95 * opacity} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.1, 0.13, 24]} />
          <meshBasicMaterial color="#A78BFA" transparent opacity={0.75 * opacity} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
