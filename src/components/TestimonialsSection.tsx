import React from 'react';

interface TestimonialsSectionProps {
  testimonials: Array<{
    id: number;
    name: string;
    location?: string;
    content: string;
    rating?: number;
  }>;
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-[#0f0a15] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-900/10 rounded-full blur-[150px] -mr-96 -mt-96 opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Testimonials</h2>
          <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
            What Clients Say About Our Escort Service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-[#1a1325] rounded-[2.5rem] p-10 border border-pink-600/20 hover:border-pink-600 transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(219,39,119,0.2)] flex flex-col h-full group"
            >
              <div className="flex text-amber-500 mb-8 space-x-1">
                {'★'.repeat(testimonial.rating || 5).split('').map((star, i) => (
                  <span key={i} className="text-2xl drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">{star}</span>
                ))}
              </div>
              
              <p className="text-zinc-300 text-lg leading-relaxed italic mb-10 relative z-10 font-medium">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center text-pink-500 font-black text-2xl shadow-xl group-hover:bg-pink-600 group-hover:text-white transition-all duration-500">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-black text-white group-hover:text-pink-500 transition-colors">
                    {testimonial.name}
                  </h4>
                  {testimonial.location && (
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                      <span className="text-pink-500">📍</span>
                      {testimonial.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}