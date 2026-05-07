import Link from 'next/link';
import { Metadata } from 'next';

// Full Mock Profiles for Static Frontend
const mockProfiles = [
  { id: 1, name: 'Ananya', slug: 'ananya', age: 23, city_slug: 'delhi', city_name: 'Delhi', rating: 5.0, category_name: 'Independent' },
  { id: 2, name: 'Neha', slug: 'neha', age: 24, city_slug: 'mumbai', city_name: 'Mumbai', rating: 4.9, category_name: 'Premium' },
  { id: 3, name: 'Priya', slug: 'priya', age: 25, city_slug: 'bangalore', city_name: 'Bangalore', rating: 4.8, category_name: 'VIP' },
  { id: 4, name: 'Kavya', slug: 'kavya', age: 27, city_slug: 'delhi', city_name: 'Delhi', rating: 4.8, category_name: 'Independent' },
  { id: 5, name: 'Riya', slug: 'riya', age: 26, city_slug: 'mumbai', city_name: 'Mumbai', rating: 4.7, category_name: 'College Girls' },
  { id: 6, name: 'Isha', slug: 'isha', age: 22, city_slug: 'delhi', city_name: 'Delhi', rating: 4.6, category_name: 'Independent' },
  { id: 7, name: 'Sana', slug: 'sana', age: 24, city_slug: 'bangalore', city_name: 'Bangalore', rating: 4.5, category_name: 'Premium' },
];

export const metadata: Metadata = {
  title: 'All Verified Escort Profiles | Elite Directory',
  description: 'Explore our complete directory of verified elite escorts. 100% genuine photos, real reviews, and premium companionship services in all major cities.',
  alternates: {
    canonical: '/profiles/',
  },
};

export default function AllProfilesPage() {
  const profiles = mockProfiles;

  return (
    <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 mb-8">
        <ol className="flex text-xs text-zinc-500 uppercase tracking-widest gap-2">
          <li><Link href="/" className="hover:text-pink-500">Home</Link></li>
          <li>/</li>
          <li className="text-zinc-300">All Profiles</li>
        </ol>
      </nav>

      <section className="bg-pink-600/10 border-y border-white/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tightest uppercase">
            All Verified <span className="text-pink-600 italic">Profiles</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-zinc-400 font-medium leading-relaxed">
            Discover the most exclusive companions from our nationwide elite directory. Every profile is manually verified.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 gap-8">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/${profile.city_slug}/${profile.slug}/`}
              className="block group"
            >
              <div className="bg-[#1a1325] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-pink-600/50 hover:shadow-[0_0_50px_rgba(219,39,119,0.1)] h-auto md:h-64">
                <div className="relative w-full md:w-64 h-64 md:h-full flex-shrink-0 bg-zinc-800 flex items-center justify-center text-5xl font-black text-zinc-700">
                  {profile.name.charAt(0)}
                </div>
                <div className="flex-1 p-8">
                  <h3 className="text-2xl font-black text-white group-hover:text-pink-500 transition-colors">{profile.name} — {profile.category_name}</h3>
                  <p className="text-zinc-500 mt-2">Elite companionship available in {profile.city_name}.</p>
                  <div className="mt-4 flex gap-4">
                    <span className="text-pink-500 font-black text-xs uppercase tracking-widest">★ {profile.rating} Rating</span>
                    <span className="text-zinc-400 font-black text-xs uppercase tracking-widest">{profile.city_name}</span>
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
