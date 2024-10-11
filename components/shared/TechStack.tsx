import React from 'react';
import { motion } from 'framer-motion';
import { dataExperience } from '../../data';
import { iconMap, IconMapKey } from './iconMap';

type TechInfo = {
  key: IconMapKey;
  name: string;
  icon: React.ReactElement;
  color: string;
};

// Color mapping for different technologies
const techColors: Record<IconMapKey, string> = {
  html5: '#E34F26',
  css3: '#1572B6',
  sass: '#CC6699',
  less: '#1D365D',
  javascript: '#efd81d',
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
  express: '#000000',
  'socket-io': '#010101',
  mongodb: '#47A248',
  mongoose: '#880000',
  mysql: '#4479A1',
  laravel: '#FF2D20',
  wordpress: '#21759B',
  django: '#092E20',
  postgresql: '#336791',
  nuxt: '#00DC82',
  spring: '#6DB33F',
  docker: '#2496ED',
  kubernetes: '#326CE5',
  jenkins: '#D24939',
  aws: '#232F3E',
  azure: '#0078D4',
  'gitlab-ci': '#FCA121',
  graphql: '#E10098',
  apollo: '#311C87',
  elasticsearch: '#005571',
  redis: '#DC382D',
  hibernate: '#59666C',
  maven: '#C71A36',
  flask: '#000000',
  junit: '#25A162',
  oauth: '#000000',
  babel: '#F9DC3E',
  jwt: '#000000',
  socket: '#010101',
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
  vercel: '#000000',
  appsheets: '#4181ed',
  openai: '#412991',
  vite: '#646CFF',
  svelte: '#FF3E00',
  bun: '#FBF0DF',
  astro: '#000000',
  sheets: '#47A248'
};

const getAllTechnologies = (): TechInfo[] => {
  const techMap = new Map<IconMapKey, TechInfo>();

  dataExperience.forEach((category) => {
    category.experience.forEach((expCategory) => {
      expCategory.items.forEach((item) => {
        item.technologies.forEach((tech) => {
          if (isIconMapKey(tech) && !techMap.has(tech)) {
            techMap.set(tech, {
              key: tech,
              name: formatTechName(tech),
              icon: React.cloneElement(iconMap[tech], {
                style: { color: techColors[tech] },
              }),
              color: techColors[tech],
            });
          }
        });
      });
    });
  });

  return Array.from(techMap.values());
};

const isIconMapKey = (key: string): key is IconMapKey => {
  return key in iconMap;
};

const formatTechName = (tech: string): string => {
  return tech
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const techList = getAllTechnologies();

export default function TechStack() {
  if (techList.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden h-16">
      <div
        className="absolute inset-0 z-10"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <motion.div
          className="flex whitespace-nowrap py-4"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {[...techList, ...techList].map((tech, index) => (
            <div
              key={`${tech.key}-${index}`}
              className="inline-flex flex-col items-center justify-center mx-6"
            >
              <div className="flex items-center">
                {tech.icon}
                <span
                  className="ml-2 text-sm font-medium transition-colors duration-300"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
