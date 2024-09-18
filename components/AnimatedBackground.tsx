"use client"

import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const Cloud = dynamic(() => import('lucide-react').then((mod) => mod.Cloud), { ssr: false });
const Sun = dynamic(() => import('lucide-react').then((mod) => mod.Sun), { ssr: false });
const Moon = dynamic(() => import('lucide-react').then((mod) => mod.Moon), { ssr: false });
const Trees = dynamic(() => import('lucide-react').then((mod) => mod.Trees), { ssr: false });

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
    clouds: AnimatedElement[];
    trees: AnimatedElement[];
  }>({ stars: [], clouds: [], trees: [] });
  
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
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 40,
      size: Math.random() * 2 + 1,
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
      y: Math.random() * 20,
      size: Math.random() * 20 + 30,
    }));

    setElements({ stars: newStars, clouds: newClouds, trees: newTrees });
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
        className="fixed inset-0 w-full h-full bg-gradient-to-b from-blue-400 via-purple-500 to-indigo-600 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900 transition-colors duration-500"
        style={{ opacity: skyOpacity }}
      />
      
      {isDark && (
        <motion.div 
          className="fixed inset-0 w-full h-2/5 overflow-hidden"
          style={{ opacity: skyOpacity }}
        >
          {elements.stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
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
            />
          ))}
        </motion.div>
      )}

      {elements.clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="fixed text-white dark:text-gray-300"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            fontSize: `${cloud.size}px`,
            opacity: skyOpacity,
          }}
          animate={{
            x: [`${cloud.x}%`, `${(cloud.x + 10) % 100}%`],
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
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
          right: '5%',
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