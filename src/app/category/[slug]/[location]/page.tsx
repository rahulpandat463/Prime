import Link from 'next/link';

// Mock Params
const mockParams = [
  { slug: 'independent', location: 'delhi' },
  { slug: 'premium', location: 'mumbai' },
];

export async function generateStaticParams() {
  return mockParams;
}

export default function CategoryLocationPage({ params }: { params: { slug: string, location: string } }) {
  return (
    <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
      <section className="bg-pink-600/10 border-y border-white/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tightest uppercase">
            {params.slug} in <span className="text-pink-600 italic">{params.location}</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-zinc-400 font-medium leading-relaxed text-capitalize">
            Premium {params.slug} profiles available in {params.location}.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 text-center py-20">
        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-10">Coming Soon</h2>
        <Link href="/profiles" className="text-pink-500 font-black uppercase tracking-widest hover:underline">
          View All Profiles
        </Link>
      </div>
    </div>
  );
}