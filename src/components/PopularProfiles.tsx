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
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[8px] font-bold uppercase tracking-widest backdrop-blur-md ${
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
    <section className="py-20 bg-[#0f0a15] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-600/10 to-transparent opacity-20"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight uppercase">
            Popular <span className="text-pink-600 italic font-medium">Profiles</span>
          </h2>
          <p className="text-sm text-zinc-500 max-w-xl mx-auto font-medium leading-relaxed">
            Explore verified companions across India available for private and premium experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/${profile.city_slug || 'delhi'}/${profile.slug}/`}
              className="group block"
            >
              <div className="bg-[#1a1325] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-pink-600/30 hover:bg-[#1f162d] h-auto md:h-64 shadow-2xl">
                {/* Image Section */}
                <div className="relative w-full md:w-64 h-64 md:h-full flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-4xl font-bold text-zinc-800 transition-transform duration-700 group-hover:scale-105">
                    {profile.name.charAt(0)}
                  </div>
                  
                  {/* PRO Banner */}
                  <div className="absolute top-0 left-0 z-20">
                    <div className="bg-pink-600 text-white text-[9px] font-black px-4 py-1.5 transform -rotate-45 -translate-x-5 translate-y-2 w-24 text-center shadow-2xl uppercase tracking-widest">
                      PRO
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-10 left-3 z-20">
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xl px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
                      <svg className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-[10px] font-black text-white">{profile.rating || '5.0'}</span>
                    </div>
                  </div>

                  {/* Diamond Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/80 to-indigo-950/80 text-white text-[9px] font-bold py-2.5 text-center flex items-center justify-center gap-2 uppercase tracking-[0.2em] z-20 backdrop-blur-md">
                    <span>💎</span> Diamond Elite
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-pink-500 transition-colors duration-300 tracking-tight">
                        {profile.name}
                      </h3>
                      <VerificationBadge type="verified" />
                    </div>
                    
                    <div className="flex items-center gap-6 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600">📍</span>
                        {profile.location_name || 'India'}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600">🎂</span>
                        {profile.age || 20} Years
                      </div>
                    </div>

                    <p className="text-zinc-500 text-sm line-clamp-2 font-medium leading-relaxed max-w-xl">
                      Discover the ultimate elite experience with {profile.name}. Verified for genuine quality and unmatched professional service.
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-6">
                    <div className="flex gap-3">
                      <div className="px-5 py-2 bg-zinc-900 border border-white/5 rounded-full text-zinc-400 font-bold text-[9px] uppercase tracking-widest hover:bg-pink-600 hover:text-white transition-all cursor-pointer">
                        Call
                      </div>
                      <div className="px-5 py-2 bg-zinc-900 border border-white/5 rounded-full text-zinc-400 font-bold text-[9px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all cursor-pointer">
                        WhatsApp
                      </div>
                    </div>
                    
                    <div className="w-11 h-11 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-zinc-500 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500 shadow-xl">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/profiles/"
            className="inline-block bg-white/5 border border-white/5 text-zinc-400 px-12 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-pink-600 hover:text-white transition-all duration-500"
          >
            Explore All Profiles
          </Link>
        </div>
      </div>
    </section>
  );
}