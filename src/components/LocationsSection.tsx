import Link from 'next/link';

interface LocationsSectionProps {
  locations: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export default function LocationsSection({ locations }: LocationsSectionProps) {
  if (!locations || locations.length === 0) return null;

  return (
    <section id="locations" className="py-24 bg-[#0f0a15] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-pink-900/10 rounded-full blur-[150px] opacity-20 -mr-96 -mb-96"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Service Locations
          </h2>
          <p className="text-xl text-zinc-400 font-medium leading-relaxed">
            Escort Service Across India — {locations.length} Cities
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          {locations.map((location) => (
            <Link
              key={location.id}
              href={`/${location.slug}`}
              className="group relative px-8 py-4 bg-[#1a1325] border border-pink-600/20 rounded-full shadow-2xl hover:border-pink-600 hover:shadow-[0_0_30px_rgba(219,39,119,0.2)] transition-all duration-500 transform hover:-translate-y-1"
            >
              <span className="font-black text-zinc-300 group-hover:text-pink-500 transition-colors text-base md:text-xl tracking-tight">
                {location.name}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-zinc-600 italic text-sm font-medium">
            Can't find your city? New locations are being added every week. Contact support for more info.
          </p>
        </div>
      </div>
    </section>
  );
}