"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Profiles', href: '/profiles' },
    { name: 'Membership', href: '/membership' },
    { name: 'Locations', href: '/#locations' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-[#0f0a15]/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(219,39,119,0.5)] group-hover:scale-110 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-xl tracking-tight leading-none group-hover:text-pink-500 transition-colors">Pink<span className="text-pink-600 italic">Luxury</span></span>
              <span className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.3em] mt-1">Elite Directory</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-zinc-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-pink-500 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              href="/login"
              className="text-white font-black text-[10px] uppercase tracking-widest hover:text-pink-600 transition-colors"
            >
              Partner Login
            </Link>
            <Link
              href="/post-ad"
              className="bg-pink-600 text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:bg-pink-500 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Post Ad
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1a1325] border-b border-white/5 py-8 px-4 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white font-black text-xs uppercase tracking-widest text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-[1px] bg-white/5 my-2"></div>
            <Link 
              href="/login"
              className="text-white font-black text-xs uppercase tracking-widest text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partner Login
            </Link>
            <Link
              href="/post-ad"
              className="bg-pink-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Post Ad
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}