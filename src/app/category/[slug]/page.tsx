import pool from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getCategory(slug: string) {
  const [rows] = await pool.query(
    'SELECT * FROM categories WHERE slug = ? AND status = "active"',
    [slug]
  );
  return (rows as any[])[0];
}

async function getProfilesByCategory(categoryId: number) {
  const [rows] = await pool.query(`
    SELECT p.*, l.name as location_name, l.slug as location_slug
    FROM profiles p
    LEFT JOIN locations l ON p.location_id = l.id
    WHERE p.category_id = ? AND p.status = 'active'
    ORDER BY p.is_featured DESC, p.rating DESC
    LIMIT 12
  `, [categoryId]);
  return rows as any[];
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} Profiles | Verified Listings`,
    description: `Find top ${category.name.toLowerCase()} profiles. 100% verified with real photos.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);
  
  if (!category) {
    notFound();
  }

  const profiles = await getProfilesByCategory(category.id);

  const [locations] = await pool.query(
    'SELECT id, name, slug FROM locations WHERE type = "city" AND status = "active" ORDER BY name ASC'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name} Profiles
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Browse verified {category.name.toLowerCase()} profiles with real photos and reviews.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4">Profiles ({profiles.length})</h2>
            {profiles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {profiles.map((profile) => (
                  <Link
                    key={profile.id}
                    href={`/profile/${profile.slug}-${profile.id}`}
                    className="block group"
                  >
                    <div className="bg-white border-2 border-pink-500 rounded-xl overflow-hidden flex flex-col md:flex-row transition hover:shadow-xl h-auto md:h-64">
                      {/* Image Section */}
                      <div className="relative w-full md:w-64 h-64 md:h-full flex-shrink-0">
                        <div className="w-full h-full bg-pink-50 flex items-center justify-center text-3xl font-bold text-pink-600">
                          {profile.name.charAt(0)}
                        </div>
                        
                        {/* PRO Banner */}
                        <div className="absolute top-0 left-0">
                          <div className="bg-pink-600 text-white text-[10px] font-bold px-3 py-1 transform -rotate-45 -translate-x-4 translate-y-2 w-20 text-center shadow-md">
                            PRO
                          </div>
                        </div>

                        {/* Views Counter */}
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {(Math.random() * 2 + 0.5).toFixed(1)}K
                        </div>

                        {/* Status Badges */}
                        <div className="absolute bottom-10 right-2 flex flex-col gap-1 items-end">
                          <div className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Trusted
                          </div>
                          <div className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </div>
                        </div>

                        {/* Diamond Bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-purple-700 text-white text-[10px] font-bold py-1 text-center flex items-center justify-center gap-1 uppercase">
                          <span>💎</span> Diamond
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-5 relative flex flex-col justify-between overflow-hidden">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-gray-800 leading-tight mb-2 group-hover:text-pink-600 transition line-clamp-2">
                              High Quality {profile.name} Service {category.name} Only Call And Whatsapp Me
                            </h3>
                            <button className="text-gray-300 hover:text-red-500 transition">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            VIP High quality {profile.name} service 24 hours genuine only call and WhatsApp me. Low price 100% {'★'.repeat(5)} geVIP High quality service hours.
                          </p>

                          <div className="flex items-center text-pink-600 font-medium text-sm mb-4">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {profile.location_name || 'India'}
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <div className="border border-pink-100 bg-pink-50 rounded px-2 py-1 text-[11px] text-pink-700 flex items-center gap-1">
                              Female
                            </div>
                            <div className="border border-purple-100 bg-purple-50 rounded px-2 py-1 text-[11px] text-purple-700 flex items-center gap-1">
                              {profile.age || 21}y
                            </div>
                            <div className="border border-gray-100 bg-gray-50 rounded px-2 py-1 text-[11px] text-gray-700 flex items-center gap-1">
                              Indian
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-auto">
                          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full shadow-md hover:shadow-lg transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className="bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.655zm6.241-3.515l.347.206c1.472.873 3.167 1.334 4.895 1.335h.005c5.64 0 10.23-4.59 10.233-10.23.001-2.731-1.062-5.3-3.003-7.234-1.942-1.936-4.512-3.004-7.241-3.005-5.641 0-10.23 4.59-10.233 10.23-.001 1.832.486 3.619 1.408 5.187l.226.386-1.008 3.682 3.771-.989zm11.222-7.854c-.267-.134-1.583-.781-1.828-.871-.246-.09-.425-.134-.604.134-.179.268-.692.871-.848 1.05-.156.179-.312.201-.579.067-.267-.134-1.129-.416-2.15-1.328-.795-.71-1.332-1.587-1.488-1.855-.156-.268-.017-.413.117-.546.12-.12.267-.312.401-.469.134-.156.179-.268.267-.446.089-.179.045-.335-.022-.469-.067-.134-.604-1.451-.826-1.986-.216-.522-.435-.452-.604-.46l-.513-.008c-.179 0-.469.067-.714.335-.246.268-.938.916-.938 2.232 0 1.316.96 2.589 1.094 2.768.134.179 1.888 2.883 4.574 4.043.64.276 1.139.44 1.526.563.641.204 1.224.175 1.685.107.514-.077 1.583-.647 1.806-1.272.223-.625.223-1.161.156-1.272-.067-.111-.245-.178-.512-.312z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No profiles found in this category.</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-4">Filter by Location</h3>
            <ul className="space-y-2">
              {(locations as any[]).map((location) => (
                <li key={location.id}>
                  <Link 
                    href={`/category/${category.slug}/${location.slug}`}
                    className="text-gray-600 hover:text-pink-600"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}