"use client"

import React, { useState, useEffect } from 'react';
import { dataPortfolio, PortfolioItem } from "@/data";
import Title from "./shared/title";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiVercel } from 'react-icons/si';

const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'React': <FaReact />,
    'Next.js': <SiNextdotjs />,
    'Tailwind CSS': <SiTailwindcss />,
    'Node.js': <FaNodeJs />,
    'MongoDB': <SiMongodb />,
    'Express': <SiExpress />,
    'Vercel': <SiVercel />
  };
  return iconMap[tech] || <Code size={12} />;
};

const Portfolio: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const showMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 6, dataPortfolio.length));
  };

  return (
    <section className="py-16 md:py-24 bg-transparent transition-colors duration-300" id="portfolio">
      <div className="container mx-auto px-4">
        <Title title="Portfolio" subtitle="Trabajos Recientes" />

        <AnimatePresence>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {dataPortfolio.slice(0, visibleProjects).map((project: PortfolioItem) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {visibleProjects < dataPortfolio.length && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button onClick={showMoreProjects} variant="outline" size="lg" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-gray-100/80 dark:hover:bg-gray-700/80">
              Ver más
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;