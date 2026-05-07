import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0f0a15] flex items-center justify-center pt-24 pb-20">
      <div className="w-full max-w-md px-4">
        <div className="bg-[#1a1325] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white uppercase tracking-tightest mb-2">
              Partner <span className="text-pink-600 italic">Login</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium">Access your elite dashboard</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-pink-600 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 px-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-pink-600 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button className="w-full bg-pink-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-pink-500 transition-all duration-500">
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-6 block">Or Continue With</span>
            
            <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Login with Google
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-zinc-500 font-medium">
            Don't have an account? <Link href="/register" className="text-pink-600 hover:underline">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
