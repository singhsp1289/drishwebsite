import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { api, TestimonialItem } from '../services/apiClient.ts';
import { ClientCompanyLogo } from './ClientCompanyLogo.tsx';

const fallbackTestimonials: TestimonialItem[] = [
  {
    id: 1,
    slug: 'duraton-cement',
    clientName: 'Rajiv Rampal',
    companyName: 'Duraton Cement',
    role: 'Head of Digital Initiatives',
    region: 'India',
    quote:
      'Drish developed, operated and managed the apps for our Loyalty mobile application (Duraton Soorme and Duraton Sathamb) and related infrastructure successfully for the past 3 years.',
    rating: 5,
    order: 1,
    isActive: true,
  },
  {
    id: 2,
    slug: 'ison',
    clientName: 'Engineering Leadership',
    companyName: 'ISON',
    role: 'Director of Technology',
    region: 'India, Middle East & Africa',
    quote:
      'Telecommunication Contact Center - Automated Report Generation. Drish engineered a high-throughput, dependable analytics and reporting pipeline across multiple carrier regions.',
    rating: 5,
    order: 2,
    isActive: true,
  },
  {
    id: 3,
    slug: 'busibud',
    clientName: 'Maxim',
    companyName: 'Busibud',
    role: 'Founder & Product Lead',
    region: 'North America / Global',
    quote:
      'Drish Infotech provided exceptional full-cycle engineering, modern scalable architecture, and responsive technical execution that allowed our platform to deploy features rapidly.',
    rating: 5,
    order: 3,
    isActive: true,
  },
  {
    id: 4,
    slug: 'fitelo',
    clientName: 'Sahil',
    companyName: 'Fitelo',
    role: 'Co-Founder & CTO',
    region: 'India & International',
    quote:
      'The engineering excellence, backend performance optimization, and quality assurance provided by Drish helped us scale our digital wellness and health application seamlessly to hundreds of thousands of users.',
    rating: 5,
    order: 4,
    isActive: true,
  },
];

export const Testimonials = memo(function Testimonials() {
  const [list, setList] = useState<TestimonialItem[]>(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.getTestimonials()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setList(data);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch testimonials from database, using initial data:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCards = list.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Automatic Horizontal Carousel / Auto-Scroller
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Touch Swipe for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-20 bg-[#F8FAFC] relative border-t border-slate-200/80 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0876B9]/8 via-transparent to-transparent pointer-events-none" />

      <div className="w-full px-[8%] relative z-10">
        {/* Center-Aligned Section Heading */}
        <div className="mb-10 md:mb-12 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
              Client Feedback
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              What our clients say about{' '}
              <span className="text-[#0876B9]">Drish Infotech</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal leading-relaxed max-w-2xl mx-auto">
              Trusted by businesses that rely on engineering, innovation and technology that delivers.
            </p>
          </motion.div>
        </div>

        {/* Single-Row Horizontal Carousel / Slider */}
        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out will-change-transform gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView + (cardsPerView > 1 ? 24 / cardsPerView : 0))}%)`,
            }}
          >
            {list.map((item) => (
              <div
                key={item.id}
                style={{
                  flex: `0 0 calc(${100 / cardsPerView}% - ${(24 * (cardsPerView - 1)) / cardsPerView}px)`,
                }}
                className="min-w-0"
              >
                <div className="h-full bg-white p-7 sm:p-8 rounded-sm border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#0876B9]/50 transition-all duration-300 flex flex-col justify-between relative group">
                  {/* Top Header */}
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div className="font-extrabold text-lg text-slate-800 tracking-tight flex items-center gap-2.5 min-w-0">
                      <ClientCompanyLogo slug={item.slug} companyName={item.companyName} className="w-7 h-7 shrink-0" />
                      <span className="truncate">{item.companyName}</span>
                    </div>
                    <Quote className="w-7 h-7 text-slate-200 group-hover:text-[#0876B9] transition-colors shrink-0" />
                  </div>

                  {/* Client Info & Rating Hierarchy */}
                  <div className="mb-5 pb-5 border-b border-slate-100">
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      {item.clientName}
                    </h4>
                    <div className="text-xs font-semibold text-[#0876B9] mt-0.5">
                      {item.role || item.companyName}
                      {item.region && (
                        <span className="text-slate-400 font-normal ml-1.5">
                          &bull; {item.region}
                        </span>
                      )}
                    </div>

                    {/* HD 5-Star Visuals */}
                    <div className="flex items-center gap-1 mt-2.5">
                      {[...Array(item.rating || 5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-4 h-4 fill-amber-400 text-amber-400 stroke-amber-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote Text */}
                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal italic grow font-['Calibri',_sans-serif]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators / Dots & Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full border border-slate-300/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === dotIdx
                    ? 'w-8 bg-[#0876B9]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full border border-slate-300/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';
