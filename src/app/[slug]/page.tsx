import Link from 'next/link';

// Mock Locations
const mockLocations = [
  { id: 1, name: 'Delhi', slug: 'delhi' },
  { id: 2, name: 'Mumbai', slug: 'mumbai' },
  { id: 3, name: 'Bangalore', slug: 'bangalore' },
];

const mockProfiles = [
  { id: 1, name: 'Ananya', slug: 'ananya', age: 23, location_name: 'Delhi', rating: 5.0, category_name: 'Independent' },
  { id: 2, name: 'Neha', slug: 'neha', age: 24, location_name: 'Mumbai', rating: 4.9, category_name: 'Premium' },
];

export async function generateStaticParams() {
  return mockLocations.map((l) => ({
    slug: l.slug,
  }));
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = mockLocations.find(l => l.slug === params.slug) || mockLocations[0];
  const profiles = mockProfiles;

  return (
    <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
      <section className="bg-pink-600/10 border-y border-white/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tightest uppercase">
            Profiles in <span className="text-pink-600 italic">{location.name}</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-zinc-400 font-medium leading-relaxed">
            Verified elite companions available in {location.name}. 100% genuine photos and discreet service.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-xl font-black text-white uppercase tracking-widest mb-10">Local Verified Listings</h2>
        <div className="grid grid-cols-1 gap-8">
           {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/profile/${profile.slug}`}
              className="block group"
            >
              <div className="bg-[#1a1325] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-pink-600/50 hover:shadow-[0_0_50px_rgba(219,39,119,0.1)] h-auto md:h-64">
                 <div className="relative w-full md:w-64 h-64 md:h-full flex-shrink-0 bg-zinc-800 flex items-center justify-center text-5xl font-black text-zinc-700">
                    {profile.name.charAt(0)}
                 </div>
                 <div className="flex-1 p-8">
                    <h3 className="text-2xl font-black text-white group-hover:text-pink-500 transition-colors">{profile.name}</h3>
                    <p className="text-zinc-500 mt-2">Professional companion service available in {location.name}.</p>
                    <div className="mt-4 flex gap-4">
                       <span className="text-pink-500 font-black text-xs uppercase tracking-widest">★ {profile.rating} Rating</span>
                       <span className="text-zinc-400 font-black text-xs uppercase tracking-widest">{location.name}</span>
                    </div>
                 </div>
              </div>
            </Link>
           ))}
        </div>
      </div>
    </div>
  );
}