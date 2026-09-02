import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Brain, 
  Cpu, 
  Cloud, 
  GitMerge, 
  ShieldCheck, 
  CheckCircle2, 
  Code2, 
  Database, 
  ArrowRight, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Stats } from '../components/Stats';

const allServices = [
  {
    id: 'qa-automation',
    title: 'AI-Powered Quality Engineering & Test Automation',
    badge: 'Flagship Engineering',
    desc: 'Autonomous test generation, self-healing test automation scripts with Playwright and Selenium, distributed load profiling, and multi-tier CI/CD quality gates.',
    icon: <CheckCircle2 className="w-8 h-8 text-[#0876B9]" />,
    tags: ['Selenium', 'Playwright', 'JMeter', 'AI Automation', 'API Testing', 'Performance Testing'],
    color: 'hover:border-[#0876B9]'
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence, GenAI & Agentic Systems',
    badge: 'Applied AI',
    desc: 'Domain-tailored Generative AI models, multi-agent automated workflows, enterprise RAG knowledge engines, and production predictive machine learning pipelines.',
    icon: <Brain className="w-8 h-8 text-[#0876B9]" />,
    tags: ['Generative AI', 'Agentic Workflows', 'RAG Pipelines', 'PyTorch', 'LLMs'],
    color: 'hover:border-[#0876B9]'
  },
  {
    id: 'iot',
    title: 'Device Driver & IoT Systems',
    badge: 'Hardware-Software',
    desc: 'Kernel-level Windows and Linux device drivers, deterministic RTOS embedded firmware, industrial IoT gateways, and cryptographically secure FOTA updates.',
    icon: <Cpu className="w-8 h-8 text-[#E2725B]" />,
    tags: ['Kernel Modules', 'Embedded C/C++', 'RTOS', 'MQTT', 'Industrial IoT'],
    color: 'hover:border-[#E2725B]'
  },
  {
    id: 'cloud',
    title: 'Cloud Computing & Distributed Systems',
    badge: 'Cloud Engineering',
    desc: 'Multi-cloud architecture on AWS, Azure, and GCP, Kubernetes container orchestration, event-driven microservices, and FinOps cost optimization.',
    icon: <Cloud className="w-8 h-8 text-[#0876B9]" />,
    tags: ['AWS', 'Azure', 'Kubernetes', 'Microservices', 'Kafka'],
    color: 'hover:border-[#0876B9]'
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure Automation',
    badge: 'Continuous Delivery',
    desc: 'Immutable Infrastructure as Code with Terraform, zero-friction CI/CD deployment pipelines, GitOps continuous delivery, and full-stack observability with SRE.',
    icon: <GitMerge className="w-8 h-8 text-[#F97316]" />,
    tags: ['Terraform', 'GitHub Actions', 'Docker', 'Prometheus', 'ArgoCD'],
    color: 'hover:border-[#F97316]'
  },
  {
    id: 'security',
    title: 'IT Infrastructure & Cyber Security',
    badge: 'Zero Trust Security',
    desc: 'Zero Trust architectural blueprints, ethical penetration testing, continuous vulnerability management, and 24/7 SIEM/SOC threat detection.',
    icon: <ShieldCheck className="w-8 h-8 text-[#E03E7B]" />,
    tags: ['Zero Trust', 'Penetration Testing', 'SIEM / SOC', 'ISO 27001', 'SOC 2'],
    color: 'hover:border-[#E03E7B]'
  },
  {
    id: 'software-engineering',
    title: 'Enterprise Software Engineering & Modern Web',
    badge: 'Digital Engineering',
    desc: 'Clean TypeScript/React web applications, high-throughput Node.js microservices, multi-tenant SaaS platforms, and enterprise API architectures.',
    icon: <Code2 className="w-8 h-8 text-[#0876B9]" />,
    tags: ['React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL'],
    color: 'hover:border-[#0876B9]'
  },
  {
    id: 'data-analytics',
    title: 'Data Engineering & Advanced Analytics',
    badge: 'Data Intelligence',
    desc: 'Real-time streaming ETL/ELT pipelines, modern cloud lakehouses, automated data transformation with dbt, and executive business intelligence dashboards.',
    icon: <Database className="w-8 h-8 text-[#0876B9]" />,
    tags: ['Snowflake', 'BigQuery', 'Apache Kafka', 'dbt', 'Power BI'],
    color: 'hover:border-[#0876B9]'
  }
];

export const ServicesHubPage = memo(function ServicesHubPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24">
      {/* Breadcrumbs */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Services & Solutions</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FA] border-b border-slate-200/80">
        <div className="w-full px-[8%] text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#E2725B]" />
            <span>Enterprise Engineering Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Comprehensive Services & <br />
            <span className="text-[#0876B9]">Technology Solutions</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            From intelligent AI-powered Quality Engineering to low-level device drivers and cloud-native architectures, we build scalable software systems for global enterprises.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0876B9] text-white hover:bg-[#065E94] transition-all text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-md shadow-[#0876B9]/20"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="w-full px-[8%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((srv, idx) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`p-8 rounded-sm bg-white border border-slate-200/80 ${srv.color} hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-sm bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-center shadow-2xs">
                      {srv.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E2725B] bg-orange-50 px-2.5 py-1 rounded-sm border border-orange-200/60">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {srv.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-100">
                    {srv.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded-sm border border-slate-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/services/${srv.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0876B9] hover:text-[#065E94] group"
                  >
                    <span>View Engineering Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section immediately above Footer */}
      <Stats />
    </div>
  );
});

ServicesHubPage.displayName = 'ServicesHubPage';
