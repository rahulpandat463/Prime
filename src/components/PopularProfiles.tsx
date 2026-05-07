import Link from 'next/link';

interface ProfileCardProps {
  id: number;
  name: string;
  slug: string;
  age?: number;
  location_name?: string;
  city_slug?: string;
  rating?: number;
}

interface PopularProfilesProps {
  profiles: ProfileCardProps[];
}

const VerificationBadge = ({ type }: { type: 'trusted' | 'verified' }) => {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest backdrop-blur-md ${
      type === 'trusted' 
        ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    }`}>
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
      </svg>
      {type}
    </div>
  );
};

export default function PopularProfiles({ profiles }: PopularProfilesProps) {
  if (!profiles || profiles.length === 0) return null;

  return (
    <section className="py-24 bg-[#0f0a15] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-600/10 to-transparent opacity-20"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Popular Profiles
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Explore verified companions across India available for private and premium experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/${profile.city_slug || 'delhi'}/${profile.slug}/`}
              className="group block"
            >
              <div className="bg-[#1a1325] border border-pink-600/20 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-pink-600 hover:shadow-[0_0_40px_rgba(219,39,119,0.15)] h-auto md:h-72 shadow-2xl">
                <div className="relative w-full md:w-72 h-72 md:h-full flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-5xl font-black text-zinc-700 transition-transform duration-700 group-hover:scale-110">
                    {profile.name.charAt(0)}
                  </div>
                  <div className="absolute top-0 left-0 z-20">
                    <div className="bg-pink-600 text-white text-[11px] font-black px-5 py-2 transform -rotate-45 -translate-x-6 translate-y-3 w-28 text-center shadow-2xl uppercase tracking-widest">
                      PRO
                    </div>
                  </div>
                  <div className="absolute bottom-12 left-4 z-20">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-white/10 shadow-sm">
                      <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-[12px] font-black text-white">{profile.rating || '5.0'}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-indigo-950 text-white text-[10px] font-black py-3 text-center flex items-center justify-center gap-2 uppercase tracking-[0.2em] z-20">
                    <span>💎</span> Diamond Elite
                  </div>
                </div>

                <div className="flex-1 p-8 md:p-10 relative flex flex-col justify-between overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-3xl font-black text-white group-hover:text-pink-500 transition-colors duration-300">
                          {profile.name}
                        </h3>
                        <div className="flex gap-2">
                          <VerificationBadge type="verified" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-zinc-400 text-sm font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                          </svg>
                          {profile.location_name || 'India'}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-500">🎂</span>
                          {profile.age || 20} Years
                        </div>
                      </div>

                      <p className="text-zinc-500 text-lg line-clamp-2 font-medium leading-relaxed">
                        Discover the ultimate elite experience with {profile.name}. Verified for genuine quality and unmatched professional service.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-6 mt-6 border-t border-zinc-800/50 pt-8">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 font-black text-[10px] uppercase tracking-widest hover:bg-pink-600 hover:text-white transition-all duration-300 cursor-pointer">
                        Call
                      </div>
                      <div className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all duration-300 cursor-pointer">
                        WhatsApp
                      </div>
                    </div>
                    
                    <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-white group-hover:bg-pink-600 group-hover:border-pink-500 transition-all duration-500 shadow-xl">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/profiles/"
            className="inline-block bg-zinc-900 border border-zinc-800 text-white px-16 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-pink-600 hover:border-pink-500 transition-all duration-500 shadow-2xl"
          >
            Explore All Profiles
          </Link>
        </div>
      </div>
    </section>
  );
}