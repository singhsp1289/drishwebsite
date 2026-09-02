import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, Sparkles, CheckCircle2, Briefcase, MapPin, Clock } from 'lucide-react';

const openRoles = [
  {
    title: 'Senior AI Quality Engineering & Test Automation Lead',
    department: 'Quality Engineering',
    location: 'Chandigarh / Hybrid',
    type: 'Full-Time',
    desc: 'Lead enterprise test automation initiatives using Playwright, Selenium, and AI self-healing test frameworks with deep CI/CD integration.',
    skills: ['Playwright', 'Selenium', 'JMeter', 'AI Automation', 'CI/CD', 'TypeScript/Python']
  },
  {
    title: 'Linux Kernel & Device Driver Engineer',
    department: 'Embedded & IoT Systems',
    location: 'Chandigarh / Hybrid',
    type: 'Full-Time',
    desc: 'Develop low-level device drivers for Linux kernel and Windows, PCIe/USB bus protocols, and deterministic embedded firmware.',
    skills: ['C/C++', 'Linux Kernel Modules', 'WDF Drivers', 'RTOS', 'Hardware Debugging']
  },
  {
    title: 'Cloud DevOps & Site Reliability Engineer (AWS/K8s)',
    department: 'Cloud & Infrastructure',
    location: 'Chandigarh / Hybrid',
    type: 'Full-Time',
    desc: 'Design immutable Terraform IaC architectures, maintain multi-region Kubernetes clusters, and implement automated GitOps CI/CD pipelines.',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'ArgoCD', 'Prometheus']
  },
  {
    title: 'Full-Stack Software Engineer (React / TypeScript / Node)',
    department: 'Software Engineering',
    location: 'Chandigarh / Hybrid',
    type: 'Full-Time',
    desc: 'Build high-concurrency enterprise web applications, microservices APIs, and clean scalable reactive user interfaces.',
    skills: ['React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Redis']
  }
];

export const CareersPage = memo(function CareersPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Careers & Culture</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FF] border-b border-slate-200/80">
        <div className="w-full px-[8%] text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Our Engineering Team</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Build Cutting-Edge Tech with <br />
            <span className="text-[#0876B9]">Exceptional Engineers</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            Work on mission-critical software, state-of-the-art AI systems, device drivers, and cloud architectures. We value technical depth, continuous growth, and collaborative engineering.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#roles"
              className="px-7 py-3.5 bg-[#0876B9] text-white hover:bg-[#065E94] transition-all text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-md shadow-[#0876B9]/20 flex items-center justify-center"
            >
              Explore Open Positions
            </a>
            <Link
              to="/training"
              className="px-7 py-3.5 bg-white text-slate-800 hover:bg-slate-50 transition-all border border-slate-300 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-2xs flex items-center justify-center"
            >
              Internships & Training
            </Link>
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section id="roles" className="py-20 bg-[#F8FAFC]">
        <div className="w-full px-[8%] max-w-5xl space-y-6">
          <div className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-2">
              Current Openings
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Find your next engineering challenge.
            </h3>
          </div>

          <div className="space-y-4">
            {openRoles.map((role, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="p-6 md:p-8 rounded-sm bg-white border border-slate-200 shadow-2xs hover:border-[#0876B9]/40 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-[#0876B9] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {role.department}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{role.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{role.type}</span>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900">
                    {role.title}
                  </h4>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed max-w-2xl">
                    {role.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {role.skills.map((s, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-[#0876B9] text-white hover:bg-[#065E94] transition-all text-xs font-semibold uppercase tracking-wider rounded-sm text-center shrink-0 self-start md:self-center shadow-xs"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

CareersPage.displayName = 'CareersPage';
