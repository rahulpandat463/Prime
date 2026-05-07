import pool from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getProfile(slug: string, id: string) {
  const [rows] = await pool.query(
    `SELECT p.*, l.name as location_name, l.slug as location_slug, 
            c.name as category_name, c.slug as category_slug
     FROM profiles p
     LEFT JOIN locations l ON p.location_id = l.id
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.slug = ? AND p.id = ?`,
    [slug, id]
  );

  return (rows as any[])[0];
}

async function getProfileImages(profileId: number) {
  const [rows] = await pool.query(
    'SELECT id, image_url, is_primary FROM profile_images WHERE profile_id = ?',
    [profileId]
  );
  return rows as any[];
}

async function getProfileReviews(profileId: number) {
  const [rows] = await pool.query(
    'SELECT id, name, rating, comment, created_at FROM reviews WHERE profile_id = ? AND status = "approved" ORDER BY created_at DESC',
    [profileId]
  );
  return rows as any[];
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const parts = params.slug.split('-');
  const id = parts.pop();
  const slug = parts.join('-');
  
  const profile = await getProfile(slug, id || '');
  
  if (!profile) {
    return { title: 'Profile Not Found' };
  }

  return {
    title: `${profile.name} | Profile ${profile.age ? `Age ${profile.age}` : ''} | ${profile.location_name}`,
    description: profile.description?.substring(0, 160) || `View profile of ${profile.name}`,
  };
}

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  const parts = params.slug.split('-');
  const profileId = parts.pop();
  const profileSlug = parts.join('-');
  
  const profile = await getProfile(profileSlug, profileId || '');
  
  if (!profile) {
    notFound();
  }

  const images = await getProfileImages(profile.id);
  const reviews = await getProfileReviews(profile.id);

  const averageRating = Number(reviews.length > 0
    ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
    : profile.rating || 5);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm opacity-80">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li>/</li>
              {profile.location_slug && (
                <>
                  <li><Link href={`/category/${profile.category_slug}/${profile.location_slug}`} className="hover:underline">{profile.location_name}</Link></li>
                  <li>/</li>
                </>
              )}
              <li className="font-semibold">{profile.name}</li>
            </ol>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold">{profile.name}</h1>
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 uppercase tracking-wider">
                  PRO
                </span>
              </div>
              <p className="text-xl opacity-90 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {profile.location_name || 'India'}
              </p>
            </div>
            <div className="flex gap-4">
              <a 
                href={`tel:${profile.phone || '+910000000000'}`}
                className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <a 
                href={`https://wa.me/${profile.whatsapp || '910000000000'}`}
                className="bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.655zm6.241-3.515l.347.206c1.472.873 3.167 1.334 4.895 1.335h.005c5.64 0 10.23-4.59 10.233-10.23.001-2.731-1.062-5.3-3.003-7.234-1.942-1.936-4.512-3.004-7.241-3.005-5.641 0-10.23 4.59-10.233 10.23-.001 1.832.486 3.619 1.408 5.187l.226.386-1.008 3.682 3.771-.989zm11.222-7.854c-.267-.134-1.583-.781-1.828-.871-.246-.09-.425-.134-.604.134-.179.268-.692.871-.848 1.05-.156.179-.312.201-.579.067-.267-.134-1.129-.416-2.15-1.328-.795-.71-1.332-1.587-1.488-1.855-.156-.268-.017-.413.117-.546.12-.12.267-.312.401-.469.134-.156.179-.268.267-.446.089-.179.045-.335-.022-.469-.067-.134-.604-1.451-.826-1.986-.216-.522-.435-.452-.604-.46l-.513-.008c-.179 0-.469.067-.714.335-.246.268-.938.916-.938 2.232 0 1.316.96 2.589 1.094 2.768.134.179 1.888 2.883 4.574 4.043.64.276 1.139.44 1.526.563.641.204 1.224.175 1.685.107.514-.077 1.583-.647 1.806-1.272.223-.625.223-1.161.156-1.272-.067-.111-.245-.178-.512-.312z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Section */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
                Photos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.length > 0 ? (
                  images.map((img, idx) => (
                    <div key={img.id} className={`relative rounded-2xl overflow-hidden group ${idx === 0 ? 'md:col-span-2 h-96' : 'h-64'}`}>
                      <img 
                        src={img.image_url} 
                        alt={`${profile.name} Photo ${idx + 1}`}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 h-96 bg-pink-50 rounded-2xl flex flex-col items-center justify-center text-pink-300 border-2 border-dashed border-pink-100">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">No photos available yet</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
                About {profile.name}
              </h2>
              <div className="prose prose-pink max-w-none text-gray-700 leading-relaxed text-lg">
                {profile.description || `Hi, I'm ${profile.name}. I provide premium and professional services in ${profile.location_name}. Looking forward to meeting you!`}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
                  Reviews
                </h2>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
                  <span className="text-yellow-600 font-bold">{averageRating.toFixed(1)}</span>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.round(averageRating))}
                  </div>
                  <span className="text-gray-500 text-sm">({reviews.length} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="font-bold text-gray-800 block">{review.name}</span>
                          <span className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-400 italic">
                    No reviews yet. Be the first to leave a review!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-24">
              <div className="bg-gray-800 text-white p-6 text-center">
                <span className="text-xs uppercase tracking-widest opacity-70 mb-2 block">Quick Details</span>
                <div className="text-3xl font-bold">100% Genuine</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-500">Age</span>
                  <span className="font-bold text-gray-800">{profile.age || '22'} Years</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-500">Language</span>
                  <span className="font-bold text-gray-800">Hindi, English</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-500">Nationality</span>
                  <span className="font-bold text-gray-800">Indian</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-500">Verification</span>
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                </div>
                <div className="pt-6">
                  <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100 mb-6">
                    <div className="text-pink-600 font-bold mb-2">Availability</div>
                    <div className="text-sm text-pink-700">Available 24/7 for In-call & Out-call services. Please call to confirm.</div>
                  </div>
                  <a 
                    href={`https://wa.me/${profile.whatsapp || '910000000000'}`}
                    className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 shadow-lg mb-3"
                  >
                    WhatsApp Chat
                  </a>
                  <a 
                    href={`tel:${profile.phone || '+910000000000'}`}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition shadow-lg"
                  >
                    Direct Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}