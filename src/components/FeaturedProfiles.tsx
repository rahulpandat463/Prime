import Link from 'next/link';

interface FeaturedProfilesProps {
  profiles: Array<{
    id: number;
    name: string;
    slug: string;
    age?: number;
    location_name?: string;
    category_name?: string;
    rating?: number;
  }>;
  title?: string;
}

export default function FeaturedProfiles({ profiles, title = "Featured Profiles" }: FeaturedProfilesProps) {
  if (!profiles || profiles.length === 0) return null;

  return (
    <section className="py-24 bg-[#0f0a15] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-600/10 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tightest">
            {title}
          </h2>
          <div className="w-24 h-2 bg-pink-600 mx-auto rounded-full mb-8 shadow-[0_0_20px_rgba(219,39,119,0.5)]"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/profile/${profile.slug}`}
              className="group block"
            >
              <div className="bg-[#1a1325] border border-pink-600/20 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-[0_0_50px_rgba(219,39,119,0.15)] hover:border-pink-600 h-auto md:h-72">
                {/* Image Section */}
                <div className="relative w-full md:w-72 h-72 md:h-full flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-5xl font-black text-zinc-700 group-hover:scale-110 transition-transform duration-700">
                    {profile.name.charAt(0)}
                  </div>
                  
                  {/* PRO Banner */}
                  <div className="absolute top-0 left-0 z-20">
                    <div className="bg-pink-600 text-white text-[11px] font-black px-4 py-1.5 transform -rotate-45 -translate-x-5 translate-y-3 w-24 text-center shadow-2xl uppercase tracking-widest">
                      PRO
                    </div>
                  </div>

                  {/* Views Counter */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl border border-white/10 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 z-20">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    {(Math.random() * 2 + 0.5).toFixed(1)}K Views
                  </div>

                  {/* Status Badges */}
                  <div className="absolute bottom-12 right-4 flex flex-col gap-2 items-end z-20">
                    <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 text-blue-400 text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-2 uppercase tracking-widest shadow-xl">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Trusted
                    </div>
                    <div className="bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-2 uppercase tracking-widest shadow-xl">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      Verified
                    </div>
                  </div>

                  {/* Diamond Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-800 to-indigo-900 text-white text-[10px] font-black py-2.5 text-center flex items-center justify-center gap-2 uppercase tracking-[0.2em] z-20">
                    <span>💎</span> Diamond Elite
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 relative flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-pink-500 transition-colors duration-300 line-clamp-1">
                        {profile.name} — Premium {profile.category_name || 'Escort'} Service
                      </h3>
                      <button className="text-zinc-600 hover:text-pink-500 transition-colors flex-shrink-0 ml-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-zinc-400 text-lg mb-6 line-clamp-2 font-medium leading-relaxed">
                      Exclusive {profile.name} service available for discerning clients. Genuine profiles with 100% satisfaction guaranteed.
                    </p>

                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center text-pink-500 font-black text-xs uppercase tracking-widest">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {profile.location_name || 'India'}
                      </div>
                      
                      <div className="flex items-center text-amber-500 font-black text-xs uppercase tracking-widest">
                        <span className="mr-2">⭐</span>
                        {profile.rating || '5.0'} Rating
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="border border-zinc-800 bg-zinc-800/50 rounded-xl px-4 py-1.5 text-[11px] font-black text-zinc-300 uppercase tracking-widest">
                        Female
                      </div>
                      <div className="border border-zinc-800 bg-zinc-800/50 rounded-xl px-4 py-1.5 text-[11px] font-black text-zinc-300 uppercase tracking-widest">
                        {profile.age || 22}y
                      </div>
                      <div className="border border-zinc-800 bg-zinc-800/50 rounded-xl px-4 py-1.5 text-[11px] font-black text-zinc-300 uppercase tracking-widest">
                        Genuine Photos
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-auto">
                    <div className="bg-zinc-800 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:bg-pink-600 hover:text-white transition-all duration-500 group/btn border border-zinc-700">
                      <svg className="w-6 h-6 transform group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="bg-emerald-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:bg-emerald-500 transition-all duration-500 group/btn border border-emerald-500">
                      <svg className="w-6 h-6 transform group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.655zm6.241-3.515l.347.206c1.472.873 3.167 1.334 4.895 1.335h.005c5.64 0 10.23-4.59 10.233-10.23.001-2.731-1.062-5.3-3.003-7.234-1.942-1.936-4.512-3.004-7.241-3.005-5.641 0-10.23 4.59-10.233 10.23-.001 1.832.486 3.619 1.408 5.187l.226.386-1.008 3.682 3.771-.989zm11.222-7.854c-.267-.134-1.583-.781-1.828-.871-.246-.09-.425-.134-.604.134-.179.268-.692.871-.848 1.05-.156.179-.312.201-.579.067-.267-.134-1.129-.416-2.15-1.328-.795-.71-1.332-1.587-1.488-1.855-.156-.268-.017-.413.117-.546.12-.12.267-.312.401-.469.134-.156.179-.268.267-.446.089-.179.045-.335-.022-.469-.067-.134-.604-1.451-.826-1.986-.216-.522-.435-.452-.604-.46l-.513-.008c-.179 0-.469.067-.714.335-.246.268-.938.916-.938 2.232 0 1.316.96 2.589 1.094 2.768.134.179 1.888 2.883 4.574 4.043.64.276 1.139.44 1.526.563.641.204 1.224.175 1.685.107.514-.077 1.583-.647 1.806-1.272.223-.625.223-1.161.156-1.272-.067-.111-.245-.178-.512-.312z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}