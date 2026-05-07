import Link from 'next/link';

// Mock Profiles for Static Generation
const mockProfiles = [
  { id: 1, name: 'Ananya', slug: 'ananya', age: 23, location_name: 'Delhi', rating: 5.0, description: 'Premium companion with elite service.' },
  { id: 2, name: 'Neha', slug: 'neha', age: 24, location_name: 'Mumbai', rating: 4.9, description: 'High-end elite model.' },
];

export async function generateStaticParams() {
  return mockProfiles.map((p) => ({
    slug: p.slug,
  }));
}

export default function ProfilePage({ params }: { params: { slug: string } }) {
  const profile = mockProfiles.find(p => p.slug === params.slug) || mockProfiles[0];

  return (
    <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
      {/* Hero Header */}
      <section className="bg-pink-600/10 border-y border-white/5 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-7xl font-black text-white tracking-tightest uppercase">{profile.name}</h1>
                <span className="bg-pink-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-xl uppercase tracking-widest">
                  PRO Verified
                </span>
              </div>
              <p className="text-xl text-zinc-400 font-medium flex items-center gap-3">
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                {profile.location_name} • {profile.age} Years
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <a 
                href="tel:+910000000000"
                className="flex-1 md:flex-initial bg-white text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-pink-600 hover:text-white transition-all duration-500"
              >
                Call Now
              </a>
              <a 
                href="https://wa.me/910000000000"
                className="flex-1 md:flex-initial bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-emerald-500 transition-all duration-500"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Photos */}
            <div className="bg-[#1a1325] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
              <h2 className="text-3xl font-black text-white mb-8 tracking-tightest uppercase">
                Private <span className="text-pink-600 italic">Gallery</span>
              </h2>
              <div className="aspect-video bg-zinc-900 rounded-[2rem] flex flex-col items-center justify-center border-2 border-dashed border-white/5">
                 <span className="text-zinc-600 font-black uppercase tracking-[0.3em]">Authentic Photos</span>
              </div>
            </div>

            {/* About */}
            <div className="bg-[#1a1325] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
              <h2 className="text-3xl font-black text-white mb-8 tracking-tightest uppercase">
                About <span className="text-pink-600 italic">Companion</span>
              </h2>
              <p className="text-lg text-zinc-400 font-medium leading-relaxed">
                {profile.description} Experience the highest level of professionalism and companionship. All details are kept 100% discreet and private.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#1a1325] border border-white/5 rounded-[3rem] p-10 shadow-2xl sticky top-28">
              <h3 className="text-xl font-black text-white mb-8 uppercase tracking-widest">Profile Stats</h3>
              <div className="space-y-6">
                {[
                  { label: 'Verified', value: '100% Genuine', color: 'text-emerald-500' },
                  { label: 'Rating', value: '5.0 / 5.0', color: 'text-pink-500' },
                  { label: 'Discretion', value: 'Maximum', color: 'text-white' },
                  { label: 'Availability', value: '24 / 7', color: 'text-white' },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-zinc-500 font-black text-[10px] uppercase tracking-widest">{stat.label}</span>
                    <span className={`font-black text-sm uppercase tracking-tighter ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}