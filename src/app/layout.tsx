import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pink Luxury | Premium Escort Directory',
  description: 'The most elite directory for verified companions in India. 100% verified with real photos and discreet service.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-[#0f0a15] min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}