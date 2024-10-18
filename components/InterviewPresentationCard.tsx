'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Github, Linkedin, FileText, Globe, Download, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { dataIntroduction } from '@/data';

export default function CartaPresentacionEjecutiva() {
  const { roles, link, cv, description } = dataIntroduction[0];

  const contactInfo = [
    { icon: Mail, text: 'camiloescar1995@gmail.com', href: 'mailto:camiloescar1995@gmail.com' },
    { icon: Linkedin, text: 'LinkedIn', href: 'https://www.linkedin.com/in/camiloescar/' },
    { icon: Github, text: 'GitHub', href: 'https://github.com/CamiloEscar' },
    { icon: Globe, text: 'Portfolio', href: '/minimal' },
  ];

  const skills = ['Desarrollo Full Stack', 'React', 'Node.js', 'Gestión de Proyectos', 'Optimización de Rendimiento', 'Arquitectura de Software'];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="overflow-hidden shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-8 sm:p-10">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
                <motion.div 
                  className="relative w-40 h-40 mb-4 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Image
                    src="/profile.webp"
                    alt="Camilo Escar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-4 border-gray-200 dark:border-gray-700"
                  />
                </motion.div>
                
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center md:text-left">
                  Camilo Escar
                </h1>
                
                <p className="text-lg text-primary mb-4 font-medium text-center md:text-left">
                  {roles.join(' • ')}
                </p>
                
                <div className="space-y-2 w-full">
                  {contactInfo.map((info, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-start text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Link href={info.href}>
                              <info.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{info.text}</span>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Contactar vía {info.text}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
              
              <Separator orientation="vertical" className="hidden md:block" />
              
              <div className="flex-1">
                <section className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Perfil Profesional</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {description.before} {description.reactText} {description.middle} {description.nodeText} {description.after}
                  </p>
                </section>
                
                <Separator className="my-6" />
                
                <section className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Áreas de Especialización</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {skills.map((skill, index) => (
                      <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white transition-all duration-300">
                    <Link href={cv.button}>
                      <Download className="w-4 h-4 mr-2" />
                      Descargar CV Completo
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="hover:bg-primary/10 transition-all duration-300">
                    <Link href={link.home}>
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Portfolio Detallado
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}