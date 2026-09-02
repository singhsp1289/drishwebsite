import { Canvas } from '@react-three/fiber';
import { UniverseScene } from './UniverseScene';

interface Hero3DCanvasProps {
  isVisible?: boolean;
  activeSlide?: number;
}

export default function Hero3DCanvas({ isVisible = true, activeSlide = 0 }: Hero3DCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 48 }}
      frameloop={isVisible ? 'always' : 'never'}
      dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
      gl={{ 
        antialias: true, 
        powerPreference: 'high-performance',
        alpha: true,
        stencil: false,
        depth: true
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <UniverseScene activeSlide={activeSlide} />
    </Canvas>
  );
}
