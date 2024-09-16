"use client"

import React from 'react'
import { dataExperience } from "@/data"
import Title from "./shared/title"
import { BadgeCheck, Star, ChevronRight, Coffee } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  FaHtml5, FaCss3Alt, FaSass, FaLess, FaJs, FaReact, FaNodeJs, FaNpm,
  FaBootstrap, FaPython, FaPhp, FaWordpress, FaUniversalAccess
} from 'react-icons/fa'
import { 
  SiTypescript, SiWebpack, SiTailwindcss, SiRedux, SiNextdotjs, SiGatsby, 
  SiJquery, SiExpress, SiSocketdotio, SiMongodb, SiMongoose, SiMysql, 
  SiMariadb, SiSequelize, SiLaravel, SiDjango, SiPostgresql, 
  SiSemanticuireact, SiStyledcomponents, SiNuxtdotjs, SiNumpy, SiPandas, 
  SiPostcss
} from 'react-icons/si'

type IconMapKey = 'html5' | 'semantic-ui' | 'accessibility' | 'css3' | 'sass' | 'less' | 'styled-components' | 'javascript' | 'es6' | 'typescript' | 'webpack' | 'tailwindcss' | 'postcss' | 'react' | 'redux' | 'next-js' | 'gatsby' | 'bootstrap' | 'jquery' | 'nodejs' | 'express' | 'socket-io' | 'npm' | 'mongodb' | 'mongoose' | 'atlas' | 'python' | 'pandas' | 'numpy' | 'mysql' | 'mariadb' | 'sequelize' | 'php' | 'laravel' | 'wordpress' | 'django' | 'postgresql' | 'nuxt'

const iconMap: Record<IconMapKey, React.ReactElement> = {
  html5: <FaHtml5 className="w-5 h-5" />,
  'semantic-ui': <SiSemanticuireact className="w-5 h-5" />,
  accessibility: <FaUniversalAccess className="w-5 h-5" />,
  css3: <FaCss3Alt className="w-5 h-5" />,
  sass: <FaSass className="w-5 h-5" />,
  less: <FaLess className="w-5 h-5" />,
  'styled-components': <SiStyledcomponents className="w-5 h-5" />,
  javascript: <FaJs className="w-5 h-5" />,
  es6: <FaJs className="w-5 h-5" />,
  typescript: <SiTypescript className="w-5 h-5" />,
  webpack: <SiWebpack className="w-5 h-5" />,
  tailwindcss: <SiTailwindcss className="w-5 h-5" />,
  postcss: <SiPostcss className="w-5 h-5" />,
  react: <FaReact className="w-5 h-5" />,
  redux: <SiRedux className="w-5 h-5" />,
  'next-js': <SiNextdotjs className="w-5 h-5" />,
  nuxt: <SiNuxtdotjs className="w-5 h-5" />,
  gatsby: <SiGatsby className="w-5 h-5" />,
  bootstrap: <FaBootstrap className="w-5 h-5" />,
  jquery: <SiJquery className="w-5 h-5" />,
  nodejs: <FaNodeJs className="w-5 h-5" />,
  express: <SiExpress className="w-5 h-5" />,
  'socket-io': <SiSocketdotio className="w-5 h-5" />,
  npm: <FaNpm className="w-5 h-5" />,
  mongodb: <SiMongodb className="w-5 h-5" />,
  mongoose: <SiMongoose className="w-5 h-5" />,
  atlas: <SiMongodb className="w-5 h-5" />,
  python: <FaPython className="w-5 h-5" />,
  pandas: <SiPandas className="w-5 h-5" />,
  numpy: <SiNumpy className="w-5 h-5" />,
  mysql: <SiMysql className="w-5 h-5" />,
  mariadb: <SiMariadb className="w-5 h-5" />,
  sequelize: <SiSequelize className="w-5 h-5" />,
  php: <FaPhp className="w-5 h-5" />,
  laravel: <SiLaravel className="w-5 h-5" />,
  wordpress: <FaWordpress className="w-5 h-5" />,
  django: <SiDjango className="w-5 h-5" />,
  postgresql: <SiPostgresql className="w-5 h-5" />,
}

const getIcon = (tech: string): React.ReactElement => {
  const key = tech.toLowerCase() as IconMapKey
  return key in iconMap ? iconMap[key] : <Coffee className="w-5 h-5" />
}

export default function Experience() {
  const defaultTabValue = dataExperience[0]?.id.toString() || "0"

  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <Title title="Experiencia" subtitle="Mis habilidades y conocimientos" />

        <Tabs defaultValue={defaultTabValue} className="mt-12">
          <TabsList className="inline-flex h-auto p-1 bg-white dark:bg-gray-800 rounded-lg mb-8 overflow-x-auto">
            {dataExperience.map((data) => (
              <TabsTrigger
                key={data.id}
                value={data.id.toString()}
                className="px-4 py-2 text-sm md:text-base rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm whitespace-nowrap"
              >
                {data.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnimatePresence mode="wait">
            {dataExperience.map((data) => (
              <TabsContent key={data.id} value={data.id.toString()}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {data.experience.map((item) => (
                    <Card key={item.name} className="group h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
                          <BadgeCheck className="text-primary" />
                          {item.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 relative">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.subtitle}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={18}
                                className={`${
                                  i < Math.round(item.value / 20)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                } transition-colors duration-300`}
                              />
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 justify-end">
                            {item.technologies.map((tech, index) => (
                              <TooltipProvider key={index}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="text-primary bg-primary/10 p-1 rounded-full">
                                      {getIcon(tech)}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{tech}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </div>
                        <Progress value={item.value} className="h-2 bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                            style={{ width: `${item.value}%` }}
                          />
                        </Progress>
                        <motion.div
                          className="mt-4 flex justify-between items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.experience}</p>
                          <ChevronRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <p className="text-sm text-primary font-medium">Ver más detalles</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
}