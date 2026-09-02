import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  GitMerge, 
  ShieldCheck, 
  Terminal, 
  Activity, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';

export const MethodologyPage = memo(function MethodologyPage() {
  const lifecycle = [
    {
      num: '01',
      phase: 'Architecture Design & Threat Modeling',
      subtitle: 'Robust Blueprinting for Scalability & Compliance',
      details: [
        'Domain-Driven Design (DDD) & bounded context mapping',
        'Multi-region high availability & fault-tolerance topology',
        'STRIDE threat modeling and data residency analysis',
        'Technology stack benchmarking & SLA definition'
      ],
      icon: <Layers className="w-6 h-6 text-[#0876B9]" />
    },
    {
      num: '02',
      phase: 'Agile Engineering & Test-Driven Sprints',
      subtitle: 'Type-Safe, Clean Code with Continuous Verification',
      details: [
        'Strict TypeScript and typed contract development',
        'Automated unit & integration test coverage (>85%)',
        'Two-week iterative sprints with automated CI sanity builds',
        'Modular microservices and clean architecture layering'
      ],
      icon: <Terminal className="w-6 h-6 text-[#0876B9]" />
    },
    {
      num: '03',
      phase: 'AI-Powered Quality Assurance & Stress Testing',
      subtitle: 'Automated Playwright, Selenium & JMeter Pipelines',
      details: [
        'Intelligent autonomous test generation & self-healing scripts',
        'Distributed load testing simulating extreme concurrency',
        'Automated REST/GraphQL API contract testing',
        'OWASP Top 10 vulnerability and penetration testing'
      ],
      icon: <ShieldCheck className="w-6 h-6 text-[#0876B9]" />
    },
    {
      num: '04',
      phase: 'Zero-Downtime Deployment & SRE Observability',
      subtitle: 'GitOps Continuous Delivery with Live Telemetry',
      details: [
        'Immutable Infrastructure as Code via Terraform',
        'Canary & blue-green traffic switching with automated rollback',
        'Distributed tracing with OpenTelemetry and Grafana APM',
        '24/7 Site Reliability Engineering (SRE) monitoring'
      ],
      icon: <GitMerge className="w-6 h-6 text-[#0876B9]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Engineering Methodology</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FF] border-b border-slate-200/80">
        <div className="w-full px-[8%] text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mission-Critical Engineering Standard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            How We Build <br />
            <span className="text-[#0876B9]">Enterprise-Grade Systems</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            Our disciplined delivery lifecycle guarantees absolute reliability, predictable release velocity, and ironclad security from initial architecture to global scale.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0876B9] text-white hover:bg-[#065E94] transition-all text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-md shadow-[#0876B9]/20"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4-Stage Deep Dive */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="w-full px-[8%] max-w-5xl space-y-8">
          {lifecycle.map((stage, idx) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 md:p-10 rounded-sm bg-white border border-slate-200 shadow-xs hover:border-[#0876B9]/40 transition-all flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-16 h-16 rounded-sm bg-[#F8FAFC] border border-slate-200 flex items-center justify-center text-2xl font-extrabold text-[#0876B9] shrink-0 font-sans shadow-2xs">
                {stage.num}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E2725B]">Phase {stage.num}</span>
                  <div className="h-3 w-px bg-slate-200" />
                  <span className="text-xs text-slate-500 font-medium">{stage.subtitle}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {stage.phase}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {stage.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-sm text-slate-700 font-normal">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0876B9] mt-2 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
});

MethodologyPage.displayName = 'MethodologyPage';
