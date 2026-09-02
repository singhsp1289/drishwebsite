import { memo } from 'react';
import { motion } from 'motion/react';
import { Industry } from './IndustryData';

interface IndustryImageVisualProps {
  industry: Industry;
}

export const IndustryImageVisual = memo(function IndustryImageVisual({ industry }: IndustryImageVisualProps) {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 group">
      {/* Real photographic image with smooth rendering */}
      <motion.img
        key={industry.id}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        src={industry.image}
        alt={industry.imageAlt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out"
      />

      {/* Subtle bottom gradient scrim for light theme enterprise legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent pointer-events-none" />

      {/* Overlay contextual indicator */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
        <span className="text-[11px] sm:text-xs font-semibold text-white/95 bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 tracking-wide">
          {industry.badge}
        </span>
        <span className="text-[11px] font-mono font-medium text-white/80 bg-slate-900/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
          {industry.number} / 13
        </span>
      </div>
    </div>
  );
});

IndustryImageVisual.displayName = 'IndustryImageVisual';
