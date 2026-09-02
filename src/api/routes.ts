import { Router, Request, Response } from 'express';
import { db } from '../db/index.ts';
import {
  services,
  industries,
  technologies,
  caseStudies,
  testimonials,
  inquiries,
  siteSettings,
  users,
} from '../db/schema.ts';
import { eq, desc, asc, or } from 'drizzle-orm';
import { requireAuth, AuthRequest } from '../middleware/auth.ts';
import {
  store,
  INITIAL_SERVICES,
  INITIAL_INDUSTRIES,
  INITIAL_TECHNOLOGIES,
  INITIAL_CASE_STUDIES,
  INITIAL_TESTIMONIALS,
  INITIAL_SITE_SETTINGS,
} from '../db/inMemoryStore.ts';
import {
  hashPassword,
  verifyPassword,
  createSessionToken,
} from './authUtils.ts';

export const apiRouter = Router();

// Health Check
apiRouter.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==========================================
// PUBLIC READ ENDPOINTS (Database + In-Memory Fallback)
// ==========================================

// 1. Services
apiRouter.get('/services', async (_req: Request, res: Response): Promise<void> => {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  if (db) {
    try {
      const list = await db
        .select()
        .from(services)
        .where(eq(services.isActive, true))
        .orderBy(asc(services.order), asc(services.id));
      if (list && list.length > 0) {
        res.json(list);
        return;
      }
    } catch (error) {
      console.warn('Database query fallback for /services:', error);
    }
  }
  const activeServices = store.services.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
  res.json(activeServices.length > 0 ? activeServices : INITIAL_SERVICES);
});

apiRouter.get('/services/:slug', async (req: Request, res: Response): Promise<void> => {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  const { slug } = req.params;
  if (db) {
    try {
      const item = await db
        .select()
        .from(services)
        .where(eq(services.slug, slug))
        .limit(1);
      if (item && item.length > 0) {
        res.json(item[0]);
        return;
      }
    } catch (error) {
      console.warn('Database query fallback for /services/:slug:', error);
    }
  }
  const found = store.services.find((s) => s.slug === slug) || INITIAL_SERVICES.find((s) => s.slug === slug);
  if (!found) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }
  res.json(found);
});

// 2. Industries
apiRouter.get('/industries', async (_req: Request, res: Response): Promise<void> => {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  if (db) {
    try {
      const list = await db
        .select()
        .from(industries)
        .where(eq(industries.isActive, true))
        .orderBy(asc(industries.order), asc(industries.id));
      if (list && list.length > 0) {
        res.json(list);
        return;
      }
    } catch (error) {
      console.warn('Database query fallback for /industries:', error);
    }
  }
  const activeIndustries = store.industries.filter((i) => i.isActive).sort((a, b) => a.order - b.order);
  res.json(activeIndustries.length > 0 ? activeIndustries : INITIAL_INDUSTRIES);
});

apiRouter.get('/industries/:slug', async (req: Request, res: Response): Promise<void> => {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  const { slug } = req.params;
  if (db) {
    try {
      const item = await db
        .select()
        .from(industries)
        .where(eq(industries.slug, slug))
        .limit(1);
      if (item && item.length > 0) {
        res.json(item[0]);
        return;
      }
    } catch (error) {
      console.warn('Database query fallback for /industries/:slug:', error);
    }
  }
  const found = store.industries.find((i) => i.slug === slug) || INITIAL_INDUSTRIES.find((i) => i.slug === slug);
  if (!found) {
    res.status(404).json({ error: 'Industry not found' });
    return;
  }
  res.json(found);
});

// 3. Technologies
apiRouter.get('/technologies', async (_req: Request, res: Response): Promise<void> => {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  if (db) {
    try {
      const list = await db
        .select()
        .from(technologies)
        .where(eq(technologies.isActive, true))
        .orderBy(asc(technologies.order), asc(technologies.id));
      if (list && list.length > 0) {
        res.json(list);
        return;
      }
    } catch (error) {
      console.warn('Database query fallback for /technologies:', error);
    }
  }
  const activeTech = store.technologies.filter((t) => t.isActive).sort((a, b) => a.order - b.order);
  res.json(activeTech.length > 0 ? activeTech : INITIAL_TECHNOLOGIES);
});

// 4. Case Studies
apiRouter.get('/case-studies', async (_req: Request, res: Response): Promise<void> => {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  if (db) {
    try {
      const list = await db
        .select()
        .from(caseStudies)
        .where(eq(caseStudies.isPublished, true))
        .orderBy(asc(caseStudies.order), desc(caseStudies.createdAt));
      if (list && list.length > 0) {
        res.json(list);
        return;
      }
    } catch (error) {
      console.warn('Database query fallback for /case-studies:', error);
    }
  }
  const publishedCaseStudies = store.caseStudies.filter((c) => c.isPublished).sort((a, b) => a.order - b.order);
  res.json(publishedCaseStudies.length > 0 ? publishedCaseStudies : INITIAL_CASE_STUDIES);
});

