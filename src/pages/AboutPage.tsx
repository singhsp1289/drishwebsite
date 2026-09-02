import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Award, 
  Calendar, 
  ShieldCheck, 
  Users, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Building2,
  Cpu
} from 'lucide-react';
import { Logo } from '../components/Logo';

export const AboutPage = memo(function AboutPage() {
  const milestones = [
    { year: '1999', title: 'Foundation & Core Systems', desc: 'Established as an engineering-driven technology company specializing in software and low-level firmware.' },
    { year: '2008', title: 'Global Enterprise Footprint', desc: 'Expanded delivery centers across North America and Europe, engineering mission-critical applications.' },
    { year: '2016', title: 'Cloud & IoT Specialization', desc: 'Pioneered connected industrial IoT systems, enterprise AWS/Azure architectures, and automated CI/CD.' },
    { year: 'Present', title: 'AI-Powered Engineering Era', desc: 'Deploying state-of-the-art Generative AI, Agentic workflows, and Autonomous Quality Engineering.' }
  ];

  const values = [
    {
      title: 'Engineering Rigor',
      desc: 'We prioritize deep technical craftsmanship, clean modular architecture, and zero-defect quality over shortcuts.',
      icon: <Cpu className="w-6 h-6 text-[#0876B9]" />
    },
    {
      title: 'Enterprise Trust & Compliance',
      desc: 'ISO certified and Microsoft Gold Partner standards ensuring absolute data confidentiality and security.',
      icon: <ShieldCheck className="w-6 h-6 text-[#0876B9]" />
    },
    {
      title: 'Global Delivery Excellence',
      desc: 'Seamless collaboration across international time zones with dedicated multidisciplinary engineering teams.',
      icon: <Globe className="w-6 h-6 text-[#0876B9]" />
    },
    {
      title: 'Continuous Innovation',
      desc: 'Pioneering emerging technologies including Agentic AI, Autonomous Test Automation, and Edge Telemetry.',
      icon: <Sparkles className="w-6 h-6 text-[#0876B9]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">About Drish Infotech</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FF] border-b border-slate-200/80 relative overflow-hidden">
        <div className="w-full px-[8%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>25+ Years of Engineering Excellence</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Architecting Intelligence & Scalable Systems <br />
                <span className="text-[#0876B9]">Since 1999.</span>
              </h1>

              <p className="text-lg text-slate-700 leading-relaxed font-normal mb-8">
                Drish Infotech Limited is a premier global technology engineering company. We partner with enterprises, hyper-growth startups, and Fortune 500 organizations to build high-performance software, AI-powered automation, custom device drivers, and cloud architectures.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-7 py-3.5 bg-[#0876B9] text-white hover:bg-[#065E94] transition-all text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-md shadow-[#0876B9]/20 flex items-center gap-2"
                >
                  <span>Connect With Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/case-studies"
                  className="px-7 py-3.5 bg-white text-slate-800 hover:bg-slate-50 transition-all border border-slate-300 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-2xs flex items-center justify-center"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-lg bg-white border border-slate-200 shadow-xl relative">
                {/* Brand Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Logo className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      DRISH INFOTECH LIMITED
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">
                      Engineering-First Organization
                    </p>
                  </div>
                </div>

                {/* Microsoft Gold Partner Card */}
                <div className="flex items-center gap-3 p-4 bg-[#F8FAFC] border border-slate-200 rounded-sm mb-4">
                  <div className="w-6 h-6 grid grid-cols-2 gap-0.5">
                    <div className="bg-[#F25022]" />
                    <div className="bg-[#7FBA00]" />
                    <div className="bg-[#00A4EF]" />
                    <div className="bg-[#FFB900]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Microsoft Gold Certified Partner</div>
                    <div className="text-[11px] text-slate-500">Highest tier engineering competency</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-blue-50/50 rounded border border-blue-100">
                    <div className="text-2xl font-bold text-[#0876B9]">5,000+</div>
                    <div className="text-xs text-slate-600 font-medium">Projects Delivered</div>
                  </div>
                  <div className="p-4 bg-blue-50/50 rounded border border-blue-100">
                    <div className="text-2xl font-bold text-[#0876B9]">25+</div>
                    <div className="text-xs text-slate-600 font-medium">Years In Industry</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="w-full px-[8%]">
          <div className="max-w-4xl mb-10 md:mb-12 text-center mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
              Our Core Pillars
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Guided by engineering discipline and{' '}
              <span className="text-[#0876B9]">measurable value.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="p-8 rounded-sm bg-white border border-slate-200/80 shadow-2xs hover:border-[#0876B9]/40 transition-all">
                <div className="w-12 h-12 rounded-sm bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {v.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
        <div className="w-full px-[8%]">
          <div className="max-w-4xl mb-10 md:mb-12 text-center mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
              Company Journey
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              A quarter-century of continuous{' '}
              <span className="text-[#0876B9]">engineering evolution.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative p-6 rounded-sm bg-[#F8FAFC] border border-slate-200/80">
                <div className="text-2xl font-extrabold text-[#0876B9] mb-2 font-sans">
                  {m.year}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-slate-200/80 text-center">
        <div className="w-full px-[8%] max-w-4xl">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
            Global Footprint
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-10">
            Serving clients globally from{' '}
            <span className="text-[#0876B9]">strategic engineering hubs.</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-sm border border-slate-200 shadow-2xs">
              <Building2 className="w-6 h-6 text-[#0876B9] mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">United States</h4>
              <p className="text-xs text-slate-500">New York &bull; Client Delivery & Consulting</p>
            </div>
            <div className="p-6 bg-white rounded-sm border border-slate-200 shadow-2xs">
              <Building2 className="w-6 h-6 text-[#0876B9] mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">United Kingdom</h4>
              <p className="text-xs text-slate-500">London &bull; European Operations</p>
            </div>
            <div className="p-6 bg-white rounded-sm border border-slate-200 shadow-2xs">
              <Building2 className="w-6 h-6 text-[#0876B9] mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">India</h4>
              <p className="text-xs text-slate-500">Chandigarh & Bangalore &bull; R&D Center</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

AboutPage.displayName = 'AboutPage';
