import { memo } from 'react';
import { motion } from 'motion/react';

export interface DrishLetterItem {
  id: number;
  letter: 'D' | 'R' | 'I' | 'S' | 'H';
  title: string;
  headline: string;
  description: string;
  tags: string[];
  color: string;
  glowColor: string;
}

export const DRISH_EXPERIENCES: DrishLetterItem[] = [
  {
    id: 0,
    letter: 'D',
    title: 'Development & Design',
    headline: 'From Vision to Digital Reality',
    description: 'We transform ambitious ideas into exceptional digital products—combining strategy, design, and technology to build websites, applications, platforms, and experiences that move businesses forward.',
    tags: ['Web & Mobile Apps', 'Custom Software', 'Cloud Platforms', 'UI/UX Design'],
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
  },
  {
    id: 1,
    letter: 'R',
    title: 'Research & AI',
    headline: 'turn complexity into intelligence',
    description: 'We combine research, data, and artificial intelligence to uncover opportunities, solve complex challenges, automate what matters, and help businesses make smarter decisions.',
    tags: ['Applied AI & ML', 'Data Intelligence', 'Workflow Automation', 'Deep Research'],
    color: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.45)',
  },
  {
    id: 2,
    letter: 'I',
    title: 'Intelligent Integration',
    headline: 'Connect the digital to\nthe real world',
    description: 'We bring software, devices, data, and systems together—from IoT and embedded technologies to device drivers and enterprise integrations—creating connected ecosystems that work as one.',
    tags: ['IoT & Embedded', 'Device Drivers', 'Systems Integration', 'Connected Ecosystems'],
    color: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.45)',
  },
  {
    id: 3,
    letter: 'S',
    title: 'Scale & Support',
    headline: "Don't just build make\nit grow",
    description: 'Launching is only the beginning. From go-to-market strategy and sales enablement to ongoing support and optimization, we help transform digital products into sustainable business growth.',
    tags: ['Go-to-Market', 'Sales Enablement', 'Continuous Optimization', 'Managed Support'],
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
  },
  {
    id: 4,
    letter: 'H',
    title: 'Human + AI Horizon',
    headline: "Expand What's Possible",
    description: 'We explore emerging paradigms, frontier technologies, and next-generation architectures—helping forward-looking enterprises anticipate industry shifts, innovate fearlessly, and lead the future.',
    tags: ['Emerging Tech', 'Next-Gen Computing', 'Frontier Innovation', 'Future Systems'],
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
  },
];

interface DrishSignatureNavProps {
  activeSlide: number;
  onSelectSlide: (index: number) => void;
}

export const DrishSignatureNav = memo(function DrishSignatureNav({
  activeSlide,
  onSelectSlide,
}: DrishSignatureNavProps) {
  return (
    <nav
      aria-label="DRISH Signature Experiences"
      className="w-full py-2.5 sm:py-3.5 px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center gap-2 sm:gap-2.5 border-t border-white/[0.08] bg-black/90 backdrop-blur-xl z-30 shrink-0 select-none transition-colors"
    >
      {/* DRISH 5-Letter Interactive Signature Row - Active is Big, Others are Small */}
      <div
        role="tablist"
        aria-label="DRISH Dimension Selector"
        className="flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3.5 w-full max-w-2xl px-2"
      >
        {DRISH_EXPERIENCES.map((item, index) => {
          const isActive = activeSlide === index;

          return (
            <motion.button
              key={item.letter}
              layout
              role="tab"
              id={`drish-tab-${item.letter.toLowerCase()}`}
              aria-selected={isActive}
              aria-controls={`drish-panel-${item.letter.toLowerCase()}`}
              aria-label={`${item.letter} — ${item.title}`}
              tabIndex={0}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectSlide(index);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectSlide(index);
                } else if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  onSelectSlide((index + 1) % DRISH_EXPERIENCES.length);
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  onSelectSlide((index - 1 + DRISH_EXPERIENCES.length) % DRISH_EXPERIENCES.length);
                }
              }}
              transition={{
                layout: { type: 'spring', stiffness: 360, damping: 32 },
              }}
              className={`group relative flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 ${isActive
                ? 'w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 z-10 shadow-lg scale-110'
                : 'w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 opacity-60 hover:opacity-100 scale-100'
                }`}
              style={{
                boxShadow: isActive
                  ? `0 0 24px -2px ${item.glowColor}, 0 4px 12px rgba(0,0,0,0.6)`
                  : 'none',
              }}
            >
              {/* Inactive Subtle Border & Background */}
              {!isActive && (
                <div className="absolute inset-0 font-normal" />
              )}

              {/* Active Letter Illuminated Container & Morphing Glow */}
              {isActive && (
                <>
                  {/* Morphing Background Aura */}
                  <motion.div
                    layoutId="drish-active-aura"
                    className="absolute -inset-1"
                  />

                  {/* Active 3D Glass Surface Base */}
                  <motion.div
                    layoutId="drish-active-plate"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 34,
                    }}
                    className="absolute inset-0 rounded-xl border bg-gradient-to-r from-white/[0.22] via-white/[0.12] to-white/[0.06] backdrop-blur-md"
                    style={{
                      borderColor: item.color,
                      boxShadow: `0 0 20px -2px ${item.glowColor}, inset 0 1px 2px rgba(255,255,255,0.5)`,
                    }}
                  />

                  {/* Traveling Continuous Energy Beam around the Active Letter Box */}
                  <div className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <motion.rect
                        x="1"
                        y="1"
                        width="98"
                        height="98"
                        rx="10"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="30 70"
                        animate={{
                          strokeDashoffset: [0, -100],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{
                          filter: `drop-shadow(0 0 6px ${item.color})`,
                        }}
                      />
                    </svg>
                  </div>

                  {/* Active Slide Progress Line at Bottom */}
                  <div className="absolute bottom-0 inset-x-2 h-[2px] rounded-full overflow-hidden bg-white/20">
                    <motion.div
                      key={activeSlide}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5.5, ease: 'linear' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </>
              )}

              {/* Character Glyph Inside the Box */}
              <div className="relative z-10 flex items-center justify-center">
                <span
                  className={`font-black tracking-wider transition-all duration-300 select-none ${isActive
                    ? 'text-xl sm:text-2xl md:text-3xl font-black'
                    : 'text-xs sm:text-sm md:text-base text-slate-300 group-hover:text-white font-bold'
                    }`}
                  style={{
                    color: isActive ? item.color : undefined,
                    textShadow: isActive
                      ? `0 0 16px ${item.color}, 0 2px 4px rgba(0,0,0,0.9)`
                      : 'none',
                  }}
                >
                  {item.letter}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Static Single Trust Text */}
      <div className="flex items-center justify-center">
        <span
          className="text-[10px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-center whitespace-nowrap transition-colors duration-300"
          style={{ color: DRISH_EXPERIENCES[activeSlide]?.color }}
        >
          Turning Technology Into Business Advantage
        </span>
      </div>
    </nav>
  );
});

DrishSignatureNav.displayName = 'DrishSignatureNav';