apiRouter.get('/case-studies/:slug', async (req: Request, res: Response): Promise<void> => {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  const { slug } = req.params;
  if (db) {
    try {
      const item = await db
        .select()
        .from(caseStudies)
        .where(eq(caseStudies.slug, slug))
        .limit(1);
      if (item && item.length > 0) {
        res.json(item[0]);
        return;
      }
    } catch (error) {
      console.warn('Database query fallback for /case-studies/:slug:', error);
    }
  }
  const found = store.caseStudies.find((c) => c.slug === slug) || INITIAL_CASE_STUDIES.find((c) => c.slug === slug);
  if (!found) {
    res.status(404).json({ error: 'Case study not found' });
    return;
  }
  res.json(found);
});

// 5. Testimonials
apiRouter.get('/testimonials', async (_req: Request, res: Response): Promise<void> => {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  if (db) {
    try {
      const list = await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.isActive, true))
        .orderBy(asc(testimonials.order), asc(testimonials.id));
      if (list && list.length > 0) {
        res.json(list);
        return;
      }
    } catch (error) {
      console.warn('Database query fallback for /testimonials:', error);
    }
  }
  const activeTestimonials = store.testimonials.filter((t) => t.isActive).sort((a, b) => a.order - b.order);
  res.json(activeTestimonials.length > 0 ? activeTestimonials : INITIAL_TESTIMONIALS);
});

// 6. Public Site Settings
apiRouter.get('/settings', async (_req: Request, res: Response): Promise<void> => {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  if (db) {
    try {
      const list = await db.select().from(siteSettings);
      if (list && list.length > 0) {
        const settingsMap: Record<string, any> = {};
        for (const item of list) {
          settingsMap[item.key] = item.value;
        }
        res.json(settingsMap);
        return;
      }
    } catch (error) {
      console.warn('Database query fallback for /settings:', error);
    }
  }
  res.json(store.settings || INITIAL_SITE_SETTINGS);
});

// ==========================================
// CONTACT / INQUIRY FORM SUBMISSION
// ==========================================
const handleInquirySubmission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, company, serviceInterest, message } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      res.status(400).json({ error: 'A valid email address is required' });
      return;
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      res.status(400).json({ error: 'Message must be at least 5 characters long' });
      return;
    }

    let inquiryId = Date.now();

    if (db) {
      try {
        const newInquiry = await db
          .insert(inquiries)
          .values({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone ? String(phone).trim() : null,
            company: company ? String(company).trim() : null,
            serviceInterest: serviceInterest ? String(serviceInterest).trim() : null,
            message: message.trim(),
            status: 'new',
          })
          .returning();
        if (newInquiry && newInquiry[0]?.id) {
          inquiryId = newInquiry[0].id;
        }
      } catch (dbErr) {
        console.warn('Database inquiry insert fallback to memory:', dbErr);
      }
    }

    store.inquiries.unshift({
      id: inquiryId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : null,
      company: company ? String(company).trim() : null,
      serviceInterest: serviceInterest ? String(serviceInterest).trim() : null,
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully. Our engineering team will contact you shortly.',
      inquiryId,
    });
  } catch (error) {
    console.error('Error saving contact inquiry:', error);
    res.status(500).json({ error: 'Failed to submit inquiry. Please try again later.' });
  }
};

apiRouter.post('/contact', handleInquirySubmission);
apiRouter.post('/inquiries', handleInquirySubmission);

