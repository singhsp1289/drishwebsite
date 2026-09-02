import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Brain, Cpu, Cloud, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Transform operations with custom AI models, generative AI solutions, and intelligent automation platforms.',
    icon: <Brain className="w-8 h-8 text-[#0876B9]" />,
    tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
    color: 'from-[#0876B9]/15 to-transparent',
    borderHover: 'hover:border-[#0876B9]'
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI & LLM',
    description: 'Design LLM-powered agents, RAG pipelines, and autonomous workflows that reason, retrieve, and act securely.',
    icon: <Brain className="w-8 h-8 text-[#0876B9]" />,
    tech: ['LLMs', 'RAG', 'Agents', 'Vector Search'],
    color: 'from-[#0876B9]/15 to-transparent',
    borderHover: 'hover:border-[#0876B9]'
  },
  {
    id: 'device-drivers',
    title: 'Device Drivers',
    description: 'Build reliable Windows and Linux drivers for custom hardware, peripherals, and embedded systems.',
    icon: <Cpu className="w-8 h-8 text-[#E2725B]" />,
    tech: ['C/C++', 'Linux Kernel', 'Windows WDF', 'PCIe/USB'],
    color: 'from-[#E2725B]/15 to-transparent',
    borderHover: 'hover:border-[#E2725B]'
  },
  {
    id: 'iot',
    title: 'IoT Systems',
    description: 'Connect devices, sensors, and edge gateways with secure telemetry, protocols, and fleet management.',
    icon: <Cloud className="w-8 h-8 text-[#0876B9]" />,
    tech: ['MQTT', 'RTOS', 'Edge Gateways', 'Industrial IoT'],
    color: 'from-[#0876B9]/15 to-transparent',
    borderHover: 'hover:border-[#0876B9]'
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    description: 'Design and deploy scalable, resilient, and secure cloud-native architectures for global enterprises.',
    icon: <Cloud className="w-8 h-8 text-[#0876B9]" />,
    tech: ['AWS', 'Azure', 'GCP', 'Microservices'],
    color: 'from-[#0876B9]/15 to-transparent',
    borderHover: 'hover:border-[#0876B9]'
  },
  {
    id: 'security',
    title: 'IT Infrastructure & Services',
    description: 'Protect enterprise assets with Zero Trust architectures, threat intelligence, and secure infrastructure.',
    icon: <ShieldCheck className="w-8 h-8 text-[#E03E7B]" />,
    tech: ['Zero Trust', 'SIEM', 'Pen Testing', 'SOC'],
    color: 'from-[#E03E7B]/15 to-transparent',
    borderHover: 'hover:border-[#E03E7B]'
  },
  {
    id: 'qa-automation',
    title: 'AI-Powered Quality Engineering & Test Automation',
    description: 'AI-powered automation, performance and end-to-end testing built for reliable, scalable digital products.',
    icon: <CheckCircle2 className="w-8 h-8 text-[#0876B9]" />,
    tech: ['Selenium', 'Playwright', 'JMeter', 'Performance Testing', 'API Testing'],
    color: 'from-[#0876B9]/15 to-transparent',
    borderHover: 'hover:border-[#0876B9]'
  }
];

export const Services = memo(function Services() {
  return (
    <section id="services" className="py-16 md:py-20 bg-[#F8FAFC] relative border-t border-slate-200/80">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0876B9]/8 via-transparent to-transparent pointer-events-none" />
      
      <div className="w-full px-[8%] relative z-10">
        <div className="mb-10 md:mb-12 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
              Core Capabilities
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Engineering solutions for{' '}
              <span className="text-[#0876B9]">
                complex technological challenges.
              </span>
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-8 rounded-sm group transition-all duration-300 border border-slate-200/80 ${service.borderHover} hover:bg-white relative overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 bg-white w-16 h-16 rounded-sm flex items-center justify-center border border-slate-200/80 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  {service.icon}
                </div>
                
                <h4 className="text-2xl font-bold mb-3 text-slate-900 transition-colors">
                  {service.title}
                </h4>
                
                <p className="text-slate-600 mb-6 leading-relaxed text-sm font-normal">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {service.tech.map(t => (
                    <span key={t} className="text-xs font-medium text-slate-700 bg-white/90 px-2.5 py-1 rounded-sm border border-slate-200/80 uppercase tracking-wider shadow-2xs">
                      {t}
                    </span>
                  ))}
                </div>
                
                <Link 
                  to={`/services/${service.id}`} 
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#0876B9] hover:text-[#065E94] group/link transition-colors cursor-pointer"
                >
                  <span>Learn More</span> 
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';
