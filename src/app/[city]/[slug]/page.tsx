import Link from 'next/link';
import { Metadata } from 'next';

// Mock Data
const mockProfiles = [
  { id: 1, name: 'Ananya', slug: 'ananya', age: 23, city_name: 'Delhi', city_slug: 'delhi', rating: 5.0, category_slug: 'independent', description: 'Premium companion with elite service.' },
  { id: 2, name: 'Neha', slug: 'neha', age: 24, city_name: 'Mumbai', city_slug: 'mumbai', rating: 4.9, category_slug: 'premium', description: 'High-end elite model.' },
  { id: 3, name: 'Priya', slug: 'priya', age: 25, city_name: 'Bangalore', city_slug: 'bangalore', rating: 4.8, category_slug: 'vip', description: 'Elegant and professional companion.' },
];

const mockCategories = [
  { name: 'Independent', slug: 'independent' },
  { name: 'Premium', slug: 'premium' },
  { name: 'VIP', slug: 'vip' },
  { name: 'College Girls', slug: 'college-girls' },
];

const mockLocations = [
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Bangalore', slug: 'bangalore' },
];

// Variation Engine Helper
const getUniqueDescription = (name: string, city: string) => {
  const intros = [
    `Experience the ultimate luxury with ${name}, a premier escort in ${city} dedicated to providing unforgettable moments.`,
    `Looking for the perfect companion? ${name} offers top-tier independent escort services in the heart of ${city}.`,
    `${name} is a sophisticated and charming companion in ${city}, perfect for elite social events or private evenings.`,
  ];
  const outcomes = [
    `Book your session today and discover why ${name} is the most sought-after companion in ${city}.`,
    `Absolute discretion and professional service are guaranteed with ${name} in ${city}.`,
    `${name} looks forward to making your time in ${city} truly special and memorable.`,
  ];
  const seed = name.length % intros.length;
  return `${intros[seed]} ${outcomes[seed]}`;
};

export async function generateStaticParams() {
  const params: any[] = [];
  // Profile params
  mockProfiles.forEach(p => {
    params.push({ city: p.city_slug, slug: p.slug });
  });
  // Category-City params
  mockLocations.forEach(l => {
    mockCategories.forEach(c => {
      params.push({ city: l.slug, slug: c.slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: { city: string, slug: string } }): Promise<Metadata> {
  const isCategory = mockCategories.some(c => c.slug === params.slug);
  const city = mockLocations.find(l => l.slug === params.city) || { name: params.city };

  if (isCategory) {
    const category = mockCategories.find(c => c.slug === params.slug)!;
    return {
      title: `${category.name} Escorts in ${city.name} | Verified VIP Service`,
      description: `Top-rated ${category.name.toLowerCase()} escorts in ${city.name}. View profiles, real photos, and verified reviews for the best companionship in ${city.name}.`,
    };
  }

  const profile = mockProfiles.find(p => p.slug === params.slug) || mockProfiles[0];
  return {
    title: `${profile.name} Escort in ${profile.city_name} | Independent VIP Escort`,
    description: `${profile.name} is a verified independent escort in ${profile.city_name}. View genuine photos and contact details.`,
    alternates: { canonical: `/${params.city}/${params.slug}/` },
  };
}

export default function DynamicSlugPage({ params }: { params: { city: string, slug: string } }) {
  const isCategory = mockCategories.some(c => c.slug === params.slug);
  const city = mockLocations.find(l => l.slug === params.city) || { name: params.city };

  if (isCategory) {
    const category = mockCategories.find(c => c.slug === params.slug)!;
    const profiles = mockProfiles.filter(p => p.city_slug === params.city && p.category_slug === params.slug);

    return (
      <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
        <nav className="container mx-auto px-4 mb-8">
          <ol className="flex text-xs text-zinc-500 uppercase tracking-widest gap-2">
            <li><Link href="/" className="hover:text-pink-500">Home</Link></li>
            <li>/</li>
            <li><Link href={`/${params.city}/`} className="hover:text-pink-500">{city.name}</Link></li>
            <li>/</li>
            <li className="text-zinc-300">{category.name}</li>
          </ol>
        </nav>
        <section className="bg-pink-600/10 border-y border-white/5 py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tightest uppercase">
              {category.name} Escorts in <span className="text-pink-600 italic">{city.name}</span>
            </h1>
          </div>
        </section>
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid grid-cols-1 gap-8">
              {profiles.length > 0 ? profiles.map(p => (
                <Link key={p.id} href={`/${params.city}/${p.slug}/`} className="bg-[#1a1325] p-8 rounded-[2.5rem] border border-white/5 hover:border-pink-600 transition-all flex items-center gap-6">
                   <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center font-black text-2xl text-zinc-700">{p.name.charAt(0)}</div>
                   <div>
                      <h3 className="text-2xl font-black text-white uppercase">{p.name}</h3>
                      <p className="text-zinc-500 text-sm">{category.name} service in {city.name}</p>
                   </div>
                </Link>
              )) : <p className="text-zinc-500 text-center py-20">No profiles found in this category yet.</p>}
           </div>
        </div>
      </div>
    );
  }

  // Profile View Logic (Same as before but inside this component)
  const profile = mockProfiles.find(p => p.slug === params.slug) || mockProfiles[0];
  const description = getUniqueDescription(profile.name, city.name);
  const relatedProfiles = mockProfiles.filter(p => p.slug !== profile.slug && p.city_slug === params.city).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
      {/* ... (rest of profile view code) ... */}
      <nav className="container mx-auto px-4 mb-8">
        <ol className="flex text-xs text-zinc-500 uppercase tracking-widest gap-2">
          <li><Link href="/" className="hover:text-pink-500">Home</Link></li>
          <li>/</li>
          <li><Link href={`/${params.city}/`} className="hover:text-pink-500">{city.name}</Link></li>
          <li>/</li>
          <li className="text-zinc-300">{profile.name}</li>
        </ol>
      </nav>
      <section className="bg-pink-600/10 border-y border-white/5 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-7xl font-black text-white tracking-tightest uppercase">{profile.name}</h1>
                <span className="bg-pink-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-xl uppercase tracking-widest">Verified</span>
              </div>
              <p className="text-xl text-zinc-400 font-medium">{profile.name} Escort in {city.name} • {profile.age} Years</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 mt-16 max-w-7xl">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
               <div className="bg-[#1a1325] p-10 rounded-[3rem] border border-white/5">
                  <h2 className="text-3xl font-black text-white mb-6 uppercase">About <span className="text-pink-600 italic">Companion</span></h2>
                  <p className="text-zinc-400 text-lg leading-relaxed">{description}</p>
                  <p className="text-zinc-400 text-lg leading-relaxed mt-4">{profile.description}</p>
               </div>
               {/* Internal links to related profiles */}
               <div className="pt-8">
                 <h3 className="text-xl font-black text-white uppercase mb-6">More in {city.name}</h3>
                 <div className="grid grid-cols-2 gap-4">
                    {relatedProfiles.map(p => (
                      <Link key={p.id} href={`/${params.city}/${p.slug}/`} className="text-zinc-500 hover:text-pink-500 font-bold">
                        {p.name} in {city.name}
                      </Link>
                    ))}
                 </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
