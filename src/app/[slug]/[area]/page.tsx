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

async function getParentLocation(parentId: number) {
  const [rows] = await pool.query(
    'SELECT * FROM locations WHERE id = ? AND status = "active"',
    [parentId]
  );
  return (rows as any[])[0];
}

async function getProfilesByArea(locationId: number) {
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

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string, area: string } }) {
  const parent = await getLocation(params.slug);
  const area = await getLocation(params.area);
  
  if (!parent || !area || area.parent_id !== parent.id) {
    return { title: 'Not Found' };
  }

  return {
    title: `Profiles in ${area.name}, ${parent.name}`,
    description: `Find verified profiles in ${area.name}, ${parent.name}.`,
  };
}

export default async function AreaPage({ params }: { params: { slug: string, area: string } }) {
  const parent = await getLocation(params.slug);
  const area = await getLocation(params.area);
  
  if (!parent || !area || area.parent_id !== parent.id) {
    notFound();
  }

  const profiles = await getProfilesByArea(area.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Profiles in {area.name}, {parent.name}
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
                  {profile.category_name && (
                    <p className="text-gray-600">{profile.category_name}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No profiles found in this area.</p>
        )}
      </div>
    </div>
  );
}