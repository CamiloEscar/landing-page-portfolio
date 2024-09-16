"use client"
import React, { useEffect, useState } from 'react';
import { dataPortfolio } from "@/data";
import Title from "./shared/title";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code, ChevronDown } from "lucide-react";
import { PortfolioItem } from '../interface';
import { useTheme } from "next-themes";

// Importamos los iconos de tecnologías
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb } from 'react-icons/si';

const getProjectDetails = (title: string): { description: string; technologies: string[] } => {
  const technologies = ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"];
  return {
    description: `${title} es un proyecto innovador que demuestra mis habilidades en desarrollo web moderno.`,
    technologies: technologies.slice(0, Math.floor(Math.random() * 3) + 2)
  };
};

const getTechIcon = (tech: string) => {
  switch (tech) {
    case 'React': return <FaReact />;
    case 'Next.js': return <SiNextdotjs />;
    case 'Tailwind CSS': return <SiTailwindcss />;
    case 'Node.js': return <FaNodeJs />;
    case 'MongoDB': return <SiMongodb />;
    default: return <Code size={12} />;
  }
};

const Portfolio: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const { theme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const showMoreProjects = () => {
    setVisibleProjects(prev => prev + 6);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-300" id="portfolio">
      <div className="container mx-auto px-4">
        <Title title="Portfolio" subtitle="Trabajos Recientes" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {dataPortfolio.slice(0, visibleProjects).map((project: PortfolioItem, index: number) => {
            const { description, technologies } = getProjectDetails(project.title);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
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
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {technologies.map((tech: string, techIndex: number) => (
                        <span key={techIndex} className="bg-gray-200 dark:bg-gray-700 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
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
            );
          })}
        </div>

        {visibleProjects < dataPortfolio.length && (
          <div className="mt-8 text-center">
            <Button onClick={showMoreProjects} variant="outline" size="lg" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              Ver más
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;