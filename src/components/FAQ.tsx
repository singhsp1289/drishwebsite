import { memo, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  Brain,
  ShieldCheck,
  Cpu,
  Cloud,
  CheckCircle2
} from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'all' | 'ai-qa' | 'cloud-devops' | 'iot-drivers' | 'engagement-security';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'ai-qa',
    categoryLabel: 'AI & Quality Engineering',
    question: 'How do your AI-driven QA automation and self-healing test frameworks work?',
    answer: 'Our QA automation suite leverages AI-assisted locator diagnostics and self-healing algorithms in Playwright and Selenium. When UI selectors or DOM structures change during agile sprints, the framework dynamically computes fallback heuristics to prevent false-positive pipeline failures, cutting regression maintenance overhead by up to 65%.',
    highlights: ['Playwright & Selenium', 'Self-Healing Locators', 'CI/CD Automated Quality Gates']
  },
  {
    id: 'faq-2',
    category: 'ai-qa',
    categoryLabel: 'AI & Quality Engineering',
    question: 'What approaches do you take for Enterprise GenAI and Agentic workflows?',
    answer: 'We build domain-specific Retrieval-Augmented Generation (RAG) architectures with multi-vector search, strict role-based access control, and goal-directed autonomous agents. We enforce robust guardrails, token optimization, and zero-data-retention privacy policies to ensure full enterprise compliance.',
    highlights: ['Multi-Agent Orchestration', 'Hybrid Vector RAG', 'Enterprise Guardrails & Privacy']
  },
  {
    id: 'faq-3',
    category: 'iot-drivers',
    categoryLabel: 'IoT & Embedded Systems',
    question: 'What experience does Drish Infotech have in low-level Windows/Linux device driver development?',
    answer: 'With 25+ years of systems engineering, our team develops kernel-mode (KMDF/WDM) and user-mode (UMDF) drivers for Windows, custom Linux kernel modules, PCI/USB interfaces, and deterministic RTOS firmware for industrial sensors, automotive telemetry, and healthcare hardware.',
    highlights: ['KMDF & Linux Kernel Modules', 'RTOS & Embedded C/C++', 'Hardware Verification & WHQL']
  },
  {
    id: 'faq-4',
    category: 'cloud-devops',
    categoryLabel: 'Cloud & DevOps',
    question: 'How do you structure multi-cloud migration and Infrastructure as Code (IaC)?',
    answer: 'We utilize modular Terraform and OpenTofu to provision immutable infrastructure across AWS, Azure, and GCP. Our cloud architectures incorporate Kubernetes (EKS/AKS/GKE), automated GitOps via ArgoCD, event-driven microservices, and continuous observability with Prometheus and Datadog.',
    highlights: ['Terraform IaC', 'Kubernetes / Container Orchestration', 'FinOps Cost Optimization']
  },
  {
    id: 'faq-5',
    category: 'engagement-security',
    categoryLabel: 'Security & Compliance',
    question: 'How do you ensure data security, intellectual property protection, and compliance?',
    answer: 'Drish Infotech is ISO 9001:2015 and ISO 27001 certified. All client intellectual property (IP), source code, models, and data artifacts are 100% owned by the client from day one. We enforce strict NDAs, encrypted Git repositories, SOC 2 type controls, and isolated development environments.',
    highlights: ['ISO 27001 & ISO 9001:2015 Certified', '100% Client IP Ownership', 'Zero Trust Architecture']
  },
  {
    id: 'faq-6',
    category: 'engagement-security',
    categoryLabel: 'Engagement Models',
    question: 'What engagement models do you offer for technology partnerships?',
    answer: 'We provide three flexible engagement models: (1) Dedicated Engineering Squads (cross-functional teams with architects, developers, and QA leads), (2) Staff Augmentation (specialized domain experts integrated into your team), and (3) Fixed-Scope Milestone Delivery for well-defined engineering projects.',
    highlights: ['Dedicated Engineering Pods', 'Staff Augmentation', 'Fixed-Scope Milestones']
  },
  {
    id: 'faq-7',
    category: 'cloud-devops',
    categoryLabel: 'Cloud & DevOps',
    question: 'Can you assist with legacy modernization without incurring system downtime?',
    answer: 'Yes. We apply the Strangler Fig pattern, decomposing monolithic architectures into event-driven microservices piece by piece. We implement zero-downtime blue/green or canary deployments with automated rollback triggers, ensuring zero business disruption.',
    highlights: ['Strangler Fig Pattern', 'Blue/Green Deployments', 'Event-Driven Microservices']
  },
  {
    id: 'faq-8',
    category: 'iot-drivers',
    categoryLabel: 'IoT & Embedded Systems',
    question: 'Do you support secure Firmware-Over-The-Air (FOTA) updates for connected devices?',
    answer: 'Yes, we architect end-to-end IoT device fleet management pipelines that include cryptographically signed dual-partition bootloaders (A/B rollbacks), MQTT telemetry streaming, and automated differential updates to minimize cellular/bandwidth costs.',
    highlights: ['Dual-Partition A/B Bootloader', 'Signed Firmware Updates', 'Fleet-Wide MQTT Telemetry']
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'ai-qa', label: 'AI & QA Automation', icon: Brain },
  { id: 'cloud-devops', label: 'Cloud & DevOps', icon: Cloud },
  { id: 'iot-drivers', label: 'IoT & Drivers', icon: Cpu },
  { id: 'engagement-security', label: 'Security & Engagement', icon: ShieldCheck },
];

