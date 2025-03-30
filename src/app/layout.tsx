// src/app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Providers from './providers';

export const metadata = {
  title: "Warhamster 4K dApp",
  description: "A decentralized application for the Warhamster 4K universe",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <Providers>
          <header className="bg-black py-4 shadow-md">
            <nav className="container mx-auto flex justify-center items-center gap-4">
              <span className="text-3xl font-bold">Warhamster 4K</span>
              <div className="flex gap-4 ml-10">
                <Link href="/profile" className="hover:text-purple-400">Profile</Link>
                <Link href="/dex" className="hover:text-purple-400">DEX</Link>
                <Link href="/marketplace" className="hover:text-purple-400">Marketplace</Link>
                <Link href="/army-builder" className="hover:text-purple-400">Army Builder</Link>
                <Link href="/battle" className="hover:text-purple-400">Battle</Link>
              </div>
            </nav>
          </header>

          <main className="container mx-auto py-8">{children}</main>

          <footer className="bg-black py-4 text-center text-sm">
            &copy; 2025 Warhamster 4K. All rights reserved.
          </footer>
        </Providers>
      </body>
    </html>
  );
}



