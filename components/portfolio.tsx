'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { dataPortfolio, PortfolioItem } from '@/data';
import Title from './shared/title';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Code,
  ChevronDown,
  ChevronUp,
  Search,
  Database,
  Monitor,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { FaReact, FaNodeJs, FaPaperPlane } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiVercel,
  SiJavascript,
  SiTypescript,
  SiCss3,
  SiHtml5,
  SiOpenai,
  SiAstro,
  SiSvelte,
  SiVite,
  SiBun,
  SiAxios,
  SiNativescript,
  SiFlutter,
  SiKotlin,
} from 'react-icons/si';
import GradientName from './GradientName';

const ITEMS_PER_PAGE = 6;

const iconMap: { [key: string]: JSX.Element } = {
  React: <FaReact />,
  'Next.js': <SiNextdotjs />,
  'Tailwind CSS': <SiTailwindcss />,
  'Node.js': <FaNodeJs />,
  MongoDB: <SiMongodb />,
  Express: <SiExpress />,
  Vercel: <SiVercel />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  CSS: <SiCss3 />,
  HTML: <SiHtml5 />,
  'React Native': <SiNextdotjs />,
  AppSheets: <FaPaperPlane />,
  OpenAI: <SiOpenai />,
  Astro: <SiAstro />,
  Svelte: <SiSvelte />,
  Vite: <SiVite />,
  bun: <SiBun />,
  Axios: <SiAxios />,
  'react-native': <SiNativescript />,
  flutter: <SiFlutter />,
  kotlin: <SiKotlin />,
};

const getTechIcon = (tech: string) => {
  return iconMap[tech] || <Code size={12} />;
};

const ProjectCard: React.FC<{ project: PortfolioItem }> = ({ project }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
  >
    <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
      <CardHeader className="p-0">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={300}
          className="rounded-t-xl object-cover w-full h-48"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2 text-gray-800 dark:text-white">
          {project.title}
        </CardTitle>
        <p className="text-black dark:text-gray-400 text-sm mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string, techIndex: number) => (
            <motion.span
              key={techIndex}
              className="bg-gray-200/80 dark:bg-gray-700/80 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {getTechIcon(tech)}
              {tech}
            </motion.span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" size="sm" asChild>
          {project.urlGithub && (
            <Link
              href={project.urlGithub}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Link>
          )}
        </Button>
        <Button size="sm" asChild>
          {project.urlDemo && (
            <Link
              href={project.urlDemo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const Portfolio: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProjects = useMemo(() => {
    return dataPortfolio.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [searchTerm]);

  const toggleProjects = () => {
    setVisibleProjects((prev) =>
      prev === ITEMS_PER_PAGE ? filteredProjects.length : ITEMS_PER_PAGE
    );
  };

  if (!mounted) return null;

  return (
    <motion.section
      className="py-12 md:py-20 transition-colors duration-300"
      id="portfolio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <Code className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            <GradientName>Portfolio</GradientName>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Chequea mis proyectos
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Web</span>
            </div>
            {/* <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">Móvil</span>
        </div> */}
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Back-end</span>
            </div>
            {/* <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium"></span>
        </div> */}
          </div>
        </motion.div>

        <AnimatePresence>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {filteredProjects
              .slice(0, visibleProjects)
              .map((project: PortfolioItem) => (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length > ITEMS_PER_PAGE && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={toggleProjects}
              variant="outline"
              size="lg"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-105"
            >
              {visibleProjects === ITEMS_PER_PAGE ? (
                <>
                  Ver mas
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Ver menos
                  <ChevronUp className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Portfolio;
