import Link from 'next/link';

export default function PostAdPage() {
  return (
    <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
      {/* Header */}
      <section className="bg-pink-600/10 border-y border-white/5 py-12 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tightest">
            Post New <span className="text-pink-600 italic">Profile</span>
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl">
        <form className="space-y-12">
          {/* Step 1: Basic Info */}
          <div className="bg-[#1a1325] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-8 flex items-center gap-4">
              <span className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-xs">1</span>
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Display Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-pink-600 outline-none transition-all" placeholder="e.g. Ananya" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Age</label>
                <input type="number" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-pink-600 outline-none transition-all" placeholder="23" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Primary City</label>
                <select className="w-full bg-[#0f0a15] border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-pink-600 outline-none transition-all appearance-none">
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Category</label>
                <select className="w-full bg-[#0f0a15] border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-pink-600 outline-none transition-all appearance-none">
                  <option>Independent</option>
                  <option>Premium</option>
                  <option>VIP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Content */}
          <div className="bg-[#1a1325] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-8 flex items-center gap-4">
              <span className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-xs">2</span>
              Profile Details
            </h2>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Introduction</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-pink-600 outline-none transition-all" placeholder="Tell us about yourself..."></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Media Upload</label>
                <div className="border-2 border-dashed border-white/5 rounded-[2rem] p-12 text-center hover:border-pink-600/50 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-sm font-medium">Click to upload photos or drag and drop</p>
                  <p className="text-[10px] text-zinc-700 uppercase tracking-widest mt-2">Max 5MB per image (WebP/JPG)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Package Selection */}
          <div className="bg-[#1a1325] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
             <h2 className="text-xl font-black text-white uppercase tracking-widest mb-8 flex items-center gap-4">
                <span className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-xs">3</span>
                Visibility Package
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Standard', 'Premium', 'Top Listing'].map((pkg) => (
                   <div key={pkg} className="border border-white/5 bg-white/5 p-6 rounded-[2rem] cursor-pointer hover:border-pink-600 transition-all text-center">
                      <h4 className="text-white font-black uppercase text-xs tracking-widest mb-2">{pkg}</h4>
                      <p className="text-zinc-500 text-[10px]">Select this plan</p>
                   </div>
                ))}
             </div>
          </div>

          <div className="flex gap-6">
            <button className="flex-1 bg-pink-600 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-pink-500 transition-all duration-500">
              Publish Advertisement
            </button>
            <Link href="/" className="px-10 py-6 rounded-2xl bg-white/5 text-white border border-white/10 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
