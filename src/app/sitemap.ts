import pool from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

async function getLocations() {
  const [rows] = await pool.query(
    'SELECT slug FROM locations WHERE status = "active"'
  );
  return rows as any[];
}

async function getCategories() {
  const [rows] = await pool.query(
    'SELECT slug FROM categories WHERE status = "active"'
  );
  return rows as any[];
}

async function getServices() {
  const [rows] = await pool.query(
    'SELECT slug FROM services WHERE status = "active"'
  );
  return rows as any[];
}

async function getProfiles() {
  const [rows] = await pool.query(
    'SELECT slug, id FROM profiles WHERE status = "active"'
  );
  return rows as any[];
}

export default async function Sitemap() {
  const locations = await getLocations();
  const categories = await getCategories();
  const services = await getServices();
  const profiles = await getProfiles();

  const baseUrl = 'https://example.com';

  return [
    { url: baseUrl },
    ...locations.map((loc: any) => ({ url: `${baseUrl}/${loc.slug}` })),
    ...categories.map((cat: any) => ({ url: `${baseUrl}/category/${cat.slug}` })),
    ...services.map((svc: any) => ({ url: `${baseUrl}/service/${svc.slug}` })),
    ...profiles.map((profile: any) => ({ url: `${baseUrl}/profile/${profile.slug}-${profile.id}` })),
  ];
}

export async function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://example.com/sitemap.xml',
  };
}