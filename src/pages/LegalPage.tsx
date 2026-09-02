import { memo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Lock, FileText } from 'lucide-react';

export const LegalPage = memo(function LegalPage() {
  const { pathname } = useLocation();

  const isPrivacy = pathname.includes('privacy');
  const isTerms = pathname.includes('terms');

  const title = isPrivacy 
    ? 'Privacy & Data Protection Policy' 
    : isTerms 
    ? 'Terms of Service' 
    : 'Security & Trust Center';

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">{title}</span>
        </div>
      </div>

      <div className="w-full px-[8%] py-16 max-w-4xl">
        <div className="flex items-center gap-3 mb-4 text-[#0876B9]">
          <ShieldCheck className="w-8 h-8" />
          <span className="text-xs font-bold uppercase tracking-widest">Compliance & Governance</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
          {title}
        </h1>

        <p className="text-xs text-slate-500 mb-10 pb-4 border-b border-slate-200">
          Last Updated: January 2025 &bull; Drish Infotech Limited Enterprise Standards
        </p>

        {isPrivacy && (
          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900">1. Commitment to Data Privacy</h2>
            <p>
              Drish Infotech Limited is committed to upholding rigorous standards of privacy and data protection across all engineering operations, consulting engagements, and website interactions. We strictly adhere to global data protection laws including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
            </p>

            <h2 className="text-xl font-bold text-slate-900">2. Collection of Technical Information</h2>
            <p>
              When you interact with our website or submit project inquiries, we may collect technical and professional information including your name, corporate email address, organization name, and technical project requirements. This information is utilized solely to deliver proposals, consult on architecture, and provide requested engineering services.
            </p>

            <h2 className="text-xl font-bold text-slate-900">3. Non-Disclosure & Intellectual Property</h2>
            <p>
              We treat all client code, architectural designs, algorithms, and business logic with strict confidentiality protected under mutual Non-Disclosure Agreements (NDAs). Client code repositories are strictly isolated with role-based access control and zero third-party leakage.
            </p>

            <h2 className="text-xl font-bold text-slate-900">4. Contacting the Data Protection Officer</h2>
            <p>
              For any privacy inquiries or data requests, contact our Compliance Office at <a href="mailto:privacy@drishinfo.com" className="text-[#0876B9] font-semibold">privacy@drishinfo.com</a>.
            </p>
          </div>
        )}

        {isTerms && (
          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900">1. Enterprise Master Service Agreement (MSA)</h2>
            <p>
              All software engineering, testing, device driver development, and consulting engagements delivered by Drish Infotech Limited are governed by tailored Master Service Agreements (MSAs) and Statements of Work (SOWs) executed between the parties.
            </p>

            <h2 className="text-xl font-bold text-slate-900">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise explicitly stipulated in an SOW, all proprietary source code, custom device drivers, automation scripts, and deliverable artifacts created exclusively for the client shall become the sole intellectual property of the client upon final milestone settlement.
            </p>

            <h2 className="text-xl font-bold text-slate-900">3. Service Level Agreements & Reliability</h2>
            <p>
              Drish Infotech commits to delivering engineering solutions that meet agreed-upon performance benchmarks, code coverage ratios, security compliance checks, and deployment timelines.
            </p>
          </div>
        )}

        {!isPrivacy && !isTerms && (
          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900">1. Security Overview & Trust Architecture</h2>
            <p>
              Drish Infotech employs a Zero Trust security architecture across all engineering workstations, cloud repositories, and CI/CD pipelines. We enforce multi-factor authentication, cryptographic key management via hardware security modules, and least-privilege role-based access.
            </p>

            <h2 className="text-xl font-bold text-slate-900">2. Certifications & Audit Readiness</h2>
            <p>
              Our software engineering practices and delivery infrastructure are aligned with ISO 27001 Information Security Management, ISO 9001 Quality Management, and SOC 2 Type II compliance standards.
            </p>

            <h2 className="text-xl font-bold text-slate-900">3. Responsible Vulnerability Disclosure</h2>
            <p>
              If you believe you have identified a potential security vulnerability in any public-facing asset, please report it immediately to our security response team at <a href="mailto:security@drishinfo.com" className="text-[#0876B9] font-semibold">security@drishinfo.com</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

LegalPage.displayName = 'LegalPage';
