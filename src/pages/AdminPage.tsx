import { useState, useEffect, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { AdminLoginView } from '../components/admin/AdminLoginView.tsx';
import { AdminUsersTab } from '../components/admin/AdminUsersTab.tsx';
import {
  api,
  ServiceItem,
  IndustryItem,
  TechnologyItem,
  CaseStudyItem,
  TestimonialItem,
  InquiryItem,
  SiteSettings,
} from '../services/apiClient.ts';
import {
  LayoutDashboard,
  Layers,
  Building2,
  Cpu,
  FileText,
  MessageSquare,
  Quote,
  Settings,
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  LogOut,
  LogIn,
  Eye,
  RefreshCw,
  Search,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  KeyRound,
} from 'lucide-react';

type Tab = 'overview' | 'inquiries' | 'services' | 'industries' | 'technologies' | 'case-studies' | 'testimonials' | 'settings' | 'users';

export const AdminPage = memo(function AdminPage() {
  const { user, idToken, loading: authLoading, signOut, getIdToken } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [inquiriesList, setInquiriesList] = useState<InquiryItem[]>([]);
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [industriesList, setIndustriesList] = useState<IndustryItem[]>([]);
  const [technologiesList, setTechnologiesList] = useState<TechnologyItem[]>([]);
  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudyItem[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({});

  // Search and filter
  const [searchQuery, setSearchQuery] = useState('');

  // Modals / Editing states
  const [editingItem, setEditingItem] = useState<{ type: string; data: any } | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const token = (await getIdToken()) || idToken || '';
      if (!token) return;

      const [sData, inqData, servData, indData, techData, csData, testData, settsData] = await Promise.all([
        api.adminGetStats(token).catch(() => null),
        api.adminGetInquiries(token).catch(() => []),
        api.adminGetServices(token).catch(() => []),
        api.adminGetIndustries(token).catch(() => []),
        api.adminGetTechnologies(token).catch(() => []),
        api.adminGetCaseStudies(token).catch(() => []),
        api.adminGetTestimonials(token).catch(() => []),
        api.getSettings().catch(() => ({})),
      ]);

      if (sData) setStats(sData);
      setInquiriesList(inqData);
      setServicesList(servData);
      setIndustriesList(indData);
      setTechnologiesList(techData);
      setCaseStudiesList(csData);
      setTestimonialsList(testData);
      setSiteSettings(settsData);
    } catch (err: any) {
      console.error('Error loading admin data:', err);
      setError(err.message || 'Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  }, [user, idToken, getIdToken]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, loadData]);

  // Handle Inquiry Status Change
  const handleUpdateInquiryStatus = async (id: number, status: string) => {
    try {
      const token = (await getIdToken()) || '';
      await api.adminUpdateInquiry(token, id, { status });
      showSuccess(`Inquiry #${id} marked as ${status}`);
      loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to update inquiry');
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this inquiry submission?')) return;
    try {
      const token = (await getIdToken()) || '';
      await api.adminDeleteInquiry(token, id);
      showSuccess('Inquiry deleted');
      loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to delete inquiry');
    }
  };

  // Toggle active / published status
  const handleToggleService = async (item: ServiceItem) => {
    try {
      const token = (await getIdToken()) || '';
      await api.adminSaveService(token, { ...item, isActive: !item.isActive }, item.id);
      showSuccess(`Service status updated`);
      loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to update service');
    }
  };

  const handleToggleIndustry = async (item: IndustryItem) => {
    try {
      const token = (await getIdToken()) || '';
      await api.adminSaveIndustry(token, { ...item, isActive: !item.isActive }, item.id);
      showSuccess(`Industry status updated`);
      loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to update industry');
    }
  };

  const handleToggleCaseStudy = async (item: CaseStudyItem) => {
    try {
      const token = (await getIdToken()) || '';
      await api.adminSaveCaseStudy(token, { ...item, isPublished: !item.isPublished }, item.id);
      showSuccess(`Case study published state updated`);
      loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to update case study');
    }
  };

  // If loading auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#0876B9] animate-spin" />
          <p className="text-sm font-semibold text-slate-600">Verifying secure authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, display dedicated admin credentials login page
  if (!user) {
    return <AdminLoginView onSuccess={() => loadData()} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-24 pb-20">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
        <div className="w-full px-[8%] py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 border border-blue-200/80 rounded-sm flex items-center justify-center text-[#0876B9]">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Drish Central Control Console</span>
                <span className="text-[10px] bg-blue-100 text-[#0876B9] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Live Database
                </span>
                {user.role && (
                  <span className="text-[10px] bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {user.role === 'super_admin' ? 'Super Admin' : user.role}
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Signed in as: <span className="font-semibold text-slate-700">{user.displayName || user.username}</span> (@{user.username || user.email})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-sm transition-colors cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-sm transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={signOut}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-sm border border-rose-200/80 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="w-full px-[8%] mt-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-sm text-xs font-semibold text-blue-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0876B9] shrink-0" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full px-[8%] mt-4">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-sm text-xs font-semibold text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="w-full px-[8%] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-sm shadow-2xs p-3 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Content Management
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#0876B9] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#0876B9] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Client Inquiries</span>
              </div>
              {inquiriesList.filter((i) => i.status === 'new').length > 0 && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                    activeTab === 'inquiries' ? 'bg-white text-[#0876B9]' : 'bg-[#0876B9] text-white'
                  }`}
                >
                  {inquiriesList.filter((i) => i.status === 'new').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-[#0876B9] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>Services ({servicesList.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('industries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'industries'
                  ? 'bg-[#0876B9] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4" />
                <span>Industries ({industriesList.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('technologies')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'technologies'
                  ? 'bg-[#0876B9] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4" />
                <span>Technologies ({technologiesList.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('case-studies')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'case-studies'
                  ? 'bg-[#0876B9] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>Case Studies ({caseStudiesList.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-[#0876B9] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Quote className="w-4 h-4" />
                <span>Testimonials ({testimonialsList.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#0876B9] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Site Settings & Copy</span>
              </div>
            </button>

            <div className="pt-3 border-t border-slate-200">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Access & Security
              </div>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'users'
                    ? 'bg-[#0876B9] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Admin Users & Access</span>
                </div>
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-white border border-slate-200 rounded-sm shadow-2xs">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Inquiries</div>
                    <div className="text-3xl font-extrabold text-[#0876B9] mt-1">
                      {inquiriesList.filter((i) => i.status === 'new').length}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Total: {inquiriesList.length} submissions
                    </div>
                  </div>

                  <div className="p-5 bg-white border border-slate-200 rounded-sm shadow-2xs">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Services</div>
                    <div className="text-3xl font-extrabold text-slate-900 mt-1">
                      {servicesList.length}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Active: {servicesList.filter((s) => s.isActive).length}
                    </div>
                  </div>

                  <div className="p-5 bg-white border border-slate-200 rounded-sm shadow-2xs">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industries</div>
                    <div className="text-3xl font-extrabold text-slate-900 mt-1">
                      {industriesList.length}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Active: {industriesList.filter((i) => i.isActive).length}
                    </div>
                  </div>

                  <div className="p-5 bg-white border border-slate-200 rounded-sm shadow-2xs">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Technologies</div>
                    <div className="text-3xl font-extrabold text-slate-900 mt-1">
                      {technologiesList.length}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Across 6 domains</div>
                  </div>
                </div>

                {/* Recent Inquiries Card */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-2xs p-6">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Recent Customer Inquiries</h2>
                      <p className="text-xs text-slate-500">Live submissions from the website contact & consultation form</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-bold text-[#0876B9] hover:text-[#065E94] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({inquiriesList.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {inquiriesList.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      No inquiries submitted yet. Form submissions will appear here in real time.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {inquiriesList.slice(0, 5).map((inq) => (
                        <div key={inq.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">{inq.name}</span>
                              <span className="text-xs text-slate-500">({inq.email})</span>
                              {inq.company && (
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                  {inq.company}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-600 line-clamp-1">{inq.message}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                inq.status === 'new'
                                  ? 'bg-amber-100 text-amber-800'
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {inq.status}
                            </span>
                            <button
                              onClick={() => {
                                setActiveTab('inquiries');
                              }}
                              className="text-xs text-[#0876B9] font-bold hover:underline cursor-pointer"
                            >
                              Review
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="bg-white border border-slate-200 rounded-sm shadow-2xs p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Customer Inquiries & Consultations</h2>
                    <p className="text-xs text-slate-500">Direct form submissions with status workflow management</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search inquiries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:border-[#0876B9]"
                      />
                    </div>
                  </div>
                </div>

                {inquiriesList.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 text-sm">
                    No inquiries recorded in the database yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiriesList
                      .filter(
                        (i) =>
                          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (i.company && i.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          i.message.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((inq) => (
                        <div
                          key={inq.id}
                          className="p-5 border border-slate-200 rounded-sm bg-slate-50/50 space-y-3"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-slate-900">{inq.name}</h3>
                                <span className="text-xs text-slate-500 font-mono">#{inq.id}</span>
                              </div>
                              <div className="text-xs text-slate-600 mt-0.5">
                                <a href={`mailto:${inq.email}`} className="text-[#0876B9] hover:underline font-semibold">
                                  {inq.email}
                                </a>
                                {inq.phone && <span> • Phone: {inq.phone}</span>}
                                {inq.company && <span> • Company: <span className="font-semibold text-slate-800">{inq.company}</span></span>}
                              </div>
                              {inq.serviceInterest && (
                                <div className="text-[11px] text-slate-500 mt-1">
                                  Interest: <span className="font-semibold text-slate-700">{inq.serviceInterest}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={inq.status}
                                onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                                className="text-xs font-bold px-2.5 py-1 rounded border border-slate-300 bg-white cursor-pointer"
                              >
                                <option value="new">Status: New</option>
                                <option value="contacted">Status: Contacted</option>
                                <option value="in_progress">Status: In Progress</option>
                                <option value="resolved">Status: Resolved</option>
                                <option value="archived">Status: Archived</option>
                              </select>

                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="p-3.5 bg-white border border-slate-200 rounded-sm text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {inq.message}
                          </div>

                          <div className="text-[10px] text-slate-400 flex items-center justify-between">
                            <span>Received: {new Date(inq.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="bg-white border border-slate-200 rounded-sm shadow-2xs p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Engineering Services</h2>
                    <p className="text-xs text-slate-500">Manage offerings, descriptions, pillars, and technical capabilities</p>
                  </div>
                  <button
                    onClick={() => setEditingItem({ type: 'service', data: { order: servicesList.length + 1, isActive: true, tags: [], heroHighlights: [], pillars: [], outcomes: [], techStack: [], methodologySteps: [] } })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-bold rounded-sm shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {servicesList.map((serv) => (
                    <div
                      key={serv.id}
                      className="p-4 border border-slate-200 rounded-sm bg-slate-50/50 flex flex-wrap items-start justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400">#{serv.order}</span>
                          <h3 className="text-sm font-bold text-slate-900">{serv.title}</h3>
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                            /{serv.slug}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{serv.shortDescription}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {serv.tags?.map((t, idx) => (
                            <span key={idx} className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleService(serv)}
                          className={`text-xs font-bold px-2.5 py-1 rounded cursor-pointer ${
                            serv.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {serv.isActive ? 'Active' : 'Disabled'}
                        </button>
                        <button
                          onClick={() => setEditingItem({ type: 'service', data: serv })}
                          className="p-1.5 text-slate-500 hover:text-[#0876B9] rounded transition-colors cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INDUSTRIES TAB */}
            {activeTab === 'industries' && (
              <div className="bg-white border border-slate-200 rounded-sm shadow-2xs p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Industry Portfolios</h2>
                    <p className="text-xs text-slate-500">Manage sector capabilities, compliance standards, and case studies</p>
                  </div>
                  <button
                    onClick={() => setEditingItem({ type: 'industry', data: { order: industriesList.length + 1, isActive: true, tags: [], outcomes: [], capabilities: [] } })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-bold rounded-sm shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Industry</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {industriesList.map((ind) => (
                    <div
                      key={ind.id}
                      className="p-4 border border-slate-200 rounded-sm bg-slate-50/50 flex flex-wrap items-start justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400">#{ind.order}</span>
                          <h3 className="text-sm font-bold text-slate-900">{ind.name}</h3>
                          <span className="text-[10px] bg-blue-50 text-[#0876B9] border border-blue-200 px-2 py-0.5 rounded font-bold">
                            {ind.compliance}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{ind.shortDescription}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleIndustry(ind)}
                          className={`text-xs font-bold px-2.5 py-1 rounded cursor-pointer ${
                            ind.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {ind.isActive ? 'Active' : 'Disabled'}
                        </button>
                        <button
                          onClick={() => setEditingItem({ type: 'industry', data: ind })}
                          className="p-1.5 text-slate-500 hover:text-[#0876B9] rounded transition-colors cursor-pointer"
                          title="Edit Industry"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TECHNOLOGIES TAB */}
            {activeTab === 'technologies' && (
              <div className="bg-white border border-slate-200 rounded-sm shadow-2xs p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Technology Stack Registry</h2>
                    <p className="text-xs text-slate-500">Manage frameworks, tools, and technical descriptions</p>
                  </div>
                  <button
                    onClick={() => setEditingItem({ type: 'technology', data: { category: 'Quality & Test Automation', role: '', description: '', order: technologiesList.length + 1, isActive: true } })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-bold rounded-sm shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Technology</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {technologiesList.map((tech) => (
                    <div
                      key={tech.id}
                      className="p-4 border border-slate-200 rounded-sm bg-slate-50/50 flex flex-col justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[#E2725B] uppercase tracking-wider">
                            {tech.category}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">#{tech.order}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mt-1">{tech.name}</h3>
                        <div className="text-xs font-medium text-slate-700 mt-0.5">{tech.role}</div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tech.description}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                        <button
                          onClick={() => setEditingItem({ type: 'technology', data: tech })}
                          className="p-1 text-slate-500 hover:text-[#0876B9] rounded transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CASE STUDIES TAB */}
            {activeTab === 'case-studies' && (
              <div className="bg-white border border-slate-200 rounded-sm shadow-2xs p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Case Studies & Benchmarks</h2>
                    <p className="text-xs text-slate-500">Showcase enterprise engineering impact and measurable metrics</p>
                  </div>
                  <button
                    onClick={() => setEditingItem({ type: 'case-study', data: { order: caseStudiesList.length + 1, isPublished: true, technologies: [], metrics: [] } })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-bold rounded-sm shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Case Study</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {caseStudiesList.map((cs) => (
                    <div
                      key={cs.id}
                      className="p-4 border border-slate-200 rounded-sm bg-slate-50/50 flex flex-wrap items-start justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#E2725B]">{cs.industry}</span>
                          <span className="text-xs text-slate-400">• {cs.client}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{cs.title}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2">{cs.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleCaseStudy(cs)}
                          className={`text-xs font-bold px-2.5 py-1 rounded cursor-pointer ${
                            cs.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {cs.isPublished ? 'Published' : 'Draft'}
                        </button>
                        <button
                          onClick={() => setEditingItem({ type: 'case-study', data: cs })}
                          className="p-1.5 text-slate-500 hover:text-[#0876B9] rounded transition-colors cursor-pointer"
                          title="Edit Case Study"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <div className="bg-white border border-slate-200 rounded-sm shadow-2xs p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Client Testimonials & Endorsements</h2>
                    <p className="text-xs text-slate-500">Verified feedback and partner reviews</p>
                  </div>
                  <button
                    onClick={() => setEditingItem({ type: 'testimonial', data: { rating: 5, order: testimonialsList.length + 1, isActive: true } })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-bold rounded-sm shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {testimonialsList.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 border border-slate-200 rounded-sm bg-slate-50/50 flex flex-wrap items-start justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">{t.clientName}</h3>
                          <span className="text-xs text-slate-500">({t.companyName})</span>
                          <span className="text-xs text-amber-500 font-bold">★ {t.rating}/5</span>
                        </div>
                        <p className="text-xs text-slate-700 italic">"{t.quote}"</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem({ type: 'testimonial', data: t })}
                          className="p-1.5 text-slate-500 hover:text-[#0876B9] rounded transition-colors cursor-pointer"
                          title="Edit Testimonial"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SITE SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-slate-200 rounded-sm shadow-2xs p-6 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">Website Configuration & Content</h2>
                  <p className="text-xs text-slate-500">Update global headers, contact numbers, and corporate metadata</p>
                </div>

                <div className="space-y-6">
                  {/* General Info */}
                  <div className="p-4 border border-slate-200 rounded-sm bg-slate-50/50 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0876B9]">
                      Company & Contact Metadata
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Company Legal Name</label>
                        <input
                          type="text"
                          value={siteSettings.general_info?.companyName || 'Drish Infotech Limited'}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              general_info: {
                                ...siteSettings.general_info,
                                companyName: e.target.value,
                              } as any,
                            })
                          }
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Email</label>
                        <input
                          type="email"
                          value={siteSettings.general_info?.email || 'info@drishinfo.com'}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              general_info: {
                                ...siteSettings.general_info,
                                email: e.target.value,
                              } as any,
                            })
                          }
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={siteSettings.general_info?.phone || '+91 172 265 0000'}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              general_info: {
                                ...siteSettings.general_info,
                                phone: e.target.value,
                              } as any,
                            })
                          }
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">HQ Address</label>
                        <input
                          type="text"
                          value={siteSettings.general_info?.address || 'SCO 134-136, Sector 34-A, Chandigarh, India'}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              general_info: {
                                ...siteSettings.general_info,
                                address: e.target.value,
                              } as any,
                            })
                          }
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-sm"
                        />
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        try {
                          const token = (await getIdToken()) || '';
                          await api.adminUpdateSetting(token, 'general_info', siteSettings.general_info, 'general');
                          showSuccess('Company information saved to database');
                        } catch (err: any) {
                          setError(err.message || 'Failed to save settings');
                        }
                      }}
                      className="px-4 py-2 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-bold rounded-sm cursor-pointer shadow-2xs"
                    >
                      Save Company Information
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* USERS & ACCESS CONTROL TAB */}
            {activeTab === 'users' && <AdminUsersTab />}
          </main>
        </div>
      </div>

      {/* Generic Item Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-sm border border-slate-200 shadow-xl max-w-2xl w-full p-6 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                {editingItem.data.id ? 'Edit' : 'Create'} {editingItem.type}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Service Form */}
            {editingItem.type === 'service' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={editingItem.data.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Slug *</label>
                    <input
                      type="text"
                      value={editingItem.data.slug || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, slug: e.target.value } })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                    <input
                      type="text"
                      value={editingItem.data.badge || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, badge: e.target.value } })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Description *</label>
                  <textarea
                    rows={3}
                    value={editingItem.data.shortDescription || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, shortDescription: e.target.value } })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                  />
                </div>
              </div>
            )}

            {/* Industry Form */}
            {editingItem.type === 'industry' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Industry Name *</label>
                  <input
                    type="text"
                    value={editingItem.data.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Slug *</label>
                    <input
                      type="text"
                      value={editingItem.data.slug || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, slug: e.target.value } })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Compliance Badge</label>
                    <input
                      type="text"
                      value={editingItem.data.compliance || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, compliance: e.target.value } })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Description *</label>
                  <textarea
                    rows={3}
                    value={editingItem.data.shortDescription || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, shortDescription: e.target.value } })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                  />
                </div>
              </div>
            )}

            {/* Technology Form */}
            {editingItem.type === 'technology' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Technology Name *</label>
                  <input
                    type="text"
                    value={editingItem.data.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                    <select
                      value={editingItem.data.category || 'Quality & Test Automation'}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm bg-white"
                    >
                      <option value="Quality & Test Automation">Quality & Test Automation</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Embedded, IoT & Edge Drivers">Embedded, IoT & Edge Drivers</option>
                      <option value="Cloud & Distributed Infrastructure">Cloud & Distributed Infrastructure</option>
                      <option value="Modern Web & Full-Stack">Modern Web & Full-Stack</option>
                      <option value="Cyber Security & Zero Trust">Cyber Security & Zero Trust</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role / Function *</label>
                    <input
                      type="text"
                      value={editingItem.data.role || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, role: e.target.value } })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                  <textarea
                    rows={2}
                    value={editingItem.data.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                  />
                </div>
              </div>
            )}

            {/* Testimonial Form */}
            {editingItem.type === 'testimonial' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Client Name *</label>
                    <input
                      type="text"
                      value={editingItem.data.clientName || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, clientName: e.target.value } })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      value={editingItem.data.companyName || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, companyName: e.target.value } })}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quote / Review *</label>
                  <textarea
                    rows={3}
                    value={editingItem.data.quote || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, quote: e.target.value } })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-sm"
                  />
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    const token = (await getIdToken()) || '';
                    if (editingItem.type === 'service') {
                      await api.adminSaveService(token, editingItem.data, editingItem.data.id);
                    } else if (editingItem.type === 'industry') {
                      await api.adminSaveIndustry(token, editingItem.data, editingItem.data.id);
                    } else if (editingItem.type === 'technology') {
                      await api.adminSaveTechnology(token, editingItem.data, editingItem.data.id);
                    } else if (editingItem.type === 'case-study') {
                      await api.adminSaveCaseStudy(token, editingItem.data, editingItem.data.id);
                    } else if (editingItem.type === 'testimonial') {
                      await api.adminSaveTestimonial(token, editingItem.data, editingItem.data.id);
                    }
                    showSuccess(`${editingItem.type} saved successfully!`);
                    setEditingItem(null);
                    loadData();
                  } catch (err: any) {
                    setError(err.message || 'Failed to save item');
                  }
                }}
                className="px-5 py-2 bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-bold rounded-sm shadow-2xs transition-colors cursor-pointer"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
