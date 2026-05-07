import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProfiles from '@/components/FeaturedProfiles';
import PopularProfiles from '@/components/PopularProfiles';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqsSection from '@/components/FaqsSection';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import LocationsSection from '@/components/LocationsSection';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Mock Data
const mockData = {
  categories: [
    { id: 1, name: 'Independent', slug: 'independent', description: 'Premium independent profiles' },
    { id: 2, name: 'Premium', slug: 'premium', description: 'Elite high-end companions' },
    { id: 3, name: 'VIP', slug: 'vip', description: 'World-class VIP services' },
    { id: 4, name: 'College Girls', slug: 'college-girls', description: 'Young and energetic companions' },
    { id: 5, name: 'Celebrity', slug: 'celebrity', description: 'Exclusive celebrity escorts' },
    { id: 6, name: 'Call Girls', slug: 'call-girls', description: 'Verified local call girls' },
  ],
  featuredProfiles: [
    { id: 1, name: 'Ananya', slug: 'ananya', age: 23, city_slug: 'delhi', city_name: 'Delhi', rating: 5.0 },
    { id: 2, name: 'Neha', slug: 'neha', age: 24, city_slug: 'mumbai', city_name: 'Mumbai', rating: 4.9 },
  ],
  locations: [
    { id: 1, name: 'Delhi', slug: 'delhi' },
    { id: 2, name: 'Mumbai', slug: 'mumbai' },
    { id: 3, name: 'Bangalore', slug: 'bangalore' },
  ]
};

export const metadata = {
  title: 'EliteCallGirl | Premium Escort Directory & VIP Companions',
  description: 'The most exclusive directory for high-end escorts and VIP companions. 100% verified profiles, real photos, and elite service in major cities.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const { categories, featuredProfiles, locations } = mockData;

  // Organization Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EliteCallGirl",
    "url": "https://example.com",
    "logo": "https://example.com/logo.png",
    "sameAs": [
      "https://twitter.com/elitecallgirl"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <HeroSection />

      <PopularProfiles profiles={featuredProfiles} />

      <CategoriesSection categories={categories} />

      <FeaturedProfiles profiles={featuredProfiles} title="Newly Added Profiles" />

      <ServicesSection services={categories} />

      <HowItWorksSection />

      {/* SEO Content Section - 1000+ words target */}
      <section className="bg-[#0f0a15] py-24 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tightest uppercase text-center">
            The Premier <span className="text-pink-600 italic">Elite Directory</span>
          </h2>
          
          <div className="prose prose-invert max-w-none text-zinc-400 leading-loose text-lg space-y-8">
            <p>
              Welcome to EliteCallGirl, the world's most sophisticated and secure directory for high-end companionship. In an industry where discretion 
              and quality are paramount, we stand as a beacon of excellence, connecting discerning clients with the most exclusive independent escorts 
              globally. Our mission is to provide a platform that is not just a directory, but a guarantee of quality and verification.
            </p>
            
            <h3 className="text-2xl font-black text-white uppercase tracking-widest mt-12">Unrivaled Verification Standards</h3>
            <p>
              Every profile you see on our platform undergoes a rigorous manual verification process. We understand that our clients value their time 
              and privacy above all else. That is why we ensure that every photo is genuine, every description is accurate, and every companion 
              maintains the highest standards of professionalism. Unlike other mass-generated directories, we prioritize the "Elite" in our name.
            </p>

            <h3 className="text-2xl font-black text-white uppercase tracking-widest mt-12">Luxury Beyond Boundaries</h3>
            <p>
              From the bustling streets of Delhi to the vibrant nightlife of Mumbai and the tech hubs of Bangalore, our directory covers all major 
              metropolitan areas with a curated selection of companions. Whether you are a business traveler looking for a sophisticated dinner 
              partner or a local resident seeking an unforgettable private evening, EliteCallGirl is your trusted gateway.
            </p>

            <div className="bg-[#1a1325] p-10 rounded-[3rem] border border-white/5 my-12">
               <h4 className="text-xl font-black text-pink-600 uppercase mb-6 italic">Why Choose EliteCallGirl?</h4>
               <ul className="space-y-4 list-none p-0">
                  <li className="flex gap-4">
                     <span className="text-pink-600 font-bold">01.</span>
                     <span>100% Manually Verified Profiles with Real Photos.</span>
                  </li>
                  <li className="flex gap-4">
                     <span className="text-pink-600 font-bold">02.</span>
                     <span>Absolute Discretion and Secure Communication.</span>
                  </li>
                  <li className="flex gap-4">
                     <span className="text-pink-600 font-bold">03.</span>
                     <span>Premium Selection of Independent and Agency Models.</span>
                  </li>
                  <li className="flex gap-4">
                     <span className="text-pink-600 font-bold">04.</span>
                     <span>Seamless Navigation and User Experience.</span>
                  </li>
               </ul>
            </div>

            <p>
              Our platform is designed with an SEO-first approach, ensuring that we are always reachable when you need us most. We follow strict 
              Google indexing compliance, maintaining long-term stability and avoiding the pitfalls of low-quality doorway pages. When you 
              search for the best escort services, EliteCallGirl is designed to be the first and last place you need to visit.
            </p>
          </div>

          {/* Internal Linking Blocks on Homepage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
             <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                <h4 className="text-white font-black uppercase tracking-widest mb-6">Popular Cities</h4>
                <div className="grid grid-cols-2 gap-4">
                   {locations.map(loc => (
                      <Link key={loc.slug} href={`/${loc.slug}/`} className="text-zinc-500 hover:text-pink-500 text-sm font-bold">
                         Escorts in {loc.name}
                      </Link>
                   ))}
                </div>
             </div>
             <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                <h4 className="text-white font-black uppercase tracking-widest mb-6">Explore Categories</h4>
                <div className="grid grid-cols-2 gap-4">
                   {categories.slice(0, 4).map(cat => (
                      <Link key={cat.slug} href={`/category/${cat.slug}/`} className="text-zinc-500 hover:text-pink-500 text-sm font-bold">
                         {cat.name} Escorts
                      </Link>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={[]} />

      <FaqsSection faqs={[]} />

      <LocationsSection locations={locations} />

      <Footer locations={locations} categories={categories} services={[]} />
    </>
  );
}