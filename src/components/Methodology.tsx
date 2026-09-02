import { memo } from 'react';
import { motion } from 'motion/react';

const steps = [
  { num: '01', title: 'Architecture Design', desc: 'We design highly scalable, fault-tolerant architectures optimized for enterprise workloads.' },
  { num: '02', title: 'Agile Engineering', desc: 'Iterative development sprints with continuous integration, ensuring rapid and reliable delivery.' },
  { num: '03', title: 'Security & Compliance', desc: 'Rigorous security testing, penetration testing, and compliance validation built into the pipeline.' },
  { num: '04', title: 'Deployment & Scaling', desc: 'Zero-downtime deployments via advanced CI/CD, scaling automatically to meet global demand.' }
];

export const Methodology = memo(function Methodology() {
  return (
    <section className="py-16 md:py-20 bg-white relative border-t border-slate-200/80">
      <div className="w-full px-[8%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
            Engineering Methodology
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            How we turn complex challenges into{' '}
            <span className="text-[#0876B9]">intelligent systems.</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-[1px] bg-slate-200/80" />
              )}
              
              <div className="w-16 h-16 rounded-sm bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-center text-xl font-bold font-sans text-[#0876B9] mb-6 relative z-10 group-hover:border-[#0876B9] group-hover:bg-[#0876B9] group-hover:text-white transition-all shadow-sm">
                {step.num}
              </div>
              
              <h4 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Methodology.displayName = 'Methodology';
