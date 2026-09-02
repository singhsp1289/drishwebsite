import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  Code2,
  Brain,
  Cpu,
  Cloud,
  ShieldCheck
} from 'lucide-react';

export const TrainingPage = memo(function TrainingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    track: 'AI & Machine Learning',
    duration: '6 Months Industrial Training',
    institution: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const programs = [
    {
      title: 'AI, Generative AI & Machine Learning',
      duration: '6 Months / 6 Weeks',
      icon: <Brain className="w-6 h-6 text-[#0876B9]" />,
      curriculum: ['Python Core & Advanced', 'PyTorch / TensorFlow', 'Generative AI & LLMs', 'Agentic Workflows', 'Computer Vision']
    },
    {
      title: 'Full-Stack Modern Web Engineering',
      duration: '6 Months / 6 Weeks',
      icon: <Code2 className="w-6 h-6 text-[#0876B9]" />,
      curriculum: ['React.js & TypeScript', 'Node.js & NestJS', 'PostgreSQL & MongoDB', 'REST/GraphQL APIs', 'Docker & CI/CD']
    },
    {
      title: 'AI-Powered Quality Engineering & Test Automation',
      duration: '6 Months / 6 Weeks',
      icon: <CheckCircle2 className="w-6 h-6 text-[#0876B9]" />,
      curriculum: ['Selenium WebDriver & Java', 'Playwright & TypeScript', 'Apache JMeter Load Testing', 'API Automation with Postman', 'CI/CD GitHub Actions']
    },
    {
      title: 'Device Drivers & Embedded IoT Systems',
      duration: '6 Months / 6 Weeks',
      icon: <Cpu className="w-6 h-6 text-[#E2725B]" />,
      curriculum: ['C / C++ Systems Programming', 'Linux Kernel Modules', 'FreeRTOS Firmware', 'ARM Cortex & ESP32', 'MQTT & Telemetry']
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Industrial Training & Internships</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FF] border-b border-slate-200/80">
        <div className="w-full px-[8%] text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Industrial Training Center &bull; Since 1999</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Launch Your Engineering Career on <br />
            <span className="text-[#0876B9]">Live Production Codebases</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            6-Month and 6-Week practical industrial training programs with mentorship from senior engineers, real-world project modules, and verified industry certification.
          </p>
        </div>
      </section>

      {/* Program Highlights Strip */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="w-full px-[8%]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-[#F8FAFC] border border-slate-200/80 rounded-sm">
              <BookOpen className="w-8 h-8 text-[#0876B9] mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">Live Project Exposure</h3>
              <p className="text-xs text-slate-500 font-normal">Real architecture, Git pull requests, code reviews</p>
            </div>
            <div className="p-6 bg-[#F8FAFC] border border-slate-200/80 rounded-sm">
              <Clock className="w-8 h-8 text-[#0876B9] mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">Flexible Tracks</h3>
              <p className="text-xs text-slate-500 font-normal">6 Months industrial & 6 Weeks summer internship</p>
            </div>
            <div className="p-6 bg-[#F8FAFC] border border-slate-200/80 rounded-sm">
              <Award className="w-8 h-8 text-[#0876B9] mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">Placement Assistance</h3>
              <p className="text-xs text-slate-500 font-normal">Mock technical interviews and hiring referrals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Application Form */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="w-full px-[8%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Tracks */}
            <div className="lg:col-span-7 space-y-6">
              <div className="mb-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-2">
                  Training Tracks
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Choose your specialized engineering domain.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {programs.map((prog, idx) => (
                  <div key={idx} className="p-6 rounded-sm bg-white border border-slate-200 shadow-2xs">
                    <div className="w-12 h-12 rounded bg-[#F8FAFC] border border-slate-200 flex items-center justify-center mb-4">
                      {prog.icon}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{prog.title}</h4>
                    <span className="text-[11px] font-semibold text-[#0876B9] mb-3 block">{prog.duration}</span>
                    <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                      {prog.curriculum.map((c, cIdx) => (
                        <li key={cIdx} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0876B9]" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-5 bg-white p-8 rounded-lg border border-slate-200 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Apply for Training Batch</h3>
              <p className="text-xs text-slate-500 mb-6">Fill in your details to receive curriculum and batch timings.</p>

              {submitted ? (
                <div className="p-6 bg-blue-50 border border-blue-200 rounded text-center">
                  <CheckCircle2 className="w-10 h-10 text-[#0876B9] mx-auto mb-2" />
                  <h4 className="font-bold text-[#065E94] mb-1">Application Submitted!</h4>
                  <p className="text-xs text-[#0876B9]">Our training coordinator will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:border-[#0876B9] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:border-[#0876B9] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:border-[#0876B9] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Training Track *</label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded bg-white focus:border-[#0876B9] outline-none"
                    >
                      <option>AI, Generative AI & Machine Learning</option>
                      <option>Full-Stack Modern Web Engineering</option>
                      <option>AI-Powered Quality Engineering & Test Automation</option>
                      <option>Device Drivers & Embedded IoT Systems</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Duration *</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded bg-white focus:border-[#0876B9] outline-none"
                    >
                      <option>6 Months Industrial Training</option>
                      <option>6 Weeks Summer Internship</option>
                      <option>Apprenticeship Track</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">College / University</label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. Thapar / PEC / CCET"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:border-[#0876B9] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm cursor-pointer"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

TrainingPage.displayName = 'TrainingPage';
