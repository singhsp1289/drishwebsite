// Client-side API fetch utilities and database hooks

export interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  badge: string;
  tagline?: string | null;
  shortDescription: string;
  fullDescription?: string | null;
  icon: string;
  color?: string | null;
  order: number;
  isActive: boolean;
  tags: string[];
  heroHighlights: string[];
  pillars: Array<{ title: string; desc: string; icon?: string }>;
  outcomes: Array<{ metric: string; desc: string; label?: string }>;
  techStack: Array<{ category: string; tools: string[] }>;
  methodologySteps: Array<{ step: string; title: string; desc: string }>;
}

export interface IndustryItem {
  id: number;
  slug: string;
  name: string;
  badge: string;
  tagline?: string | null;
  shortDescription: string;
  fullDescription?: string | null;
  compliance?: string | null;
  image?: string | null;
  icon: string;
  order: number;
  isActive: boolean;
  tags: string[];
  outcomes: Array<{ stat: string; label: string }>;
  capabilities: Array<{ title: string; desc: string }>;
}

export interface TechnologyItem {
  id: number;
  name: string;
  category: string;
  role: string;
  description: string;
  icon?: string | null;
  order: number;
  isActive: boolean;
}

export interface CaseStudyItem {
  id: number;
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  technologies: string[];
  metrics: Array<{ metric: string; label: string }>;
  image?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
}

export interface TestimonialItem {
  id: number;
  slug: string;
  clientName: string;
  companyName: string;
  role?: string | null;
  region?: string | null;
  quote: string;
  rating: number;
  logoSvg?: string | null;
  avatarUrl?: string | null;
  order: number;
  isActive: boolean;
}

export interface InquiryItem {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceInterest?: string | null;
  message: string;
  status: string;
  notes?: string | null;
  createdAt: string;
}

