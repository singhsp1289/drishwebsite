import { useState, useEffect, memo, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Brain, 
  ShieldCheck, 
  Cloud, 
  Cpu, 
  GitMerge, 
  Activity, 
  DollarSign, 
  Factory, 
  Car, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'industries' | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleNavClick = useCallback((target: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    if (target.startsWith('#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/${target}`);
      }
    } else {
      navigate(target);
    }
  }, [location.pathname, navigate]);

  const servicesDropdown = [
    {
      title: 'AI-Powered Quality Engineering & QA',
      path: '/services/qa-automation',
      desc: 'Playwright, Selenium, JMeter, AI test generation & continuous CI/CD gates.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#0876B9]" />,
      badge: 'Flagship'
    },
    {
      title: 'Artificial Intelligence & GenAI',
      path: '/services/ai',
      desc: 'Foundation models, multi-agent workflows, enterprise RAG knowledge bases.',
      icon: <Brain className="w-5 h-5 text-[#E03E7B]" />,
      badge: 'AI'
    },
    {
      title: 'Device Driver & IoT Systems',
      path: '/services/iot',
      desc: 'Windows/Linux kernel drivers, embedded RTOS firmware, edge telemetry.',
      icon: <Cpu className="w-5 h-5 text-[#E2725B]" />
    },
    {
      title: 'Cloud Computing & Distributed Systems',
      path: '/services/cloud',
      desc: 'Multi-cloud AWS/Azure/GCP, Kubernetes EKS, microservices architecture.',
      icon: <Cloud className="w-5 h-5 text-[#0876B9]" />
    },
    {
      title: 'DevOps & Infrastructure Automation',
      path: '/services/devops',
      desc: 'Terraform IaC, GitOps deployment pipelines, Prometheus & Datadog SRE.',
      icon: <GitMerge className="w-5 h-5 text-[#E2725B]" />
    },
    {
      title: 'IT Infrastructure & Cyber Security',
      path: '/services/security',
      desc: 'Zero Trust blueprints, ethical penetration testing, 24/7 SIEM/SOC.',
      icon: <ShieldCheck className="w-5 h-5 text-[#E03E7B]" />
    }
  ];

  const industriesDropdown = [
    {
      title: 'Healthcare & Life Sciences',
      path: '/industries/healthcare',
      desc: 'HIPAA compliant IoMT telemetry, clinical decision AI, EHR interoperability.',
      icon: <Activity className="w-5 h-5 text-[#E03E7B]" />
    },
    {
      title: 'Fintech and Blockchain',
      path: '/industries/fintech',
      desc: 'High-frequency transaction engines, smart contracts, and AI fraud detection.',
      icon: <DollarSign className="w-5 h-5 text-[#0876B9]" />
    },
    {
      title: 'Automotive & Connected Mobility',
      path: '/industries/automotive',
      desc: 'AUTOSAR ECU firmware, CAN bus protocols, connected fleet telematics.',
      icon: <Car className="w-5 h-5 text-[#E2725B]" />
    },
    {
      title: 'Smart Manufacturing & Industry 4.0',
      path: '/industries/manufacturing',
      desc: 'IIoT sensor networks, edge vision inspection, predictive maintenance.',
      icon: <Factory className="w-5 h-5 text-[#0876B9]" />
    }
  ];

  const isTransparentOnHero = location.pathname === '/' && !isScrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-3.5 shadow-sm bg-white/95 backdrop-blur-md' 
          : isTransparentOnHero 
            ? 'bg-transparent py-4 sm:py-6' 
            : 'bg-white/95 backdrop-blur-md py-4 sm:py-6'
      }`}
    >
      <div className="w-full px-[8%] flex items-center justify-between">
        {/* Logo & Tagline */}
        <Link to="/" className="flex items-center gap-6 group">
          <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Logo className="w-full h-full object-contain" dark={!isTransparentOnHero} />
          </div>
          <div className="flex flex-col">
            <span className={`font-sans font-bold text-base md:text-lg tracking-tight leading-tight transition-colors duration-200 ${
              isTransparentOnHero ? 'text-white' : 'text-slate-900'
            }`}>
              DRISH INFOTECH LIMITED
            </span>
            <span className={`font-sans text-[9px] font-medium tracking-[0.18em] uppercase leading-none mt-0.5 transition-colors duration-200 ${
              isTransparentOnHero ? 'text-slate-300' : 'text-slate-500'
            }`}>
              AI-POWERED SOLUTIONS • EST. 1999
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7" aria-label="Main Navigation">

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              type="button"
              onClick={() => handleNavClick('/services')}
              className={`text-sm font-medium transition-colors flex items-center gap-1 group py-2 cursor-pointer ${
                isTransparentOnHero ? 'text-slate-200 hover:text-sky-400' : 'text-slate-700 hover:text-[#0876B9]'
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform ${activeDropdown === 'services' ? 'rotate-180 text-[#0876B9]' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-white rounded-lg shadow-2xl border border-slate-200 p-4 grid grid-cols-2 gap-2 mt-1 z-50"
                >
                  {servicesDropdown.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className="p-3 rounded-md hover:bg-[#F8FAFC] border border-transparent hover:border-slate-200 transition-all flex items-start gap-3 group/item"
                    >
                      <div className="p-2 rounded bg-slate-50 border border-slate-100 group-hover/item:border-[#0876B9]/30 group-hover/item:bg-blue-50/50 shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs font-bold text-slate-900 group-hover/item:text-[#0876B9] transition-colors leading-tight">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-blue-50 text-[#0876B9] border border-blue-200">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-normal line-clamp-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between px-2">
                    <Link to="/services" className="text-xs font-bold text-[#0876B9] hover:underline flex items-center gap-1">
                      <span>View Full Services Portfolio</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link to="/contact" className="text-xs font-semibold text-slate-500 hover:text-slate-900">
                      Request Custom Architecture
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industries Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('industries')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              type="button"
              onClick={() => handleNavClick('/industries')}
              className={`text-sm font-medium transition-colors flex items-center gap-1 group py-2 cursor-pointer ${
                isTransparentOnHero ? 'text-slate-200 hover:text-sky-400' : 'text-slate-700 hover:text-[#0876B9]'
              }`}
            >
              <span>Industries</span>
              <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform ${activeDropdown === 'industries' ? 'rotate-180 text-[#0876B9]' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'industries' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-lg shadow-2xl border border-slate-200 p-4 grid grid-cols-2 gap-2 mt-1 z-50"
                >
                  {industriesDropdown.map((ind, idx) => (
                    <Link
                      key={idx}
                      to={ind.path}
                      className="p-3 rounded-md hover:bg-[#F8FAFC] border border-transparent hover:border-slate-200 transition-all flex items-start gap-3 group/item"
                    >
                      <div className="p-2 rounded bg-slate-50 border border-slate-100 group-hover/item:border-[#0876B9]/30 group-hover/item:bg-blue-50/50 shrink-0">
                        {ind.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover/item:text-[#0876B9] transition-colors leading-tight block mb-0.5">
                          {ind.title}
                        </span>
                        <p className="text-[11px] text-slate-500 font-normal line-clamp-2 leading-relaxed">
                          {ind.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between px-2">
                    <Link to="/industries" className="text-xs font-bold text-[#0876B9] hover:underline flex items-center gap-1">
                      <span>View Full Industries Portfolio</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link to="/contact" className="text-xs font-semibold text-slate-500 hover:text-slate-900">
                      Sector Compliance Inquiries
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Technologies Link */}
          <Link
            to="/technologies"
            className={`text-sm font-medium transition-colors py-2 ${
              isTransparentOnHero ? 'text-slate-200 hover:text-sky-400' : 'text-slate-700 hover:text-[#0876B9]'
            }`}
          >
            Technologies
          </Link>

          {/* About Link */}
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors py-2 ${
              isTransparentOnHero ? 'text-slate-200 hover:text-sky-400' : 'text-slate-700 hover:text-[#0876B9]'
            }`}
          >
            About
          </Link>

          {/* Insights / Case Studies Link */}
          <Link
            to="/case-studies"
            className={`text-sm font-medium transition-colors py-2 ${
              isTransparentOnHero ? 'text-slate-200 hover:text-sky-400' : 'text-slate-700 hover:text-[#0876B9]'
            }`}
          >
            Insights
          </Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link 
            to="/contact"
            className="hidden lg:flex px-6 py-2.5 bg-[#0876B9] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm hover:bg-[#065E94] transition-all shadow-xs cursor-pointer"
          >
            Contact Us
          </Link>
          
          <button 
            type="button"
            className={`lg:hidden p-2 focus:outline-hidden cursor-pointer transition-colors ${
              isTransparentOnHero ? 'text-white' : 'text-slate-900'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-slate-200/90 lg:hidden shadow-xl max-h-[85vh] overflow-y-auto"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col space-y-2">

              <Link 
                to="/services/qa-automation"
                className="text-base font-semibold text-slate-800 hover:text-[#0876B9] transition-colors py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>AI-Powered Quality Engineering</span>
                <span className="text-[10px] font-bold uppercase text-[#0876B9] bg-blue-50 px-2 py-0.5 rounded">Flagship</span>
              </Link>
              <Link 
                to="/services"
                className="text-base font-semibold text-slate-800 hover:text-[#0876B9] transition-colors py-2.5 border-b border-slate-100"
              >
                Services & Capabilities
              </Link>
              <Link 
                to="/industries"
                className="text-base font-semibold text-slate-800 hover:text-[#0876B9] transition-colors py-2.5 border-b border-slate-100"
              >
                Industries We Serve
              </Link>
              <Link 
                to="/technologies"
                className="text-base font-semibold text-slate-800 hover:text-[#0876B9] transition-colors py-2.5 border-b border-slate-100"
              >
                Technology Stack
              </Link>
              <Link 
                to="/methodology"
                className="text-base font-semibold text-slate-800 hover:text-[#0876B9] transition-colors py-2.5 border-b border-slate-100"
              >
                Engineering Methodology
              </Link>
              <Link 
                to="/about"
                className="text-base font-semibold text-slate-800 hover:text-[#0876B9] transition-colors py-2.5 border-b border-slate-100"
              >
                About Drish Infotech
              </Link>
              <Link 
                to="/case-studies"
                className="text-base font-semibold text-slate-800 hover:text-[#0876B9] transition-colors py-2.5 border-b border-slate-100"
              >
                Case Studies & Insights
              </Link>
              <Link 
                to="/careers"
                className="text-base font-semibold text-slate-800 hover:text-[#0876B9] transition-colors py-2.5 border-b border-slate-100"
              >
                Careers
              </Link>
              <Link 
                to="/training"
                className="text-base font-semibold text-slate-800 hover:text-[#0876B9] transition-colors py-2.5 border-b border-slate-100"
              >
                Training & Internship
              </Link>
              
              <Link 
                to="/contact"
                className="mt-4 px-6 py-3 bg-[#0876B9] text-white text-center text-sm font-semibold uppercase tracking-wider rounded-sm hover:bg-[#065E94] transition-all w-full shadow-xs"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

Header.displayName = 'Header';
