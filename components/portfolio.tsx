/* eslint-disable no-unused-vars */
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
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Code,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Search,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { iconMap, IconMapKey } from './shared/iconMap';
import GradientName from './shared/GradientName';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Extended interface for portfolio items
interface ExtendedPortfolioItem extends PortfolioItem {
  mediaType?: 'image' | 'gif';
  staticImage?: string;
  image: string;
  gifImage?: string;
}

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

const MediaDisplay: React.FC<{
  project: ExtendedPortfolioItem;
  alt: string;
}> = ({ project, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loadGif, setLoadGif] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isHovered && project.gifImage) {
      setLoadGif(true);
    }
  }, [isHovered, project.gifImage]);

  const currentImage =
    loadGif && isHovered && project.gifImage ? project.gifImage : project.image;

  if (error) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-t-xl">
        <ImageIcon className="w-12 h-12 text-gray-400" />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-48"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <Image
        src={currentImage}
        alt={alt}
        fill
        className={`rounded-t-xl object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={loadGif && isHovered && project.gifImage !== undefined}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

const SearchAndFilter: React.FC<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTech: string[];
  toggleTech: (tech: string) => void;
  allTechnologies: string[];
  clearFilters: () => void;
  filteredCount: number;
}> = ({
  searchTerm,
  setSearchTerm,
  selectedTech,
  toggleTech,
  allTechnologies,
  clearFilters,
  filteredCount,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar with Enhanced Design */}
        <div className="relative flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar proyectos por nombre o tecnología..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 h-11 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tech Filter Popover */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-11 min-w-[200px] justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtrar por tecnología
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Buscar tecnología..." />
              <CommandList>
                <CommandEmpty>No se encontraron tecnologías.</CommandEmpty>
                <CommandGroup>
                  {allTechnologies.map((tech) => (
                    <CommandItem
                      key={tech}
                      onSelect={() => toggleTech(tech)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      {getTechIcon(tech)}
                      <span>{tech}</span>
                      <span className="ml-auto">
                        {selectedTech.includes(tech) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Badge variant="secondary" className="ml-auto">
                              Seleccionado
                            </Badge>
                          </motion.div>
                        )}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Selected Filters Display */}
      {(selectedTech.length > 0 || searchTerm) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-wrap items-center gap-2"
        >
          <div className="flex-1 flex flex-wrap gap-2">
            {selectedTech.map((tech) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge
                  variant="secondary"
                  className="px-3 py-1 flex items-center gap-1 bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                  onClick={() => toggleTech(tech)}
                >
                  {getTechIcon(tech)}
                  {tech}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {filteredCount} proyecto{filteredCount !== 1 ? 's' : ''}{' '}
              encontrado{filteredCount !== 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-2 hover:bg-primary/10"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar filtros
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Project Card Component
const ProjectCard: React.FC<{ project: ExtendedPortfolioItem }> = ({
  project,
}) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
  >
    <Card className="h-full flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
      <CardHeader className="p-0">
        <MediaDisplay project={project} alt={project.title} />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl mb-2 text-gray-800 dark:text-white">
          {project.title}
        </CardTitle>
        <div className="relative">
          <p className="text-black dark:text-gray-400 text-sm mb-4 line-clamp-3 hover:line-clamp-none transition-all duration-300">
            {project.description}
          </p>
        </div>
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

// Project Table Component
const ProjectTable: React.FC<{ projects: ExtendedPortfolioItem[] }> = ({
  projects,
}) => (
  <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm">
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50 dark:bg-gray-700/50">
          <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
            Project
          </TableHead>
          <TableHead className="hidden sm:table-cell font-semibold text-gray-700 dark:text-gray-200">
            Technologies
          </TableHead>
          <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
            Links
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow
            key={project.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <TableCell>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {project.title}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 sm:line-clamp-none">
                {project.description}
              </div>
              <div className="sm:hidden mt-2">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col sm:flex-row gap-2">
                {project.urlGithub && (
                  <Link
                    href={project.urlGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                  </Link>
                )}
                {project.urlDemo && (
                  <Link
                    href={project.urlDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                  </Link>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

// Main Portfolio Component
const Portfolio: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get unique technologies from all projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    dataPortfolio.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return dataPortfolio
      .map((project) => ({
        ...project,
        mediaType: project.image.toLowerCase().endsWith('.gif')
          ? ('gif' as const)
          : ('image' as const),
      }))
      .filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const matchesTech =
          selectedTech.length === 0 ||
          selectedTech.every((tech) => project.technologies.includes(tech));

        return matchesSearch && matchesTech;
      });
  }, [searchTerm, selectedTech]);

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTech([]);
  };

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
        {/* Header section remains the same */}
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
            Algunos de mis Proyectos desarrollados de manera freelance.
          </p>
        </motion.div>

        {/* Enhanced Search and Filter Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTech={selectedTech}
            toggleTech={toggleTech}
            allTechnologies={allTechnologies}
            clearFilters={clearFilters}
            filteredCount={filteredProjects.length}
          />
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
              {filteredProjects.slice(0, visibleProjects).map((project) => (
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
              <ProjectTable
                projects={filteredProjects.slice(0, visibleProjects)}
              />
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
    </motion.section>
  );
};

export default Portfolio;
