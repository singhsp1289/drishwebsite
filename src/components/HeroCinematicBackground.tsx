import { useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useSpring } from 'motion/react';

// Master high-fidelity 3D artwork assets generated specifically for each of the 5 Drish pillars
import devDesignArtwork from '../assets/images/pillar_dev_design_1787678881880.jpg';
import researchAiArtwork from '../assets/images/pillar_research_ai_1787678902421.jpg';
import integrationArtwork from '../assets/images/pillar_integration_1787678920664.jpg';
import scaleSupportArtwork from '../assets/images/pillar_scale_support_1787678937703.jpg';
import horizonArtwork from '../assets/images/pillar_horizon_1787678956474.jpg';

interface HeroCinematicBackgroundProps {
  activeSlide: number;
  isVisible?: boolean;
}

// 5 DRISH Pillars Master Visual Configuration
const PILLAR_CONFIG = [
  {
    id: 0,
    letter: 'D',
    name: 'Development & Design',
    meaning: 'Build → Design → Engineer → Create',
    image: devDesignArtwork,
    alt: 'Development and Design 3D Holographic Architectural Engineering Structure',
    color: '#38BDF8', // Sky Blue
    accent: '#0284C7',
    glow: 'rgba(56, 189, 248, 0.45)',
    ambient: 'rgba(56, 189, 248, 0.08)',
    ringColor: 'rgba(56, 189, 248, 0.15)',
  },
  {
    id: 1,
    letter: 'R',
    name: 'Research & AI',
    meaning: 'Explore → Learn → Analyze → Discover → Intelligence',
    image: researchAiArtwork,
    alt: 'Research and AI Neural Synaptic Core Intelligence Matrix',
    color: '#60A5FA', // Electric Blue
    accent: '#3B82F6',
    glow: 'rgba(96, 165, 250, 0.45)',
    ambient: 'rgba(96, 165, 250, 0.08)',
    ringColor: 'rgba(96, 165, 250, 0.15)',
  },
  {
    id: 2,
    letter: 'I',
    name: 'Intelligent Integration',
    meaning: 'Connect → Integrate → Synchronize → Orchestrate',
    image: integrationArtwork,
    alt: 'Intelligent Integration Converging Harmonic Systems Matrix',
    color: '#34D399', // Mint / Emerald
    accent: '#10B981',
    glow: 'rgba(52, 211, 153, 0.45)',
    ambient: 'rgba(52, 211, 153, 0.08)',
    ringColor: 'rgba(52, 211, 153, 0.15)',
  },
  {
    id: 3,
    letter: 'S',
    name: 'Scale & Support',
    meaning: 'Grow → Scale → Stabilize → Support',
    image: scaleSupportArtwork,
    alt: 'Scale and Support Ascending Infrastructure and Lattice Support Grid',
    color: '#F59E0B', // Amber / Gold
    accent: '#D97706',
    glow: 'rgba(245, 158, 11, 0.45)',
    ambient: 'rgba(245, 158, 11, 0.08)',
    ringColor: 'rgba(245, 158, 11, 0.15)',
  },
  {
    id: 4,
    letter: 'H',
    name: 'Horizon',
    meaning: 'Explore → Advance → Innovate → Future',
    image: horizonArtwork,
    alt: 'Horizon Futuristic Technology Horizon and Expansive Light Trails',
    color: '#A855F7', // Violet / Purple
    accent: '#7C3AED',
    glow: 'rgba(168, 85, 247, 0.45)',
    ambient: 'rgba(168, 85, 247, 0.08)',
    ringColor: 'rgba(168, 85, 247, 0.15)',
  },
];

