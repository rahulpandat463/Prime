import React from 'react';

const steps = [
  {
    id: 1,
    title: 'Browse Profiles',
    description: 'Explore our wide range of verified profiles with genuine photos and reviews across India.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Select & Review',
    description: 'Check out detailed descriptions, service lists, and ratings to find the perfect companion.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Direct Contact',
    description: 'Connect instantly via WhatsApp or Call using the secure buttons on each profile.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Enjoy Your Meeting',
    description: 'Have a memorable and professional experience with your chosen companion.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#0f0a15] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-600/20 to-transparent opacity-20"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">How It Works</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Follow these simple steps to find and meet your ideal companion securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-zinc-800 -z-0">
                  <div className="h-full bg-pink-600 w-0 group-hover:w-full transition-all duration-[1s] ease-out"></div>
                </div>
              )}
              
              <div className="bg-[#1a1325] rounded-[2.5rem] p-10 border border-pink-600/20 hover:border-pink-600 hover:shadow-[0_0_30px_rgba(219,39,119,0.15)] transition-all duration-500 transform hover:-translate-y-2 relative z-10 text-center h-full group">
                <div className="w-20 h-20 bg-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center text-zinc-400 mb-8 mx-auto group-hover:bg-pink-600 group-hover:text-white transition-all duration-500 shadow-xl group-hover:rotate-6">
                  {step.icon}
                </div>
                
                <div className="absolute top-6 right-8 text-7xl font-black text-white/5 group-hover:text-pink-600/10 transition-colors pointer-events-none italic">
                  0{step.id}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-4 relative z-10 group-hover:text-pink-500 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-zinc-400 text-base leading-relaxed relative z-10 group-hover:text-zinc-300 transition-colors font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
