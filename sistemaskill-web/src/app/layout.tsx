'use client'

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import DarkModeToggle from '@/components/DarkModeToggle';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <DarkModeToggle />
        {children}
      </body>
    </html>
  );
}
