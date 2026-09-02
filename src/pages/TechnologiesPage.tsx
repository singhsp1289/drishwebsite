import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { api, TechnologyItem } from '../services/apiClient.ts';

interface TechCategoryGroup {
  category: string;
  desc: string;
  techs: Array<{ name: string; role: string; description?: string }>;
}

const defaultCategoryDescriptions: Record<string, string> = {
  'Quality & Test Automation': 'Autonomous test automation, distributed load simulation, and automated regression verification.',
  'AI & Machine Learning': 'Domain-tailored Generative AI models, multi-agent automated workflows, and high-accuracy vector search.',
  'Embedded, IoT & Edge Drivers': 'Low-latency Linux/Windows kernel drivers, RTOS embedded firmware, and industrial IoT communication stacks.',
  'Cloud & Distributed Infrastructure': 'Automated cloud orchestration, multi-region Kubernetes clusters, immutable IaC, and Kafka event streaming.',
  'Modern Web & Full-Stack': 'Type-safe, component-driven reactive user interfaces with optimized rendering engines and PostgreSQL databases.',
  'Cyber Security & Zero Trust': 'Zero Trust architecture blueprints, penetration testing, secrets management, and continuous compliance.',
};

export const TechnologiesPage = memo(function TechnologiesPage() {
  const [techList, setTechList] = useState<TechnologyItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    api.getTechnologies()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setTechList(data);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch technologies from database:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Group technologies by category
  const categoriesMap: Record<string, TechCategoryGroup> = {};

  if (techList.length > 0) {
    for (const item of techList) {
      if (!categoriesMap[item.category]) {
        categoriesMap[item.category] = {
          category: item.category,
          desc: defaultCategoryDescriptions[item.category] || 'Enterprise software and infrastructure engineering solutions.',
          techs: [],
        };
      }
      categoriesMap[item.category].techs.push({
        name: item.name,
        role: item.role,
        description: item.description,
      });
    }
  }

  const categoryGroups: TechCategoryGroup[] = Object.values(categoriesMap).length > 0
    ? Object.values(categoriesMap)
    : [
        {
          category: 'Quality & Test Automation',
          desc: 'Autonomous test automation, distributed load simulation, and automated regression verification.',
          techs: [
            { name: 'Playwright', role: 'Next-Gen End-to-End Automation' },
            { name: 'Selenium WebDriver', role: 'Enterprise Grid Testing' },
            { name: 'Apache JMeter & k6', role: 'Distributed Stress & Load Testing' },
            { name: 'Appium', role: 'Native Mobile Automation' }
          ]
        },
        {
          category: 'AI & Machine Learning',
          desc: 'Domain-tailored Generative AI models, multi-agent automated workflows, and high-accuracy vector search.',
          techs: [
            { name: 'PyTorch', role: 'Deep Learning & Neural Networks' },
            { name: 'LangChain & LangGraph', role: 'Multi-Agent Orchestration' },
            { name: 'pgvector & Pinecone', role: 'Semantic Vector Search' },
            { name: 'OpenCV & YOLOv10', role: 'Computer Vision & Edge AI' }
          ]
        },
        {
          category: 'Modern Web & Full-Stack',
          desc: 'Type-safe, component-driven reactive user interfaces with optimized rendering engines and PostgreSQL databases.',
          techs: [
            { name: 'React 19 & Next.js', role: 'Modern Frontend Architecture' },
            { name: 'TypeScript & Node.js', role: 'Type-Safe Backend Microservices' },
            { name: 'PostgreSQL & Drizzle ORM', role: 'Relational Database & ORM' },
            { name: 'Tailwind CSS', role: 'Modern Design System' }
          ]
        }
      ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Technology Ecosystem</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FF] border-b border-slate-200/80">
        <div className="w-full px-[8%] text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Enterprise Technology Stack</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Engineered on Proven & <br />
            <span className="text-[#0876B9]">Emerging Technologies</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            We build with production-tested, scalable technologies across the entire stack — from low-level device firmware to cloud-native microservices and AI pipelines.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0876B9] text-white hover:bg-[#065E94] transition-all text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-md shadow-[#0876B9]/20"
          >
            <span>Consult on Your Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="w-full px-[8%] space-y-16">
          {categoryGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-[#0876B9] rounded-full"></span>
                  <span>{group.category}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                  {group.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.techs.map((tech, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-6 bg-white rounded-sm border border-slate-200 shadow-2xs hover:border-[#0876B9]/40 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[#0876B9] mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Enterprise Ready</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{tech.name}</h3>
                      <div className="text-xs font-medium text-slate-700 mt-1">{tech.role}</div>
                      {tech.description && (
                        <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                          {tech.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
});

TechnologiesPage.displayName = 'TechnologiesPage';
