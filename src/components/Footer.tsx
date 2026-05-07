import Link from 'next/link';

interface FooterProps {
  locations: Array<{ id: number; name: string; slug: string }>;
  categories: Array<{ id: number; name: string; slug: string }>;
  services: Array<{ id: number; name: string; slug: string }>;
}

export default function Footer({ locations, categories, services }: FooterProps) {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/5 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-900/5 rounded-full blur-[120px] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24">
          <div className="space-y-10">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(219,39,119,0.3)] group-hover:rotate-6 transition-all duration-500">
                <span className="text-white font-black text-2xl">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tighter leading-none">
                  Pink<span className="text-pink-600">Luxury</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Elite Directory</span>
              </div>
            </Link>
            
            <p className="text-zinc-500 font-medium leading-relaxed text-sm">
              India's most elite directory for verified companions. We provide a premium, secure, and discreet platform for discerning clients across 28+ cities.
            </p>
            
            <div className="flex gap-4">
              {[
                { label: 'FB', path: 'm18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { label: 'IG', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M21 12c0 1.66-.01 3.33-.11 4.99-.1 1.81-.5 3.42-1.82 4.74s-2.93 1.72-4.74 1.82c-1.66.1-3.33.11-4.99.11s-3.33-.01-4.99-.11c-1.81-.1-3.42-.5-4.74-1.82s-1.72-2.93-1.82-4.74c-.1-1.66-.11-3.33-.11-4.99s.01-3.33.11-4.99c.1-1.81.5-3.42 1.82-4.74s2.93-1.72 4.74-1.82c1.66-.1 3.33-.11 4.99-.11s3.33.01 4.99.11c1.81.1 3.42.5 4.74 1.82s1.72 2.93 1.82 4.74c.1 1.66.11 3.33.11 4.99z' },
                { label: 'TW', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
              ].map((social) => (
                <a key={social.label} href="#" className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center hover:bg-pink-600 hover:border-pink-500 transition-all duration-500 shadow-xl group/soc">
                  <svg className="w-5 h-5 text-zinc-500 group-hover/soc:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-pink-600">
              Elite Locations
            </h4>
            <ul className="space-y-5">
              {locations.slice(0, 6).map((location) => (
                <li key={location.id}>
                  <Link href={`/${location.slug}`} className="text-zinc-500 hover:text-white transition-colors font-black text-xs uppercase tracking-widest flex items-center group">
                    <span className="w-1.5 h-1.5 bg-pink-600 rounded-full mr-4 scale-0 group-hover:scale-100 transition-transform"></span>
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-pink-600">
              Quick Explore
            </h4>
            <ul className="space-y-5">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`} className="text-zinc-500 hover:text-white transition-colors font-black text-xs uppercase tracking-widest flex items-center group">
                    <span className="w-1.5 h-1.5 bg-pink-600 rounded-full mr-4 scale-0 group-hover:scale-100 transition-transform"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-pink-600">
              Partner Care
            </h4>
            <ul className="space-y-5">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link href={`/service/${service.slug}`} className="text-zinc-500 hover:text-white transition-colors font-black text-xs uppercase tracking-widest flex items-center group">
                    <span className="w-1.5 h-1.5 bg-pink-600 rounded-full mr-4 scale-0 group-hover:scale-100 transition-transform"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-zinc-700 text-xs font-black uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} PinkLuxury Elite. All rights reserved.
          </p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            <Link href="/privacy" className="hover:text-pink-600 transition-colors">Discreet Privacy</Link>
            <Link href="/terms" className="hover:text-pink-600 transition-colors">Elite Terms</Link>
            <Link href="/disclaimer" className="hover:text-pink-600 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}