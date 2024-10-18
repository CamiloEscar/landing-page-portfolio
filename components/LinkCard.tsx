'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Github, Linkedin, Layers, Pen, Download, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import GradientName from './shared/GradientName';
import { dataIntroduction } from '@/data';

const LinkCard = () => {
  const { roles, link, cv } = dataIntroduction[0];

  const links = [
    { icon: Paperclip, text: link.home, href: '/', color: 'bg-gradient-to-r from-green-400 to-green-600' },
    { icon: Mail, text: link.contacto, href: 'mailto: camiloescar1995@gmail.com', color: 'bg-gradient-to-r from-red-400 to-red-600' },
    { icon: Layers, text: link.Miniportfolio, href: '/minimal', color: 'bg-gradient-to-r from-blue-400 to-blue-600' },
    { icon: Pen, text: link.blog, href: '/blog', color: 'bg-gradient-to-r from-purple-400 to-purple-600' },
    { icon: Github, text: link.github, href: 'https://github.com/CamiloEscar', color: 'bg-gradient-to-r from-gray-600 to-gray-800' },
    { icon: Linkedin, text: link.linkedin, href: 'https://www.linkedin.com/in/camiloescar/', color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
    { icon: Download, text: cv.button, href: '/CVes-CamiloEscar.pdf', color: 'bg-gradient-to-r from-green-500 to-green-700' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="overflow-hidden shadow-2xl bg-white dark:bg-gray-800 backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
          <CardContent className="p-6">
            <motion.div 
              className="relative w-full mb-4 overflow-hidden"
              style={{ paddingTop: '56.25%' }} // 16:9 aspect ratio
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/profile.webp"
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-lg border-2 border-white dark:border-gray-700 shadow-md"
              />
            </motion.div>
            
            <GradientName size="small" className="text-center font-bold mb-1">
              Camilo Escar
            </GradientName>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4 font-medium">
              {roles.join(' | ')}
            </p>
            
            <div className="space-y-2">
              {links.map((link, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          asChild
                          className={`w-full ${link.color} hover:opacity-90 text-white transition-all duration-300 shadow-md text-sm py-1`}
                        >
                          <Link href={link.href}>
                            <link.icon className="w-4 h-4 mr-2" />
                            {link.text}
                          </Link>
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to visit {link.text}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LinkCard;