import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import React from 'react';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio de Camilo Escar | Desarrollador Web',
  description:
    'Explora el portfolio de Camilo Escar, desarrollador web especializado en Next.js y React. Proyectos, habilidades y experiencia.',
  keywords: ['desarrollo web', 'Next.js', 'React', 'portfolio', 'Camilo Escar', 'Desarrollador React Argentina',
  'Desarrollador Next.js Argentina',
  'Backend Laravel Argentina',
  'Full Stack Developer Entre Ríos',
  'Desarrollo de sistemas empresariales',
  'CRM ERP a medida'],
  authors: [{ name: 'Camilo Escar', url: 'https://camiloescar.vercel.app/' }],
  creator: 'Camilo Escar',
  metadataBase: new URL('https://camiloescar.vercel.app/'),

  openGraph: {
    title: 'Camilo Escar | Desarrollador Full Stack en Argentina',
    description:
      'Explora el portfolio de Camilo Escar, desarrollador web especializado en Next.js y React.',
    type: 'website',
    url: '/',
    siteName: 'Portfolio de Camilo Escar',
    locale: 'es_ES',
    images: [
      {
        url: 'https://raw.githubusercontent.com/CamiloEscar/CamiloEscar/main/assets/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Camilo Escar - Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio de Camilo Escar',
    description:
      'Explora el portfolio de Camilo Escar, desarrollador web especializado en Next.js y React.',
    images: ['https://raw.githubusercontent.com/CamiloEscar/CamiloEscar/main/assets/profile.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="google-site-verification" content="n2-q9JwiOQkuC28j9l_rknBcMiQcCnwnjJReYvfTY9s" />
      </head>
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