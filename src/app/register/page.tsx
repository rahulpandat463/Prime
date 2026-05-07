import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0f0a15] flex items-center justify-center pt-24 pb-20">
      <div className="w-full max-w-2xl px-4">
        <div className="bg-[#1a1325] border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-white uppercase tracking-tightest mb-4">
              Join the <span className="text-pink-600 italic">Elite</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium">Create your partner account to start posting ads</p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pink-600 transition-all"
                placeholder="Jane Doe"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Phone Number</label>
              <input 
                type="tel" 
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pink-600 transition-all"
                placeholder="+91 00000 00000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pink-600 transition-all"
                placeholder="jane@example.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pink-600 transition-all"
                placeholder="Minimum 8 characters"
              />
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="terms" className="w-5 h-5 rounded accent-pink-600" />
                <label htmlFor="terms" className="text-xs text-zinc-500 font-medium">I agree to the <Link href="/terms" className="text-white hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link></label>
              </div>
            </div>

            <button className="md:col-span-2 bg-pink-600 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-pink-500 transition-all duration-500">
              Create Account
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-zinc-500 font-medium">
            Already a partner? <Link href="/login" className="text-pink-600 hover:underline">Login instead</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
