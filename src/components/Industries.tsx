import { useState, useEffect, useRef, memo, useCallback, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Pause,
  Play,
  CheckCircle2,
  HeartPulse,
  Landmark,
  Clapperboard,
  GraduationCap,
  ShoppingBag,
  Building2,
  Building,
  Compass,
  HeartHandshake,
} from 'lucide-react';
import { INDUSTRIES_LIST, Industry } from './industry/IndustryData';

// Sector-specific subtle line icons for each industry
const INDUSTRY_ICONS: Record<string, ReactNode> = {
  healthcare: <HeartPulse className="w-4 h-4" />,
  fintech: <Landmark className="w-4 h-4" />,
  media: <Clapperboard className="w-4 h-4" />,
  education: <GraduationCap className="w-4 h-4" />,
  retail: <ShoppingBag className="w-4 h-4" />,
  government: <Building2 className="w-4 h-4" />,
  'real-estate': <Building className="w-4 h-4" />,
  tourism: <Compass className="w-4 h-4" />,
  'ngo-donations': <HeartHandshake className="w-4 h-4" />,
};

const AUTO_SCROLL_INTERVAL = 4500; // 4.5 seconds per industry slide
const VISIBLE_COUNT = 5;
const ITEM_HEIGHT = 68; // Height of each industry item card in px
const ITEM_GAP = 8; // Gap between items in px
const SLOT_HEIGHT = ITEM_HEIGHT + ITEM_GAP; // 76px per slot
const VIEWPORT_HEIGHT = VISIBLE_COUNT * SLOT_HEIGHT - ITEM_GAP; // 372px for exactly 5 visible items

