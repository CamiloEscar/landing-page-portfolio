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
import HeroWindSection from '@/components/HeroWindSection';
import WindSection from '@/components/WindSection';

const AboutMe    = lazy(() => import('@/components/about-me'));
const Experience = lazy(() => import('@/components/experience'));
const Portfolio  = lazy(() => import('@/components/portfolio'));
const Contact    = lazy(() => import('@/components/contact'));
const Footer     = lazy(() => import('@/components/footer'));

export default function Home() {
  return (
    <AnimatedBackground>
      <main className="relative z-10">

        <Navbar />

        {/*
          HeroWindSection:
          - 165vh de altura total (100vh sección + 65vh animación)
          - margin-bottom: -30vh → la siguiente sección sube mientras la intro vuela
          - Intro vuela arriba-derecha con rotación orgánica + blur
          - Desaparece completamente antes de que la siguiente ocupe pantalla
        */}
        <HeroWindSection intensity={0.75}>
          <Introduction />
        </HeroWindSection>

        <Suspense fallback={<Loading />}>
          <WindSection exitDirection="left" intensity={0.55}>
            <AboutMe2 />
          </WindSection>

          <WindSection exitDirection="right" intensity={0.6}>
            <Portfolio />
          </WindSection>

          <WindSection exitDirection="left" intensity={0.6}>
            <Experience />
          </WindSection>

          <WindSection exitDirection="right" intensity={0.55}>
            <AboutMe />
          </WindSection>

          <WindSection exitDirection="left" intensity={0.5}>
            <RecentPosts posts={dataBlog} />
          </WindSection>

          <WindSection exitDirection="right" intensity={0.6}>
            <Contact />
          </WindSection>
        </Suspense>

        <Suspense fallback={<Loading />}>
          <WindSection exitDirection="left" intensity={0.3}>
            <Footer />
          </WindSection>
        </Suspense>

        <ChatBot />

      </main>
    </AnimatedBackground>
  );
}