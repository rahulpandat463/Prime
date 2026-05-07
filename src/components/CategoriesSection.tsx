import Link from 'next/link';

interface CategoriesSectionProps {
  categories: Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
  }>;
}

const categoryIcons: { [key: string]: string } = {
  'independent': '👑',
  'premium': '💎',
  'vip': '⭐',
  'call-girls': '📱',
  'college-girls': '🎓',
  'celebrity': '🌟',
  'default': '✨',
};

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section id="categories" className="py-24 bg-[#0f0a15] relative overflow-hidden">
      {/* Background ambient glow - Kept as is */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-900/10 rounded-full blur-[150px] opacity-20 -mr-96 -mt-96"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header Section - Kept as is */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Escort Categories
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Explore our diverse selection of verified escorts and call girls across India. 
            Every category features screened, professional companions ready for your call.
          </p>
        </div>

        {/* Grid Area - Styled Only Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative flex flex-col h-[400px] bg-[#1a1325] border border-pink-600/10 rounded-[3rem] overflow-hidden shadow-2xl hover:shadow-pink-600/10 transition-all duration-700 hover:-translate-y-2"
            >
              {/* Top Section: Visual / Icon Area */}
              <div className="relative h-[180px] w-full overflow-hidden bg-gradient-to-br from-pink-900/20 to-purple-900/20">
                <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-125 transform">
                  {categoryIcons[category.slug] || categoryIcons['default']}
                </div>
                
                {/* Luxury Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1325] via-transparent to-pink-500/5" />
                
                {/* Floating Icon Badge */}
                <div className="absolute top-8 left-8">
                  <div className="w-14 h-14 flex items-center justify-center bg-pink-600 border border-pink-500 rounded-2xl text-white shadow-[0_10px_30px_-10px_rgba(219,39,119,0.5)] group-hover:rotate-[15deg] transition-all duration-500">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/>
                      <path d="M5 3l1 1"/><path d="M19 3l-1 1"/><path d="M5 21l1-1"/><path d="M19 21l-1-1"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-10 pt-4 flex flex-col relative z-10 bg-[#1a1325]">
                <div className="space-y-3 mb-8">
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-pink-500 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-zinc-400 font-medium line-clamp-3 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {category.description || `Premium selection of ${category.name} profiles verified for quality and satisfaction across India.`}
                  </p>
                </div>

                {/* Interactive Action Row */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 text-pink-500 font-black text-[10px] uppercase tracking-[0.2em]">
                    Explore Gallery
                  </div>
                  <div className="w-10 h-10 rounded-full bg-pink-600/10 flex items-center justify-center group-hover:bg-pink-600 transition-all duration-500">
                    <svg className="w-5 h-5 text-pink-500 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
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