export const Industries = memo(function Industries() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndustry: Industry = INDUSTRIES_LIST[activeIndex] || INDUSTRIES_LIST[0];

  // Auto-scroll loop
  useEffect(() => {
    if (isPaused || isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % INDUSTRIES_LIST.length);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, isHovered]);

  // Smooth scroll sync for the 5-item visible viewport
  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;

    const maxScroll = (INDUSTRIES_LIST.length - VISIBLE_COUNT) * SLOT_HEIGHT;
    let targetScroll = (activeIndex - 2) * SLOT_HEIGHT;
    if (targetScroll < 0) targetScroll = 0;
    if (targetScroll > maxScroll) targetScroll = maxScroll;

    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, [activeIndex]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  return (
    <section
      id="industries"
      className="py-16 md:py-20 bg-[#F8FAFC] relative border-t border-slate-200/80 overflow-hidden"
    >
      {/* Background Soft Ambient Accents: Light Orange (Top-Left) and Light Blue (Bottom-Right) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_left,rgba(240,138,100,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7),transparent_80%)] pointer-events-none" />

      {/* Controlled Max-Width Container (82-88% balanced width) */}
      <div className="w-full px-[8%] relative">
        
        {/* ============================================================ */}
        {/* CENTERED SECTION HEADER                                     */}
        {/* ============================================================ */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
              INDUSTRIES WE SERVE
            </p>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-3">
              Business Solutions for{' '}
              <span className="text-[#0876B9]">
                Your Industry
              </span>
            </h2>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              We combine deep engineering discipline with domain expertise to build software, connected systems, and intelligent platforms tailored to high-impact industries.
            </p>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* SHOWCASE FRAME: LIGHT ORANGE + LIGHT BLUE AMBIENT BACKGROUND */}
        {/* ============================================================ */}
        <div className="relative overflow-hidden">
          
          {/* Subtle Ambient Light Orange (Top-Left) & Light Blue (Bottom-Right) Diffusions */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
            {/* Soft Warm Light Orange / Peach Ambient Glow */}
            <div className="absolute -top-20 -left-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#F08A64]/18 blur-3xl" />
            <div className="absolute top-1/4 -left-10 w-56 h-56 rounded-full bg-[#E2725B]/10 blur-2xl" />
            
            {/* Soft Cool Light Blue / Sky Ambient Glow */}
            <div className="absolute -bottom-20 -right-20 w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-[#38BDF8]/20 blur-3xl" />
            <div className="absolute bottom-1/4 -right-10 w-64 h-64 rounded-full bg-[#0876B9]/12 blur-2xl" />
            
            {/* Delicate luminosity bridge to preserve crystal clarity */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
          </div>

          {/* EQUAL-HEIGHT TWO-COLUMN SHOWCASE */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch relative z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* ========================================================== */}
            {/* LEFT COLUMN: EXACTLY 5 VISIBLE INDUSTRIES (34% width)       */}
            {/* ========================================================== */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 h-auto lg:h-[460px]">
              
              {/* Top Control Bar */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Industry Selector
                </span>

                {/* Pause / Play Button (No numbers) */}
                <button
                  type="button"
                  onClick={togglePause}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer select-none ${
                    isPaused
                      ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                  }`}
                  title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                  aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-amber-700" />
                      <span>Play</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  )}
                </button>
              </div>

              {/* 5-Item Viewport Container with overflow: hidden */}
              <div className="relative overflow-hidden flex-1 flex flex-col justify-center">
                {/* Top gradient shadow mask */}
                <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

                {/* Scrollable list strictly constrained to 5 items height */}
                <div
                  ref={listContainerRef}
                  style={{ height: `${VIEWPORT_HEIGHT}px` }}
                  className="overflow-y-auto overflow-x-hidden flex flex-col space-y-[8px] pr-1 custom-scrollbar scroll-smooth relative"
                  role="tablist"
                  aria-label="Industries list (5 visible)"
                >
                  {INDUSTRIES_LIST.map((item, index) => {
                    const isSelected = activeIndex === index;
                    const itemIcon = INDUSTRY_ICONS[item.id] || <Building2 className="w-4 h-4" />;

                    return (
                      <button
                        key={item.id}
                        ref={(el) => {
                          itemRefs.current[index] = el;
                        }}
                        id={`industry-tab-${item.id}`}
                        role="tab"
                        aria-selected={isSelected}
                        aria-controls={`industry-panel-${item.id}`}
                        onClick={() => handleSelect(index)}
                        style={{ height: `${ITEM_HEIGHT}px` }}
                        className={`relative w-full shrink-0 text-left px-3.5 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer border select-none ${
                          isSelected
                            ? 'bg-blue-50/70 border-[#1D4ED8]/30 shadow-xs'
                            : 'bg-slate-50/50 border-slate-200/50 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        {/* Left Active Indicator Bar */}
                        {isSelected && (
                          <motion.div
                            layoutId="activeIndustryIndicator"
                            className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#1D4ED8]"
                            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                          />
                        )}

                        <div className="flex items-center space-x-3 min-w-0 pr-2">
                          {/* Sector-Specific Line Icon (No Numbers) */}
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-[#1D4ED8] text-white shadow-2xs'
                                : 'bg-white border border-slate-200/80 text-slate-600 group-hover:text-[#1D4ED8] group-hover:border-blue-200'
                            }`}
                          >
                            {itemIcon}
                          </div>

                          {/* Industry Title */}
                          <div className="min-w-0">
                            <h3
                              className={`text-xs sm:text-base font-bold tracking-tight truncate transition-colors ${
                                isSelected
                                  ? 'text-slate-900 font-extrabold'
                                  : 'text-slate-700 group-hover:text-slate-900'
                              }`}
                            >
                              {item.title}
                            </h3>
                            <p className="text-sm text-slate-600 truncate mt-0.5 font-normal">
                              {item.badge}
                            </p>
                          </div>
                        </div>

                        {/* Right Indicator Chevron */}
                        <div className="shrink-0 pl-1">
                          <ChevronRight
                            className={`w-4 h-4 transition-all duration-200 ${
                              isSelected
                                ? 'text-[#1D4ED8] translate-x-0.5'
                                : 'text-slate-400 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom gradient shadow mask */}
                <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
              </div>

              {/* Subtle Active Progress Line */}
              <div className="pt-2 border-t border-slate-100">
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  {!isPaused && !isHovered && (
                    <motion.div
                      key={activeIndex}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_SCROLL_INTERVAL / 1000, ease: 'linear' }}
                      className="h-full bg-[#1D4ED8] rounded-full"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* ========================================================== */}
            {/* RIGHT COLUMN: EDITORIAL TEXT-WRAPPING DETAILS (66% width)  */}
            {/* ========================================================== */}
            <div className="lg:col-span-8">
              <div
                id={`industry-panel-${activeIndustry.id}`}
                role="tabpanel"
                aria-labelledby={`industry-tab-${activeIndustry.id}`}
                className="bg-gradient-to-br from-[#FFF5ED] via-[#FDFDFE] to-[#F0F7FF rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 lg:p-7 h-auto lg:h-[460px] flex flex-col justify-between overflow-hidden relative"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndustry.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex flex-col justify-between h-full"
                  >
                    {/* Top Editorial Block: Natural Image Floated on Top-Left with Text Wrapping Beside & Beneath */}
                    <div className="overflow-hidden">
                      {/* Natural Professional Photograph (Floated on Top-Left) */}
                      <div className="float-left mr-5 mb-3 w-[220px] sm:w-[280px] md:w-[320px] aspect-[4/3] rounded-xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-100 relative group shrink-0">
                        <img
                          src={activeIndustry.image}
                          alt={activeIndustry.imageAlt}
                          loading="eager"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none">
                          <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10 tracking-wide">
                            {activeIndustry.badge}
                          </span>
                        </div>
                      </div>

                      {/* Text that begins on the right of the image */}
                      <div>
                        {/* Short Domain Tag */}
                        <span className="inline-block text-sm font-bold uppercase tracking-wider text-[#1D4ED8] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 mb-1.5">
                          {activeIndustry.shortTitle}
                        </span>

                        {/* Main Industry Title */}
                        <h3 className="text-xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-1">
                          {activeIndustry.title}
                        </h3>

                        {/* Headline / Short Intro */}
                        <h4 className="text-xs sm:text-lg font-semibold text-[#0876B9] leading-snug mb-2">
                          {activeIndustry.headline}
                        </h4>

                        {/* Description that flows smoothly beside and then underneath the floated image */}
                        <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
                          {activeIndustry.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Content Area: Core Capabilities + CTA Actions */}
                    <div className="pt-3 mt-2 border-t border-slate-100 space-y-3">
                      {/* Core Technology Capabilities */}
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                          Core Technology Capabilities
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {activeIndustry.tags.map((tag) => (
                            <div
                              key={tag}
                              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action CTA Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <Link
                          to={`/industries/${activeIndustry.slug}`}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#1D4ED8] hover:bg-[#1E40AF] shadow-xs hover:shadow-sm transition-all group"
                        >
                          <span>Explore {activeIndustry.shortTitle} Solutions</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>

                        <Link
                          to="/industries"
                          className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5 px-2 rounded-lg hover:bg-slate-100/70"
                        >
                          <span>View All Industries</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Full Directory Navigation */}
        <div className="mt-8 md:mt-10 text-center">
          <Link
            to="/industries"
            aria-label="Explore Full Industry Solutions Directory"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors group cursor-pointer"
          >
            <span>Explore Full Industry Solutions Directory</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1D4ED8] group-hover:text-[#1E40AF] group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
});

Industries.displayName = 'Industries';
