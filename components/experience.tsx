"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, BadgeCheck, Coffee, ChevronDown, ChevronRight, Code, Layers, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dataServices, dataExperience, ExperienceItem } from "@/data"
import type { ExperienceGroup, ExperienceCategory } from "@/data"
import { iconMap, IconMapKey } from "./iconMap"

const getIcon = (tech: string): React.ReactElement => {
  const key = tech.toLowerCase() as IconMapKey
  return key in iconMap ? iconMap[key] : <Coffee className="w-5 h-5" />
}

const ServiceCard: React.FC<{ service: typeof dataServices[number] }> = ({ service }) => (
  <Card className="group h-full bg-card hover:bg-card/90 transition-colors duration-300">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-semibold flex items-center gap-2 text-card-foreground">
        {service.icon}
        {service.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <ul className="space-y-2">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <BadgeCheck className="text-primary mt-1 flex-shrink-0" size={16} />
            <span className="text-sm text-muted-foreground">{feature.name}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

const TechnologyBadge: React.FC<{ tech: string }> = ({ tech }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-secondary/80 transition-colors duration-200">
          {getIcon(tech)}
          <span className="text-xs font-medium">{tech}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>Experiencia en {tech}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <Card className="group h-full bg-card hover:bg-card/90 transition-colors duration-300">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-semibold flex items-center gap-2 text-card-foreground">
        <BadgeCheck className="text-primary" />
        {item.name}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-4 relative">
      <p className="text-sm text-muted-foreground mb-3">
        {item.subtitle}
      </p>
      {item.value !== undefined && (
        <div className="mb-3">
          <Progress value={item.value} className="h-2" />
          <p className="text-xs text-right mt-1 text-muted-foreground">{item.value}%</p>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {item.technologies.map((tech, index) => (
          <TechnologyBadge key={index} tech={tech} />
        ))}
      </div>
      {item.experience && (
        <motion.div
          className="mt-4 flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground">
            {item.experience}
          </p>
        </motion.div>
      )}
    </CardContent>
  </Card>
)

const ExperienceGroup: React.FC<{ group: ExperienceGroup }> = ({ group }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 mb-2 bg-muted p-2 rounded-lg"
      >
        {isOpen ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
        {group.category}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {group.items.map((item) => (
              <ExperienceCard key={item.name} item={item} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ExperienceCategory: React.FC<{ category: ExperienceCategory }> = ({ category }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-foreground border-b pb-2">{category.title}</h2>
      <div className="space-y-4">
        {category.experience.map((group) => (
          <ExperienceGroup key={group.category} group={group} />
        ))}
      </div>
    </div>
  )
}

export default function ServicesAndExperience() {
  return (
    <motion.section 
      className="py-12 md:py-20 transition-colors duration-300"
      id="services"
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
            <Briefcase className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Servicios y Experiencia</h2>
          <p className="text-lg md:text-xl text-muted-foreground">Descubre mi trayectoria profesional y habilidades</p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Desarrollo</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Diseño</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Innovación</span>
            </div> */}
          </div>
        </motion.div>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="flex flex-auto justify-center gap-2 mb-8 md:mb-8">
            <TabsTrigger value="services" className="px-4 py-2 rounded-full transition-all text-sm md:text-base">
              Servicios
            </TabsTrigger>
            {dataExperience.map((category) => (
              <TabsTrigger key={category.id} value={category.id.toString()} className="px-4 py-2 rounded-full transition-all text-sm md:text-base">
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="min-h-[800px]">
          <TabsContent value="services">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {dataServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </motion.div>
          </TabsContent>

          {dataExperience.map((category) => (
            <TabsContent key={category.id} value={category.id.toString()}>
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
        </Tabs>
      </div>
    </motion.section>
  )
}