export const HeroCinematicBackground = memo(function HeroCinematicBackground({
  activeSlide,
  isVisible = true,
}: HeroCinematicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const activeSlideRef = useRef(activeSlide);

  // Update slide ref for RAF loop
  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  // Spring physics for interactive mouse parallax
  const mouseX = useSpring(0, { stiffness: 35, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 35, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      mouseX.set(normX);
      mouseY.set(normY);
      mousePosRef.current = { x: normX, y: normY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Unified Cosmic Canvas Renderer (Stars, Stardust, Meteors, and Subtle Pillar-Specific Dynamics)
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Cosmic Background Starfield
    interface Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      twinkleSpeed: number;
      phase: number;
    }
    const starCount = 160;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.35,
      baseAlpha: Math.random() * 0.5 + 0.15,
      twinkleSpeed: Math.random() * 2 + 0.8,
      phase: Math.random() * Math.PI * 2,
    }));

    // 2. Cosmic Stardust Particles
    interface Stardust {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }
    const particleColors = ['#FFFFFF', '#38BDF8', '#60A5FA', '#34D399', '#F59E0B', '#A855F7'];
    const stardustCount = 48;
    const stardustList: Stardust[] = Array.from({ length: stardustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22 - 0.08,
      size: Math.random() * 1.6 + 0.5,
      alpha: Math.random() * 0.38 + 0.12,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
    }));

    // 3. Shooting Meteors
    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      alpha: number;
      active: boolean;
      delay: number;
    }
    const meteors: Meteor[] = [
      { x: 0, y: 0, length: 135, speed: 13, alpha: 0, active: false, delay: 100 },
      { x: 0, y: 0, length: 95, speed: 11, alpha: 0, active: false, delay: 240 },
    ];

    // 4. Subtle Pillar Abstract Flow Particles
    interface DynamicElement {
      x: number;
      y: number;
      progress: number;
      speed: number;
      angle: number;
      size: number;
      phase: number;
    }
    const flowElements: DynamicElement[] = Array.from({ length: 24 }, () => ({
      x: 0,
      y: 0,
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.008,
      angle: Math.random() * Math.PI * 2,
      size: Math.random() * 2.5 + 1.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const currentSlide = activeSlideRef.current;
      const currentPillar = PILLAR_CONFIG[currentSlide] || PILLAR_CONFIG[0];
      const isMobile = width < 768;
      const focalX = isMobile ? width * 0.5 : width * 0.68 + mousePosRef.current.x * 20;
      const focalY = isMobile ? height * 0.52 : height * 0.5 + mousePosRef.current.y * 15;

      // Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const screenX = star.x * width;
        const screenY = star.y * height;
        const twinkle = Math.sin(time * star.twinkleSpeed + star.phase) * 0.35 + 0.65;
        const alpha = star.baseAlpha * twinkle;

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Floating Stardust Particles
      for (let i = 0; i < stardustList.length; i++) {
        const p = stardustList[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw Shooting Meteors
      for (let i = 0; i < meteors.length; i++) {
        const m = meteors[i];
        if (!m.active) {
          m.delay--;
          if (m.delay <= 0) {
            m.active = true;
            m.x = (Math.random() * 0.5 + 0.35) * width;
            m.y = Math.random() * height * 0.4;
            m.alpha = 0.9;
            m.delay = Math.floor(Math.random() * 260 + 140);
          }
        } else {
          m.x -= m.speed * 1.5;
          m.y += m.speed * 0.8;
          m.alpha -= 0.012;

          if (m.alpha <= 0 || m.x < -100 || m.y > height + 100) {
            m.active = false;
          } else {
            const grad = ctx.createLinearGradient(m.x, m.y, m.x + m.length * 0.8, m.y - m.length * 0.4);
            grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
            grad.addColorStop(0.3, `${currentPillar.glow}`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x + m.length * 0.8, m.y - m.length * 0.4);
            ctx.stroke();
          }
        }
      }

      // Subtle Pillar-Specific Abstract Motion Behavior (Subtle Particle & Line Layer)
      ctx.save();
      if (currentSlide === 0) {
        // D — Development & Design (Constructive Assembly Vectors & Grid Lines)
        flowElements.forEach((el, idx) => {
          el.progress = (el.progress + el.speed) % 1;
          const radius = 160 + (idx % 4) * 45;
          const angle = el.angle + time * 0.15;
          const px = focalX + Math.cos(angle) * radius;
          const py = focalY + Math.sin(angle) * radius * 0.6;

          // Precision Drafting Ticks
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px - 4, py);
          ctx.lineTo(px + 4, py);
          ctx.moveTo(px, py - 4);
          ctx.lineTo(px, py + 4);
          ctx.stroke();
        });
      } else if (currentSlide === 1) {
        // R — Research & AI (Synaptic Neural Nodes & Connection Sparks)
        flowElements.forEach((el, idx) => {
          el.progress = (el.progress + el.speed * 1.3) % 1;
          const orbitR = 140 + Math.sin(time * 2 + el.phase) * 35 + (idx % 3) * 50;
          const angle = el.angle + time * 0.25;
          const px = focalX + Math.cos(angle) * orbitR;
          const py = focalY + Math.sin(angle) * orbitR * 0.55;

          ctx.fillStyle = 'rgba(96, 165, 250, 0.7)';
          ctx.beginPath();
          ctx.arc(px, py, el.size, 0, Math.PI * 2);
          ctx.fill();

          // Delicate connecting pulse to neighbor
          if (idx % 3 === 0) {
            const nextIdx = (idx + 1) % flowElements.length;
            const nextEl = flowElements[nextIdx];
            const nextAngle = nextEl.angle + time * 0.25;
            const npx = focalX + Math.cos(nextAngle) * (140 + (nextIdx % 3) * 50);
            const npy = focalY + Math.sin(nextAngle) * (140 + (nextIdx % 3) * 50) * 0.55;

            ctx.strokeStyle = 'rgba(96, 165, 250, 0.15)';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(npx, npy);
            ctx.stroke();
          }
        });
      } else if (currentSlide === 2) {
        // I — Intelligent Integration (Converging Synchronization Data Streams)
        flowElements.forEach((el) => {
          el.progress = (el.progress + el.speed * 1.5) % 1;
          const streamDist = (1 - el.progress) * 280;
          const px = focalX + Math.cos(el.angle) * streamDist;
          const py = focalY + Math.sin(el.angle) * streamDist * 0.7;

          ctx.fillStyle = 'rgba(52, 211, 153, 0.8)';
          ctx.beginPath();
          ctx.arc(px, py, el.size, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (currentSlide === 3) {
        // S — Scale & Support (Ascending Volumetric Energy Pillars)
        flowElements.forEach((el, idx) => {
          el.progress = (el.progress + el.speed * 1.2) % 1;
          const offsetX = (idx - 12) * 22;
          const startY = focalY + 160;
          const endY = focalY - 180;
          const py = startY - el.progress * (startY - endY);
          const px = focalX + offsetX;

          ctx.fillStyle = 'rgba(245, 158, 11, 0.75)';
          ctx.beginPath();
          ctx.arc(px, py, el.size * 0.9, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (currentSlide === 4) {
        // H — Horizon (Forward Radiant Perspective Light Trails)
        flowElements.forEach((el) => {
          el.progress = (el.progress + el.speed * 1.6) % 1;
          const dist = Math.pow(el.progress, 1.8) * 320;
          const px = focalX + Math.cos(el.angle) * dist;
          const py = focalY + Math.sin(el.angle) * dist * 0.55;

          const alpha = el.progress * 0.75;
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, el.size * (0.8 + el.progress * 1.2), 0, Math.PI * 2);
          ctx.fill();
        });
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  const currentPillar = useMemo(
    () => PILLAR_CONFIG[activeSlide] || PILLAR_CONFIG[0],
    [activeSlide]
  );

  return (
    <div ref={containerRef} className="absolute inset-0 bg-[#000000] overflow-hidden pointer-events-none z-0">
      {/* 1. Full-Hero Unified Black Canvas with Stars & Cosmic Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* 2. Soft Ambient Cosmic Nebulae Glows (Seamless Light Diffusion Matched to Active Pillar) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPillar.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none z-[2]"
        >
          {/* Main Primary Ambient Sphere behind the Active Artwork on the Right */}
          <div 
            className="absolute right-[5%] sm:right-[10%] md:right-[16%] top-1/2 -translate-y-1/2 w-[480px] sm:w-[620px] md:w-[780px] h-[480px] sm:h-[620px] md:h-[780px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${currentPillar.ambient} 0%, rgba(0, 0, 0, 0) 70%)`,
              filter: 'blur(75px)',
            }}
          />

          {/* Secondary Atmospheric Ambient Diffusion on the Left */}
          <div 
            className="absolute left-[8%] top-1/3 w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${currentPillar.ambient} 0%, rgba(0, 0, 0, 0) 70%)`,
              filter: 'blur(90px)',
              opacity: 0.5,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 3. Luminous Tech Orbital Hologram Rings (Free-Floating in Space) */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute right-[-10%] sm:right-[2%] md:right-[8%] lg:right-[12%] top-1/2 -translate-y-1/2 w-[400px] sm:w-[560px] md:w-[680px] h-[400px] sm:h-[560px] md:h-[680px] rounded-full border border-sky-400/[0.08] pointer-events-none z-[2]"
      />
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 140,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute right-[-5%] sm:right-[6%] md:right-[12%] lg:right-[16%] top-1/2 -translate-y-1/2 w-[320px] sm:w-[440px] md:w-[540px] h-[320px] sm:h-[440px] md:h-[540px] rounded-full border border-amber-400/[0.06] border-dashed pointer-events-none z-[2]"
      />

      {/* 4. Pillar Master Visual Centerpiece — Seamlessly blended directly into the black background */}
      <div className="absolute right-0 sm:right-[2%] md:right-[6%] lg:right-[10%] xl:right-[12%] top-1/2 -translate-y-1/2 w-[70vw] sm:w-[380px] md:w-[440px] lg:w-[500px] xl:w-[560px] aspect-square flex items-center justify-center pointer-events-none z-[3]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPillar.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1], // Cinematic smooth ease
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Continuous Smooth Floating & Breathing Motion */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
                rotateZ: [-0.6, 0.6, -0.6],
                scale: [1, 1.015, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Artwork Image — Blended seamlessly into the black universe with feathered radial mask */}
              <img
                src={currentPillar.image}
                alt={currentPillar.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain select-none"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 40%, rgba(0,0,0,0.85) 62%, transparent 82%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 40%, rgba(0,0,0,0.85) 62%, transparent 82%)',
                }}
              />

              {/* Gentle Cosmic Light Shimmer Wave across the artwork */}
              <motion.div
                animate={{
                  opacity: [0.1, 0.25, 0.1],
                  x: ['-100%', '100%'],
                }}
                transition={{
                  opacity: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                  x: { duration: 9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 },
                }}
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 45%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 80%)',
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

HeroCinematicBackground.displayName = 'HeroCinematicBackground';
export default HeroCinematicBackground;
