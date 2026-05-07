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
  description: 'Explore our complete directory of verified elite escorts. 100% genuine photos, real reviews, and premium companionship services.',
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
        <ol className="flex text-[10px] text-zinc-600 uppercase tracking-widest gap-2">
          <li><Link href="/" className="hover:text-pink-500">Home</Link></li>
          <li>/</li>
          <li className="text-zinc-400">All Profiles</li>
        </ol>
      </nav>

      <section className="bg-pink-600/5 border-y border-white/5 py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight uppercase">
            All Verified <span className="text-pink-600 italic font-medium">Profiles</span>
          </h1>
          <p className="text-sm max-w-xl mx-auto text-zinc-500 font-medium">
            Explore our complete directory of elite verified companions with 100% genuine photos and discreet service.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 gap-6">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/${profile.city_slug}/${profile.slug}/`}
              className="block group"
            >
              <div className="bg-[#1a1325] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-pink-600/30 hover:bg-[#1f162d] h-auto md:h-56">
                {/* Image Section */}
                <div className="relative w-full md:w-56 h-56 md:h-full flex-shrink-0">
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-4xl font-bold text-zinc-800">
                    {profile.name.charAt(0)}
                  </div>
                  
                  {/* PRO Banner */}
                  <div className="absolute top-0 left-0 z-10">
                    <div className="bg-pink-600 text-white text-[9px] font-black px-4 py-1 transform -rotate-45 -translate-x-5 translate-y-2 w-20 text-center uppercase tracking-widest">
                      PRO
                    </div>
                  </div>

                  {/* Views */}
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-white flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                    {(Math.random() * 5 + 1).toFixed(1)}K
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 relative flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-pink-500 transition-colors line-clamp-1 tracking-tight">
                        {profile.name} — <span className="text-zinc-500 font-medium">{profile.category_name}</span>
                      </h3>
                    </div>

                    <p className="text-zinc-500 text-xs mb-4 line-clamp-2 font-medium leading-relaxed">
                      Exclusive {profile.name} service available for discerning clients. Genuine profiles with 100% satisfaction guaranteed.
                    </p>

                    <div className="flex items-center gap-4">
                       <div className="flex items-center text-pink-600 font-bold text-[10px] uppercase tracking-widest">
                         <span className="mr-1.5">📍</span> {profile.city_name}
                       </div>
                       <div className="flex items-center text-yellow-500/80 font-bold text-[10px] uppercase tracking-widest">
                         <span className="mr-1.5">★</span> {profile.rating.toFixed(1)} Rating
                       </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {['Female', `${profile.age}Y`, 'Genuine Photos'].map(tag => (
                        <span key={tag} className="bg-white/5 text-zinc-500 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <div className="bg-zinc-900 text-zinc-400 w-9 h-9 rounded-xl flex items-center justify-center border border-white/5 hover:bg-pink-600 hover:text-white transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="bg-emerald-600/20 text-emerald-500 w-9 h-9 rounded-xl flex items-center justify-center border border-emerald-500/20 hover:bg-emerald-600 hover:text-white transition-all">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
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
