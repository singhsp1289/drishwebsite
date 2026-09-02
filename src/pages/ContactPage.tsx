import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  Send,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/apiClient.ts';

export const ContactPage = memo(function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: 'AI-Powered Quality Engineering & Test Automation',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      await api.submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceInterest: formData.serviceInterest,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Contact & Consultation</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FF] border-b border-slate-200/80">
        <div className="w-full px-[8%] text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Engineering Consultation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Let's Engineer Your Next <br />
            <span className="text-[#0876B9]">Technology Breakthrough</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-4">
            Connect directly with our technical leadership and principal engineers to discuss architecture, timeline, and scope.
          </p>
        </div>
      </section>

      {/* Contact Content & Form */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="w-full px-[8%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Direct Contact Info & Offices */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-2">
                  Global Contacts
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Reach our engineering team.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Whether you have an immediate RFP, require test automation frameworks, or want to consult on device drivers, our teams are available across multiple time zones.
                </p>
              </div>

              {/* Quick Contacts */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-white rounded-sm border border-slate-200 shadow-2xs">
                  <div className="w-10 h-10 rounded bg-[#F8FAFC] border border-slate-200 flex items-center justify-center text-[#0876B9] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Inquiry</div>
                    <a href="mailto:info@drishinfo.com" className="text-base font-bold text-slate-900 hover:text-[#0876B9] transition-colors">
                      info@drishinfo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-sm border border-slate-200 shadow-2xs">
                  <div className="w-10 h-10 rounded bg-[#F8FAFC] border border-slate-200 flex items-center justify-center text-[#0876B9] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Consultation</div>
                    <a href="tel:+911722650000" className="text-base font-bold text-slate-900 hover:text-[#0876B9] transition-colors">
                      +91 172 265 0000 / +1 (800) DRISH-TECH
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Engineering Delivery Centers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-sm border border-slate-200">
                    <div className="font-bold text-slate-900 text-sm mb-1">Chandigarh R&D Hub</div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Plot No. 12, Industrial Area Phase 1, Chandigarh, India
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-sm border border-slate-200">
                    <div className="font-bold text-slate-900 text-sm mb-1">North America Office</div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      5th Avenue, New York, NY 10010, United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-6 bg-white p-8 md:p-10 rounded-lg border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Technical Proposal</h3>
              <p className="text-xs text-slate-500 mb-6 font-normal">We guarantee a response with engineering input within 24 hours.</p>

              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitted ? (
                <div className="p-8 bg-blue-50 border border-blue-200 rounded text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#0876B9] mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-[#065E94] mb-1">Thank You! Message Received.</h4>
                  <p className="text-xs text-[#0876B9] leading-relaxed">
                    Your inquiry has been stored securely in our database. Our solutions architect will review your project brief and follow up promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        serviceInterest: 'AI-Powered Quality Engineering & Test Automation',
                        message: ''
                      });
                    }}
                    className="mt-5 px-4 py-2 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-bold rounded cursor-pointer transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:border-[#0876B9] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:border-[#0876B9] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:border-[#0876B9] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:border-[#0876B9] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Service of Interest *</label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded bg-white focus:border-[#0876B9] outline-none"
                    >
                      <option>AI-Powered Quality Engineering & Test Automation</option>
                      <option>Artificial Intelligence, GenAI & Agentic Systems</option>
                      <option>Device Driver & IoT Systems</option>
                      <option>Cloud Computing & Distributed Systems</option>
                      <option>DevOps & Infrastructure Automation</option>
                      <option>IT Infrastructure & Cyber Security</option>
                      <option>Enterprise Software Engineering</option>
                      <option>Data Engineering & Advanced Analytics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Project Brief / Requirements *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your technological challenge, target timeline, or tech stack..."
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:border-[#0876B9] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors shadow-md shadow-[#0876B9]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting to Database...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
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

ContactPage.displayName = 'ContactPage';
