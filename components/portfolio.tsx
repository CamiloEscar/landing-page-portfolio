import React, { useState, useEffect, useMemo } from 'react';
import { dataPortfolio, PortfolioItem } from '@/data';
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
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { iconMap, IconMapKey } from './iconMap';
import GradientName from './GradientName';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ITEMS_PER_PAGE = 6;

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
  sheets: '#47A248'
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
              className="bg-gray-200/80 dark:bg-gray-700/80 text-xs px-2 py-1 rounded-full flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {getTechIcon(tech)}
              <span className="ml-1">{tech}</span>
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

const ProjectTable = ({ projects }: { projects: PortfolioItem[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Project</TableHead>
        <TableHead>Technologies</TableHead>
        <TableHead>Links</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {projects.map((project) => (
        <TableRow key={project.id}>
          <TableCell>
            <div className="font-medium">{project.title}</div>
            <div className="text-sm text-muted-foreground">{project.description}</div>
          </TableCell>
          <TableCell>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech, index) => (
                <span key={index} className="text-xs bg-muted px-1 py-0.5 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              {project.urlGithub && (
                <Link href={project.urlGithub} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {project.urlDemo && (
                <Link href={project.urlDemo} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const Portfolio: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(ITEMS_PER_PAGE);
  const [searchTerm] = useState('');
  useTheme();
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
      <div className="container mx-auto px-4 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/20 shadow-xl rounded-md">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4 mt-2">
            <Code className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            <GradientName>Portfolio</GradientName>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Chequea mis proyectos
          </p>
        </motion.div>
        <Separator />

        <AnimatePresence>
          <motion.div
            className="mt-12"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* Grid view for larger screens */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
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
            </div>

            {/* Table view for mobile screens */}
            <div className="md:hidden overflow-x-auto">
              <ProjectTable projects={filteredProjects.slice(0, visibleProjects)} />
            </div>
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