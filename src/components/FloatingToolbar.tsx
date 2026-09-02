import { useState, FC, memo } from 'react';
import { Phone, GraduationCap, X, CheckCircle, ArrowRight, BookOpen, Clock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingToolbar: FC = memo(() => {
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'AI & Machine Learning',
    duration: '6 Months Industrial Training',
    message: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsTrainingModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        program: 'AI & Machine Learning',
        duration: '6 Months Industrial Training',
        message: '',
      });
    }, 2500);
  };

  return (
    <>
      {/* Fixed Right Floating Toolbar */}
      <aside 
        aria-label="Quick contact and training options"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2.5 select-none pointer-events-auto"
      >
        {/* 1. Training / Internship Tab Button */}
        <button
          onClick={() => setIsTrainingModalOpen(true)}
          aria-label="Training and Internship Programs"
          className="group relative flex items-center justify-end bg-[#0876B9] hover:bg-[#065E94] text-white rounded-l-md shadow-lg border-y border-l border-[#0876B9]/30 overflow-hidden transition-all duration-200 cursor-pointer"
        >
          {/* Hover Slide-out tooltip preview on desktop */}
          <div className="hidden lg:flex max-w-0 group-hover:max-w-xs transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap bg-[#065E94] text-white text-xs font-medium px-0 group-hover:px-3.5 py-2 items-center gap-1.5 border-r border-white/10">
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Explore Programs</span>
          </div>

          {/* Vertical badge bar */}
          <div className="py-3 sm:py-3.5 px-2 sm:px-2.5 flex flex-col items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="[writing-mode:vertical-rl] text-[10px] sm:text-xs font-semibold tracking-wider uppercase font-sans whitespace-nowrap">
              Training / Internship
            </span>
          </div>
        </button>

        {/* 2. Call Button */}
        <a
          href="tel:+911722654321"
          aria-label="Call Drish Infotech at +91 172 2654321"
          className="group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-l-md shadow-lg border-y border-l border-slate-700/60 transition-all duration-200"
          title="Call Us: +91 172 2654321"
        >
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
          
          {/* Desktop Hover Label to the Left */}
          <span className="hidden lg:group-hover:flex absolute right-full mr-2 px-2.5 py-1 rounded bg-slate-900 text-white text-xs font-medium whitespace-nowrap shadow-md pointer-events-none items-center gap-1.5 border border-slate-700">
            <span>Call Us (+91 172 2654321)</span>
          </span>
        </a>

        {/* 3. WhatsApp Button */}
        <a
          href="https://wa.me/919876543210?text=Hello%20Drish%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20solutions."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Drish Infotech on WhatsApp"
          className="group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-l-md shadow-lg border-y border-l border-[#25D366]/40 transition-all duration-200"
          title="Chat on WhatsApp"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path d="M12.031 2C6.504 2 2 6.504 2 12.031c0 1.97.57 3.81 1.558 5.37L2 22l4.757-1.527A10.01 10.01 0 0012.03 22c5.528 0 10.032-4.504 10.032-10.031C22.062 6.504 17.558 2 12.031 2zm0 18.358a8.318 8.318 0 01-4.246-1.162l-.304-.18-3.14.996.996-3.064-.198-.315A8.32 8.32 0 013.708 12.03c0-4.59 3.734-8.323 8.323-8.323 4.59 0 8.323 3.734 8.323 8.323 0 4.59-3.733 8.327-8.323 8.327zm4.557-6.234c-.25-.125-1.474-.727-1.703-.81-.228-.083-.395-.125-.561.125-.167.25-.644.81-.789.977-.146.166-.291.187-.54.062-.25-.125-1.053-.388-2.006-1.238-.742-.662-1.243-1.48-1.389-1.73-.145-.25-.015-.385.11-.51.112-.112.25-.29.374-.436.125-.145.166-.25.25-.415.083-.167.041-.312-.021-.437-.063-.125-.562-1.352-.77-1.85-.202-.486-.407-.42-.56-.428l-.478-.008c-.166 0-.437.062-.666.312-.228.25-.873.853-.873 2.08 0 1.228.894 2.414 1.019 2.58.125.167 1.76 2.686 4.263 3.768.595.257 1.06.41 1.423.526.598.19 1.142.163 1.572.099.48-.072 1.474-.603 1.682-1.185.207-.582.207-1.08.145-1.185-.062-.104-.229-.166-.479-.291z" />
          </svg>

          {/* Desktop Hover Label to the Left */}
          <span className="hidden lg:group-hover:flex absolute right-full mr-2 px-2.5 py-1 rounded bg-[#1f8045] text-white text-xs font-medium whitespace-nowrap shadow-md pointer-events-none items-center gap-1.5 border border-[#25D366]/40">
            <span>WhatsApp Quick Chat</span>
          </span>
        </a>
      </aside>

      {/* Interactive Training & Internship Modal */}
      <AnimatePresence>
        {isTrainingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTrainingModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-[#0876B9] px-6 py-5 text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-white/20 px-2 py-0.5 rounded text-white">
                      Career Launchpad
                    </span>
                    <span className="text-[10px] text-blue-100 font-medium">Est. 1999</span>
                  </div>
                  <h3 className="text-xl font-bold font-sans tracking-tight text-white">
                    Industrial Training & Internship Programs
                  </h3>
                </div>
                <button
                  onClick={() => setIsTrainingModalOpen(false)}
                  aria-label="Close dialog"
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Value Props Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#F8FAFC] border border-slate-200/80 rounded flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-[#0876B9] shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Live Projects</h4>
                      <p className="text-[11px] text-slate-500 font-normal">Real industrial codebase</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] border border-slate-200/80 rounded flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#0876B9] shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">6 Weeks / 6 Months</h4>
                      <p className="text-[11px] text-slate-500 font-normal">Flexible tracks</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] border border-slate-200/80 rounded flex items-center gap-3">
                    <Award className="w-5 h-5 text-[#0876B9] shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Certification</h4>
                      <p className="text-[11px] text-slate-500 font-normal">Placement assistance</p>
                    </div>
                  </div>
                </div>

                {/* Success Notification */}
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-blue-50 border border-blue-200 rounded text-center my-4"
                  >
                    <CheckCircle className="w-12 h-12 text-[#0876B9] mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-[#0876B9] mb-1 font-sans">
                      Inquiry Submitted Successfully!
                    </h4>
                    <p className="text-sm text-slate-700 font-normal">
                      Our training coordinator will get in touch with curriculum details and batch schedules shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:outline-hidden focus:border-[#0876B9] focus:ring-1 focus:ring-[#0876B9] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:outline-hidden focus:border-[#0876B9] focus:ring-1 focus:ring-[#0876B9] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:outline-hidden focus:border-[#0876B9] focus:ring-1 focus:ring-[#0876B9] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Training Track *
                        </label>
                        <select
                          value={formData.program}
                          onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:outline-hidden focus:border-[#0876B9] focus:ring-1 focus:ring-[#0876B9] bg-white transition-colors"
                        >
                          <option>AI & Machine Learning</option>
                          <option>Full-Stack Web Development (React / Node / TypeScript)</option>
                          <option>Device Drivers & IoT Systems</option>
                          <option>Cloud Computing & DevOps (AWS / Docker / K8s)</option>
                          <option>Cyber Security & Threat Intelligence</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Duration *
                        </label>
                        <select
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:outline-hidden focus:border-[#0876B9] focus:ring-1 focus:ring-[#0876B9] bg-white transition-colors"
                        >
                          <option>6 Months Industrial Training</option>
                          <option>6 Weeks Summer Internship</option>
                          <option>Fresh Graduate Apprenticeship</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          College / University
                        </label>
                        <input
                          type="text"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="e.g. Thapar / PEC / CCET / IIT"
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:outline-hidden focus:border-[#0876B9] focus:ring-1 focus:ring-[#0876B9] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setIsTrainingModalOpen(false)}
                        className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                      >
                        <span>Submit Application</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

FloatingToolbar.displayName = 'FloatingToolbar';
