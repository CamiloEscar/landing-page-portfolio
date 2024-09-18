"use client"

import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from "@/components/navbar";
import Introduction from "@/components/introduction";
import AboutMe from "@/components/about-me";
import Experience from "@/components/experience";
import Services from "@/components/services";
import Portfolio from "@/components/portfolio";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <AnimatedBackground>
      <main className="relative z-10">
        <Navbar />
        <Introduction />
        <AboutMe />
        <Experience />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </main>
    </AnimatedBackground>
  );
}