'use client';

import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const Cloud = dynamic(() => import('lucide-react').then((mod) => mod.Cloud), { ssr: false });
const Sun = dynamic(() => import('lucide-react').then((mod) => mod.Sun), { ssr: false });
const Moon = dynamic(() => import('lucide-react').then((mod) => mod.Moon), { ssr: false });
const Star = dynamic(() => import('lucide-react').then((mod) => mod.Star), { ssr: false });
const Rocket = dynamic(() => import('lucide-react').then((mod) => mod.Rocket), { ssr: false });

interface AnimatedElement {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface AnimatedBackgroundProps {
  children: ReactNode;
  forcedTheme?: 'light' | 'dark' | 'sunrise' | 'sunset';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children, forcedTheme }) => {
  const [mounted, setMounted] = useState(false);
  const [elements, setElements] = useState<{
    stars: AnimatedElement[];
    starDots: AnimatedElement[];
    clouds: AnimatedElement[];
    rockets: AnimatedElement[];
    shootingStar: AnimatedElement | null;
  }>({ stars: [], starDots: [], clouds: [], rockets: [], shootingStar: null });

  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  const currentTheme = forcedTheme || theme || 'light';

  const skyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sunMoonY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['20%', '80%']),
    { stiffness: 100, damping: 30, mass: 1 }
  );

  const generateElements = useCallback(() => {
    const newStars = Array.from({ length: 2 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 2 + 1,
    }));

    const newStarDots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
    }));

    const newClouds = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 30 + 10,
      size: Math.random() * 20 + 30,
    }));

    const newRockets = Array.from({ length: 1 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 15 + 15,
    }));

    const newShootingStar = {
      id: 0,
      x: Math.random() * 100,
      y: Math.random() * 30,
      size: Math.random() * 2 + 2,
    };

    setElements({
      stars: newStars,
      starDots: newStarDots,
      clouds: newClouds,
      rockets: newRockets,
      shootingStar: newShootingStar,
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    generateElements();
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setElements((prev) => ({
          ...prev,
          stars: prev.stars.slice(0, 3),
          starDots: prev.starDots.slice(0, 25),
          clouds: prev.clouds.slice(0, 2),
        }));
      } else {
        generateElements();
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [generateElements]);

  useEffect(() => {
    generateElements();
  }, [currentTheme, generateElements]);

  if (!mounted) return null;

  const getBackgroundGradient = () => {
    switch (currentTheme) {
      case 'light':
        return 'bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400';
      case 'dark':
        return 'bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950';
      case 'sunrise':
        return 'bg-gradient-to-b from-rose-300 via-amber-200 to-blue-200';
      case 'sunset':
        return 'bg-gradient-to-b from-rose-400 via-amber-300 to-indigo-800';
      default:
        return 'bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400';
    }
  };

  const isDarkMode = currentTheme === 'dark' || currentTheme === 'sunset';
  const isSunrise = currentTheme === 'sunrise';
  const isSunset = currentTheme === 'sunset';
  const showClouds = !isDarkMode || isSunset;

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            className={`absolute inset-0 w-full h-full transition-colors duration-500 ${getBackgroundGradient()}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ opacity: skyOpacity }}
        >
          {isDarkMode && (
            <>
              {elements.starDots.map((starDot) => (
                <motion.div
                  key={starDot.id}
                  className="absolute bg-white rounded-full"
                  style={{
                    left: `${starDot.x}%`,
                    top: `${starDot.y}%`,
                    width: `${starDot.size}px`,
                    height: `${starDot.size}px`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                />
              ))}
              {elements.stars.map((star) => (
                <motion.div
                  key={star.id}
                  className="absolute text-yellow-200"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    fontSize: `${star.size * 3}px`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <Star />
                </motion.div>
              ))}
              {elements.rockets.map((rocket) => (
                <motion.div
                  key={rocket.id}
                  className="absolute text-red-400"
                  style={{
                    left: `${rocket.x}%`,
                    top: `${rocket.y}%`,
                    fontSize: `${rocket.size}px`,
                  }}
                  animate={{
                    x: [`${rocket.x}%`, `${(rocket.x + 50) % 100}%`],
                    y: [`${rocket.y}%`, `${(rocket.y - 30 + 100) % 100}%`],
                  }}
                  transition={{
                    duration: 20 + Math.random() * 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <Rocket />
                </motion.div>
              ))}
              {elements.shootingStar && (
                <motion.div
                  className="absolute bg-white rounded-full"
                  style={{
                    left: `${elements.shootingStar.x}%`,
                    top: `${elements.shootingStar.y}%`,
                    width: `${elements.shootingStar.size}px`,
                    height: `${elements.shootingStar.size}px`,
                  }}
                  animate={{
                    x: [`${elements.shootingStar.x}%`, `${(elements.shootingStar.x + 30) % 100}%`],
                    y: [`${elements.shootingStar.y}%`, `${(elements.shootingStar.y + 20) % 100}%`],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </>
          )}
          {showClouds && (
            elements.clouds.map((cloud) => (
              <motion.div
                key={cloud.id}
                className={`fixed ${
                  isSunset ? 'text-orange-200' :
                  isSunrise ? 'text-yellow-100' :
                  'text-white'
                }`}
                style={{
                  left: `${cloud.x}%`,
                  top: `${cloud.y}%`,
                  fontSize: `${cloud.size}px`,
                }}
                animate={{
                  x: [`${cloud.x}%`, `${(cloud.x + 20) % 100}%`],
                }}
                transition={{
                  duration: 30 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'linear',
                }}
              >
                <Cloud />
              </motion.div>
            ))
          )}
        </motion.div>

        <motion.div
          className={`absolute transition-colors duration-500 pointer-events-none ${
            isDarkMode
              ? 'text-gray-200'
              : isSunrise
              ? 'text-yellow-400'
              : 'text-orange-400'
          }`}
          style={{
            right: '10%',
            top: sunMoonY,
            fontSize: '4rem',
          }}
        >
          {isDarkMode ? <Moon /> : <Sun />}
        </motion.div>
      </div>

      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
};

export default AnimatedBackground;