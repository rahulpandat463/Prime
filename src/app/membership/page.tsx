import Link from 'next/link';

const packages = [
  {
    name: 'Free',
    price: '0',
    duration: 'Forever',
    features: ['Standard Profile Listing', 'Basic Search Visibility', '2 Photos Upload', 'Manual Approval'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Premium',
    price: '2999',
    duration: 'Monthly',
    features: ['Priority Search Ranking', 'Verified Badge', '10 Photos + Video', 'WhatsApp Direct Button', 'Direct Call Button', 'Social Media Links'],
    cta: 'Go Premium',
    popular: true,
  },
  {
    name: 'Top Listing',
    price: '5999',
    duration: 'Monthly',
    features: ['Fixed Top 3 Position', 'Homepage Featured Slot', 'Gold "Elite" Badge', '24/7 Priority Support', 'Unlimited Edits', 'Highest Visibility'],
    cta: 'Be the Best',
    popular: false,
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[#0f0a15] pb-20 pt-24">
      {/* Header */}
      <section className="bg-pink-600/10 border-y border-white/5 py-20 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tightest uppercase">
            Membership <span className="text-pink-600 italic">Packages</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-zinc-400 font-medium leading-relaxed">
            Elevate your visibility and reach premium clients. Choose a plan that suits your elite profile.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.name}
              className={`relative bg-[#1a1325] border ${pkg.popular ? 'border-pink-600 shadow-[0_0_50px_rgba(219,39,119,0.2)]' : 'border-white/5'} rounded-[3rem] p-10 flex flex-col transition-all duration-500 hover:-translate-y-4`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">{pkg.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">₹{pkg.price}</span>
                  <span className="text-zinc-500 font-bold text-sm uppercase">/ {pkg.duration}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-400 font-medium text-sm">
                    <svg className="w-5 h-5 text-pink-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href="/register" 
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all duration-500 ${
                  pkg.popular 
                    ? 'bg-pink-600 text-white hover:bg-pink-500 shadow-2xl' 
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Payment Methods Info */}
        <div className="mt-24 pt-20 border-t border-white/5 text-center">
           <h2 className="text-2xl font-black text-white mb-10 uppercase tracking-widest">Instant Activation Methods</h2>
           <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex flex-col items-center gap-4">
                 <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                 </div>
                 <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">UPI / QR</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                 <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                 </div>
                 <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">WhatsApp Pay</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                 <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🏦</span>
                 </div>
                 <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Bank Transfer</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
