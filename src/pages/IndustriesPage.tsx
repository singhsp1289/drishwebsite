import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Activity, 
  DollarSign, 
  Radio, 
  Zap, 
  Truck, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  CheckCircle2,
  Lock,
  Cpu,
  Server,
  ShoppingBag,
  Film
} from 'lucide-react';

interface IndustryItem {
  id: string;
  name: string;
  badge: string;
  desc: string;
  icon: React.ReactNode;
  tags: string[];
  compliance: string;
  image: string;
  color: string;
}

const allIndustries: IndustryItem[] = [
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    badge: 'High-Compliance Digital Health',
    desc: 'Medical device IoMT firmware, AI clinical decision support systems, FHIR/HL7 interoperability bridges, and 21 CFR Part 11 automated QA validation.',
    icon: <Activity className="w-8 h-8 text-[#0876B9]" />,
    tags: ['HIPAA / HITECH', 'IoMT Firmware', 'FHIR / HL7', 'Clinical AI', 'FDA 21 CFR Part 11'],
    compliance: 'ISO 13485 & HIPAA',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=75&w=800',
    color: 'hover:border-[#0876B9]'
  },
  {
    id: 'fintech',
    name: 'Fintech and Blockchain',
    badge: 'Ultra-Secure FinTech & Blockchain',
    desc: 'High-concurrency payment orchestration, sub-100ms AI fraud detection, smart contract protocols, Open Banking APIs, and microsecond settlement infrastructure.',
    icon: <DollarSign className="w-8 h-8 text-[#0876B9]" />,
    tags: ['PCI-DSS Level 1', 'AI Fraud Detection', 'Smart Contracts', 'Low-Latency APIs', 'Tokenization'],
    compliance: 'SOC 2 Type II & PCI-DSS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=75&w=800',
    color: 'hover:border-[#0876B9]'
  },
  {
    id: 'telecom',
    name: 'Telecommunications & 5G Edge',
    badge: 'High-Throughput Network Systems',
    desc: 'Carrier-grade network function virtualization, 5G edge compute gateways, distributed streaming telemetry, and high-availability protocol drivers.',
    icon: <Radio className="w-8 h-8 text-[#0876B9]" />,
    tags: ['5G Edge Compute', 'NFV Protocols', 'Packet Routing', 'eBPF Telemetry', 'Zero-Downtime'],
    compliance: 'Carrier Grade 99.999%',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=75&w=800',
    color: 'hover:border-[#0876B9]'
  },
  {
    id: 'energy',
    name: 'Energy, Utilities & Smart Grid',
    badge: 'Critical Infrastructure & IoT',
    desc: 'Distributed Energy Resource Management (DERM), cyber-hardened substations, smart metering telemetry, and real-time grid load anomaly detection.',
    icon: <Zap className="w-8 h-8 text-[#D97706]" />,
    tags: ['Smart Grid Telemetry', 'SCADA Hardening', 'DERM Optimization', 'IoT Sensors', 'NERC CIP'],
    compliance: 'NERC CIP & ISO 27001',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=75&w=800',
    color: 'hover:border-[#D97706]'
  },
  {
    id: 'logistics',
    name: 'Supply Chain, Logistics & Fleet',
    badge: 'Fleet Telemetry & Route AI',
    desc: 'AI-driven route and load optimization, warehouse automation controllers, cold-chain sensor monitoring, and multi-modal logistics tracking.',
    icon: <Truck className="w-8 h-8 text-[#0876B9]" />,
    tags: ['Route AI Optimization', 'Cold-Chain IoT', 'Fleet Telematics', 'Warehouse Automation', 'EDI Integration'],
    compliance: 'ISO 28000 & TAPA',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=75&w=800',
    color: 'hover:border-[#0876B9]'
  },
  {
    id: 'retail',
    name: 'Retail & Digital Commerce',
    badge: 'Omnichannel & High-Concurreny Commerce',
    desc: 'Headless commerce backends, microservices architectures, real-time inventory synchronization across multi-store chains, and AI personalized checkout engines.',
    icon: <ShoppingBag className="w-8 h-8 text-[#E2725B]" />,
    tags: ['Headless Commerce', 'AI Personalization', 'POS Peripherals', 'Payment Gateways', 'PCI-DSS'],
    compliance: 'PCI-DSS Level 1 & SOC 2',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=75&w=800',
    color: 'hover:border-[#E2725B]'
  },
  {
    id: 'media',
    name: 'Media, Streaming & Entertainment',
    badge: 'Ultra-Low Latency Streaming & Content Tech',
    desc: 'Carrier-grade 4K/8K video streaming pipelines, multi-DRM cryptographic license security, real-time multimodal content AI, and cross-platform OTT player validation.',
    icon: <Film className="w-8 h-8 text-[#0876B9]" />,
    tags: ['HLS / DASH Transcoding', 'Multi-DRM Security', 'Content AI / NLP', 'OTT Verification', 'Multi-CDN'],
    compliance: 'SMPTE & MPA Security',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=75&w=800',
    color: 'hover:border-[#0876B9]'
  }
];

export const IndustriesPage = memo(function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Industries We Serve</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FF] border-b border-slate-200/80">
        <div className="w-full px-[8%] text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full Industries Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Advanced Engineering for <br />
            <span className="text-[#0876B9]">Mission-Critical Industries</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal mb-8">
            We combine AI, cybersecurity, cloud infrastructure, automation, and advanced IT engineering to solve complex challenges across industries where performance, reliability, and innovation matter.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0876B9] text-white hover:bg-[#065E94] transition-all text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-md shadow-[#0876B9]/20"
            >
              <span>Request Sector Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-800 hover:bg-slate-50 transition-all border border-slate-300 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-2xs"
            >
              <span>Explore Services Portfolio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Portfolio Grid */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="w-full px-[8%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allIndustries.map((ind, idx) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`p-6 rounded-sm bg-white border border-slate-200/80 ${ind.color} hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-sm bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-center shadow-2xs">
                      {ind.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0876B9] bg-[#0876B9]/10 px-2 py-0.5 rounded border border-[#0876B9]/20">
                      {ind.compliance}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {ind.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-5">
                    {ind.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-5 pt-3 border-t border-slate-100">
                    {ind.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded-sm border border-slate-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/industries/${ind.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0876B9] hover:text-[#065E94] group"
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Standards Callout */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="w-full px-[8%]">
          <div className="p-8 md:p-12 rounded-lg bg-gradient-to-br from-[#F8FAFC] to-white border border-slate-200/90 shadow-sm flex flex-col gap-5">
            {/* Row 1 */}
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B]">
              Enterprise Standards & Certifications
            </div>
            
            {/* Row 2 */}
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Engineered for strict regulatory compliance and global trust.
            </h3>

            {/* Row 3 */}
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Whether adhering to FDA 21 CFR Part 11, PCI-DSS Level 1, ISO 26262 ASIL, or ISO 27001 cybersecurity frameworks, our engineering teams build compliant systems from day one.
            </p>

            {/* Row 4 */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {['ISO 27001 Certified', 'SOC 2 Type II', 'HIPAA Ready', 'ISO 26262 ASIL', 'PCI-DSS', '21 CFR Part 11'].map((badge, bIdx) => (
                <div key={bIdx} className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-sm bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-800 text-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0876B9] shrink-0" />
                  <span className="truncate">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

IndustriesPage.displayName = 'IndustriesPage';
