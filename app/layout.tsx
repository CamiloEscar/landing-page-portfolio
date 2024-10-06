import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import React from 'react';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio - Camilo Escar',
  description: 'Landing page by me',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={urbanist.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
