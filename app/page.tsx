"use client"

import React, { Suspense, lazy } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from "@/components/navbar";
import Introduction from "@/components/introduction";
import Loading from "@/components/loading"; // You'll need to create this component

// Lazy load components
const AboutMe = lazy(() => import("@/components/about-me"));
const Experience = lazy(() => import("@/components/experience"));
const Services = lazy(() => import("@/components/services"));
const Portfolio = lazy(() => import("@/components/portfolio"));
const Contact = lazy(() => import("@/components/contact"));
const Footer = lazy(() => import("@/components/footer"));

export default function Home() {
  return (
    <AnimatedBackground>
      <main className="relative z-10">
        <Navbar />
        <Introduction />
        <Suspense fallback={<Loading />}>
          <AboutMe />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Services />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Footer />
        </Suspense>
      </main>
    </AnimatedBackground>
  );
}