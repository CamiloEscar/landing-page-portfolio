"use client"

import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const Cloud = dynamic(() => import('lucide-react').then((mod) => mod.Cloud), { ssr: false });
const Sun = dynamic(() => import('lucide-react').then((mod) => mod.Sun), { ssr: false });
const Moon = dynamic(() => import('lucide-react').then((mod) => mod.Moon), { ssr: false });
const Trees = dynamic(() => import('lucide-react').then((mod) => mod.Trees), { ssr: false });
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
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [elements, setElements] = useState<{
    stars: AnimatedElement[];
    starDots: AnimatedElement[];
    clouds: AnimatedElement[];
    trees: AnimatedElement[];
    rockets: AnimatedElement[];
  }>({ stars: [], starDots: [], clouds: [], trees: [], rockets: [] });
  
  const { scrollYProgress } = useScroll();
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const skyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const grassOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const sunMoonY = useSpring(useTransform(scrollYProgress, [0, 1], ['20%', '80%']), {
    stiffness: 100,
    damping: 30,
    mass: 1
  });

  const generateElements = useCallback(() => {
    const newStars = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 2 + 1,
    }));

    const newStarDots = Array.from({ length: 100 }, (_, i) => ({
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

    const newTrees = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 20 + 20,
      size: Math.random() * 20 + 30,
    }));

    const newRockets = Array.from({ length: 1 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 15 + 15,
    }));

    setElements({ stars: newStars, starDots: newStarDots, clouds: newClouds, trees: newTrees, rockets: newRockets });
  }, []);

  useEffect(() => {
    setMounted(true);
    generateElements();
    window.addEventListener('resize', generateElements);
    return () => window.removeEventListener('resize', generateElements);
  }, [generateElements]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        className="fixed inset-0 w-full h-full bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 transition-colors duration-500"
        style={{ opacity: skyOpacity }}
      />
      
      {isDark && (
        <motion.div 
          className="fixed inset-0 w-full h-full overflow-hidden"
          style={{ opacity: skyOpacity }}
        >
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
                repeatType: "reverse",
                ease: "easeInOut",
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
                repeatType: "reverse",
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
                repeatType: "reverse",
              }}
            >
              <Rocket />
            </motion.div>
          ))}
        </motion.div>
      )}

      {!isDark && elements.clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="fixed text-white"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            fontSize: `${cloud.size}px`,
            opacity: skyOpacity,
          }}
          animate={{
            x: [`${cloud.x}%`, `${(cloud.x + 20) % 100}%`],
            y: [`${cloud.y}%`, `${(cloud.y + 5) % 40}%`],
          }}
          transition={{
            duration: 15 + Math.random() * 10, // Reduced duration for faster movement
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          }}
        >
          <Cloud />
        </motion.div>
      ))}

      <motion.div
        className="fixed inset-x-0 bottom-0 h-full bg-gradient-to-t from-green-600 to-transparent dark:from-green-900 transition-colors duration-500"
        style={{ opacity: grassOpacity }}
      >
        {elements.trees.map((tree) => (
          <motion.div
            key={tree.id}
            className="absolute bottom-0 text-green-700 dark:text-green-800"
            style={{
              left: `${tree.x}%`,
              fontSize: `${tree.size}px`,
            }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Trees />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="fixed text-yellow-400 dark:text-yellow-200 transition-colors duration-500"
        style={{
          right: '10%',
          top: sunMoonY,
          fontSize: '4rem',
        }}
      >
        {isDark ? <Moon /> : <Sun />}
      </motion.div>

      {children}
    </div>
  );
};

export default AnimatedBackground;