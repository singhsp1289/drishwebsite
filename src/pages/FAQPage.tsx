import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { FAQ } from '../components/FAQ';
import { Stats } from '../components/Stats';

export const FAQPage = memo(function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24">
      {/* Breadcrumb */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Frequently Asked Questions</span>
        </div>
      </div>

      {/* Hero / Page Intro */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FA] border-b border-slate-200/80">
        <div className="w-full px-[8%] text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#E2725B]" />
            <span>Knowledge & Technical Consultation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Frequently Asked <br />
            <span className="text-[#0876B9]">Engineering Questions</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Find answers to common questions about our technical capabilities, AI-powered QA frameworks, embedded drivers, cloud architectures, security standards, and engagement models.
          </p>
        </div>
      </section>

      {/* All FAQ Questions, Answers, Search & Accordions */}
      <FAQ />

      {/* Section with: py-14 bg-[#F8FAFC] border-b border-slate-200/80 relative */}
      <Stats />
    </div>
  );
});

FAQPage.displayName = 'FAQPage';