// ==========================================
// AUTHENTICATED USER ENDPOINT
// ==========================================
apiRouter.get('/auth/me', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    let dbUser: any = null;
    if (db) {
      try {
        const results = await db
          .select()
          .from(users)
          .where(eq(users.uid, user.uid))
          .limit(1);
        dbUser = results[0];
      } catch {
        // Fallback gracefully
      }
    }

    res.json({
      uid: user.uid,
      email: user.email,
      displayName: user.name || dbUser?.displayName || 'Admin User',
      photoUrl: user.picture || dbUser?.photoUrl,
      role: dbUser?.role || 'admin',
    });
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ==========================================
// ADMIN DASHBOARD & CRUD ENDPOINTS (Protected)
// ==========================================

// Dashboard stats summary
apiRouter.get('/admin/stats', requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (db) {
      try {
        const [
          allServices,
          allIndustries,
          allTechnologies,
          allCaseStudies,
          allInquiries,
          allTestimonials,
        ] = await Promise.all([
          db.select().from(services),
          db.select().from(industries),
          db.select().from(technologies),
          db.select().from(caseStudies),
          db.select().from(inquiries).orderBy(desc(inquiries.createdAt)),
          db.select().from(testimonials),
        ]);

        const newInquiries = allInquiries.filter((i) => i.status === 'new').length;

        res.json({
          servicesCount: allServices.length,
          industriesCount: allIndustries.length,
          technologiesCount: allTechnologies.length,
          caseStudiesCount: allCaseStudies.length,
          testimonialsCount: allTestimonials.length,
          inquiriesCount: allInquiries.length,
          newInquiriesCount: newInquiries,
          recentInquiries: allInquiries.slice(0, 5),
        });
        return;
      } catch (dbErr) {
        console.warn('Database admin stats fallback to memory:', dbErr);
      }
    }

    const newInquiries = store.inquiries.filter((i) => i.status === 'new').length;
    res.json({
      servicesCount: store.services.length,
      industriesCount: store.industries.length,
      technologiesCount: store.technologies.length,
      caseStudiesCount: store.caseStudies.length,
      testimonialsCount: store.testimonials.length,
      inquiriesCount: store.inquiries.length,
      newInquiriesCount: newInquiries,
      recentInquiries: store.inquiries.slice(0, 5),
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// 1. Admin Services CRUD
apiRouter.get('/admin/services', requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  if (db) {
    try {
      const list = await db.select().from(services).orderBy(asc(services.order), asc(services.id));
      res.json(list);
      return;
    } catch {
      // Fallback
    }
  }
  res.json(store.services);
});

apiRouter.post('/admin/services', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const body = req.body;
    if (!body.title || !body.slug || !body.shortDescription) {
      res.status(400).json({ error: 'Title, slug, and short description are required' });
      return;
    }

    const newItem: any = {
      id: Date.now(),
      slug: String(body.slug).trim().toLowerCase().replace(/\s+/g, '-'),
      title: body.title,
      badge: body.badge || 'Engineering Service',
      tagline: body.tagline || '',
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription || '',
      icon: body.icon || 'Code2',
      color: body.color || 'hover:border-[#0876B9]',
      order: Number(body.order) || 0,
      isActive: body.isActive !== false,
      tags: Array.isArray(body.tags) ? body.tags : [],
      heroHighlights: Array.isArray(body.heroHighlights) ? body.heroHighlights : [],
      pillars: Array.isArray(body.pillars) ? body.pillars : [],
      outcomes: Array.isArray(body.outcomes) ? body.outcomes : [],
      techStack: Array.isArray(body.techStack) ? body.techStack : [],
      methodologySteps: Array.isArray(body.methodologySteps) ? body.methodologySteps : [],
    };

    if (db) {
      try {
        const created = await db.insert(services).values(newItem).returning();
        if (created && created[0]) {
          res.status(201).json(created[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB create service fallback:', dbErr);
      }
    }

    store.services.push(newItem);
    res.status(201).json(newItem);
  } catch (error: any) {
    console.error('Admin service create error:', error);
    res.status(500).json({ error: error.message || 'Failed to create service' });
  }
});

apiRouter.put('/admin/services/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    if (db) {
      try {
        const updated = await db
          .update(services)
          .set({
            title: body.title,
            badge: body.badge,
            tagline: body.tagline,
            shortDescription: body.shortDescription,
            fullDescription: body.fullDescription,
            icon: body.icon,
            color: body.color,
            order: Number(body.order) || 0,
            isActive: body.isActive !== false,
            tags: Array.isArray(body.tags) ? body.tags : [],
            heroHighlights: Array.isArray(body.heroHighlights) ? body.heroHighlights : [],
            pillars: Array.isArray(body.pillars) ? body.pillars : [],
            outcomes: Array.isArray(body.outcomes) ? body.outcomes : [],
            techStack: Array.isArray(body.techStack) ? body.techStack : [],
            methodologySteps: Array.isArray(body.methodologySteps) ? body.methodologySteps : [],
            updatedAt: new Date(),
          })
          .where(eq(services.id, id))
          .returning();
        if (updated && updated[0]) {
          res.json(updated[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB update service fallback:', dbErr);
      }
    }

    const idx = store.services.findIndex((s) => s.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    store.services[idx] = { ...store.services[idx], ...body, id };
    res.json(store.services[idx]);
  } catch (error: any) {
    console.error('Admin service update error:', error);
    res.status(500).json({ error: error.message || 'Failed to update service' });
  }
});

apiRouter.delete('/admin/services/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (db) {
      try {
        await db.delete(services).where(eq(services.id, id));
      } catch (dbErr) {
        console.warn('DB delete service fallback:', dbErr);
      }
    }
    store.services = store.services.filter((s) => s.id !== id);
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    console.error('Admin service delete error:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// 2. Admin Industries CRUD
apiRouter.get('/admin/industries', requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  if (db) {
    try {
      const list = await db.select().from(industries).orderBy(asc(industries.order), asc(industries.id));
      res.json(list);
      return;
    } catch {
      // Fallback
    }
  }
  res.json(store.industries);
});

apiRouter.post('/admin/industries', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const newItem: any = {
      id: Date.now(),
      slug: String(body.slug || body.name).trim().toLowerCase().replace(/\s+/g, '-'),
      name: body.name,
      badge: body.badge || 'Industry Practice',
      tagline: body.tagline || '',
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription || '',
      compliance: body.compliance || '',
      image: body.image || '',
      icon: body.icon || 'Activity',
      order: Number(body.order) || 0,
      isActive: body.isActive !== false,
      tags: Array.isArray(body.tags) ? body.tags : [],
      outcomes: Array.isArray(body.outcomes) ? body.outcomes : [],
      capabilities: Array.isArray(body.capabilities) ? body.capabilities : [],
    };

    if (db) {
      try {
        const created = await db.insert(industries).values(newItem).returning();
        if (created && created[0]) {
          res.status(201).json(created[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB create industry fallback:', dbErr);
      }
    }

    store.industries.push(newItem);
    res.status(201).json(newItem);
  } catch (error: any) {
    console.error('Admin industry create error:', error);
    res.status(500).json({ error: error.message || 'Failed to create industry' });
  }
});

apiRouter.put('/admin/industries/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    if (db) {
      try {
        const updated = await db
          .update(industries)
          .set({
            name: body.name,
            badge: body.badge,
            tagline: body.tagline,
            shortDescription: body.shortDescription,
            fullDescription: body.fullDescription,
            compliance: body.compliance,
            image: body.image,
            icon: body.icon,
            order: Number(body.order) || 0,
            isActive: body.isActive !== false,
            tags: Array.isArray(body.tags) ? body.tags : [],
            outcomes: Array.isArray(body.outcomes) ? body.outcomes : [],
            capabilities: Array.isArray(body.capabilities) ? body.capabilities : [],
            updatedAt: new Date(),
          })
          .where(eq(industries.id, id))
          .returning();
        if (updated && updated[0]) {
          res.json(updated[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB update industry fallback:', dbErr);
      }
    }

    const idx = store.industries.findIndex((i) => i.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Industry not found' });
      return;
    }
    store.industries[idx] = { ...store.industries[idx], ...body, id };
    res.json(store.industries[idx]);
  } catch (error: any) {
    console.error('Admin industry update error:', error);
    res.status(500).json({ error: error.message || 'Failed to update industry' });
  }
});

apiRouter.delete('/admin/industries/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (db) {
      try {
        await db.delete(industries).where(eq(industries.id, id));
      } catch (dbErr) {
        console.warn('DB delete industry fallback:', dbErr);
      }
    }
    store.industries = store.industries.filter((i) => i.id !== id);
    res.json({ success: true, message: 'Industry deleted' });
  } catch (error) {
    console.error('Admin industry delete error:', error);
    res.status(500).json({ error: 'Failed to delete industry' });
  }
});

// 3. Admin Technologies CRUD
apiRouter.get('/admin/technologies', requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  if (db) {
    try {
      const list = await db.select().from(technologies).orderBy(asc(technologies.order), asc(technologies.id));
      res.json(list);
      return;
    } catch {
      // Fallback
    }
  }
  res.json(store.technologies);
});

apiRouter.post('/admin/technologies', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const newItem: any = {
      id: Date.now(),
      name: body.name,
      category: body.category,
      role: body.role,
      description: body.description,
      icon: body.icon || null,
      order: Number(body.order) || 0,
      isActive: body.isActive !== false,
    };

    if (db) {
      try {
        const created = await db.insert(technologies).values(newItem).returning();
        if (created && created[0]) {
          res.status(201).json(created[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB create tech fallback:', dbErr);
      }
    }

    store.technologies.push(newItem);
    res.status(201).json(newItem);
  } catch (error: any) {
    console.error('Admin technology create error:', error);
    res.status(500).json({ error: error.message || 'Failed to create technology' });
  }
});

apiRouter.put('/admin/technologies/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    if (db) {
      try {
        const updated = await db
          .update(technologies)
          .set({
            name: body.name,
            category: body.category,
            role: body.role,
            description: body.description,
            icon: body.icon,
            order: Number(body.order) || 0,
            isActive: body.isActive !== false,
            updatedAt: new Date(),
          })
          .where(eq(technologies.id, id))
          .returning();
        if (updated && updated[0]) {
          res.json(updated[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB update tech fallback:', dbErr);
      }
    }

    const idx = store.technologies.findIndex((t) => t.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Technology not found' });
      return;
    }
    store.technologies[idx] = { ...store.technologies[idx], ...body, id };
    res.json(store.technologies[idx]);
  } catch (error: any) {
    console.error('Admin technology update error:', error);
    res.status(500).json({ error: error.message || 'Failed to update technology' });
  }
});

apiRouter.delete('/admin/technologies/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (db) {
      try {
        await db.delete(technologies).where(eq(technologies.id, id));
      } catch (dbErr) {
        console.warn('DB delete tech fallback:', dbErr);
      }
    }
    store.technologies = store.technologies.filter((t) => t.id !== id);
    res.json({ success: true, message: 'Technology deleted' });
  } catch (error) {
    console.error('Admin technology delete error:', error);
    res.status(500).json({ error: 'Failed to delete technology' });
  }
});

