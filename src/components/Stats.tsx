import { memo } from 'react';
import { motion } from 'motion/react';
import { Calendar, Briefcase, Award, Globe } from 'lucide-react';

const stats = [
  { value: '25+', label: 'Years in Industry', icon: <Calendar className="w-5 h-5" /> },
  { value: '5000+', label: 'Projects Delivered', icon: <Briefcase className="w-5 h-5" /> },
  { value: '100%', label: 'Customer Success', icon: <Award className="w-5 h-5" /> },
  { value: '50+', label: 'Countries Served', icon: <Globe className="w-5 h-5" /> }
];

export const Stats = memo(function Stats() {
  return (
    <section className="py-14 bg-[#F8FAFC] border-b border-slate-200/80 relative">
      {/* Subtle pastel ambient tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F08A64]/8 via-[#0876B9]/8 to-[#E03E7B]/8 pointer-events-none" />
      
      <div className="w-full px-[8%] relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center px-4 pt-6 sm:pt-0 flex flex-col items-center"
            >
              <div className="flex justify-center mb-3 text-[#0876B9] bg-blue-50 p-2.5 rounded-sm shadow-xs border border-blue-200 transition-colors">
                {stat.icon}
              </div>
              <h4 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 tracking-tight">
                {stat.value}
              </h4>
              <p className="text-slate-600 text-sm font-medium tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Stats.displayName = 'Stats';
