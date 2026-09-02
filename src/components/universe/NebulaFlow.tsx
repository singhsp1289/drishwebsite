import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NebulaFlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);

  const { geometry, material1, material2 } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(36, 24, 32, 32);

    // Very faint, ethereal starlight sheen (neutral platinum)
    const mat1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFFFFF'),
      transparent: true,
      opacity: 0.025,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Faint warm starlight dust
    const mat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FDE68A'),
      transparent: true,
      opacity: 0.02,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    return { geometry: geo, material1: mat1, material2: mat2 };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.12;
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.06;
      meshRef.current.position.y = Math.sin(t) * 0.2;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.z = -Math.cos(t * 0.4) * 0.08;
      mesh2Ref.current.position.y = -Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <group position={[0, 0, -8]}>
      <mesh ref={meshRef} geometry={geometry} material={material1} position={[-1, 1, 0]} />
      <mesh ref={mesh2Ref} geometry={geometry} material={material2} position={[3, -1.5, -2]} />
    </group>
  );
}
