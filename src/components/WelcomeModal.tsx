import { useState, useEffect, FC, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowRight, 
  Sparkles,
  Award,
  HeartPulse,
  Car,
  Landmark,
  Film,
  ShoppingBag,
  GraduationCap,
  Layers,
  Building2
} from 'lucide-react';
import { Logo } from './Logo';

export const WelcomeModal: FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only open on initial homepage full load or homepage browser refresh
    const isHomepage = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '');
    
    if (isHomepage) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleExploreSolutions = () => {
    handleClose();
    // Smooth scroll to services / solutions section
    setTimeout(() => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling while modal is active
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const industries = [
    { name: 'Healthcare', icon: <HeartPulse className="w-4 h-4 text-[#0876B9]" /> },
    { name: 'Automotive', icon: <Car className="w-4 h-4 text-[#0876B9]" /> },
    { name: 'Fintech and Blockchain', icon: <Landmark className="w-4 h-4 text-[#0876B9]" /> },
    { name: 'Media & Entertainment', icon: <Film className="w-4 h-4 text-[#0876B9]" /> },
    { name: 'Retail & E-Commerce', icon: <ShoppingBag className="w-4 h-4 text-[#0876B9]" /> },
    { name: 'Education', icon: <GraduationCap className="w-4 h-4 text-[#0876B9]" /> },
    { name: 'Enterprise Technology', icon: <Layers className="w-4 h-4 text-[#0876B9]" /> },
    { name: 'Government & Public Sector', icon: <Building2 className="w-4 h-4 text-[#0876B9]" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-modal-title"
        >
          {/* Backdrop with sophisticated soft blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container: Perfectly fitted for Desktop/Laptop without any internal scrollbar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl flex flex-col rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 my-auto text-slate-900 bg-gradient-to-br from-[#FFF5EE] via-[#FCFDFC] to-[#F0F7FF] select-text selection:bg-[#38BDF8]/30 selection:text-slate-900 focus:outline-none"
          >
            {/* Premium Soft Gradient Atmosphere (Light Orange to Light Blue with delicate slow diffusion) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              {/* Soft Light Orange / Peach Ambient Diffusion (Top-Left) */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.08, 1],
                  x: [0, 15, 0],
                  y: [0, -10, 0],
                  opacity: [0.38, 0.48, 0.38]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[15%] -left-[10%] w-[380px] h-[380px] rounded-full bg-[#F08A64] lg:bg-[#EA774C] blur-[90px]" 
              />

              {/* Soft Light Blue / Cyan Ambient Diffusion (Bottom-Right) */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  x: [0, -20, 0],
                  y: [0, 15, 0],
                  opacity: [0.35, 0.45, 0.35]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-[20%] -right-[10%] w-[420px] h-[420px] rounded-full bg-[#38BDF8] lg:bg-[#0284C7] blur-[95px]" 
              />

              {/* Warm Soft Cream / Subtle Amber Accent Glow (Top-Right / Center) */}
              <motion.div 
                animate={{ 
                  opacity: [0.25, 0.35, 0.25],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[10%] right-[15%] w-[280px] h-[280px] rounded-full bg-[#FFE58A] blur-[80px]" 
              />

              {/* Gentle Translucent Shield ensuring crystal-clear text contrast */}
              <div className="absolute inset-0 bg-white/45 backdrop-blur-[2px]" />
            </div>

            {/* Top Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close welcome dialog"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-1.5 rounded-full bg-slate-100/90 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Inner Body: On Mobile/Tablet allows scroll if needed; On Desktop/Laptop fits completely with ZERO scroll */}
            <div className="relative z-10 p-4 sm:p-6 md:p-7 flex flex-col max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-visible">
              
              {/* Header Branding Bar: Top Left (Drish Infotech) & Top Right (Microsoft Partner) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 pb-3 sm:pb-3.5 border-b border-slate-200/70 pr-8 sm:pr-10 shrink-0">
                {/* Top Left — Company Branding */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
                    <Logo className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-xs sm:text-sm md:text-base tracking-tight text-slate-900 leading-tight">
                      DRISH INFOTECH
                    </span>
                    <span className="font-sans text-[9px] sm:text-[11px] text-slate-500 font-medium tracking-wide">
                      AI-Powered Solutions &bull; Since 1999
                    </span>
                  </div>
                </div>

                {/* Top Right — Microsoft Gold Certified Partner Credential */}
                <div className="flex items-center gap-2 bg-white/85 border border-slate-200/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md shrink-0 self-start sm:self-auto shadow-2xs">
                  {/* Official Microsoft 4-square icon */}
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 grid grid-cols-2 gap-0.5 shrink-0" aria-label="Microsoft Logo">
                    <div className="bg-[#F25022] rounded-[0.5px]" />
                    <div className="bg-[#7FBA00] rounded-[0.5px]" />
                    <div className="bg-[#00A4EF] rounded-[0.5px]" />
                    <div className="bg-[#FFB900] rounded-[0.5px]" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-800 leading-none">
                        Microsoft Partner
                      </span>
                      <Award className="w-3 h-3 text-[#0876B9]" />
                    </div>
                    <span className="text-[8.5px] sm:text-[9.5px] text-slate-500 font-medium leading-tight">
                      Gold Certified Partner
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Message Section — Clean, proportional typography for desktop & laptop */}
              <div className="py-3 sm:py-4 md:py-5 text-center max-w-xl mx-auto space-y-2 sm:space-y-2.5 shrink-0">
                {/* Eyebrow badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0876B9] text-[9.5px] sm:text-[11px] font-semibold tracking-wider uppercase border border-blue-200/80">
                  <Sparkles className="w-3 h-3 text-[#E2725B]" />
                  <span>Next-Generation Enterprise Intelligence</span>
                </div>

                {/* Main Headline */}
                <h2 
                  id="welcome-modal-title"
                  className="text-lg sm:text-2xl md:text-[1.65rem] lg:text-[1.75rem] font-extrabold text-slate-900 font-sans tracking-tight leading-snug sm:leading-tight"
                >
                  POWERING THE NEXT GENERATION OF INTELLIGENT TECHNOLOGY
                </h2>

                {/* Core Pillars Subhead */}
                <p className="text-[10px] sm:text-xs md:text-xs font-bold tracking-[0.14em] text-[#0876B9] uppercase font-sans">
                  AI &bull; CYBERSECURITY &bull; CLOUD &bull; AUTOMATION
                </p>

                {/* Concise Intro Copy */}
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 font-normal leading-relaxed max-w-lg mx-auto">
                  We help enterprises turn technology challenges into business outcomes through AI-powered solutions, advanced engineering, and intelligent innovation.
                </p>
              </div>

              {/* Industries We Serve Grid — Controlled compact card sizing */}
              <div className="pb-3 sm:pb-4 shrink-0">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.18em] text-slate-500 text-center mb-2 sm:mb-2.5">
                  Industries We Serve
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 md:gap-2.5">
                  {industries.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 px-2 py-1.5 sm:px-2.5 sm:py-2 bg-white/85 border border-slate-200/80 rounded-md hover:border-[#0876B9]/60 hover:bg-[#F0F7FF] transition-colors shadow-2xs text-slate-800"
                    >
                      <div className="p-1 rounded bg-[#F0F7FF] shadow-2xs border border-blue-200/50 shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-[10.5px] sm:text-xs font-semibold text-slate-800 leading-tight">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-2.5 sm:pt-3 border-t border-slate-200/70 flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-end gap-2 sm:gap-3 shrink-0 mt-auto">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors text-center cursor-pointer shadow-2xs"
                >
                  Enter Website
                </button>
                <button
                  type="button"
                  onClick={handleExploreSolutions}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2 bg-[#0876B9] hover:bg-[#065E94] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Our Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

WelcomeModal.displayName = 'WelcomeModal';
