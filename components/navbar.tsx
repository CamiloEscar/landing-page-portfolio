'use client';

import React, { useState, useEffect } from 'react';
import { itemsNavbar } from '@/data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Github,
  Linkedin,
  Mail,
  Sun,
  Moon,
  Download,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { setTheme, theme } = useTheme();
  const [showToolTip, setShowToolTip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    setShowToolTip(true);
    const timer = setTimeout(() => {
      setShowToolTip(false);
    }, 3000);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cycleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const getThemeIcon = () => {
    return theme === 'dark' ? (
      <Sun className="h-5 w-5" />
    ) : (
      <Moon className="h-5 w-5" />
    );
  };

  return (
    <>
      <motion.div
        className="fixed z-50 top-4 right-4 flex space-x-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-background/20 hover:bg-background/40"
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() =>
                      window.open('/CVen-CamiloEscar.pdf', '_blank')
                    }
                  >
                    CV Download
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      window.open('/CVes-CamiloEscar.pdf', '_blank')
                    }
                  >
                    Descargar CV
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download CV</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* <TooltipProvider>
          <Tooltip open={showToolTip} onOpenChange={setShowToolTip}>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="bg-background/20 hover:bg-background/40 transition-transform transform hover:scale-105"
              >
                <Link href="/blog">
                  <Pen className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>¡Descubre historias y aprendizajes en mi blog!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="bg-background/20 hover:bg-background/40"
              >
                <Link
                  href="https://github.com/CamiloEscar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>GitHub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="bg-background/20 hover:bg-background/40"
              >
                <Link
                  href="https://www.linkedin.com/in/camiloescar/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="bg-background/20 hover:bg-background/40"
              >
                <Link href="mailto:camiloescar1995@gmail.com">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Email</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/20 hover:bg-background/40"
                onClick={cycleTheme}
              >
                {getThemeIcon()}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      <motion.nav
        className="fixed z-50 w-full bottom-20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <motion.div
              className="flex items-center gap-2 px-6 py-3 bg-background/10 backdrop-blur-md rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {itemsNavbar.map((item) => (
                <TooltipProvider key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={item.link}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-foreground/60 hover:text-foreground"
                          >
                            {item.icon}
                          </Button>
                        </Link>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
