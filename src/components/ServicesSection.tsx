import Link from 'next/link';

interface ServicesSectionProps {
  services: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

const serviceIcons: { [key: string]: string } = {
  'massage': '💆',
  'oral': '💋',
  'bdsm': '⛓️',
  'dinner-dates': '🍷',
  'travel': '✈️',
  'party': '🥳',
  '69-position': '🔄',
  'roleplay': '🎭',
  'doorstep': '🏠',
  'night-stay': '🌙',
  'vip': '👑',
  'default': '✨',
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-[#0f0a15] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-900/5 rounded-full blur-[150px] opacity-20"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tightest uppercase">
            Exclusive <span className="text-pink-600 italic">Services</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Specialized experiences tailored for ultimate satisfaction and absolute discretion.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/service/${service.slug}`}
              className="group relative flex items-center gap-4 px-8 py-4 bg-[#1a1325] border border-white/5 rounded-2xl shadow-2xl hover:border-pink-600/50 hover:shadow-[0_0_30px_rgba(219,39,119,0.1)] transition-all duration-500 transform hover:-translate-y-1.5"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-xl text-xl group-hover:bg-pink-600 group-hover:border-pink-500 transition-all duration-500 shadow-inner group-hover:rotate-6">
                {serviceIcons[service.slug] || serviceIcons['default']}
              </div>
              <span className="font-black text-zinc-300 group-hover:text-white transition-colors text-base uppercase tracking-[0.2em]">
                {service.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}