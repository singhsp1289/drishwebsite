import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HeroCinematicBackground } from './HeroCinematicBackground';
import { DrishSignatureNav, DRISH_EXPERIENCES } from './DrishSignatureNav';

export const Hero = memo(function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Viewport intersection observer: pauses timers when scrolled away
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Global listeners: resume slider on outside click or page scroll
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (heroRef.current && !heroRef.current.contains(e.target as Node)) {
        setIsPaused(false);
      }
    };

    const handleScroll = () => {
      setIsPaused(false);
    };

    window.addEventListener('click', handleDocumentClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-slide interval: cycles D → R → I → S → H → D smoothly
  useEffect(() => {
    if (!isInView || isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % DRISH_EXPERIENCES.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInView, isPaused, activeSlide]);

  const handleSelectSlide = useCallback((index: number) => {
    setActiveSlide(index);
    // Reset timer on direct selection while keeping automatic transition alive
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlide = DRISH_EXPERIENCES[activeSlide] || DRISH_EXPERIENCES[0];

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-[100dvh] min-h-[620px] max-h-[1050px] overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 bg-black text-white cursor-default"
    >
      {/* Unified Full-Hero Cinematic Animated Background with Topic Artwork & Cosmic Starlight */}
      <HeroCinematicBackground isVisible={isInView} activeSlide={activeSlide} />

      {/* Main Hero Viewport Content — Centered inside stable viewport space */}
      <div 
        id={`drish-panel-${currentSlide.letter.toLowerCase()}`}
        role="tabpanel"
        aria-labelledby={`drish-tab-${currentSlide.letter.toLowerCase()}`}
        className="w-full px-[8%] relative z-20 flex-1 flex flex-col justify-center py-4 sm:py-6"
      >
        <div
          className="max-w-2xl relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.letter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* Small Category Eyebrow Line */}
              <div className="flex items-center space-x-4 mb-2.5 sm:mb-3.5 md:mb-6">
                <span
                  className="flex items-end text-xs sm:text-2xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] transition-colors duration-300"
                  style={{ color: currentSlide.color }}
                >
                  <span
                    className="inline-block mr-1 sm:mr-1.5 text-2xl sm:text-5xl font-black leading-none tracking-normal align-baseline"
                    style={{ color: currentSlide.color }}
                  >
                    {currentSlide.title.charAt(0)}
                  </span>
                  {currentSlide.title.slice(1)}
                </span>
              </div>

              {/* Big Main Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-black leading-[1.08] tracking-tight mb-3.5 sm:mb-4 md:mb-8 text-white capitalize">
                {currentSlide.headline.split('\n').map((line, lineIndex, lines) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < lines.length - 1 && <br />}
                  </span>
                ))}
              </h1>
              
              {/* Subheading Description */}
              <p className="text-sm sm:text-base md:text-[22px] text-slate-300 mb-4 sm:mb-6 md:mb-10 max-w-xl leading-relaxed font-normal">
                {currentSlide.description}
              </p>
              
              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-4 sm:mb-6">
                <button
                  type="button"
                  onClick={handleScrollToServices}
                  className="w-full sm:w-auto min-w-[190px] sm:min-w-[210px] md:min-w-[220px] h-[42px] sm:h-[46px] md:h-[48px] px-4 sm:px-5 text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-sm transition-all hover:brightness-90 flex items-center justify-center gap-2 group cursor-pointer shrink-0 whitespace-nowrap"
                  style={{
                    backgroundColor: currentSlide.color,
                    boxShadow: `0 10px 25px -5px ${currentSlide.color}4D`,
                  }}
                >
                  <span className="whitespace-nowrap">Explore Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
                <a 
                  href="/contact"
                  className="w-full sm:w-auto min-w-[190px] sm:min-w-[210px] md:min-w-[220px] h-[42px] sm:h-[46px] md:h-[48px] px-4 sm:px-5 bg-white/10 text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white/20 transition-all border border-white/20 backdrop-blur-xs shadow-xs cursor-pointer flex items-center justify-center shrink-0 whitespace-nowrap"
                >
                  <span className="whitespace-nowrap">Talk to Our Experts</span>
                </a>
              </div>
              
              {/* Technology Tags */}
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {currentSlide.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-[10px] sm:text-[11px] md:text-sm font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm border border-white/15 bg-white/10 text-slate-200 uppercase tracking-wider shadow-2xs backdrop-blur-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* DRISH Signature Letter Experience Bar */}
      <DrishSignatureNav
        activeSlide={activeSlide}
        onSelectSlide={handleSelectSlide}
      />
    </section>
  );
});

Hero.displayName = 'Hero';

