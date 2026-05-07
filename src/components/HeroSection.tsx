import Link from 'next/link';

interface HeroSectionProps {}

export default function HeroSection({}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0f0a15] text-white overflow-hidden pt-20">
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-pink-900/10 rounded-full blur-[200px] -mr-96 -mt-96 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-purple-900/10 rounded-full blur-[200px] -ml-64 -mb-64 opacity-40"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="text-center lg:text-left space-y-12">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-pink-600/10 border border-pink-600/20 text-pink-500 text-[10px] font-black uppercase tracking-[0.5em]">
              <span className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(219,39,119,1)]"></span>
              The Ultimate Elite Directory
            </div>
            
            <h1 className="text-6xl md:text-[9rem] font-black tracking-tightest leading-[0.85] uppercase">
              <span className="block text-white">Elite</span>
              <span className="block text-pink-600 italic -mt-2">Profiles</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-xl font-medium leading-relaxed">
              Experience unparalleled sophistication with India's most verified and premium companion network.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
              <Link 
                href="/#featured" 
                className="px-14 py-6 bg-pink-600 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-pink-500 transition-all duration-500 shadow-[0_20px_50px_-10px_rgba(219,39,119,0.5)] hover:scale-105 transform hover:-translate-y-1"
              >
                Browse Gallery
              </Link>
              
              <div className="flex gap-4">
                <a 
                  href="tel:+910000000000" 
                  className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 shadow-2xl group"
                >
                  <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a 
                  href="https://wa.me/910000000000" 
                  className="w-16 h-16 bg-emerald-600/10 border border-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all duration-500 shadow-2xl group"
                >
                  <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="relative group hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-600/30 to-purple-800/30 rounded-[3.5rem] blur-2xl group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative mx-auto w-full max-w-lg bg-[#1a1325] border border-white/5 rounded-[3.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=face" 
                alt="Elite Companion" 
                className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a15] via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-[2rem] shadow-2xl">
                  <div className="w-14 h-14 bg-pink-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">★</div>
                  <div>
                    <div className="text-white font-black text-lg tracking-tight">Verified Diamond</div>
                    <div className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Genuine Gallery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}