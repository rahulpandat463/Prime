import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#0f0a15]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-[100]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group">
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

          <div className="hidden lg:flex items-center space-x-10">
            {['Home', 'Categories', 'Featured', 'Services', 'Locations'].map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`} 
                className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-pink-500 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            <Link 
              href="/admin/login" 
              className="bg-pink-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-pink-500 hover:shadow-[0_0_30px_rgba(219,39,119,0.4)] transition-all duration-500 transform hover:-translate-y-1"
            >
              Partner Login
            </Link>
          </div>

          <div className="lg:hidden">
            <button className="w-12 h-12 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-2xl text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}