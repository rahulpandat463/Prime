import Link from 'next/link';
import { Metadata } from 'next';

// Mock Categories
const mockCategories = [
  { id: 1, name: 'Independent', slug: 'independent' },
  { id: 2, name: 'Premium', slug: 'premium' },
  { id: 3, name: 'VIP', slug: 'vip' },
  { id: 4, name: 'College Girls', slug: 'college-girls' },
  { id: 5, name: 'Celebrity', slug: 'celebrity' },
  { id: 6, name: 'Call Girls', slug: 'call-girls' },
];

const mockProfiles = [
  { id: 1, name: 'Ananya', slug: 'ananya', age: 23, city_slug: 'delhi', city_name: 'Delhi', rating: 5.0, category_name: 'Independent' },
  { id: 2, name: 'Neha', slug: 'neha', age: 24, city_slug: 'mumbai', city_name: 'Mumbai', rating: 4.9, category_name: 'Premium' },
];

export async function generateStaticParams() {
  return mockCategories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = mockCategories.find(c => c.slug === params.slug) || { name: params.slug };
  return {
    title: `${category.name} Escorts | Top Rated VIP Companions`,
    description: `Browse the best ${category.name.toLowerCase()} escorts. 100% verified profiles, premium service, and elite satisfaction guaranteed.`,
    alternates: {
      canonical: `/category/${params.slug}/`,
    },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = mockCategories.find(c => c.slug === params.slug) || mockCategories[0];
  const profiles = mockProfiles;

  return (
    <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 mb-8">
        <ol className="flex text-xs text-zinc-500 uppercase tracking-widest gap-2">
          <li><Link href="/" className="hover:text-pink-500">Home</Link></li>
          <li>/</li>
          <li className="text-zinc-300">{category.name} Escorts</li>
        </ol>
      </nav>

      <section className="bg-pink-600/10 border-y border-white/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tightest uppercase">
            {category.name} <span className="text-pink-600 italic">Profiles</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-zinc-400 font-medium leading-relaxed">
            Discover the most exclusive {category.name.toLowerCase()} companions. Our directory features only the highest-rated independent and agency models.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-xl font-black text-white uppercase tracking-widest mb-10">Elite {category.name} Selection</h2>
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
                    <h3 className="text-2xl font-black text-white group-hover:text-pink-500 transition-colors">{profile.name}</h3>
                    <p className="text-zinc-500 mt-2">Professional {category.name} service available in {profile.city_name}.</p>
                    <div className="mt-4 flex gap-4">
                       <span className="text-pink-500 font-black text-xs uppercase tracking-widest">★ {profile.rating} Rating</span>
                       <span className="text-zinc-400 font-black text-xs uppercase tracking-widest">{profile.city_name}</span>
                    </div>
                 </div>
              </div>
            </Link>
           ))}
        </div>

        {/* Category SEO Text */}
        <section className="mt-20 pt-20 border-t border-white/5">
           <h2 className="text-3xl font-black text-white mb-8 tracking-tightest uppercase">Why Choose Our <span className="text-pink-600 italic">{category.name} Escorts</span>?</h2>
           <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed">
              <p>
                 Our {category.name} category is curated for clients who demand nothing but the best. We understand that every encounter should be 
                 special, which is why we only list companions who meet our strict criteria for beauty, intelligence, and professionalism. 
                 Whether you are attending a high-profile corporate event or seeking a private companion for a relaxed evening, our 
                 {category.name.toLowerCase()} escorts are the perfect choice.
              </p>
           </div>
        </section>
      </div>
    </div>
  );
}