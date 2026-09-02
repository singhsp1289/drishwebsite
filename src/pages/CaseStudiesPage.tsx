import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, Sparkles, CheckCircle2, Cpu, Server } from 'lucide-react';
import { api, CaseStudyItem } from '../services/apiClient.ts';

const fallbackCaseStudies: CaseStudyItem[] = [
  {
    id: 1,
    slug: 'fintech-trading-platform-qa',
    title: 'Autonomous Quality Engineering for a Global FinTech Trading Platform',
    client: 'Tier-1 Enterprise',
    industry: 'Fintech and Blockchain',
    description: 'Implemented a distributed test automation grid with Playwright and self-healing AI locator algorithms, reducing regression turnaround from 48 hours to 35 minutes.',
    technologies: ['Playwright', 'Selenium', 'Apache JMeter', 'GitHub Actions', 'Docker'],
    metrics: [
      { label: 'Regression Time', metric: '88% Faster' },
      { label: 'Defect Detection', metric: '99.6%' },
      { label: 'CI/CD Builds/Day', metric: '140+' }
    ],
    isFeatured: true,
    isPublished: true,
    order: 1
  },
  {
    id: 2,
    slug: 'industrial-iot-kernel-driver',
    title: 'Ultra-Low Latency Kernel Driver & Industrial IoT Fleet Management',
    client: 'Smart Manufacturing Conglomerate',
    industry: 'Smart Manufacturing & Industry 4.0',
    description: 'Architected high-throughput Linux kernel device drivers and edge gateways handling 100,000+ telemetry packets per second from connected shop-floor machinery.',
    technologies: ['Linux Kernel C', 'RTOS', 'MQTT', 'Edge AI', 'ARM Cortex'],
    metrics: [
      { label: 'Interrupt Latency', metric: '<1ms' },
      { label: 'Active Edge Nodes', metric: '100,000+' },
      { label: 'Unplanned Downtime', metric: '-45%' }
    ],
    isFeatured: true,
    isPublished: true,
    order: 2
  },
  {
    id: 3,
    slug: 'healthcare-cloud-kubernetes-migration',
    title: 'Enterprise Multi-Region Cloud Migration & Kubernetes Scalability',
    client: 'Healthcare Life Sciences Network',
    industry: 'Healthcare & Life Sciences',
    description: 'Decomposed a monolithic legacy EHR infrastructure into multi-cloud Kubernetes clusters with zero downtime, ensuring HIPAA compliance and 99.999% uptime.',
    technologies: ['AWS EKS', 'Terraform', 'ArgoCD', 'PostgreSQL', 'Prometheus'],
    metrics: [
      { label: 'Availability SLA', metric: '99.999%' },
      { label: 'Cloud Cost Savings', metric: '38%' },
      { label: 'Downtime During Cutover', metric: '0 sec' }
    ],
    isFeatured: true,
    isPublished: true,
    order: 3
  }
];

export const CaseStudiesPage = memo(function CaseStudiesPage() {
  const [list, setList] = useState<CaseStudyItem[]>(fallbackCaseStudies);

  useEffect(() => {
    let isMounted = true;
    api.getCaseStudies()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setList(data);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch case studies from database, using initial data:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const getIcon = (industry: string) => {
    if (industry.toLowerCase().includes('fintech') || industry.toLowerCase().includes('quality')) {
      return <CheckCircle2 className="w-6 h-6 text-[#0876B9]" />;
    }
    if (industry.toLowerCase().includes('manufacturing') || industry.toLowerCase().includes('iot')) {
      return <Cpu className="w-6 h-6 text-[#E2725B]" />;
    }
    return <Server className="w-6 h-6 text-[#0876B9]" />;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Case Studies & Engineering Insights</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FF] border-b border-slate-200/80">
        <div className="w-full px-[8%] text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Engineering Outcomes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Engineering Benchmarks & <br />
            <span className="text-[#0876B9]">Technical Case Studies</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            Explore how Drish Infotech delivers measurable performance improvements, autonomous test automation, and robust enterprise systems.
          </p>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="w-full px-[8%] space-y-12 max-w-5xl">
          {list.map((cs, idx) => (
            <motion.div
              key={cs.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 md:p-10 rounded-sm bg-white border border-slate-200 shadow-xs hover:border-[#0876B9]/40 transition-all space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-blue-50 border border-blue-200/80">
                    {getIcon(cs.industry)}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E2725B]">
                      {cs.industry}
                    </span>
                    <div className="text-xs text-slate-500 font-medium">{cs.client}</div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                {cs.title}
              </h2>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                {cs.description}
              </p>

              {/* Metrics Grid */}
              {Array.isArray(cs.metrics) && cs.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 bg-[#F8FAFC] border border-slate-200/80 rounded-sm px-6">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <div className="text-2xl font-extrabold text-[#0876B9] font-sans">
                        {m.metric || (m as any).value}
                      </div>
                      <div className="text-xs text-slate-600 font-medium">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Tags */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {cs.technologies?.map((t, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0876B9] hover:text-[#065E94]"
                >
                  <span>Inquire for Similar Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
});

CaseStudiesPage.displayName = 'CaseStudiesPage';
