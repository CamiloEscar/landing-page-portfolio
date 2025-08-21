/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import { dataPortfolio, PortfolioItem } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Code,
  Image as ImageIcon,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { iconMap, IconMapKey } from './shared/iconMap';
import GradientName from './shared/GradientName';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';


const ITEMS_TO_SHOW  = 4;

const techColors: Record<string, string> = {
  html5: '#E34F26',
  css3: '#1572B6',
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  react: '#61DAFB',
  'next-js': '#000000',
  vue: '#4FC08D',
  angular: '#DD0031',
  nodejs: '#339933',
  express: '#000000',
  mongodb: '#47A248',
  mysql: '#4479A1',
  python: '#3776AB',
  django: '#092E20',
  php: '#777BB4',
  laravel: '#FF2D20',
  java: '#007396',
  spring: '#6DB33F',
  docker: '#2496ED',
  kubernetes: '#326CE5',
  aws: '#232F3E',
  vercel: '#000000',
  tailwindcss: '#06B6D4',
  appsheets: '#4181ed',
  openai: '#412991',
  vite: '#646CFF',
  svelte: '#FF3E00',
  bun: '#FBF0DF',
  astro: '#000000',
  sheets: '#47A248',
};

const getTechIcon = (tech: string) => {
  const key = tech.toLowerCase().replace(/\s+/g, '-') as IconMapKey;
  const IconComponent = iconMap[key];

  if (IconComponent) {
    const color = techColors[key] || '#718096';
    return React.cloneElement(IconComponent, { style: { color } });
  }

  return <Code size={12} />;
};

const ProjectRow: React.FC<{ project: PortfolioItem; priority?: boolean }> = ({ project, priority = false }) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 bg-card hover:bg-accent/50 rounded-lg transition-colors duration-300"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <div className="w-full md:w-1/4 aspect-video relative rounded-lg overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
          priority={priority}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <a href='/portfolio/'>
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {getTechIcon(tech)}
                {tech}
              </Badge>
            ))}
          </div>
        </a>
        <div className="flex gap-4">
          {project.urlGithub && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.urlGithub} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
          )}
          {project.urlDemo && (
            <Button size="sm" asChild>
              <Link href={project.urlDemo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const featuredProjects = useMemo(() => dataPortfolio.slice(0, ITEMS_TO_SHOW), []);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>(['all']);
    featuredProjects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet);
  }, [featuredProjects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return featuredProjects;
    return featuredProjects.filter(project => project.technologies.includes(activeTab));
  }, [featuredProjects, activeTab]);

  if (!mounted) return null;

  return (
    <motion.section
      className="py-20"
      id="portfolio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <Code className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">
            <GradientName>Portfolio</GradientName>
          </h2>
          <p className="text-xl text-muted-foreground">
            Descubre algunos de mis proyectos destacados
          </p>
        </motion.div>

        <div className="mb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex justify-center flex-wrap">
              {allTechnologies.map((tech) => (
                <TabsTrigger
                  key={tech}
                  value={tech}
                  className="capitalize px-4 py-2 rounded-full transition-all duration-300"
                >
                  {tech === 'all' ? 'Todos' : tech}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectRow project={project} priority={index < 2} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.p
            className="text-center text-muted-foreground mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            No se encontraron proyectos para esta categoría o búsqueda.
          </motion.p>
        )}

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button asChild size="lg" className="px-8 py-6 text-lg">
            <Link href="/portfolio">
              Ver todos los proyectos
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Portfolio;