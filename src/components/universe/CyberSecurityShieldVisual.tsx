import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  opacity?: number;
  position?: [number, number, number];
}

export function CyberSecurityShieldVisual({ opacity = 1, position = [2.0, 0, 0] }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const shieldRef = useRef<THREE.Group>(null);
  const radarArcRef = useRef<THREE.Mesh>(null);
  const padlockRef = useRef<THREE.Group>(null);
  const threatsRef = useRef<THREE.Group>(null);

  // Hexagonal background matrix positions
  const hexGrid = useMemo(() => {
    const list: [number, number, number][] = [];
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        const x = c * 0.75 + (r % 2 === 0 ? 0 : 0.375);
        const y = r * 0.65;
        // Don't clutter the exact shield center
        if (Math.abs(x) > 0.4 || Math.abs(y) > 0.4) {
          list.push([x, y, -0.6]);
        }
      }
    }
    return list;
  }, []);

  // Threat interception vectors (threats getting blocked)
  const threats = useMemo(() => {
    return [
      { start: new THREE.Vector3(2.4, 1.4, 0.4), end: new THREE.Vector3(0.8, 0.5, 0.2), blocked: true },
      { start: new THREE.Vector3(-2.2, 1.2, 0.3), end: new THREE.Vector3(-0.8, 0.4, 0.1), blocked: true },
      { start: new THREE.Vector3(2.3, -1.2, 0.2), end: new THREE.Vector3(0.7, -0.4, 0.1), blocked: true },
      { start: new THREE.Vector3(-2.0, -1.3, 0.3), end: new THREE.Vector3(-0.7, -0.5, 0.1), blocked: false },
    ];
  }, []);

  // Parametric shield silhouette curve
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.25);
    shape.lineTo(0.9, 1.05);
    shape.lineTo(0.85, 0.1);
    shape.quadraticCurveTo(0.65, -0.85, 0, -1.35);
    shape.quadraticCurveTo(-0.65, -0.85, -0.85, 0.1);
    shape.lineTo(-0.9, 1.05);
    shape.closePath();

    return new THREE.ShapeGeometry(shape);
  }, []);

  const shieldEdgesGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.25);
    shape.lineTo(0.9, 1.05);
    shape.lineTo(0.85, 0.1);
    shape.quadraticCurveTo(0.65, -0.85, 0, -1.35);
    shape.quadraticCurveTo(-0.65, -0.85, -0.85, 0.1);
    shape.lineTo(-0.9, 1.05);
    shape.closePath();

    const points = shape.getPoints();
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Binary stream positions
  const binaryStreams = useMemo(() => {
    return [
      { x: -1.7, y: 0.2, len: 1.6 },
      { x: 1.8, y: -0.2, len: 1.4 },
      { x: -1.4, y: -0.8, len: 1.2 },
      { x: 1.5, y: 0.9, len: 1.5 }
    ];
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.05;
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.12;
      groupRef.current.rotation.x = Math.cos(t * 0.15) * 0.06;
    }

    if (shieldRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.02;
      shieldRef.current.scale.set(s, s, s);
    }

    if (radarArcRef.current) {
      radarArcRef.current.rotation.z = -t * 0.8;
    }

    if (padlockRef.current) {
      padlockRef.current.position.y = Math.sin(t * 1.5) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* ================= 1. HOLOGRAPHIC DEFENSE SHIELD ================= */}
      <group ref={shieldRef}>
        {/* Shield Glass Body */}
        <mesh geometry={shieldGeometry} position={[0, 0, 0]}>
          <meshBasicMaterial color="#0369A1" transparent opacity={0.45 * opacity} side={THREE.DoubleSide} />
        </mesh>

        {/* Shield Outer Glowing Edge */}
        <lineLoop geometry={shieldEdgesGeometry} position={[0, 0, 0.02]}>
          <lineBasicMaterial color="#22D3EE" transparent opacity={0.98 * opacity} linewidth={2} />
        </lineLoop>

        {/* Inner Shield Inset */}
        <mesh geometry={shieldGeometry} position={[0, 0, 0.03]} scale={[0.82, 0.82, 0.82]}>
          <meshBasicMaterial color="#0A1828" transparent opacity={0.55 * opacity} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ================= 2. 3D HOLOGRAPHIC PADLOCK ================= */}
      <group ref={padlockRef} position={[0, 0.05, 0.1]}>
        {/* Shackle (Torus Arc) - Radiant Electric Cyan */}
        <mesh position={[0, 0.26, 0]}>
          <torusGeometry args={[0.18, 0.04, 16, 24, Math.PI]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.98 * opacity} />
        </mesh>

        {/* Lock Body - Deep Cyber Blue */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.48, 0.38, 0.12]} />
          <meshBasicMaterial color="#0A1828" transparent opacity={0.95 * opacity} />
        </mesh>
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.48, 0.38, 0.12)]} />
          <lineBasicMaterial color="#22D3EE" transparent opacity={0.98 * opacity} />
        </lineSegments>

        {/* Keyhole - Warm Gold Accent */}
        <mesh position={[0, 0.03, 0.07]}>
          <circleGeometry args={[0.045, 16]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.98 * opacity} />
        </mesh>
        <mesh position={[0, -0.04, 0.07]}>
          <planeGeometry args={[0.03, 0.08]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.98 * opacity} />
        </mesh>
        <mesh position={[0, 0.03, 0.08]}>
          <circleGeometry args={[0.02, 16]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.98 * opacity} />
        </mesh>
      </group>

      {/* ================= 3. CONCENTRIC SCANNER RADAR RINGS ================= */}
      <group position={[0, 0, 0.05]}>
        <mesh>
          <ringGeometry args={[0.7, 0.73, 48]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.65 * opacity} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={radarArcRef}>
          <ringGeometry args={[0.88, 0.93, 32, 1, 0, Math.PI * 0.75]} />
          <meshBasicMaterial color="#A78BFA" transparent opacity={0.9 * opacity} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.1, 1.13, 64]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.45 * opacity} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ================= 4. BACKGROUND HEXAGONAL SECURITY MATRIX ================= */}
      {hexGrid.map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <ringGeometry args={[0.24, 0.28, 6]} />
          <meshBasicMaterial color={idx % 2 === 0 ? '#22D3EE' : '#A78BFA'} transparent opacity={0.35 * opacity} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* ================= 5. THREAT INTERCEPTION TELEMETRY ================= */}
      <group ref={threatsRef}>
        {threats.map((th, idx) => (
          <group key={idx}>
            {/* Vector Laser Line */}
            <line>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  args={[new Float32Array([th.start.x, th.start.y, th.start.z, th.end.x, th.end.y, th.end.z]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color={th.blocked ? '#FBBF24' : '#22D3EE'} transparent opacity={0.8 * opacity} />
            </line>

            {/* Interception Badge */}
            {th.blocked ? (
              <group position={th.end}>
                {/* Gold / Amber [✕] Intercept Block */}
                <mesh>
                  <circleGeometry args={[0.12, 16]} />
                  <meshBasicMaterial color="#F59E0B" transparent opacity={0.95 * opacity} />
                </mesh>
                <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI / 4]}>
                  <planeGeometry args={[0.14, 0.03]} />
                  <meshBasicMaterial color="#FFFFFF" transparent opacity={0.98 * opacity} />
                </mesh>
                <mesh position={[0, 0, 0.01]} rotation={[0, 0, -Math.PI / 4]}>
                  <planeGeometry args={[0.14, 0.03]} />
                  <meshBasicMaterial color="#FFFFFF" transparent opacity={0.98 * opacity} />
                </mesh>
              </group>
            ) : (
              <group position={th.end}>
                {/* Cyan [✓] Verified Badge */}
                <mesh>
                  <circleGeometry args={[0.12, 16]} />
                  <meshBasicMaterial color="#10B981" transparent opacity={0.95 * opacity} />
                </mesh>
                <mesh position={[-0.02, -0.01, 0.01]} rotation={[0, 0, -Math.PI / 4]}>
                  <planeGeometry args={[0.07, 0.025]} />
                  <meshBasicMaterial color="#FFFFFF" transparent opacity={0.98 * opacity} />
                </mesh>
                <mesh position={[0.03, 0.02, 0.01]} rotation={[0, 0, Math.PI / 3]}>
                  <planeGeometry args={[0.11, 0.025]} />
                  <meshBasicMaterial color="#FFFFFF" transparent opacity={0.95 * opacity} />
                </mesh>
              </group>
            )}
          </group>
        ))}
      </group>

      {/* ================= 6. STREAMING BINARY DATA PILLARS ================= */}
      {binaryStreams.map((bs, bIdx) => (
        <group key={bIdx} position={[bs.x, bs.y, -0.2]}>
          <line>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attach="attributes-position"
                count={2}
                args={[new Float32Array([0, bs.len / 2, 0, 0, -bs.len / 2, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#38BDF8" transparent opacity={0.35 * opacity} />
          </line>
        </group>
      ))}
    </group>
  );
}
