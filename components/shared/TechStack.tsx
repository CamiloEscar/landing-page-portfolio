/* eslint-disable no-unused-vars */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';
import { dataExperience } from '../../data';
import { iconMap, IconMapKey } from './iconMap';
import TechModal from './TechModal';
import { useTheme } from 'next-themes';

type TechInfo = {
  key: IconMapKey;
  name: string;
  icon: React.ReactElement;
  color: string;
};

const techColors: Record<string, string> = {
  html5: '#E34F26', css3: '#1572B6', sass: '#CC6699', less: '#1D365D',
  javascript: '#F7DF1E', typescript: '#3178C6', react: '#61DAFB',
  vue: '#4FC08D', angular: '#DD0031', nodejs: '#339933', python: '#3776AB',
  java: '#007396', php: '#777BB4', webpack: '#8DD6F9',
  tailwindcss: '#06B6D4', postcss: '#DD3A0A', redux: '#764ABC',
  'next-js': '#888888', gatsby: '#663399', bootstrap: '#7952B3',
  jquery: '#0769AD', express: '#68d391', 'socket-io': '#999',
  mongodb: '#47A248', mongoose: '#880000', mysql: '#4479A1',
  laravel: '#FF2D20', wordpress: '#21759B', django: '#44B78B',
  postgresql: '#336791', nuxt: '#00DC82', spring: '#6DB33F',
  docker: '#2496ED', kubernetes: '#326CE5', jenkins: '#D24939',
  aws: '#FF9900', azure: '#0078D4', 'gitlab-ci': '#FCA121',
  graphql: '#E10098', apollo: '#311C87', elasticsearch: '#005571',
  redis: '#DC382D', oauth: '#7c7c7c', babel: '#F9DC3E',
  jwt: '#F7B731', 'react-native': '#61DAFB', flutter: '#02569B',
  kotlin: '#7F52FF', npm: '#CB3837', mariadb: '#003545',
  sequelize: '#52B0E7', atlas: '#47A248', pandas: '#150458',
  numpy: '#013243', vercel: '#888', appsheets: '#4181ed',
  openai: '#412991', vite: '#646CFF', svelte: '#FF3E00',
  axios: '#5A29E4', powerbi: '#F2C811', tableau: '#E97627',
  'styled-components': '#DB7093', accessibility: '#0056B3',
  flask: '#aaa', junit: '#25A162', socket: '#aaa',
  bun: '#FBF0DF', astro: '#888', sheets: '#47A248',
};

const isIconMapKey = (key: string): key is IconMapKey => key in iconMap;

const formatTechName = (tech: string) =>
  tech.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const getAllTechnologies = (): TechInfo[] => {
  const techMap = new Map<IconMapKey, TechInfo>();
  dataExperience.forEach(category => {
    category.experience.forEach(expCategory => {
      expCategory.items.forEach(item => {
        item.technologies.forEach(tech => {
          const key = tech.toLowerCase();
          if (isIconMapKey(key) && !techMap.has(key)) {
            techMap.set(key, {
              key,
              name: formatTechName(key),
              icon: React.cloneElement(iconMap[key], { style: { color: techColors[key] ?? '#aaa' } }),
              color: techColors[key] ?? '#aaa',
            });
          }
        });
      });
    });
  });
  return Array.from(techMap.values());
};

const techList = getAllTechnologies();

export default function TechStack() {
  const controls = useAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark' || resolvedTheme === 'sunset';

  const [selectedTech,   setSelectedTech]   = useState<string | null>(null);
  const [trackWidth,     setTrackWidth]     = useState(0);
  const [duration,       setDuration]       = useState(40);
  const [hoveredKey,     setHoveredKey]     = useState<string | null>(null);
  const [showHint,       setShowHint]       = useState(true);
  const [hintDismissed,  setHintDismissed]  = useState(false);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const onePassWidth = trackRef.current.scrollWidth / 2;
      setTrackWidth(onePassWidth);
      setDuration(Math.max(25, onePassWidth / 80));
    };
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!trackWidth) return;
    controls.start({ x: -trackWidth, transition: { duration, ease: 'linear', repeat: Infinity } });
  }, [trackWidth, duration, controls]);

  useEffect(() => {
    if (hintDismissed) return;
    const timer = setTimeout(() => setShowHint(false), 5500);
    return () => clearTimeout(timer);
  }, [hintDismissed]);

  const startScroll = () =>
    controls.start({ x: -trackWidth, transition: { duration, ease: 'linear', repeat: Infinity } });

  const handleTechClick = (key: string) => {
    setSelectedTech(key);
    setShowHint(false);
    setHintDismissed(true);
  };

  if (techList.length === 0) return null;
  const doubled = [...techList, ...techList];

  return (
    <>
      <div className="relative w-full">
        {/* Hint de interacción */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              className="flex justify-center mb-2"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <motion.div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                  color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.48)',
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >
                  <MousePointerClick size={11} />
                </motion.span>
                Hacé click en una tecnología para ver más
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carousel */}
        <div
          className="relative w-full overflow-hidden h-16"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={startScroll}
        >
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            }}
          />

          <motion.div
            ref={trackRef}
            className="flex whitespace-nowrap items-center h-full"
            animate={controls}
          >
            {doubled.map((tech, index) => (
              <motion.button
                key={`${tech.key}-${index}`}
                onClick={() => handleTechClick(tech.key)}
                onHoverStart={() => setHoveredKey(`${tech.key}-${index}`)}
                onHoverEnd={() => setHoveredKey(null)}
                className="relative inline-flex items-center mx-5 flex-shrink-0"
                whileHover={{ scale: 1.2, y: -3, zIndex: 50 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <span style={{ filter: `drop-shadow(0 0 5px ${tech.color}55)` }}>
                  {tech.icon}
                </span>
                <span className="ml-2 text-sm font-medium select-none" style={{ color: tech.color }}>
                  {tech.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      <TechModal techKey={selectedTech} onClose={() => setSelectedTech(null)} />
    </>
  );
}