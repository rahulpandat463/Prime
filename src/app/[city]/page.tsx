import Link from 'next/link';
import { Metadata } from 'next';

// Mock Locations
const mockLocations = [
  { id: 1, name: 'Delhi', slug: 'delhi' },
  { id: 2, name: 'Mumbai', slug: 'mumbai' },
  { id: 3, name: 'Bangalore', slug: 'bangalore' },
];

const mockProfiles = [
  { id: 1, name: 'Ananya', slug: 'ananya', age: 23, city_slug: 'delhi', rating: 5.0, category_name: 'Independent' },
  { id: 2, name: 'Neha', slug: 'neha', age: 24, city_slug: 'mumbai', rating: 4.9, category_name: 'Premium' },
];

export async function generateStaticParams() {
  return mockLocations.map((l) => ({
    city: l.slug,
  }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const city = mockLocations.find(l => l.slug === params.city) || { name: params.city };
  return {
    title: `Independent Escorts in ${city.name} | Verified VIP Service`,
    description: `Find top verified independent escorts in ${city.name}. 100% genuine photos, professional service, and absolute discretion guaranteed.`,
    alternates: {
      canonical: `/${params.city}/`,
    },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = mockLocations.find(l => l.slug === params.city) || mockLocations[0];
  const profiles = mockProfiles.filter(p => p.city_slug === params.city);

  return (
    <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
      {/* Breadcrumbs - Mandatory per prompt */}
      <nav className="container mx-auto px-4 mb-8">
        <ol className="flex text-xs text-zinc-500 uppercase tracking-widest gap-2">
          <li><Link href="/" className="hover:text-pink-500">Home</Link></li>
          <li>/</li>
          <li className="text-zinc-300">{city.name}</li>
        </ol>
      </nav>

      <section className="bg-pink-600/10 border-y border-white/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tightest uppercase">
            Escorts in <span className="text-pink-600 italic">{city.name}</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-zinc-400 font-medium leading-relaxed">
            Verified elite companions available in {city.name}. Every profile is 100% manually verified for your peace of mind.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Listings */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-10">Verified {city.name} Profiles</h2>
            <div className="grid grid-cols-1 gap-8">
               {profiles.length > 0 ? profiles.map((profile) => (
                <Link
                  key={profile.id}
                  href={`/${params.city}/${profile.slug}/`}
                  className="block group"
                >
                  <div className="bg-[#1a1325] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-pink-600/50 hover:shadow-[0_0_50px_rgba(219,39,119,0.1)] h-auto md:h-64">
                     <div className="relative w-full md:w-64 h-64 md:h-full flex-shrink-0 bg-zinc-800 flex items-center justify-center text-5xl font-black text-zinc-700">
                        {profile.name.charAt(0)}
                     </div>
                     <div className="flex-1 p-8">
                        <h3 className="text-2xl font-black text-white group-hover:text-pink-500 transition-colors">{profile.name}</h3>
                        <p className="text-zinc-500 mt-2">Elite {profile.category_name} in {city.name}.</p>
                        <div className="mt-4 flex gap-4">
                           <span className="text-pink-500 font-black text-xs uppercase tracking-widest">★ {profile.rating} Rating</span>
                           <span className="text-zinc-400 font-black text-xs uppercase tracking-widest">Verified</span>
                        </div>
                     </div>
                  </div>
                </Link>
               )) : (
                 <p className="text-zinc-500">No profiles found in this city yet.</p>
               )}
            </div>
          </div>

          {/* Sidebar - Internal Linking per prompt */}
          <aside className="space-y-12">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6">Nearby Cities</h3>
              <ul className="space-y-4">
                {mockLocations.filter(l => l.slug !== params.city).map(l => (
                  <li key={l.slug}>
                    <Link href={`/${l.slug}/`} className="text-zinc-500 hover:text-pink-500 text-sm font-bold transition-colors">
                      Escorts in {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6">Top Categories</h3>
              <ul className="space-y-4">
                {['Independent', 'Premium', 'VIP', 'College Girls'].map(cat => (
                  <li key={cat}>
                    <Link href={`/category/${cat.toLowerCase().replace(' ', '-')}/`} className="text-zinc-500 hover:text-pink-500 text-sm font-bold transition-colors">
                      {cat} Escorts
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* SEO Text Section - Mandatory per prompt */}
        <section className="mt-20 pt-20 border-t border-white/5">
           <h2 className="text-3xl font-black text-white mb-8 tracking-tightest uppercase">Elite <span className="text-pink-600 italic">Companionship</span> in {city.name}</h2>
           <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed">
              <p>
                 Discover the pinnacle of luxury and companionship in {city.name}. Our directory features the most exclusive and verified independent escorts, 
                 providing a service that is both professional and deeply personal. Whether you are looking for a dinner date companion or a private escort 
                 for an intimate evening, our {city.name} selection offers unparalleled quality.
              </p>
              <p className="mt-4">
                 Every profile in our {city.name} directory goes through a strict verification process to ensure that what you see is what you get. 
                 We prioritize discretion, safety, and satisfaction above all else, making us the leading choice for high-end escort services in {city.name}.
              </p>
           </div>
        </section>
      </div>
    </div>
  );
}
