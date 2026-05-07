'use client';
import { useState } from 'react';

interface FaqItemProps {
  id: number;
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-8 rounded-[2rem] transition-all duration-500 flex items-center justify-between shadow-2xl border ${
          isOpen ? 'bg-[#1a1325] border-pink-600' : 'bg-[#1a1325]/50 border-pink-600/20 hover:border-pink-600/50'
        }`}
      >
        <span className={`font-black text-xl pr-8 transition-colors duration-300 ${isOpen ? 'text-pink-500' : 'text-white'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
          isOpen ? 'bg-pink-600 text-white rotate-180' : 'bg-zinc-800 text-zinc-400'
        }`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-10 bg-[#1a1325] rounded-[2.5rem] border border-pink-600/10 text-zinc-400 leading-relaxed text-lg font-medium shadow-inner">
          {answer}
        </div>
      </div>
    </div>
  );
}

interface FaqsSectionProps {
  faqs: Array<FaqItemProps>;
}

export default function FaqsSection({ faqs }: FaqsSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-24 bg-[#0f0a15] relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-600/10 to-transparent opacity-20"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-zinc-400 font-medium leading-relaxed">
            Everything you need to know before booking your companion.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq) => (
            <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}