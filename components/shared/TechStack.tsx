'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation  } from 'framer-motion';
import { dataExperience } from '../../data';
import { iconMap, IconMapKey } from './iconMap';
import TechModal from './TechModal';

type TechInfo = {
  key: IconMapKey;
  name: string;
  icon: React.ReactElement;
  color: string;
};

const techColors: Record<string, string> = {
  html5: '#E34F26',
  css3: '#1572B6',
  sass: '#CC6699',
  less: '#1D365D',
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  react: '#3178C6',
  vue: '#4FC08D',
  angular: '#DD0031',
  nodejs: '#339933',
  python: '#3776AB',
  java: '#007396',
  php: '#777BB4',
  'semantic-ui': '#35BDB2',
  accessibility: '#0056B3',
  'styled-components': '#DB7093',
  webpack: '#8DD6F9',
  tailwindcss: '#06B6D4',
  postcss: '#DD3A0A',
  redux: '#764ABC',
  'next-js': '#000000',
  gatsby: '#663399',
  bootstrap: '#7952B3',
  jquery: '#0769AD',
  express: '#68d391',
  'socket-io': '#999',
  mongodb: '#47A248',
  mongoose: '#880000',
  mysql: '#4479A1',
  laravel: '#FF2D20',
  wordpress: '#21759B',
  django: '#1e5c40',
  postgresql: '#336791',
  nuxt: '#00DC82',
  spring: '#6DB33F',
  docker: '#2496ED',
  kubernetes: '#326CE5',
  jenkins: '#D24939',
  aws: '#FF9900',
  azure: '#0078D4',
  'gitlab-ci': '#FCA121',
  graphql: '#E10098',
  apollo: '#311C87',
  elasticsearch: '#005571',
  redis: '#DC382D',
  hibernate: '#59666C',
  maven: '#C71A36',
  flask: '#aaa',
  junit: '#25A162',
  oauth: '#7c7c7c',
  babel: '#F9DC3E',
  jwt: '#7c7c7c',
  socket: '#aaa',
  'react-native': '#61DAFB',
  flutter: '#02569B',
  kotlin: '#7F52FF',
  npm: '#CB3837',
  mariadb: '#003545',
  sequelize: '#52B0E7',
  atlas: '#47A248',
  pandas: '#150458',
  numpy: '#013243',
  es6: '#239412',
  vercel: '#888',
  appsheets: '#4181ed',
  openai: '#412991',
  vite: '#646CFF',
  svelte: '#FF3E00',
  bun: '#FBF0DF',
  astro: '#888',
  sheets: '#47A248',
  axios: '#5A29E4',
  powerbi: '#F2C811',
  tableau: '#E97627',
};

const isIconMapKey = (key: string): key is IconMapKey => key in iconMap;

const formatTechName = (tech: string) =>
  tech
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const getAllTechnologies = (): TechInfo[] => {
  const techMap = new Map<IconMapKey, TechInfo>();

  dataExperience.forEach((category) => {
    category.experience.forEach((expCategory) => {
      expCategory.items.forEach((item) => {
        item.technologies.forEach((tech) => {
          const key = tech.toLowerCase();

          if (isIconMapKey(key) && !techMap.has(key)) {
            techMap.set(key, {
              key,
              name: formatTechName(key),
              icon: React.cloneElement(iconMap[key], {
                style: { color: techColors[key] ?? '#aaa' },
              }),
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

  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [duration, setDuration] = useState(40);

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

    controls.start({
      x: -trackWidth,
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  }, [trackWidth, duration, controls]);

  if (techList.length === 0) return null;

  const doubled = [...techList, ...techList];

  return (
    <>
      <div
        className="relative w-full overflow-hidden h-20"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() =>
          controls.start({
            x: -trackWidth,
            transition: {
              duration,
              ease: 'linear',
              repeat: Infinity,
            },
          })
        }
      >
        {/* Fade lateral */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        />

        <motion.div
          ref={trackRef}
          className="flex whitespace-nowrap items-center py-4"
          animate={controls}
        >
          {doubled.map((tech, index) => (
            <motion.button
              key={`${tech.key}-${index}`}
              onClick={() => setSelectedTech(tech.key)}
              className="relative inline-flex items-center mx-6 flex-shrink-0"
              whileHover={{
                scale: 1.25,
                y: -4,
                zIndex: 50,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{ position: 'relative' }}
            >
              <span
                style={{
                  filter: `drop-shadow(0 0 6px ${tech.color}66)`,
                }}
              >
                {tech.icon}
              </span>

              <span
                className="ml-2 text-sm font-medium select-none"
                style={{ color: tech.color }}
              >
                {tech.name}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <TechModal techKey={selectedTech} onClose={() => setSelectedTech(null)} />
    </>
  );
}