'use client';

import React, { Suspense, lazy } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/shared/navbar';
import Introduction from '@/components/introduction';
import Loading from '@/components/shared/loading';
import RecentPosts from '@/components/RecentPost';
import { dataBlog } from '@/app/blog/data';
import AboutMe2 from '@/components/sobreMi';
import ChatBot from '@/components/Chatbot';

// Lazy load components
const AboutMe = lazy(() => import('@/components/about-me'));
const Experience = lazy(() => import('@/components/experience'));
const Portfolio = lazy(() => import('@/components/portfolio'));
const Contact = lazy(() => import('@/components/contact'));
const Footer = lazy(() => import('@/components/footer'));

export default function Home() {
  return (
    <AnimatedBackground>
      <main className="relative z-10">
        <Navbar />
        <Introduction />
        
        <Suspense fallback={<Loading />}>
          <AboutMe2 />
          <Portfolio />
          <Experience />
          <AboutMe />
          <RecentPosts posts={dataBlog} />
          <Contact />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <Footer />
        </Suspense>

        <ChatBot />
      </main>
    </AnimatedBackground>
  );
}
