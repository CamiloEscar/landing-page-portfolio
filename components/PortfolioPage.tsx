'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, Github, Code, Maximize2, Link2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { dataPortfolio, PortfolioItem } from '@/data';

interface ExtendedPortfolioItem extends PortfolioItem {
  mediaType?: 'image' | 'gif';
  staticImage?: string;
  gifImage?: string;
}

// Componente de partículas de fondo
const BackgroundParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%' 
          }}
          animate={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%' 
          }}
          transition={{ 
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

const ProjectModal = ({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: ExtendedPortfolioItem | null; 
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isHovering, setIsHovering] = useState(false);

  if (!project) return null;

  const displayImage = isHovering && project.gifImage ? project.gifImage : project.image;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-6xl w-11/12 p-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div 
                className="relative h-[50vh] md:h-[70vh] w-full cursor-pointer overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Image
                  src={displayImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 hover:scale-105"
                  priority
                />
                {project.gifImage && (
                  <motion.div 
                    className="absolute bottom-6 right-6 p-3 bg-black/50 backdrop-blur-sm rounded-2xl text-white text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {isHovering ? 'Ver imagen estática' : 'Ver animación'}
                  </motion.div>
                )}
                <motion.button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
              <div className="p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
                  <div>
                    <motion.h2 
                      className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {project.title}
                    </motion.h2>
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {project.description}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="flex gap-4 shrink-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.urlGithub && (
                      <Button 
                        asChild 
                        variant="outline" 
                        size="lg"
                        className="border-2 hover:scale-105 transition-transform"
                      >
                        <Link
                          href={project.urlGithub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github className="h-5 w-5" />
                          Código
                        </Link>
                      </Button>
                    )}
                    {project.urlDemo && (
                      <Button 
                        asChild 
                        size="lg"
                        className="hover:scale-105 transition-transform"
                      >
                        <Link
                          href={project.urlDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Link2 className="h-5 w-5" />
                          Demo
                        </Link>
                      </Button>
                    )}
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Tecnologías
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Badge
                          variant="secondary"
                          className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

const ProjectCard = ({ 
  project, 
  onClick 
}: { 
  project: ExtendedPortfolioItem; 
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <motion.div 
          className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center"
          initial="initial"
          animate={isHovered ? 'animate' : 'initial'}
        >
          <motion.div
            variants={{
              initial: { scale: 0, rotate: -180 },
              animate: { scale: 1, rotate: 0 }
            }}
            transition={{ duration: 0.5, ease: 'backOut' }}
          >
            <Maximize2 className="text-white h-10 w-10" />
          </motion.div>
        </motion.div>
      </div>
      <motion.div 
        className="p-8"
        initial="initial"
        animate={isHovered ? 'animate' : 'initial'}
      >
        <motion.h3 
          className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          variants={{
            initial: { y: 0 },
            animate: { y: -5 }
          }}
        >
          {project.title}
        </motion.h3>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 text-base mb-5 line-clamp-2"
          variants={{
            initial: { opacity: 0.7 },
            animate: { opacity: 1 }
          }}
        >
          {project.description}
        </motion.p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <motion.div
              key={tech}
              variants={{
                initial: { x: -10, opacity: 0 },
                animate: { x: 0, opacity: 1 }
              }}
              transition={{ delay: index * 0.1 }}
            >
              <Badge
                variant="secondary"
                className="text-sm bg-primary/10 text-primary"
              >
                {tech}
              </Badge>
            </motion.div>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="text-sm">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>
        <Button 
          onClick={onClick} 
          className="w-full group-hover:scale-105 transition-transform"
          variant="outline"
        >
          Explorar proyecto
        </Button>
      </motion.div>
    </motion.div>
  );
};

const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] = useState<ExtendedPortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const openModal = (project: ExtendedPortfolioItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-20"
          style={{ opacity }}
        >
          <motion.div 
            className="inline-block p-6 rounded-full bg-primary/5 mb-8 backdrop-blur-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
          >
            <Code className="w-16 h-16 text-primary" />
          </motion.div>
          <motion.h1 
            className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Mis Proyectos
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Explora mi colección de proyectos creativos desarrollados con pasión y tecnologías innovadoras
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence>
            {dataPortfolio.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => openModal(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default PortfolioPage;