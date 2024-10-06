'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  BadgeCheck,
  Coffee,
  ChevronDown,
  ChevronRight,
  Code,
  Layers,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dataServices, dataExperience, ExperienceItem } from '@/data';
import type { ExperienceGroup, ExperienceCategory } from '@/data';
import { iconMap, IconMapKey } from './iconMap';
import GradientName from './GradientName';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

const getIcon = (tech: string): React.ReactElement => {
  const key = tech.toLowerCase() as IconMapKey;
  return key in iconMap ? iconMap[key] : <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />;
};

const ServiceCard: React.FC<{ service: (typeof dataServices)[number] }> = ({
  service,
}) => (
  <Card className="group h-full bg-card hover:bg-card/90 transition-colors duration-300 dark:bg-gray-800/80">
    <CardHeader className="pb-2 sm:pb-4">
      <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2 text-card-foreground">
        {service.icon}
        {service.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-2 sm:pt-4">
      <ul className="space-y-1 sm:space-y-2">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-1 sm:gap-2">
            <BadgeCheck
              className="text-primary mt-1 flex-shrink-0"
              size={14}
            />
            <span className="text-xs sm:text-sm text-black-foreground">
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const TechnologyBadge: React.FC<{ tech: string }> = ({ tech }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full hover:bg-secondary/80 dark:bg-gray-800/80 transition-colors duration-200"
        >
          {getIcon(tech)}
          <span className="text-[10px] sm:text-xs font-medium">{tech}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs sm:text-sm">Experiencia en {tech}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <Card className="group h-full bg-card hover:bg-card/90 dark:bg-gray-800/80 transition-colors duration-300">
    <CardHeader className="pb-2 dark:bg-gray-800/80">
      <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2 text-card-foreground dark:bg-gray-800/80">
        <BadgeCheck className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
        {item.name}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-2 sm:pt-4 relative">
      <p className="text-xs sm:text-sm text-black-foreground mb-2 sm:mb-3">{item.subtitle}</p>
      {item.value !== undefined && (
        <div className="mb-2 sm:mb-3">
          <Progress value={item.value} className="h-1 sm:h-2" />
          <p className="text-[10px] sm:text-xs text-right mt-0.5 sm:mt-1 text-black-foreground">
            {item.value}%
          </p>
        </div>
      )}
      <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
        {item.technologies.map((tech, index) => (
          <TechnologyBadge key={index} tech={tech} />
        ))}
      </div>
      {item.experience && (
        <motion.div
          className="mt-2 sm:mt-4 flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs sm:text-sm text-black-foreground">{item.experience}</p>
        </motion.div>
      )}
    </CardContent>
  </Card>
);

const ExperienceGroup: React.FC<{ group: ExperienceGroup }> = ({ group }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4 sm:mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 mb-2 bg-muted p-1.5 sm:p-2 rounded-lg"
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
        ) : (
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
        )}
        {group.category}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {group.items.map((item) => (
              <ExperienceCard key={item.name} item={item} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExperienceCategory: React.FC<{ category: ExperienceCategory }> = ({
  category,
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground border-b pb-2">
        {category.title}
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {category.experience.map((group) => (
          <ExperienceGroup key={group.category} group={group} />
        ))}
      </div>
    </div>
  );
};

export default function ServicesAndExperience() {
  return (
    <motion.section
      className="py-8 sm:py-12 md:py-20 transition-colors duration-300"
      id="services"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-block p-2 sm:p-3 rounded-full bg-primary/10 mb-3 sm:mb-4">
            <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            <GradientName>Servicios y Experiencia</GradientName>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black-foreground">
            Descubre mi trayectoria profesional y habilidades
          </p>
          <div className="flex justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-6">
            <div className="flex items-center gap-1 sm:gap-2">
              <Code className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm font-medium">Desarrollo</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm font-medium">Diseño</span>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="services" className="w-full">
          <div className="relative">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <TabsList className="h-12 inline-flex min-w-full justify-start gap-1 p-1 bg-muted/50 dark:bg-gray-800/50">
                <TabsTrigger
                  value="services"
                  className="inline-flex min-w-[100px] items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Servicios
                </TabsTrigger>
                {dataExperience.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id.toString()}
                    className="inline-flex min-w-[100px] items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="opacity-0" />
            </ScrollArea>
          </div>

          <div className="relative mt-6 lg:mt-8">
            <div className="min-h-[600px] sm:min-h-[700px] lg:min-h-[1050px] transition-all duration-300">
              <TabsContent 
                value="services"
                className="absolute top-0 left-0 w-full h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
                >
                  {dataServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </motion.div>
              </TabsContent>

              {dataExperience.map((category) => (
                <TabsContent 
                  key={category.id} 
                  value={category.id.toString()}
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExperienceCategory category={category} />
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>

      {/* Añadir margen inferior adicional a la sección */}
      <div className="h-12 sm:h-16 md:h-20"></div>
    </motion.section>
  );
}