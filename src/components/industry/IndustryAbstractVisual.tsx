import { memo } from 'react';
import { motion } from 'motion/react';
import { Industry } from './IndustryData';

interface IndustryAbstractVisualProps {
  industry: Industry;
}

export const IndustryAbstractVisual = memo(function IndustryAbstractVisual({
  industry,
}: IndustryAbstractVisualProps) {
  const { id, accentColor } = industry;

  // Render bespoke abstract geometry for each industry ID
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] md:min-h-[340px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6F0] to-[#F5EFE6] border border-stone-200/60 shadow-inner">
      {/* Background Subtle Gradient & Concentric Ring Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="industry-grid-pattern" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="1" fill="#78716C" fillOpacity="0.18" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#industry-grid-pattern)" />
        </svg>
      </div>

      {/* Ambient Soft Glow Behind Art */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-56 h-56 rounded-full pointer-events-none blur-3xl"
        style={{
          backgroundColor: accentColor,
          opacity: 0.25,
        }}
      />

      {/* Dynamic Abstract Industry SVGs */}
      <div className="relative z-10 w-full max-w-[340px] aspect-square flex items-center justify-center p-4">
        {id === 'real-estate' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Isometric architectural volumes */}
            <motion.path
              d="M100 30 L155 60 L100 90 L45 60 Z"
              fill="#FFF7ED"
              stroke="#EA580C"
              strokeWidth="2"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d="M45 60 L100 90 L100 160 L45 130 Z"
              fill="#F97316"
              fillOpacity="0.15"
              stroke="#EA580C"
              strokeWidth="2"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            />
            <motion.path
              d="M100 90 L155 60 L155 130 L100 160 Z"
              fill="#EA580C"
              fillOpacity="0.25"
              stroke="#EA580C"
              strokeWidth="2"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            {/* Glass architectural canopy */}
            <motion.path
              d="M100 65 L135 85 L100 105 L65 85 Z"
              fill="#10B981"
              fillOpacity="0.2"
              stroke="#10B981"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '100px 85px' }}
            />
            {/* Sensor nodes */}
            <circle cx="100" cy="30" r="4" fill="#EA580C" />
            <circle cx="155" cy="60" r="4" fill="#10B981" />
            <circle cx="45" cy="60" r="4" fill="#EA580C" />
            <circle cx="100" cy="160" r="4" fill="#10B981" />
          </svg>
        )}

        {id === 'tele-medicine' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Concentric Telemetry Vital Rings */}
            <motion.circle
              cx="100"
              cy="100"
              r="68"
              fill="none"
              stroke="#059669"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle
              cx="100"
              cy="100"
              r="48"
              fill="#ECFDF5"
              stroke="#10B981"
              strokeWidth="2"
            />
            {/* Health cross geometry */}
            <path
              d="M93 72 H107 V93 H128 V107 H107 V128 H93 V107 H72 V93 H93 Z"
              fill="#059669"
              fillOpacity="0.85"
            />
            {/* ECG Pulse Wave Overlay */}
            <motion.path
              d="M35 100 L70 100 L80 82 L90 118 L100 90 L110 110 L120 100 L165 100"
              fill="none"
              stroke="#EA580C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
            />
          </svg>
        )}

        {id === 'fintech-blockchain' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Interconnected Blockchain ledger nodes */}
            <motion.polygon
              points="100,28 162,64 162,136 100,172 38,136 38,64"
              fill="#F0F9FF"
              stroke="#0284C7"
              strokeWidth="2"
              strokeDasharray="4 3"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '100px 100px' }}
            />
            {/* Microsecond settlement transaction cube */}
            <path d="M100 55 L135 75 L100 95 L65 75 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
            <path d="M65 75 L100 95 L100 135 L65 115 Z" fill="#0284C7" fillOpacity="0.3" stroke="#0284C7" strokeWidth="2" />
            <path d="M100 95 L135 75 L135 115 L100 135 Z" fill="#0284C7" fillOpacity="0.5" stroke="#0284C7" strokeWidth="2" />
            {/* Tokenized cryptographic points */}
            <circle cx="100" cy="28" r="5" fill="#F97316" />
            <circle cx="162" cy="64" r="5" fill="#059669" />
            <circle cx="162" cy="136" r="5" fill="#0284C7" />
            <circle cx="100" cy="172" r="5" fill="#F97316" />
            <circle cx="38" cy="136" r="5" fill="#059669" />
            <circle cx="38" cy="64" r="5" fill="#0284C7" />
          </svg>
        )}

        {id === 'tourism' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Orbital Navigation Coordinate Circles */}
            <circle cx="100" cy="100" r="65" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
            <ellipse cx="100" cy="100" rx="65" ry="24" fill="none" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />
            <ellipse cx="100" cy="100" rx="24" ry="65" fill="none" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Compass / Destination vector */}
            <motion.path
              d="M100 45 L112 88 L155 100 L112 112 L100 155 L88 112 L45 100 L88 88 Z"
              fill="#D97706"
              fillOpacity="0.25"
              stroke="#D97706"
              strokeWidth="2"
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '100px 100px' }}
            />
            <circle cx="100" cy="100" r="6" fill="#EA580C" />
          </svg>
        )}

        {id === 'media-entertainment' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Dynamic streaming waveform spectrum */}
            {[25, 45, 65, 85, 105, 125, 145, 165].map((x, i) => (
              <motion.line
                key={x}
                x1={x}
                y1={100}
                x2={x}
                y2={100}
                stroke="#7C3AED"
                strokeWidth="5"
                strokeLinecap="round"
                animate={{
                  y1: [100 - (18 + (i % 4) * 14), 100 - (6 + (i % 3) * 8), 100 - (18 + (i % 4) * 14)],
                  y2: [100 + (18 + (i % 4) * 14), 100 + (6 + (i % 3) * 8), 100 + (18 + (i % 4) * 14)],
                }}
                transition={{
                  duration: 1.2 + (i % 3) * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
            {/* Central Play Prism */}
            <polygon points="92,85 118,100 92,115" fill="#F97316" />
          </svg>
        )}

        {id === 'government' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Secure Zero-Trust Public Shield */}
            <motion.path
              d="M100 35 L150 55 V105 C150 138 100 165 100 165 C100 165 50 138 50 105 V55 Z"
              fill="#F0FDFA"
              stroke="#0F766E"
              strokeWidth="2.5"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            {/* Civic Pillars */}
            <rect x="72" y="80" width="8" height="42" rx="2" fill="#0F766E" fillOpacity="0.4" />
            <rect x="96" y="80" width="8" height="42" rx="2" fill="#0F766E" fillOpacity="0.7" />
            <rect x="120" y="80" width="8" height="42" rx="2" fill="#0F766E" fillOpacity="0.4" />
            <path d="M64 74 L100 58 L136 74 Z" fill="#0F766E" />
            <rect x="64" y="126" width="72" height="6" rx="1" fill="#0F766E" />
          </svg>
        )}

        {id === 'ngo-donations' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Community concentric waves */}
            <motion.circle
              cx="100"
              cy="100"
              r="62"
              fill="none"
              stroke="#16A34A"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="100" cy="100" r="42" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
            {/* Heart & Sharing node */}
            <path
              d="M100 118 C100 118 80 102 74 92 C68 82 74 72 84 72 C91 72 97 76 100 81 C103 76 109 72 116 72 C126 72 132 82 126 92 C120 102 100 118 100 118 Z"
              fill="#16A34A"
              fillOpacity="0.8"
            />
            {/* Impact dispersal satellite dots */}
            <circle cx="60" cy="65" r="4" fill="#EA580C" />
            <circle cx="140" cy="65" r="4" fill="#059669" />
            <circle cx="145" cy="135" r="4" fill="#EA580C" />
            <circle cx="55" cy="135" r="4" fill="#059669" />
          </svg>
        )}

        {id === 'education' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Knowledge neural lattice */}
            <polygon points="100,45 155,75 100,105 45,75" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
            <path d="M60 85 V125 C60 140 100 152 100 152 C100 152 140 140 140 125 V85" fill="none" stroke="#EA580C" strokeWidth="2" />
            {/* Graduation tassel ray */}
            <line x1="155" y1="75" x2="168" y2="115" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="168" cy="118" r="4" fill="#059669" />
            {/* Neural nodes */}
            <circle cx="100" cy="45" r="4" fill="#EA580C" />
            <circle cx="100" cy="105" r="4" fill="#059669" />
          </svg>
        )}

        {id === 'ecommerce' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Distributed Omni-channel Commerce Matrix */}
            <rect x="55" y="65" width="90" height="70" rx="10" fill="#FFF7ED" stroke="#C2410C" strokeWidth="2" />
            <path d="M78 65 V50 C78 38 122 38 122 50 V65" fill="none" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
            {/* Fast checkout arrow vector */}
            <motion.path
              d="M75 100 H125 M115 90 L125 100 L115 110"
              fill="none"
              stroke="#059669"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Fulfillment nodes */}
            <circle cx="55" cy="65" r="4" fill="#C2410C" />
            <circle cx="145" cy="65" r="4" fill="#059669" />
            <circle cx="145" cy="135" r="4" fill="#C2410C" />
            <circle cx="55" cy="135" r="4" fill="#059669" />
          </svg>
        )}

        {id === 'mobility' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Connected Transportation & LiDAR sweeps */}
            <motion.circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="#0284C7"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <path
              d="M60 115 L75 80 L125 80 L140 115 Z"
              fill="#E0F2FE"
              stroke="#0284C7"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <rect x="52" y="115" width="96" height="18" rx="6" fill="#0284C7" fillOpacity="0.4" stroke="#0284C7" strokeWidth="2" />
            <circle cx="72" cy="133" r="7" fill="#0F172A" />
            <circle cx="128" cy="133" r="7" fill="#0F172A" />
            {/* Telemetry wave */}
            <motion.path
              d="M100 65 Q115 50 130 65"
              fill="none"
              stroke="#F97316"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </svg>
        )}

        {id === 'aerospace' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Orbital trajectories and aerodynamic streamline vectors */}
            <ellipse cx="100" cy="100" rx="72" ry="32" fill="none" stroke="#047857" strokeWidth="1.5" strokeDasharray="6 4" transform="rotate(-25 100 100)" />
            <motion.path
              d="M100 35 L118 85 L165 105 L118 115 L100 165 L82 115 L35 105 L82 85 Z"
              fill="#ECFDF5"
              stroke="#047857"
              strokeWidth="2"
              strokeLinejoin="round"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '100px 100px' }}
            />
            <circle cx="100" cy="100" r="8" fill="#EA580C" />
          </svg>
        )}

        {id === 'embedded' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Microcontroller Silicon & Hardware Bus Tracks */}
            <rect x="65" y="65" width="70" height="70" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            {/* Chip pins */}
            {[-25, -12, 0, 12, 25].map((offset) => (
              <g key={offset}>
                <line x1={100 + offset} y1="48" x2={100 + offset} y2="65" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
                <line x1={100 + offset} y1="135" x2={100 + offset} y2="152" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="48" y1={100 + offset} x2="65" y2={100 + offset} stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="135" y1={100 + offset} x2="152" y2={100 + offset} stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            ))}
            <circle cx="80" cy="80" r="3" fill="#D97706" />
            <path d="M85 100 H115 V115" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}

        {id === 'genetic-ai' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            {/* Algorithmic DNA double-helix nodes */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '100px 100px' }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + Math.cos(rad) * 55;
                const y1 = 100 + Math.sin(rad) * 55;
                const x2 = 100 - Math.cos(rad) * 55;
                const y2 = 100 - Math.sin(rad) * 55;
                return (
                  <g key={idx}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#059669" strokeWidth="1.5" strokeOpacity="0.4" />
                    <circle cx={x1} cy={y1} r="4.5" fill="#059669" />
                    <circle cx={x2} cy={y2} r="4.5" fill="#EA580C" />
                  </g>
                );
              })}
            </motion.g>
            <circle cx="100" cy="100" r="14" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
            <circle cx="100" cy="100" r="5" fill="#EA580C" />
          </svg>
        )}
      </div>
    </div>
  );
});

IndustryAbstractVisual.displayName = 'IndustryAbstractVisual';
