import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  BadgeCheck,
  Coffee,
  // ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
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
import { iconMap, IconMapKey } from './shared/iconMap';
import GradientName from './shared/GradientName';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Separator } from './ui/separator';

const getIcon = (tech: string): React.ReactElement => {
  const key = tech.toLowerCase() as IconMapKey;
  return key in iconMap ? iconMap[key] : <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />;
};

interface ServiceCardProps {
  service: {
    id: string;
    icon: React.ReactNode;
    title: string;
    features: { name: string }[];
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => (
  <Card className="group h-full bg-card hover:bg-card/90 transition-all duration-300 dark:bg-gray-800/80 hover:shadow-md">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm md:text-base lg:text-lg font-semibold flex items-center gap-2 text-primary">
        {service.icon}
        <span className="line-clamp-1">{service.title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-2">
      <ul className="space-y-1">
        {service.features.map((feature, index) => (
          <motion.li 
            key={index} 
            className="flex items-start gap-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BadgeCheck
              className="text-primary mt-0.5 flex-shrink-0 w-3 h-3 md:w-4 md:h-4"
            />
            <span className="text-xs md:text-sm text-card-foreground line-clamp-2 hover:line-clamp-none transition-all duration-300">
              {feature.name}
            </span>
          </motion.li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

interface ExperienceCardProps {
  item: ExperienceItem;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ item }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-2 sm:p-4 flex flex-col items-center text-center h-full justify-between">
            <motion.div 
              className="mb-2 sm:mb-3 flex flex-wrap justify-center gap-1 sm:gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {item.technologies.slice(0, 4).map((tech, index) => (
                <motion.div 
                  key={index} 
                  className="transition-transform duration-300 group-hover:scale-110"
                  whileHover={{ rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {React.cloneElement(getIcon(tech), {
                    className: 'w-4 h-4 sm:w-5 sm:h-5'
                  })}
                </motion.div>
              ))}
              {item.technologies.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{item.technologies.length - 4}
                </Badge>
              )}
            </motion.div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1 text-primary line-clamp-1">{item.name}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">{item.subtitle}</p>
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px] sm:max-w-xs p-2 sm:p-4">
        <p className="text-xs sm:text-sm">{item.experience || `Experiencia en ${item.name}`}</p>
        {/* <Badge variant="outline" className="mt-2 text-[10px] sm:text-xs">
          Ver más <ExternalLink className="ml-1 w-2 h-2 sm:w-3 sm:h-3" />
        </Badge> */}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ExperienceGroupConst: React.FC<{ group: ExperienceGroup }> = ({ group }) => (
  <div className="space-y-4 sm:space-y-8">
    <div className="flex items-center gap-2 mb-2 sm:mb-4">
      <h3 className="text-base sm:text-lg font-semibold">{group.category}</h3>
      <Separator className="flex-grow" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
      {group.items.map((item) => (
        <ExperienceCard key={item.name} item={item} />
      ))}
    </div>
  </div>
);

const ExperienceCategoryConst: React.FC<{ category: ExperienceCategory }> = ({
  category,
}) => (
  <div className="space-y-8">
    {category.experience.map((group) => (
      <ExperienceGroupConst key={group.category} group={group} />
    ))}
  </div>
);

const ServicesAndExperience: React.FC = () => {
  return (
    <motion.section
      className="py-8 sm:py-16"
      id="experience-services"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-2 py-4 sm:px-4 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/20 shadow-xl rounded-md">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-block p-2 sm:p-3 rounded-full bg-primary/10 mb-4">
            <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            <GradientName>Servicios & Experiencia</GradientName>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre mi stack tecnológico y los servicios profesionales que ofrezco para 
            impulsar tu próximo proyecto
          </p>
        </motion.div>
        
        <Tabs defaultValue="services" className="w-full">
          <div className="flex justify-center mb-6 sm:mb-8">
            <TabsList className="inline-flex h-8 sm:h-10 items-center justify-center rounded-lg bg-muted p-1">
              <TabsTrigger value="services" className="text-xs sm:text-sm">
                Servicios
              </TabsTrigger>
              <TabsTrigger value="experience" className="text-xs sm:text-sm">
                Experiencia
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="services">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {dataServices.map((service) => (
                <ServiceCard key={service.id.toString()} service={{ 
                  id: service.id.toString(), 
                  title: service.title, 
                  icon: service.icon, 
                  features: service.features 
                }} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience">
            <Tabs defaultValue={dataExperience[0].id.toString()} className="w-full">
              <ScrollArea className="w-full whitespace-nowrap rounded-md border mb-4 sm:mb-6 bg-gradient-to-b from-background to-background/80">
                <TabsList className="inline-flex h-8 sm:h-10 items-center justify-start rounded-none border-b bg-transparent p-0">
                  {dataExperience.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id.toString()}
                      className="text-xs sm:text-sm"
                    >
                      {category.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              {dataExperience.map((category) => (
                <TabsContent key={category.id} value={category.id.toString()}>
                  <ExperienceCategoryConst category={category} />
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </Tabs>

        {/* <div className="mt-8 sm:mt-12 text-center">
          <a href="#contact">
            <Button variant="default" size="sm" className="group sm:text-base sm:px-6 sm:py-3">
              Contáctame
              <ExternalLink className="ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </div> */}
      </div>
    </motion.section>
  );
};

export default ServicesAndExperience;