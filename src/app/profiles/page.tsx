import Link from 'next/link';

// Mock Data for Static Frontend
const mockProfiles = [
  { id: 1, name: 'Ananya', slug: 'ananya', age: 23, location_name: 'Delhi', rating: 5.0, category_name: 'Independent' },
  { id: 2, name: 'Neha', slug: 'neha', age: 24, location_name: 'Mumbai', rating: 4.9, category_name: 'Premium' },
  { id: 3, name: 'Priya', slug: 'priya', age: 25, location_name: 'Bangalore', rating: 4.8, category_name: 'VIP' },
  { id: 4, name: 'Kavya', slug: 'kavya', age: 27, location_name: 'Hyderabad', rating: 4.8, category_name: 'Independent' },
  { id: 5, name: 'Riya', slug: 'riya', age: 26, location_name: 'Pune', rating: 4.7, category_name: 'College Girls' },
  { id: 6, name: 'Isha', slug: 'isha', age: 22, location_name: 'Chennai', rating: 4.6, category_name: 'Independent' },
];

export default function AllProfilesPage() {
  const profiles = mockProfiles;

  return (
    <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
      {/* Hero Section */}
      <section className="bg-pink-600/10 border-y border-white/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tightest uppercase">
            All Verified <span className="text-pink-600 italic">Profiles</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-zinc-400 font-medium leading-relaxed">
            Explore our complete directory of elite verified companions with 100% genuine photos and discreet service.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-xl font-black text-white uppercase tracking-widest">
            Elite Selection ({profiles.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/profile/${profile.slug}`}
              className="block group"
            >
              <div className="bg-[#1a1325] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-pink-600/50 hover:shadow-[0_0_50px_rgba(219,39,119,0.1)] h-auto md:h-64">
                {/* Image Section */}
                <div className="relative w-full md:w-64 h-64 md:h-full flex-shrink-0">
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-5xl font-black text-zinc-700 group-hover:scale-110 transition-transform duration-700">
                    {profile.name.charAt(0)}
                  </div>
                  
                  {/* PRO Banner */}
                  <div className="absolute top-0 left-0">
                    <div className="bg-pink-600 text-white text-[10px] font-black px-4 py-1.5 transform -rotate-45 -translate-x-5 translate-y-3 w-24 text-center shadow-xl uppercase tracking-widest">
                      PRO
                    </div>
                  </div>

                  {/* Views Counter */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl border border-white/10 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    {(Math.random() * 5 + 1).toFixed(1)}K
                  </div>

                  {/* Diamond Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-800 to-indigo-900 text-white text-[10px] font-black py-2 text-center flex items-center justify-center gap-1 uppercase tracking-widest">
                    <span>💎</span> Elite Diamond
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 relative flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black text-white leading-tight group-hover:text-pink-500 transition-colors line-clamp-1">
                        {profile.name} — Premium {profile.category_name}
                      </h3>
                      <button className="text-zinc-700 hover:text-pink-600 transition-colors flex-shrink-0 ml-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-zinc-500 text-sm mb-4 line-clamp-2 font-medium">
                      Exclusive {profile.name} service available for discerning clients. Genuine profiles with 100% satisfaction guaranteed and absolute discretion.
                    </p>

                    <div className="flex items-center text-pink-500 font-black text-xs uppercase tracking-[0.2em] mb-4">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {profile.location_name || 'India'}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="border border-white/5 bg-white/5 rounded-lg px-3 py-1 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        {profile.age}y
                      </div>
                      <div className="border border-white/5 bg-white/5 rounded-lg px-3 py-1 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        Verified
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-auto">
                    <div className="bg-zinc-800 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-xl hover:bg-pink-600 transition-all duration-500 group/btn">
                      <svg className="w-5 h-5 transform group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="bg-emerald-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-xl hover:bg-emerald-500 transition-all duration-500 group/btn">
                      <svg className="w-5 h-5 transform group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
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