// 4. Admin Case Studies CRUD
apiRouter.get('/admin/case-studies', requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  if (db) {
    try {
      const list = await db.select().from(caseStudies).orderBy(asc(caseStudies.order), desc(caseStudies.createdAt));
      res.json(list);
      return;
    } catch {
      // Fallback
    }
  }
  res.json(store.caseStudies);
});

apiRouter.post('/admin/case-studies', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const newItem: any = {
      id: Date.now(),
      slug: String(body.slug || body.title).trim().toLowerCase().replace(/\s+/g, '-'),
      title: body.title,
      client: body.client || 'Enterprise Client',
      industry: body.industry || 'Technology',
      description: body.description,
      challenge: body.challenge || '',
      solution: body.solution || '',
      results: body.results || '',
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      metrics: Array.isArray(body.metrics) ? body.metrics : [],
      image: body.image || '',
      isFeatured: body.isFeatured === true,
      isPublished: body.isPublished !== false,
      order: Number(body.order) || 0,
    };

    if (db) {
      try {
        const created = await db.insert(caseStudies).values(newItem).returning();
        if (created && created[0]) {
          res.status(201).json(created[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB create case study fallback:', dbErr);
      }
    }

    store.caseStudies.push(newItem);
    res.status(201).json(newItem);
  } catch (error: any) {
    console.error('Admin case study create error:', error);
    res.status(500).json({ error: error.message || 'Failed to create case study' });
  }
});

apiRouter.put('/admin/case-studies/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    if (db) {
      try {
        const updated = await db
          .update(caseStudies)
          .set({
            title: body.title,
            client: body.client,
            industry: body.industry,
            description: body.description,
            challenge: body.challenge,
            solution: body.solution,
            results: body.results,
            technologies: Array.isArray(body.technologies) ? body.technologies : [],
            metrics: Array.isArray(body.metrics) ? body.metrics : [],
            image: body.image,
            isFeatured: body.isFeatured === true,
            isPublished: body.isPublished !== false,
            order: Number(body.order) || 0,
            updatedAt: new Date(),
          })
          .where(eq(caseStudies.id, id))
          .returning();
        if (updated && updated[0]) {
          res.json(updated[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB update case study fallback:', dbErr);
      }
    }

    const idx = store.caseStudies.findIndex((c) => c.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Case study not found' });
      return;
    }
    store.caseStudies[idx] = { ...store.caseStudies[idx], ...body, id };
    res.json(store.caseStudies[idx]);
  } catch (error: any) {
    console.error('Admin case study update error:', error);
    res.status(500).json({ error: error.message || 'Failed to update case study' });
  }
});

apiRouter.delete('/admin/case-studies/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (db) {
      try {
        await db.delete(caseStudies).where(eq(caseStudies.id, id));
      } catch (dbErr) {
        console.warn('DB delete case study fallback:', dbErr);
      }
    }
    store.caseStudies = store.caseStudies.filter((c) => c.id !== id);
    res.json({ success: true, message: 'Case study deleted' });
  } catch (error) {
    console.error('Admin case study delete error:', error);
    res.status(500).json({ error: 'Failed to delete case study' });
  }
});

