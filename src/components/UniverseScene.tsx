import { useRef, useMemo, memo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { NebulaFlow } from './universe/NebulaFlow';
import { StarField } from './universe/StarField';
import { CosmicParticles } from './universe/CosmicParticles';
import { ShootingStars } from './universe/ShootingStars';

// Topic 3D Animated Hero Visuals
import { AINeuralNetworkVisual } from './universe/AINeuralNetworkVisual';
import { IoTDeviceMeshVisual } from './universe/IoTDeviceMeshVisual';
import { CloudInfrastructureVisual } from './universe/CloudInfrastructureVisual';
import { DevOpsPipelineVisual } from './universe/DevOpsPipelineVisual';
import { CyberSecurityShieldVisual } from './universe/CyberSecurityShieldVisual';

interface UniverseSceneProps {
  activeSlide?: number;
}

export const UniverseScene = memo(function UniverseScene({ activeSlide = 0 }: UniverseSceneProps) {
  const universeGroupRef = useRef<THREE.Group>(null);
  const visualsGroupRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();

  // Opacity and spatial transition tracking refs for continuous smooth morphing
  const opacities = useRef([1, 0, 0, 0, 0]);
  const zOffsets = useRef([0, 2, 2, 2, 2]);

  // Responsive position calculation based on viewport width
  const isMobile = viewport.width < 6;
  const isTablet = viewport.width >= 6 && viewport.width < 9;
  const visualPosX = isMobile ? 0 : isTablet ? 1.4 : 2.15;
  const visualPosY = isMobile ? -0.8 : 0.05;
  const baseScale = isMobile ? 0.72 : isTablet ? 0.85 : 1.05;

  // Cinematic focal shimmer ring around active visual
  const focalRingGeo = useMemo(() => new THREE.RingGeometry(1.85, 1.88, 64), []);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();

    // 1. Ultra-smooth, elegant mouse parallax with low-pass damping
    if (universeGroupRef.current) {
      const targetRotX = pointer.y * 0.07;
      const targetRotY = pointer.x * 0.11;
      universeGroupRef.current.rotation.x +=
        (targetRotX - universeGroupRef.current.rotation.x) * 0.035;
      universeGroupRef.current.rotation.y +=
        (targetRotY - universeGroupRef.current.rotation.y) * 0.035;
    }

    // 2. Continuous organic floating & breathing kinematics on visuals group
    if (visualsGroupRef.current) {
      const floatY = Math.sin(time * 0.8) * 0.08 + Math.cos(time * 0.4) * 0.04;
      const floatX = Math.sin(time * 0.5) * 0.05;
      const tiltZ = Math.sin(time * 0.6) * 0.02;

      visualsGroupRef.current.position.x = visualPosX + floatX;
      visualsGroupRef.current.position.y = visualPosY + floatY;
      visualsGroupRef.current.rotation.z = tiltZ;

      // 3. Smooth continuous transition physics for each visual model
      const fadeSpeed = Math.min(1, delta * 4.5);
      const children = visualsGroupRef.current.children;

      for (let i = 0; i < 5; i++) {
        const targetOp = i === activeSlide ? 1 : 0;
        const targetZ = i === activeSlide ? 0 : 1.8;

        opacities.current[i] += (targetOp - opacities.current[i]) * fadeSpeed;
        zOffsets.current[i] += (targetZ - zOffsets.current[i]) * fadeSpeed;

        const child = children[i] as THREE.Group | undefined;
        if (child) {
          const op = opacities.current[i];
          child.visible = op > 0.005;

          // Scale & depth displacement for continuous cinematic depth-of-field transition
          const s = baseScale * (0.88 + op * 0.12);
          child.scale.set(s, s, s);
          child.position.z = -zOffsets.current[i];
          child.rotation.y = (1 - op) * 0.35 * (i % 2 === 0 ? 1 : -1);
        }
      }
    }
  });

  return (
    <group ref={universeGroupRef}>
      {/* ================= CINEMATIC LIGHTING RIG ================= */}
      {/* Soft ambient baseline so geometries retain 3D depth and shadow contour */}
      <ambientLight intensity={0.85} color="#F8FAFC" />

      {/* 1. Primary Warm Diamond Key Light — casts realistic highlights and depth */}
      <directionalLight
        position={[-6, 5, 5]}
        intensity={3.6}
        color="#FFFDF5"
      />

      {/* 2. Electric Cyan Rim Light — defines sharp luminous edges against deep space-black */}
      <directionalLight
        position={[7, -3, -3]}
        intensity={2.8}
        color="#38BDF8"
      />

      {/* 3. Subtle Violet / Purple Chromatic Fill Light — adds high-end cinematic dimension */}
      <directionalLight
        position={[-3, -6, 2]}
        intensity={1.6}
        color="#A78BFA"
      />

      {/* 4. Dynamic Electric Cyan Model Illumination Point Light */}
      <pointLight
        position={[visualPosX, visualPosY + 0.8, 2.5]}
        intensity={2.8}
        color="#22D3EE"
        distance={12}
      />

      {/* 5. Dynamic Warm Gold / Amber Specular Accent Point Light */}
      <pointLight
        position={[visualPosX + 1.8, visualPosY - 1.2, 1.8]}
        intensity={2.2}
        color="#FBBF24"
        distance={10}
      />

      {/* 6. Pure White Core Specular Flare */}
      <pointLight
        position={[visualPosX - 1.2, visualPosY + 1.5, 2.0]}
        intensity={1.8}
        color="#FFFFFF"
        distance={8}
      />

      {/* ================= FLOWING NEBULA & DEEP SPACE ================= */}
      <NebulaFlow />

      {/* ================= STARFIELD & PARTICLES ================= */}
      <StarField count={1800} />
      <CosmicParticles count={260} />
      <ShootingStars />

      {/* ================= CONTINUOUS AMBIENT DEPTH RING ================= */}
      <mesh position={[visualPosX, visualPosY, -0.6]} geometry={focalRingGeo}>
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ================= TOPIC-SPECIFIC 3D HERO VISUALS ================= */}
      <group ref={visualsGroupRef} position={[visualPosX, visualPosY, 0]}>
        {/* Slide 0: Artificial Intelligence — Neural Network & AI Synapses */}
        <group>
          <AINeuralNetworkVisual opacity={1} position={[0, 0, 0]} />
        </group>

        {/* Slide 1: Device Driver & IoT — Hardware Microprocessor & Sensor Mesh */}
        <group>
          <IoTDeviceMeshVisual opacity={1} position={[0, 0, 0]} />
        </group>

        {/* Slide 2: Cloud Computing — Isometric Server Blade Racks & Cyber Cloud */}
        <group>
          <CloudInfrastructureVisual opacity={1} position={[0, 0, 0]} />
        </group>

        {/* Slide 3: DevOps — Continuous Infinity CI/CD Pipeline & Automation Loop */}
        <group>
          <DevOpsPipelineVisual opacity={1} position={[0, 0, 0]} />
        </group>

        {/* Slide 4: Cyber Security — Holographic Security Shield & Threat Defense Matrix */}
        <group>
          <CyberSecurityShieldVisual opacity={1} position={[0, 0, 0]} />
        </group>
      </group>
    </group>
  );
});
