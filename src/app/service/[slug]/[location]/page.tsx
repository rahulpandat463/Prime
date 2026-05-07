import pool from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getService(slug: string) {
  const [rows] = await pool.query(
    'SELECT * FROM services WHERE slug = ? AND status = "active"',
    [slug]
  );
  return (rows as any[])[0];
}

async function getLocation(slug: string) {
  const [rows] = await pool.query(
    'SELECT * FROM locations WHERE slug = ? AND status = "active"',
    [slug]
  );
  return (rows as any[])[0];
}

async function getProfilesByServiceLocation(serviceSlug: string, locationId: number) {
  const [rows] = await pool.query(`
    SELECT p.*, l.name as location_name, l.slug as location_slug
    FROM profiles p
    LEFT JOIN locations l ON p.location_id = l.id
    LEFT JOIN profile_services ps ON p.id = ps.profile_id
    LEFT JOIN services s ON ps.service_id = s.id
    WHERE s.slug = ? AND p.location_id = ? AND p.status = 'active'
    ORDER BY p.is_featured DESC, p.rating DESC
    LIMIT 12
  `, [serviceSlug, locationId]);
  return rows as any[];
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string, location: string } }) {
  const service = await getService(params.slug);
  const location = await getLocation(params.location);
  
  if (!service || !location) {
    return { title: 'Not Found' };
  }

  return {
    title: `${service.name} in ${location.name} | Verified Profiles`,
    description: `Find top ${service.name.toLowerCase()} profiles in ${location.name}.`,
  };
}

export default async function ServiceLocationPage({ params }: { params: { slug: string, location: string } }) {
  const service = await getService(params.slug);
  const location = await getLocation(params.location);
  
  if (!service || !location) {
    notFound();
  }

  const profiles = await getProfilesByServiceLocation(service.slug, location.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {service.name} in {location.name}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Profiles ({profiles.length})</h2>
        {profiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                href={`/profile/${profile.slug}-${profile.id}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-gray-600">{profile.location_name}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No profiles found.</p>
        )}
      </div>
    </div>
  );
}