export interface AdminUser {
  id: number;
  uid: string;
  username: string;
  email: string;
  displayName: string;
  photoUrl?: string | null;
  role: 'super_admin' | 'admin' | 'editor';
  mustChangePassword: boolean;
  isActive: boolean;
  lastLogin?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  general_info?: {
    companyName: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
    yearsOfExcellence: string;
    certifications: string[];
  };
  hero_section?: {
    badge: string;
    title: string;
    highlightText: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  stats_banner?: {
    items: Array<{ number: string; label: string; sublabel: string }>;
  };
  [key: string]: any;
}

// In-memory cache with TTL and in-flight promise deduplication
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const inFlightRequests = new Map<string, Promise<any>>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function cachedFetch<T>(url: string, ttl: number = CACHE_TTL_MS): Promise<T> {
  const cached = cache.get(url);
  const now = Date.now();
  if (cached && now - cached.timestamp < ttl) {
    return cached.data;
  }

  const existingPromise = inFlightRequests.get(url);
  if (existingPromise) {
    return existingPromise;
  }

  const fetchPromise = (async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch from ${url} (HTTP ${res.status})`);
      }
      const data = await res.json();
      cache.set(url, { data, timestamp: Date.now() });
      return data;
    } finally {
      inFlightRequests.delete(url);
    }
  })();

  inFlightRequests.set(url, fetchPromise);
  return fetchPromise;
}

export function invalidateApiCache(prefix?: string) {
  if (!prefix) {
    cache.clear();
  } else {
    for (const key of cache.keys()) {
      if (key.startsWith(prefix)) {
        cache.delete(key);
      }
    }
  }
}

export const api = {
  // Public Data (Cached & Deduplicated)
  async getServices(): Promise<ServiceItem[]> {
    return cachedFetch<ServiceItem[]>('/api/services');
  },

  async getServiceBySlug(slug: string): Promise<ServiceItem> {
    return cachedFetch<ServiceItem>(`/api/services/${slug}`);
  },

  async getIndustries(): Promise<IndustryItem[]> {
    return cachedFetch<IndustryItem[]>('/api/industries');
  },

  async getIndustryBySlug(slug: string): Promise<IndustryItem> {
    return cachedFetch<IndustryItem>(`/api/industries/${slug}`);
  },

  async getTechnologies(): Promise<TechnologyItem[]> {
    return cachedFetch<TechnologyItem[]>('/api/technologies');
  },

  async getCaseStudies(): Promise<CaseStudyItem[]> {
    return cachedFetch<CaseStudyItem[]>('/api/case-studies');
  },

  async getCaseStudyBySlug(slug: string): Promise<CaseStudyItem> {
    return cachedFetch<CaseStudyItem>(`/api/case-studies/${slug}`);
  },

  async getTestimonials(): Promise<TestimonialItem[]> {
    return cachedFetch<TestimonialItem[]>('/api/testimonials');
  },

  async getSettings(): Promise<SiteSettings> {
    return cachedFetch<SiteSettings>('/api/settings');
  },

  async submitInquiry(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    serviceInterest?: string;
    message: string;
  }): Promise<{ success: boolean; message: string; inquiryId?: number }> {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to submit inquiry');
    }
    return result;
  },

  // Admin APIs (requires token)
  async adminGetStats(token: string) {
    const res = await fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch admin stats');
    return res.json();
  },

  async adminGetServices(token: string): Promise<ServiceItem[]> {
    const res = await fetch('/api/admin/services', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch admin services');
    return res.json();
  },

  async adminSaveService(token: string, data: Partial<ServiceItem>, id?: number): Promise<ServiceItem> {
    const url = id ? `/api/admin/services/${id}` : '/api/admin/services';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to save service');
    }
    invalidateApiCache('/api/services');
    return res.json();
  },

  async adminDeleteService(token: string, id: number): Promise<void> {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete service');
    invalidateApiCache('/api/services');
  },

  async adminGetIndustries(token: string): Promise<IndustryItem[]> {
    const res = await fetch('/api/admin/industries', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch admin industries');
    return res.json();
  },

  async adminSaveIndustry(token: string, data: Partial<IndustryItem>, id?: number): Promise<IndustryItem> {
    const url = id ? `/api/admin/industries/${id}` : '/api/admin/industries';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to save industry');
    }
    invalidateApiCache('/api/industries');
    return res.json();
  },

  async adminDeleteIndustry(token: string, id: number): Promise<void> {
    const res = await fetch(`/api/admin/industries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete industry');
    invalidateApiCache('/api/industries');
  },

  async adminGetTechnologies(token: string): Promise<TechnologyItem[]> {
    const res = await fetch('/api/admin/technologies', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch admin technologies');
    return res.json();
  },

  async adminSaveTechnology(token: string, data: Partial<TechnologyItem>, id?: number): Promise<TechnologyItem> {
    const url = id ? `/api/admin/technologies/${id}` : '/api/admin/technologies';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to save technology');
    }
    invalidateApiCache('/api/technologies');
    return res.json();
  },

  async adminDeleteTechnology(token: string, id: number): Promise<void> {
    const res = await fetch(`/api/admin/technologies/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete technology');
    invalidateApiCache('/api/technologies');
  },

  async adminGetCaseStudies(token: string): Promise<CaseStudyItem[]> {
    const res = await fetch('/api/admin/case-studies', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch admin case studies');
    return res.json();
  },

  async adminSaveCaseStudy(token: string, data: Partial<CaseStudyItem>, id?: number): Promise<CaseStudyItem> {
    const url = id ? `/api/admin/case-studies/${id}` : '/api/admin/case-studies';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to save case study');
    }
    invalidateApiCache('/api/case-studies');
    return res.json();
  },

  async adminDeleteCaseStudy(token: string, id: number): Promise<void> {
    const res = await fetch(`/api/admin/case-studies/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete case study');
    invalidateApiCache('/api/case-studies');
  },

  async adminGetTestimonials(token: string): Promise<TestimonialItem[]> {
    const res = await fetch('/api/admin/testimonials', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch admin testimonials');
    return res.json();
  },

  async adminSaveTestimonial(token: string, data: Partial<TestimonialItem>, id?: number): Promise<TestimonialItem> {
    const url = id ? `/api/admin/testimonials/${id}` : '/api/admin/testimonials';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to save testimonial');
    }
    invalidateApiCache('/api/testimonials');
    return res.json();
  },

  async adminDeleteTestimonial(token: string, id: number): Promise<void> {
    const res = await fetch(`/api/admin/testimonials/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete testimonial');
    invalidateApiCache('/api/testimonials');
  },

  async adminGetInquiries(token: string): Promise<InquiryItem[]> {
    const res = await fetch('/api/admin/inquiries', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch admin inquiries');
    return res.json();
  },

  async adminUpdateInquiry(token: string, id: number, data: { status?: string; notes?: string }): Promise<InquiryItem> {
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update inquiry');
    return res.json();
  },

  async adminDeleteInquiry(token: string, id: number): Promise<void> {
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete inquiry');
  },

  async adminUpdateSetting(token: string, key: string, value: any, category?: string) {
    const res = await fetch(`/api/admin/settings/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ value, category }),
    });
    if (!res.ok) throw new Error('Failed to update setting');
    invalidateApiCache('/api/settings');
    return res.json();
  },

  // ==========================================
  // ADMIN AUTH & USER MANAGEMENT METHODS
  // ==========================================

  async login(usernameOrEmail: string, password: string):Promise<{ token: string; user: AdminUser }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameOrEmail, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Invalid credentials or login failed');
    }
    return data;
  },

  async changePassword(
    payload: { oldPassword?: string; newPassword: string; usernameOrEmail?: string },
    token?: string
  ): Promise<{ success: boolean; message: string; user?: AdminUser; token?: string }> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to change password');
    }
    return data;
  },

  async getMe(token: string): Promise<AdminUser> {
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to authenticate current session');
    }
    return data;
  },

  async adminGetUsers(token: string): Promise<AdminUser[]> {
    const res = await fetch('/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch admin users');
    }
    return data;
  },

  async adminCreateUser(
    token: string,
    userData: {
      username: string;
      email: string;
      displayName: string;
      password: string;
      role: 'super_admin' | 'admin' | 'editor';
      mustChangePassword?: boolean;
    }
  ): Promise<AdminUser> {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to create admin user');
    }
    return data;
  },

  async adminUpdateUser(
    token: string,
    id: number,
    userData: Partial<AdminUser> & { password?: string }
  ): Promise<AdminUser> {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update admin user');
    }
    return data;
  },

  async adminDeleteUser(token: string, id: number): Promise<void> {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to delete admin user');
    }
  },
};
