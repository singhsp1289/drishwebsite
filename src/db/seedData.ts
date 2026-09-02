import { db } from './index.ts';
import { services, industries, technologies, caseStudies, testimonials, siteSettings, users } from './schema.ts';
import {
  INITIAL_SERVICES,
  INITIAL_INDUSTRIES,
  INITIAL_TECHNOLOGIES,
  INITIAL_CASE_STUDIES,
  INITIAL_TESTIMONIALS,
  INITIAL_SITE_SETTINGS,
  INITIAL_ADMIN_USERS,
} from './inMemoryStore.ts';

export async function seedDatabase() {
  if (!db) {
    console.log('[Seed] Database not connected. In-memory data active.');
    return;
  }

  try {
    console.log('Checking database seed state...');

    // 1. Seed Services if empty
    const existingServices = await db.select().from(services);
    if (existingServices.length === 0) {
      console.log('Seeding services table...');
      await db.insert(services).values(
        INITIAL_SERVICES.map(({ id: _id, ...rest }) => rest)
      );
      console.log('Services seeded successfully.');
    }

    // 2. Seed Industries if empty
    const existingIndustries = await db.select().from(industries);
    if (existingIndustries.length === 0) {
      console.log('Seeding industries table...');
      await db.insert(industries).values(
        INITIAL_INDUSTRIES.map(({ id: _id, ...rest }) => rest)
      );
      console.log('Industries seeded successfully.');
    }

    // 3. Seed Technologies if empty
    const existingTechnologies = await db.select().from(technologies);
    if (existingTechnologies.length === 0) {
      console.log('Seeding technologies table...');
      await db.insert(technologies).values(
        INITIAL_TECHNOLOGIES.map(({ id: _id, ...rest }) => rest)
      );
      console.log('Technologies seeded successfully.');
    }

    // 4. Seed Case Studies if empty
    const existingCaseStudies = await db.select().from(caseStudies);
    if (existingCaseStudies.length === 0) {
      console.log('Seeding case studies table...');
      await db.insert(caseStudies).values(
        INITIAL_CASE_STUDIES.map(({ id: _id, ...rest }) => rest)
      );
      console.log('Case studies seeded successfully.');
    }

    // 5. Seed Testimonials if empty
    const existingTestimonials = await db.select().from(testimonials);
    if (existingTestimonials.length === 0) {
      console.log('Seeding testimonials table...');
      await db.insert(testimonials).values(
        INITIAL_TESTIMONIALS.map(({ id: _id, ...rest }) => rest)
      );
      console.log('Testimonials seeded successfully.');
    }

    // 6. Seed Site Settings if empty
    const existingSettings = await db.select().from(siteSettings);
    if (existingSettings.length === 0) {
      console.log('Seeding site settings table...');
      const settingsEntries = Object.entries(INITIAL_SITE_SETTINGS).map(([key, value]) => ({
        key,
        category: key === 'general_info' ? 'general' : 'homepage',
        value,
      }));
      await db.insert(siteSettings).values(settingsEntries);
      console.log('Site settings seeded successfully.');
    }

    // 7. Seed Admin Users if empty
    const existingUsers = await db.select().from(users);
    if (existingUsers.length === 0) {
      console.log('Seeding admin users table...');
      await db.insert(users).values(
        INITIAL_ADMIN_USERS.map(({ id: _id, createdAt: _c, updatedAt: _u, lastLogin: _l, ...rest }) => ({
          ...rest,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
      console.log('Admin users seeded successfully.');
    }

    console.log('Database initialization check completed successfully.');
  } catch (error) {
    console.error('Error during database seed:', error);
  }
}