// 5. Admin Testimonials CRUD
apiRouter.get('/admin/testimonials', requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  if (db) {
    try {
      const list = await db.select().from(testimonials).orderBy(asc(testimonials.order), asc(testimonials.id));
      res.json(list);
      return;
    } catch {
      // Fallback
    }
  }
  res.json(store.testimonials);
});

apiRouter.post('/admin/testimonials', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const newItem: any = {
      id: Date.now(),
      slug: String(body.slug || body.clientName).trim().toLowerCase().replace(/\s+/g, '-'),
      clientName: body.clientName,
      companyName: body.companyName,
      role: body.role || '',
      region: body.region || '',
      quote: body.quote,
      rating: Number(body.rating) || 5,
      logoSvg: body.logoSvg || '',
      avatarUrl: body.avatarUrl || '',
      order: Number(body.order) || 0,
      isActive: body.isActive !== false,
    };

    if (db) {
      try {
        const created = await db.insert(testimonials).values(newItem).returning();
        if (created && created[0]) {
          res.status(201).json(created[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB create testimonial fallback:', dbErr);
      }
    }

    store.testimonials.push(newItem);
    res.status(201).json(newItem);
  } catch (error: any) {
    console.error('Admin testimonial create error:', error);
    res.status(500).json({ error: error.message || 'Failed to create testimonial' });
  }
});

apiRouter.put('/admin/testimonials/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    if (db) {
      try {
        const updated = await db
          .update(testimonials)
          .set({
            clientName: body.clientName,
            companyName: body.companyName,
            role: body.role,
            region: body.region,
            quote: body.quote,
            rating: Number(body.rating) || 5,
            logoSvg: body.logoSvg,
            avatarUrl: body.avatarUrl,
            order: Number(body.order) || 0,
            isActive: body.isActive !== false,
            updatedAt: new Date(),
          })
          .where(eq(testimonials.id, id))
          .returning();
        if (updated && updated[0]) {
          res.json(updated[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB update testimonial fallback:', dbErr);
      }
    }

    const idx = store.testimonials.findIndex((t) => t.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    store.testimonials[idx] = { ...store.testimonials[idx], ...body, id };
    res.json(store.testimonials[idx]);
  } catch (error: any) {
    console.error('Admin testimonial update error:', error);
    res.status(500).json({ error: error.message || 'Failed to update testimonial' });
  }
});

apiRouter.delete('/admin/testimonials/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (db) {
      try {
        await db.delete(testimonials).where(eq(testimonials.id, id));
      } catch (dbErr) {
        console.warn('DB delete testimonial fallback:', dbErr);
      }
    }
    store.testimonials = store.testimonials.filter((t) => t.id !== id);
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    console.error('Admin testimonial delete error:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// 6. Admin Inquiries Management
apiRouter.get('/admin/inquiries', requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  if (db) {
    try {
      const list = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
      res.json(list);
      return;
    } catch {
      // Fallback
    }
  }
  res.json(store.inquiries);
});

apiRouter.put('/admin/inquiries/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { status, notes } = req.body;

    if (db) {
      try {
        const updated = await db
          .update(inquiries)
          .set({
            status: status || 'new',
            notes: notes !== undefined ? notes : undefined,
            updatedAt: new Date(),
          })
          .where(eq(inquiries.id, id))
          .returning();
        if (updated && updated[0]) {
          res.json(updated[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB update inquiry fallback:', dbErr);
      }
    }

    const idx = store.inquiries.findIndex((i) => i.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    store.inquiries[idx] = {
      ...store.inquiries[idx],
      status: status || store.inquiries[idx].status,
      notes: notes !== undefined ? notes : store.inquiries[idx].notes,
    };
    res.json(store.inquiries[idx]);
  } catch (error) {
    console.error('Admin inquiry update error:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

apiRouter.delete('/admin/inquiries/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (db) {
      try {
        await db.delete(inquiries).where(eq(inquiries.id, id));
      } catch (dbErr) {
        console.warn('DB delete inquiry fallback:', dbErr);
      }
    }
    store.inquiries = store.inquiries.filter((i) => i.id !== id);
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    console.error('Admin inquiry delete error:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// 7. Admin Site Settings Management
apiRouter.get('/admin/settings', requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  if (db) {
    try {
      const list = await db.select().from(siteSettings);
      res.json(list);
      return;
    } catch {
      // Fallback
    }
  }
  const entries = Object.entries(store.settings).map(([key, value]) => ({
    key,
    value,
    category: key === 'general_info' ? 'general' : 'homepage',
  }));
  res.json(entries);
});

apiRouter.put('/admin/settings/:key', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { key } = req.params;
    const { value, category } = req.body;

    if (db) {
      try {
        const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);

        if (existing.length > 0) {
          const updated = await db
            .update(siteSettings)
            .set({
              value,
              category: category || existing[0].category,
              updatedAt: new Date(),
            })
            .where(eq(siteSettings.key, key))
            .returning();
          res.json(updated[0]);
          return;
        } else {
          const inserted = await db
            .insert(siteSettings)
            .values({
              key,
              value,
              category: category || 'general',
            })
            .returning();
          res.status(201).json(inserted[0]);
          return;
        }
      } catch (dbErr) {
        console.warn('DB update settings fallback:', dbErr);
      }
    }

    store.settings[key] = value;
    res.json({ key, value, category: category || 'general' });
  } catch (error) {
    console.error('Admin settings update error:', error);
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

// ==========================================
// 8. ADMIN AUTHENTICATION & USER MANAGEMENT
// ==========================================

// Login endpoint (Username or Email + Password)
apiRouter.post('/auth/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const inputIdentifier = typeof username === 'string' ? username.trim() : '';
    const inputPassword = typeof password === 'string' ? password : '';

    if (!inputIdentifier || !inputPassword) {
      res.status(400).json({ error: 'Username/Email and password are required.' });
      return;
    }

    let foundUser: any = null;

    if (db) {
      try {
        const queryUsers = await db
          .select()
          .from(users)
          .where(
            or(
              eq(users.username, inputIdentifier),
              eq(users.email, inputIdentifier.toLowerCase())
            )
          )
          .limit(1);

        if (queryUsers && queryUsers.length > 0) {
          foundUser = queryUsers[0];
        }
      } catch (dbErr) {
        console.warn('DB user login fallback:', dbErr);
      }
    }

    // In-memory store fallback
    if (!foundUser) {
      foundUser = store.users.find(
        (u) =>
          (u.username && u.username.toLowerCase() === inputIdentifier.toLowerCase()) ||
          (u.email && u.email.toLowerCase() === inputIdentifier.toLowerCase())
      );
    }

    if (!foundUser) {
      res.status(401).json({ error: 'Invalid username or password.' });
      return;
    }

    if (foundUser.isActive === false) {
      res.status(403).json({ error: 'Account has been deactivated. Please contact your system administrator.' });
      return;
    }

    const isMatch = verifyPassword(inputPassword, foundUser.passwordHash || '');
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid username or password.' });
      return;
    }

    // Update lastLogin
    const now = new Date();
    if (db && foundUser.id) {
      try {
        await db.update(users).set({ lastLogin: now, updatedAt: now }).where(eq(users.id, foundUser.id));
      } catch {
        // Continue
      }
    }
    foundUser.lastLogin = now.toISOString();

    const token = createSessionToken({
      id: foundUser.id,
      uid: foundUser.uid,
      username: foundUser.username || foundUser.email.split('@')[0],
      email: foundUser.email,
      role: foundUser.role || 'admin',
    });

    const sanitizedUser = {
      id: foundUser.id,
      uid: foundUser.uid,
      username: foundUser.username || foundUser.email.split('@')[0],
      email: foundUser.email,
      displayName: foundUser.displayName || 'Administrator',
      photoUrl: foundUser.photoUrl,
      role: foundUser.role || 'admin',
      mustChangePassword: Boolean(foundUser.mustChangePassword),
      isActive: foundUser.isActive !== false,
      lastLogin: foundUser.lastLogin,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
    };

    res.json({
      token,
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Change Password endpoint (Handles both first-login forced change and voluntary settings change)
apiRouter.post('/auth/change-password', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const { oldPassword, newPassword, usernameOrEmail } = req.body;

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      res.status(400).json({ error: 'New password must be at least 6 characters long.' });
      return;
    }

    let targetUser: any = null;

    // Check token if provided
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1]?.trim();
      const decoded = token ? createSessionToken : null;
      // Use auth middleware equivalent
      const { verifySessionToken } = await import('./authUtils.ts');
      const verified = verifySessionToken(token);
      if (verified) {
        if (db) {
          try {
            const dbList = await db.select().from(users).where(eq(users.id, verified.id)).limit(1);
            if (dbList.length > 0) targetUser = dbList[0];
          } catch {}
        }
        if (!targetUser) {
          targetUser = store.users.find((u) => u.id === verified.id || u.uid === verified.uid);
        }
      }
    }

    // If not authenticated via token, resolve by username/email + old password
    if (!targetUser && usernameOrEmail) {
      const ident = String(usernameOrEmail).trim().toLowerCase();
      if (db) {
        try {
          const dbList = await db
            .select()
            .from(users)
            .where(or(eq(users.username, ident), eq(users.email, ident)))
            .limit(1);
          if (dbList.length > 0) targetUser = dbList[0];
        } catch {}
      }
      if (!targetUser) {
        targetUser = store.users.find(
          (u) =>
            (u.username && u.username.toLowerCase() === ident) ||
            (u.email && u.email.toLowerCase() === ident)
        );
      }
    }

    if (!targetUser) {
      res.status(404).json({ error: 'User account not found.' });
      return;
    }

    // Verify old password if provided or if user is active with a set password
    if (oldPassword && targetUser.passwordHash) {
      const isOldValid = verifyPassword(oldPassword, targetUser.passwordHash);
      if (!isOldValid) {
        res.status(400).json({ error: 'Current password does not match records.' });
        return;
      }
    }

    // Generate new hash
    const newHash = hashPassword(newPassword);
    const now = new Date();

    if (db && targetUser.id) {
      try {
        await db
          .update(users)
          .set({
            passwordHash: newHash,
            mustChangePassword: false,
            updatedAt: now,
          })
          .where(eq(users.id, targetUser.id));
      } catch (dbErr) {
        console.warn('DB change password fallback:', dbErr);
      }
    }

    // Update in-memory
    const memIdx = store.users.findIndex((u) => u.id === targetUser.id || u.uid === targetUser.uid);
    if (memIdx !== -1) {
      store.users[memIdx].passwordHash = newHash;
      store.users[memIdx].mustChangePassword = false;
      store.users[memIdx].updatedAt = now.toISOString();
    }

    targetUser.passwordHash = newHash;
    targetUser.mustChangePassword = false;

    // Issue refreshed token
    const newToken = createSessionToken({
      id: targetUser.id,
      uid: targetUser.uid,
      username: targetUser.username || targetUser.email.split('@')[0],
      email: targetUser.email,
      role: targetUser.role || 'admin',
    });

    res.json({
      success: true,
      message: 'Password updated successfully.',
      token: newToken,
      user: {
        id: targetUser.id,
        uid: targetUser.uid,
        username: targetUser.username || targetUser.email.split('@')[0],
        email: targetUser.email,
        displayName: targetUser.displayName,
        role: targetUser.role,
        mustChangePassword: false,
        isActive: targetUser.isActive,
      },
    });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

// Get Current User Profile
apiRouter.get('/auth/me', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reqUser = req.user;
    if (!reqUser) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    let foundUser: any = null;
    if (db && reqUser.id) {
      try {
        const list = await db.select().from(users).where(eq(users.id, reqUser.id)).limit(1);
        if (list.length > 0) foundUser = list[0];
      } catch {}
    }

    if (!foundUser) {
      foundUser = store.users.find(
        (u) =>
          u.id === reqUser.id ||
          u.uid === reqUser.uid ||
          (reqUser.username && u.username === reqUser.username) ||
          (reqUser.email && u.email === reqUser.email)
      );
    }

    if (!foundUser) {
      res.json({
        id: reqUser.id || 1,
        uid: reqUser.uid,
        username: reqUser.username || 'admin',
        email: reqUser.email || 'admin@drishinfotech.com',
        displayName: reqUser.name || 'Administrator',
        role: reqUser.role || 'admin',
        mustChangePassword: false,
        isActive: true,
      });
      return;
    }

    res.json({
      id: foundUser.id,
      uid: foundUser.uid,
      username: foundUser.username || foundUser.email.split('@')[0],
      email: foundUser.email,
      displayName: foundUser.displayName || 'Administrator',
      photoUrl: foundUser.photoUrl,
      role: foundUser.role || 'admin',
      mustChangePassword: Boolean(foundUser.mustChangePassword),
      isActive: foundUser.isActive !== false,
      lastLogin: foundUser.lastLogin,
      createdAt: foundUser.createdAt,
    });
  } catch (error) {
    console.error('Auth me error:', error);
    res.status(500).json({ error: 'Failed to fetch current user' });
  }
});

// Admin Users Management (List)
apiRouter.get('/admin/users', requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    let list: any[] = [];
    if (db) {
      try {
        list = await db.select().from(users).orderBy(asc(users.id));
      } catch (dbErr) {
        console.warn('DB get users fallback:', dbErr);
      }
    }

    if (!list || list.length === 0) {
      list = [...store.users];
    }

    const sanitized = list.map((u) => ({
      id: u.id,
      uid: u.uid,
      username: u.username || u.email.split('@')[0],
      email: u.email,
      displayName: u.displayName || u.username || 'Admin User',
      photoUrl: u.photoUrl,
      role: u.role || 'admin',
      mustChangePassword: Boolean(u.mustChangePassword),
      isActive: u.isActive !== false,
      lastLogin: u.lastLogin,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));

    res.json(sanitized);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users list' });
  }
});

// Admin Create New User
apiRouter.post('/admin/users', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { username, email, displayName, password, role, mustChangePassword } = req.body;

    const cleanUsername = typeof username === 'string' ? username.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const cleanDisplayName = typeof displayName === 'string' ? displayName.trim() : cleanUsername;
    const cleanPassword = typeof password === 'string' ? password : '';
    const cleanRole = role === 'super_admin' || role === 'editor' ? role : 'admin';
    const requireChange = mustChangePassword !== false; // Default true for newly created accounts

    if (!cleanUsername || !cleanEmail || !cleanPassword) {
      res.status(400).json({ error: 'Username, Email, and Initial Password are required.' });
      return;
    }

    if (cleanPassword.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      return;
    }

    // Check duplicate in DB or store
    const duplicateInStore = store.users.some(
      (u) =>
        (u.username && u.username.toLowerCase() === cleanUsername.toLowerCase()) ||
        u.email.toLowerCase() === cleanEmail
    );
    if (duplicateInStore) {
      res.status(400).json({ error: 'An admin user with this username or email already exists.' });
      return;
    }

    const passwordHash = hashPassword(cleanPassword);
    const uid = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date();

    let createdUser: any = null;

    if (db) {
      try {
        const inserted = await db
          .insert(users)
          .values({
            uid,
            username: cleanUsername,
            email: cleanEmail,
            displayName: cleanDisplayName,
            passwordHash,
            role: cleanRole,
            mustChangePassword: requireChange,
            isActive: true,
            createdAt: now,
            updatedAt: now,
          })
          .returning();
        if (inserted && inserted.length > 0) {
          createdUser = inserted[0];
        }
      } catch (dbErr: any) {
        console.warn('DB insert user fallback:', dbErr);
        if (dbErr.code === '23505') {
          res.status(400).json({ error: 'Username or email already registered in database.' });
          return;
        }
      }
    }

    if (!createdUser) {
      const nextId = (store.users.length > 0 ? Math.max(...store.users.map((u) => u.id)) : 0) + 1;
      createdUser = {
        id: nextId,
        uid,
        username: cleanUsername,
        email: cleanEmail,
        displayName: cleanDisplayName,
        passwordHash,
        role: cleanRole,
        mustChangePassword: requireChange,
        isActive: true,
        lastLogin: null,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };
      store.users.push(createdUser);
    } else {
      // Keep store in sync
      store.users.push({
        ...createdUser,
        passwordHash,
      });
    }

    res.status(201).json({
      id: createdUser.id,
      uid: createdUser.uid,
      username: createdUser.username,
      email: createdUser.email,
      displayName: createdUser.displayName,
      role: createdUser.role,
      mustChangePassword: Boolean(createdUser.mustChangePassword),
      isActive: true,
      lastLogin: null,
      createdAt: createdUser.createdAt,
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create admin user' });
  }
});

// Admin Update User (Edit info, change role, reset password, toggle active)
apiRouter.put('/admin/users/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { displayName, role, isActive, password, mustChangePassword, email } = req.body;

    const updateFields: any = {
      updatedAt: new Date(),
    };

    if (displayName !== undefined) updateFields.displayName = displayName;
    if (role !== undefined) updateFields.role = role;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (mustChangePassword !== undefined) updateFields.mustChangePassword = mustChangePassword;
    if (email !== undefined) updateFields.email = email;
    if (password && typeof password === 'string' && password.length >= 6) {
      updateFields.passwordHash = hashPassword(password);
      if (mustChangePassword === undefined) {
        updateFields.mustChangePassword = true; // Auto require password change if admin reset it
      }
    }

    if (db) {
      try {
        const updated = await db
          .update(users)
          .set(updateFields)
          .where(eq(users.id, id))
          .returning();
        if (updated.length > 0) {
          const u = updated[0];
          // update store
          const idx = store.users.findIndex((item) => item.id === id);
          if (idx !== -1) {
            store.users[idx] = { ...store.users[idx], ...u };
          }
          res.json({
            id: u.id,
            uid: u.uid,
            username: u.username,
            email: u.email,
            displayName: u.displayName,
            role: u.role,
            mustChangePassword: Boolean(u.mustChangePassword),
            isActive: u.isActive !== false,
            lastLogin: u.lastLogin,
            updatedAt: u.updatedAt,
          });
          return;
        }
      } catch (dbErr) {
        console.warn('DB update user fallback:', dbErr);
      }
    }

    const memIdx = store.users.findIndex((u) => u.id === id);
    if (memIdx === -1) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    store.users[memIdx] = {
      ...store.users[memIdx],
      ...updateFields,
      updatedAt: new Date().toISOString(),
    };

    const u = store.users[memIdx];
    res.json({
      id: u.id,
      uid: u.uid,
      username: u.username,
      email: u.email,
      displayName: u.displayName,
      role: u.role,
      mustChangePassword: Boolean(u.mustChangePassword),
      isActive: u.isActive !== false,
      lastLogin: u.lastLogin,
      updatedAt: u.updatedAt,
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Admin Delete User
apiRouter.delete('/admin/users/:id', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    // Safeguard: Prevent deleting the current user or super admin
    if (req.user && req.user.id === id) {
      res.status(400).json({ error: 'You cannot delete your own logged-in account.' });
      return;
    }

    if (id === 1) {
      res.status(400).json({ error: 'Primary Super Administrator account cannot be deleted.' });
      return;
    }

    if (db) {
      try {
        await db.delete(users).where(eq(users.id, id));
      } catch (dbErr) {
        console.warn('DB delete user fallback:', dbErr);
      }
    }

    store.users = store.users.filter((u) => u.id !== id);
    res.json({ success: true, message: 'Admin user deleted successfully.' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
