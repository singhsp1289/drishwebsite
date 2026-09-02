import { memo } from 'react';

interface ClientCompanyLogoProps {
  slug?: string;
  companyName?: string;
  className?: string;
}

export const ClientCompanyLogo = memo(function ClientCompanyLogo({
  slug = '',
  companyName = '',
  className = 'w-8 h-8',
}: ClientCompanyLogoProps) {
  const normSlug = (slug || '').toLowerCase();
  const normName = (companyName || '').toLowerCase();

  // 1. Duraton Cement
  if (normSlug.includes('duraton') || normName.includes('duraton')) {
    return (
      <div
        className={`${className} flex items-center justify-center rounded-md bg-white border border-slate-100 shadow-xs p-0.5 overflow-hidden`}
        title="Duraton Cement"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hexagonal Concrete Shield Emblem */}
          <polygon points="50,4 92,26 92,74 50,96 8,74 8,26" fill="#C41230" />
          <polygon points="50,10 86,29 86,71 50,90 14,71 14,29" fill="#9B0D24" />
          {/* Golden Facet Accent */}
          <polygon points="50,10 86,29 86,71 50,50" fill="#F59E0B" fillOpacity="0.9" />
          <polygon points="50,50 86,71 50,90" fill="#D97706" />
          <polygon points="14,29 50,10 50,50" fill="#E11D48" />
          <polygon points="14,29 50,50 14,71" fill="#BE123C" />
          <polygon points="14,71 50,50 50,90" fill="#881337" />
          {/* Inner Bold 'D' Construct */}
          <path
            d="M36 28 H52 C64 28 72 36 72 50 C72 64 64 72 52 72 H36 V28 Z"
            fill="#FFFFFF"
          />
          <path
            d="M44 38 H51 C57 38 62 43 62 50 C62 57 57 62 51 62 H44 V38 Z"
            fill="#C41230"
          />
        </svg>
      </div>
    );
  }

  // 2. iSON / ISON (ISON Technologies / iSON Xperiences)
  if (normSlug.includes('ison') || normName.includes('ison')) {
    return (
      <div
        className={`${className} flex items-center justify-center rounded-md bg-[#002D62] text-white shadow-xs p-1 overflow-hidden`}
        title="iSON"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lowercase 'i' with vibrant Red Accent Dot */}
          <circle cx="28" cy="24" r="9" fill="#E53935" />
          <rect x="20" y="40" width="16" height="42" rx="4" fill="#FFFFFF" />
          {/* Stylized 'SON' Wave / Interconnected Loop */}
          <path
            d="M48 45 C48 40 54 36 62 36 C70 36 76 40 76 45 C76 56 48 54 48 68 C48 78 55 82 64 82 C72 82 78 77 78 72"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Precision Red Accent Indicator */}
          <circle cx="82" cy="40" r="4" fill="#E53935" />
        </svg>
      </div>
    );
  }

  // 3. Busibud (BusiBud AI Customer Suite)
  if (normSlug.includes('busibud') || normName.includes('busibud')) {
    return (
      <div
        className={`${className} flex items-center justify-center rounded-md bg-gradient-to-br from-[#4F46E5] to-[#0284C7] text-white shadow-xs p-1 overflow-hidden`}
        title="Busibud"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Modern Interlocking 'B' Chat & Node Emblem */}
          <path
            d="M24 22 H54 C66 22 74 29 74 39 C74 46 70 51 63 53 C72 56 78 62 78 71 C78 82 68 89 54 89 H24 V22 Z"
            fill="#FFFFFF"
          />
          {/* Upper Chat Bubble Negative Space */}
          <rect x="36" y="32" width="18" height="13" rx="3" fill="#4F46E5" />
          {/* Lower Chat Bubble Negative Space */}
          <rect x="36" y="64" width="22" height="15" rx="3" fill="#0284C7" />
          {/* AI Connection Glow Dot */}
          <circle cx="68" cy="38" r="4" fill="#38BDF8" />
        </svg>
      </div>
    );
  }

  // 4. Fitelo (Fitelo Health & Wellness)
  if (normSlug.includes('fitelo') || normName.includes('fitelo')) {
    return (
      <div
        className={`${className} flex items-center justify-center rounded-md bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white shadow-xs p-1 overflow-hidden`}
        title="Fitelo"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fitelo Transformation Leaf & Ribbon (Mint Cyan + Honey Orange) */}
          <path
            d="M50 12 C68 12 84 28 84 50 C84 68 70 82 52 86 C32 86 16 70 16 50 C16 32 30 18 48 14"
            stroke="#14B8A6"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Dynamic Energetic Orange Wing / Ribbon */}
          <path
            d="M32 58 C36 42 48 30 64 26 C64 42 54 54 38 60"
            fill="#FB923C"
          />
          <path
            d="M44 74 C54 66 62 54 66 40 C72 52 68 66 54 74 Z"
            fill="#F97316"
          />
          <circle cx="64" cy="26" r="5" fill="#FDBA74" />
        </svg>
      </div>
    );
  }

  // 5. Fujifilm
  if (normSlug.includes('fujifilm') || normName.includes('fuji')) {
    return (
      <div
        className={`${className} flex items-center justify-center rounded-md bg-white border border-slate-200 shadow-xs p-1 overflow-hidden`}
        title="FUJIFILM"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill="#FFFFFF" />
          {/* Iconic FUJIFILM Slash with Red Rectangle */}
          <rect x="42" y="24" width="16" height="52" fill="#ED1B24" rx="2" />
          <path d="M20 28 H38 V40 H28 V48 H36 V60 H28 V76 H20 V28 Z" fill="#111827" />
          <path d="M62 28 H80 V40 H70 V48 H78 V60 H70 V76 H62 V28 Z" fill="#111827" />
        </svg>
      </div>
    );
  }

  // 6. Siemens
  if (normSlug.includes('siemens') || normName.includes('siemens')) {
    return (
      <div
        className={`${className} flex items-center justify-center rounded-md bg-[#00646E] text-white shadow-xs p-1 overflow-hidden`}
        title="Siemens"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="32"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            letterSpacing="-1"
          >
            SI
          </text>
        </svg>
      </div>
    );
  }

  // Generic fallback: elegant initial badge
  const initial = (companyName || slug || 'C').charAt(0).toUpperCase();
  return (
    <div
      className={`${className} flex items-center justify-center rounded-md bg-gradient-to-br from-[#0876B9] to-[#031F35] text-white font-bold text-xs shadow-xs`}
    >
      {initial}
    </div>
  );
});

ClientCompanyLogo.displayName = 'ClientCompanyLogo';
