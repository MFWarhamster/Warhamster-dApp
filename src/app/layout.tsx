import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: "Warhamster 4K dApp",
  description: "A decentralized application for the Warhamster 4K universe",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <header className="bg-black py-4 shadow-md">
          <nav className="container mx-auto flex justify-center items-center gap-4">
            <span className="text-3xl font-bold">Warhamster 4K</span>
            <div className="flex gap-4 ml-10">
              <a href="/" className="hover:text-purple-400">Profile</a>
              <a href="/" className="hover:text-purple-400">DEX</a>
              <a href="/" className="hover:text-purple-400">Marketplace</a>
              <a href="/" className="hover:text-purple-400">Army Builder</a>
              <a href="/" className="hover:text-purple-400">Battle</a>
            </div>
          </nav>
        </header>
        <main className="container mx-auto py-8">{children}</main>
        <footer className="bg-black py-4 text-center text-sm">
          &copy; 2025 Warhamster 4K. All rights reserved.
        </footer>
      </body>
    </html>
  );
}


