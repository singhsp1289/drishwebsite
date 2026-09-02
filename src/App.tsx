/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';

// Lazy load internal pages for optimal chunking and rapid TTFB
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const ServicesHubPage = lazy(() => import('./pages/ServicesHubPage').then(m => ({ default: m.ServicesHubPage })));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const IndustryDetailPage = lazy(() => import('./pages/IndustryDetailPage').then(m => ({ default: m.IndustryDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage').then(m => ({ default: m.MethodologyPage })));
const TechnologiesPage = lazy(() => import('./pages/TechnologiesPage').then(m => ({ default: m.TechnologiesPage })));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const TrainingPage = lazy(() => import('./pages/TrainingPage').then(m => ({ default: m.TrainingPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0876B9]/20 selection:text-slate-900 relative flex flex-col justify-between">
          <Header />
          

          <main className="flex-grow">
            <Suspense fallback={
              <div className="min-h-[60vh] flex items-center justify-center bg-[#F8FAFC]">
                <div className="w-8 h-8 border-2 border-[#0876B9] border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <Routes>
                {/* Homepage */}
                <Route path="/" element={<HomePage />} />

                {/* Services & Capabilities */}
                <Route path="/services" element={<ServicesHubPage />} />
                <Route path="/solutions" element={<ServicesHubPage />} />
                <Route path="/services/:serviceId" element={<ServiceDetailPage />} />

                {/* Industries */}
                <Route path="/industries" element={<IndustriesPage />} />
                <Route path="/industries/:industryId" element={<IndustryDetailPage />} />

                {/* Company, Methodology & Stack */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/company" element={<AboutPage />} />
                <Route path="/methodology" element={<MethodologyPage />} />
                <Route path="/technologies" element={<TechnologiesPage />} />

                {/* Insights & Case Studies */}
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/insights" element={<CaseStudiesPage />} />

                {/* Careers & Training */}
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/training" element={<TrainingPage />} />
                <Route path="/internship" element={<TrainingPage />} />

                {/* Contact & Consultation */}
                <Route path="/contact" element={<ContactPage />} />

                {/* FAQ Dedicated Page */}
                <Route path="/faq" element={<FAQPage />} />

                {/* Admin Management Console */}
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/login" element={<AdminPage />} />

                {/* Legal & Trust */}
                <Route path="/privacy" element={<LegalPage />} />
                <Route path="/terms" element={<LegalPage />} />
                <Route path="/trust-center" element={<LegalPage />} />

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
