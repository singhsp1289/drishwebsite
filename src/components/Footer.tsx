import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export const Footer = memo(function Footer() {
  const serviceLinks = [
    { label: 'AI-Powered Quality Engineering', path: '/services/qa-automation' },
    { label: 'Artificial Intelligence & GenAI', path: '/services/ai' },
    { label: 'Device Driver & IoT', path: '/services/iot' },
    { label: 'Cloud Computing', path: '/services/cloud' },
    { label: 'DevOps & Automation', path: '/services/devops' },
    { label: 'Cyber Security', path: '/services/security' },
    { label: 'Enterprise Software', path: '/services/software-engineering' }
  ];

  const companyLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Engineering Methodology', path: '/methodology' },
    { label: 'Technologies', path: '/technologies' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Careers', path: '/careers' },
    { label: 'Training & Internship', path: '/training' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact Us', path: '/contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Security & Trust Center', path: '/trust-center' }
  ];

  return (
    <footer className="bg-[#031F35] pt-24 pb-12 border-t border-[#083556] text-white">
      <div className="w-full px-[8%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-4 mb-6 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                <Logo className="w-full h-full object-contain" variant="footer" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-base md:text-lg tracking-tight text-white leading-tight">
                  DRISH INFOTECH LIMITED
                </span>
                <span className="font-sans text-[9px] font-medium tracking-[0.18em] text-[#38BDF8] uppercase leading-none mt-0.5">
                  AI-POWERED SOLUTIONS • EST. 1999
                </span>
              </div>
            </Link>
            <p className="text-slate-300 text-sm max-w-sm mb-8 leading-relaxed font-normal">
              We help enterprises solve complex technology challenges through AI, automation, cloud, cybersecurity, and advanced engineering, delivering secure, scalable, and high-performance digital solutions.
            </p>
            <div className="flex items-center gap-3">
              {/* LinkedIn — Official Brand Logo & LinkedIn Blue */}
              <a
                href="https://www.linkedin.com/company/drish-infotech-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Drish Infotech on LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5 drop-shadow-xs" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
                  <path fill="#FFFFFF" d="M19 18.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 0 0 1.46-1.46c0-.81-.66-1.47-1.46-1.47a1.47 1.47 0 0 0-1.47 1.47c0 .8.66 1.46 1.47 1.46m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>

              {/* X / Twitter — Official Brand Logo & Treatment */}
              <a
                href="https://twitter.com/drishindia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Drish Infotech on X"
                className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5 drop-shadow-xs" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="24" height="24" rx="4.5" fill="#000000" />
                  <path fill="#FFFFFF" d="M17.5 5.5h2.15l-4.7 5.37 5.53 7.31H15.9l-3.46-4.52-3.94 4.52H6.35l5.03-5.75L6.05 5.5h4.51l3.13 4.14zm-.75 11.29h1.19L9.67 6.78H8.39z" />
                </svg>
              </a>

              {/* Facebook — Official Brand Logo & Facebook Blue */}
              <a
                href="https://www.facebook.com/DrishInfotechLimited/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Drish Infotech on Facebook"
                className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5 drop-shadow-xs" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="12" fill="#1877F2" />
                  <path fill="#FFFFFF" d="M15.14 12.073h-2.14v7.927h-3.28v-7.927H8.08v-2.79h1.64V7.47c0-2.27 1.35-3.47 3.37-3.47.97 0 1.98.17 1.98.17v2.18h-1.12c-1.13 0-1.47.7-1.47 1.42v1.51h2.46l-.39 2.793z" />
                </svg>
              </a>

              {/* YouTube — Official Brand Logo & YouTube Red */}
              <a
                href="https://www.youtube.com/channel/UC6vagf6cfexn-RvjWZMu6IQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Drish Infotech on YouTube"
                className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5 drop-shadow-xs" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                  <polygon fill="#FFFFFF" points="9.545,15.568 9.545,8.432 15.818,12" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide text-sm uppercase">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-slate-300 hover:text-white text-xs sm:text-sm transition-colors block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide text-sm uppercase">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-slate-300 hover:text-white text-xs sm:text-sm transition-colors block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide text-sm uppercase">Compliance & Trust</h4>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-slate-300 hover:text-white text-xs sm:text-sm transition-colors block">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/admin" className="text-slate-300 hover:text-[#38BDF8] text-xs sm:text-sm transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                  <span>Admin Console</span>
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-[#083556] space-y-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-md w-fit">
                {/* Official Microsoft 4-square icon */}
                <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5 shrink-0" aria-label="Microsoft Logo">
                  <div className="bg-[#F25022] rounded-[0.5px]" />
                  <div className="bg-[#7FBA00] rounded-[0.5px]" />
                  <div className="bg-[#00A4EF] rounded-[0.5px]" />
                  <div className="bg-[#FFB900] rounded-[0.5px]" />
                </div>
                <div className="text-xs font-bold text-[#38BDF8] leading-none">Microsoft Gold Certified Partner</div>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-md w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <div className="text-[11px] text-slate-300 leading-none">ISO 9001 &bull; ISO 27001 Engineering</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#083556] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>© {new Date().getFullYear()} Drish Infotech Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/trust-center" className="hover:text-white transition-colors">Trust Center</Link>
            <Link to="/admin" className="hover:text-[#38BDF8] transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