export const FAQ = memo(function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true // First item open by default
  });

  const toggleItem = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.highlights && item.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-16 md:py-20 relative bg-gradient-to-b from-[#F8FAFC] via-white to-[#F7FAFC] border-t border-slate-200/80 overflow-hidden" id="faq-section">
      {/* Soft Pastel Background Accents */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-r from-[#F08A64]/15 md:from-[#F08A64]/20 via-[#FFE58A]/15 to-[#0876B9]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#E03E7B]/10 md:bg-[#E03E7B]/15 rounded-full blur-[100px]" />
      </div>

      <div className="w-full px-[8%] relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
            Frequently Asked Questions
          </h2>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-3">
            Everything you need to know about our{' '}
            <span className="text-[#0876B9]">engineering capabilities.</span>
          </h3>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            Common questions regarding our software architecture, AI testing frameworks, cloud solutions, and enterprise delivery standards.
          </p>
        </motion.div>

        {/* Filter and Search Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0876B9] text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search engineering questions (e.g., Playwright, RAG, IoT, ISO)..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0876B9]/20 focus:border-[#0876B9] shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full px-2 py-0.5 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200 p-8">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">No matching questions found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">
                We couldn't find any questions matching "{searchQuery}". Feel free to reach out directly to our engineering team.
              </p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="text-xs font-semibold text-[#0876B9] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = !!openIds[faq.id];
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className={`rounded-xl transition-all duration-200 border ${
                    isOpen 
                      ? 'bg-white border-[#0876B9]/40 shadow-md shadow-[#0876B9]/5 ring-1 ring-[#0876B9]/20' 
                      : 'bg-white/90 hover:bg-white border-slate-200/80 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none focus:outline-none"
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0876B9] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                          {faq.categoryLabel}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-blue-50 text-[#0876B9]' : 'bg-slate-50 text-slate-400'
                    }`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 pt-2 text-slate-700 text-sm leading-relaxed border-t border-slate-100">
                          <p className="font-normal mb-4">
                            {faq.answer}
                          </p>

                          {faq.highlights && faq.highlights.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-2">
                              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                Key Highlights:
                              </span>
                              {faq.highlights.map((highlight, hIdx) => (
                                <span
                                  key={hIdx}
                                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/70"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-[#0876B9]" />
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Footer Support Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#FFF7F2] via-[#F4F8FF] to-[#EFF6FF] border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900">
              Have a specific technical question or project inquiry?
            </h4>
            <p className="text-sm text-slate-600">
              Our principal architects and engineering specialists are ready to discuss your architecture.
            </p>
          </div>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-6 py-3 bg-[#0876B9] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm hover:bg-[#065E94] transition-all flex items-center justify-center gap-2 group shadow-md shadow-[#0876B9]/20 shrink-0 cursor-pointer"
          >
            <span>Consult an Expert</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

FAQ.displayName = 'FAQ';
