"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { dataPortfolio, PortfolioItem } from "@/data";
import Title from "./shared/title";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { FaReact, FaNodeJs, FaPaperPlane } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiVercel, SiJavascript, SiTypescript, SiCss3, SiHtml5, SiOpenai, SiAstro, SiSvelte, SiVite, SiBun, SiAxios} from 'react-icons/si';
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 6;

const iconMap: { [key: string]: JSX.Element } = {
  'React': <FaReact />,
  'Next.js': <SiNextdotjs />,
  'Tailwind CSS': <SiTailwindcss />,
  'Node.js': <FaNodeJs />,
  'MongoDB': <SiMongodb />,
  'Express': <SiExpress />,
  'Vercel': <SiVercel />,
  'JavaScript': <SiJavascript />,
  'TypeScript': <SiTypescript />,
  'CSS': <SiCss3 />,
  'HTML': <SiHtml5 />,
  'React Native': <SiNextdotjs />,
  'AppSheets': <FaPaperPlane />,
  'OpenAI': <SiOpenai />,
  'Astro': <SiAstro />,
  'Svelte': <SiSvelte />,
  'Vite': <SiVite />,
  'bun': <SiBun />,
  'Axios': <SiAxios />
};

const getTechIcon = (tech: string) => {
  return iconMap[tech] || <Code size={12} />;
};

const ProjectCard: React.FC<{ project: PortfolioItem }> = ({ project }) => (
  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
    <CardHeader>
      <Image
        src={project.image}
        alt={project.title}
        width={400}
        height={300}
        className="rounded-t-xl object-cover w-full h-48"
      />
    </CardHeader>
    <CardContent>
      <CardTitle className="text-xl mb-2 text-gray-800 dark:text-white">{project.title}</CardTitle>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech: string, techIndex: number) => (
          <span key={techIndex} className="bg-gray-200/80 dark:bg-gray-700/80 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
            {getTechIcon(tech)}
            {tech}
          </span>
        ))}
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm" asChild>
        <Link href={project.urlGithub} target="_blank" rel="noopener noreferrer">
          <Github className="mr-2 h-4 w-4" />
          Github
        </Link>
      </Button>
      <Button size="sm" asChild>
        <Link href={project.urlDemo} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 h-4 w-4" />
          Demo
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const Portfolio: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProjects = useMemo(() => {
    return dataPortfolio.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const toggleProjects = () => {
    if (visibleProjects === ITEMS_PER_PAGE) {
      setVisibleProjects(filteredProjects.length);
    } else {
      setVisibleProjects(ITEMS_PER_PAGE);
    }
  };

  if (!mounted) return null;

  return (
    <section className="py-16 md:py-24 bg-transparent transition-colors duration-300" id="portfolio">
      <div className="container mx-auto px-4">
        <Title title="Portfolio" subtitle="Trabajos Recientes" />

        <div className="mb-6 relative">
          <Input
            type="text"
            placeholder="Buscar proyectos por título, descripción o tecnología..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md pl-10"
            aria-label="Buscar proyectos"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <AnimatePresence>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {filteredProjects.slice(0, visibleProjects).map((project: PortfolioItem) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length > ITEMS_PER_PAGE && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              onClick={toggleProjects} 
              variant="outline" 
              size="lg" 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-gray-100/80 dark:hover:bg-gray-700/80"
            >
              {visibleProjects === ITEMS_PER_PAGE ? (
                <>
                  Ver más
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
    </section>
  );
};

export default Portfolio;