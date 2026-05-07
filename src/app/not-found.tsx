import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0a15] flex items-center justify-center pt-24 pb-20">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-8xl md:text-[12rem] font-black text-white/5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          404
        </h1>
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tightest">
            Profile <span className="text-pink-600 italic">Not Found</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto font-medium">
            The profile or page you are looking for has been moved or is no longer active. 
            Browse our major city directories below to find another verified companion.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
             <Link href="/delhi/" className="bg-[#1a1325] border border-white/5 p-8 rounded-3xl hover:border-pink-600 transition-all group">
                <h3 className="text-white font-black uppercase tracking-widest group-hover:text-pink-500">Delhi</h3>
             </Link>
             <Link href="/mumbai/" className="bg-[#1a1325] border border-white/5 p-8 rounded-3xl hover:border-pink-600 transition-all group">
                <h3 className="text-white font-black uppercase tracking-widest group-hover:text-pink-500">Mumbai</h3>
             </Link>
             <Link href="/bangalore/" className="bg-[#1a1325] border border-white/5 p-8 rounded-3xl hover:border-pink-600 transition-all group">
                <h3 className="text-white font-black uppercase tracking-widest group-hover:text-pink-500">Bangalore</h3>
             </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="bg-pink-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-pink-500 transition-all">
              Go Home
            </Link>
            <Link href="/profiles/" className="bg-white/5 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
              View All Profiles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
