import pool from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getLocation(slug: string) {
  const [rows] = await pool.query(
    'SELECT * FROM locations WHERE slug = ? AND status = "active"',
    [slug]
  );
  return (rows as any[])[0];
}

async function getProfilesByLocation(locationId: number) {
  const [rows] = await pool.query(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM profiles p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.location_id = ? AND p.status = 'active'
    ORDER BY p.is_featured DESC, p.rating DESC
    LIMIT 12
  `, [locationId]);
  return rows as any[];
}

async function getAreas(locationId: number) {
  const [rows] = await pool.query(
    'SELECT id, name, slug FROM locations WHERE parent_id = ? AND status = "active" ORDER BY name ASC',
    [locationId]
  );
  return rows as any[];
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const location = await getLocation(params.slug);
  
  if (!location) {
    return { title: 'Location Not Found' };
  }

  return {
    title: `${location.name} Profiles | Verified Listings`,
    description: `Find top profiles in ${location.name}. 100% verified profiles with real photos and genuine reviews.`,
  };
}

export default async function LocationPage({ params }: { params: { slug: string } }) {
  const location = await getLocation(params.slug);
  
  if (!location) {
    notFound();
  }

  const profiles = await getProfilesByLocation(location.id);
  const areas = location.type === 'city' ? await getAreas(location.id) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Profiles in {location.name}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Find verified profiles in {location.name} with real photos and genuine reviews.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {areas.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Areas in {location.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {areas.map((area) => (
                <Link
                  key={area.id}
                  href={`/${location.slug}/${area.slug}`}
                  className="p-4 bg-white rounded-lg text-center hover:shadow-md"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
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
                    {profile.category_name && (
                      <p className="text-gray-600">{profile.category_name}</p>
                    )}
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">{'★'.repeat(Math.round(profile.rating))}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No profiles found in this location.</p>
          )}
        </section>
      </div>
    </div>
  );
}