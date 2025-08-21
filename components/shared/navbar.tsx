/* eslint-disable no-unused-vars */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Github,
  Linkedin,
  Mail,
  Sun,
  Moon,
  ArrowUp,
  Menu,
  Layers,
  Pen,
  Paperclip,
  Type,
  EyeOff,
  Minus,
  Plus,
  Palette,
  Move,
  RotateCcw,
  Shuffle,
  Sunrise,
  Sunset,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { itemsNavbar } from '@/data';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const links = [
  { id: 1, title: 'Home', icon: <Paperclip className="h-5 w-5" />, link: '/' },
  {
    id: 2,
    title: 'MiniPortfolio',
    icon: <Layers className="h-5 w-5" />,
    link: '/minimal',
  },
  { id: 3, title: 'Blog', icon: <Pen className="h-5 w-5" />, link: '/blog' },
];

export default function EnhancedNavBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { setTheme, theme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTopNav, setShowTopNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dragControls = useDragControls();
  const navRef = useRef(null);
  const [navItems, setNavItems] = useState(itemsNavbar);

  const [navConfig, setNavConfig] = useState({
    position: 'bottom',
    style: 'floating',
    iconSize: 20,
    spacing: 2,
    opacity: 0.1,
    blur: 8,
    showLabels: false,
    animation: 'spring',
    border: true,
    shadow: true,
    hideOnScroll: true,
    iconStyle: 'ghost',
    alignment: 'center',
    labelPosition: 'bottom',
    containerWidth: 'normal',
    cornerRadius: 'full',
    draggable: false,
    color: '#ffffff',
    textColor: '#000000',
    rotationAngle: 0,
    navbarStyle: 'default',
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      const scrollingDown = currentPosition > lastScrollY;

      setScrollPosition(currentPosition);
      setShowBackToTop(currentPosition > 300);
      if (navConfig.hideOnScroll) {
        setShowTopNav(!scrollingDown || currentPosition < 100);
      }
      setLastScrollY(currentPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, navConfig.hideOnScroll]);

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'sunrise', 'sunset'];
    const currentIndex = themes.indexOf(theme || 'light');
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'sunrise':
        return <Sunrise className="h-5 w-5" />;
      case 'sunset':
        return <Sunset className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  // Add theme selection radio group in the sheet content
  const ThemeSelector = () => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Tema</Label>
      <RadioGroup
        value={theme}
        onValueChange={setTheme}
        className="grid grid-cols-2 gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="light" id="light" />
          <Label htmlFor="light">Claro</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="dark" id="dark" />
          <Label htmlFor="dark">Oscuro</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sunrise" id="sunrise" />
          <Label htmlFor="sunrise">Amanecer</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sunset" id="sunset" />
          <Label htmlFor="sunset">Atardecer</Label>
        </div>
      </RadioGroup>
    </div>
  );
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateConfig = (key: string, value: string | number | boolean) => {
    setNavConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getAnimationProps = () => {
    switch (navConfig.animation) {
      case 'spring':
        return {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        };
      case 'bounce':
        return {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        };
      case 'smooth':
        return {
          type: 'tween',
          duration: 0.3,
        };
      default:
        return {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        };
    }
  };

  const getContainerClasses = () => {
    const base = 'flex items-center px-6 py-3 border-white/10';
    const width =
      navConfig.containerWidth === 'narrow'
        ? 'max-w-md'
        : navConfig.containerWidth === 'wide'
        ? 'w-full'
        : 'w-auto';
    const radius =
      navConfig.cornerRadius === 'none'
        ? ''
        : navConfig.cornerRadius === 'medium'
        ? 'rounded-lg'
        : 'rounded-full';
    const shadow = navConfig.shadow ? 'shadow-lg' : '';
    const border = navConfig.border ? 'border' : '';
    const alignment =
      navConfig.alignment === 'left'
        ? 'justify-start'
        : navConfig.alignment === 'right'
        ? 'justify-end'
        : 'justify-center';
    const gap = `gap-${navConfig.spacing}`;

    return `${base} ${width} ${radius} ${shadow} ${border} ${alignment} ${gap}`;
  };

  const shuffleNavItems = () => {
    const shuffled = [...navItems].sort(() => Math.random() - 0.5);
    setNavItems(shuffled);
  };

  const getNavbarPosition = () => {
    switch (navConfig.position) {
      case 'left':
        return { left: 0, top: '50%', transform: 'translateY(-50%)' };
      case 'right':
        return { right: 0, top: '50%', transform: 'translateY(-50%)' };
      case 'top':
        return { top: 0, left: '50%', transform: 'translateX(-50%)' };
      default: // bottom
        return { bottom: 8, left: '50%', transform: 'translateX(-50%)' };
    }
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <AnimatePresence>
        {showTopNav && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/5 backdrop-blur-sm border-b border-white/10"
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-lg font-bold"
                >
                  <Link href="/">
                    <Image src="/logo.png" alt="Camilo Escar" width={120} height={80} />
                  </Link>
                </motion.div>

                <div className="flex items-center space-x-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-background/10 hover:bg-background/20"
                      >
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="w-[300px] sm:w-[400px] bg-background/80 backdrop-blur-lg overflow-y-auto"
                    >
                      <div className="flex flex-col space-y-6 mt-8">
                        <div className="grid grid-cols-2 gap-4">
                          {links.map((item) => (
                            <motion.div
                              key={item.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                className="w-full justify-start gap-2 bg-background/50"
                                asChild
                              >
                                <Link href={item.link}>
                                  {item.icon}
                                  <span>{item.title}</span>
                                </Link>
                              </Button>
                            </motion.div>
                          ))}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="w-full justify-start gap-2 bg-background/50"
                              asChild
                            >
                              <Link
                                href="https://github.com/CamiloEscar"
                                target="_blank"
                              >
                                <Github className="h-5 w-5" />
                                <span>CamiloEscar</span>
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="w-full justify-start gap-2 bg-background/50"
                              asChild
                            >
                              <Link
                                href="https://www.linkedin.com/in/camiloescar/"
                                target="_blank"
                              >
                                <Linkedin className="h-5 w-5" />
                                <span>in/camiloescar</span>
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="w-full justify-start gap-2 bg-background/50"
                              asChild
                            >
                              <Link href="mailto:camiloescar1995@gmail.com">
                                <Mail className="h-5 w-5" />
                                <span>Email</span>
                              </Link>
                            </Button>
                          </motion.div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Download CV
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-background/50"
                                onClick={() =>
                                  window.open('/CVen-CamiloEscar.pdf', '_blank')
                                }
                              >
                                English
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-background/50"
                                onClick={() =>
                                  window.open('/CVes-CamiloEscar.pdf', '_blank')
                                }
                              >
                                Español
                              </Button>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold">
                              Personalización
                            </h3>

                            {/* Navbar Position */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <Move className="h-4 w-4" /> Posición del Navbar
                              </Label>
                              <Select
                                value={navConfig.position}
                                onValueChange={(value) =>
                                  updateConfig('position', value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bottom">Abajo</SelectItem>
                                  <SelectItem value="left">
                                    Izquierda
                                  </SelectItem>
                                  <SelectItem value="right">Derecha</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Navbar Style */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <Palette className="h-4 w-4" /> Estilo del
                                Navbar
                              </Label>
                              <Select
                                value={navConfig.navbarStyle}
                                onValueChange={(value) =>
                                  updateConfig('navbarStyle', value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="default">
                                    Por defecto
                                  </SelectItem>
                                  <SelectItem value="glass">Cristal</SelectItem>
                                  <SelectItem value="solid">Sólido</SelectItem>
                                  <SelectItem value="gradient">
                                    Gradiente
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Color Picker */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <Palette className="h-4 w-4" /> Color de Fondo
                              </Label>
                              <Input
                                type="color"
                                value={navConfig.color}
                                onChange={(e) =>
                                  updateConfig('color', e.target.value)
                                }
                              />
                            </div>

                            {/* Text Color Picker */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <Type className="h-4 w-4" /> Color de Texto
                              </Label>
                              <Input
                                type="color"
                                value={navConfig.textColor}
                                onChange={(e) =>
                                  updateConfig('textColor', e.target.value)
                                }
                              />
                            </div>

                            {/* Opacidad del Fondo */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <EyeOff className="h-4 w-4" /> Opacidad del
                                Fondo
                              </Label>
                              <Slider
                                value={[navConfig.opacity]}
                                min={0}
                                max={1}
                                step={0.1}
                                onValueChange={([value]) =>
                                  updateConfig('opacity', value)
                                }
                              />
                            </div>

                            {/* Tamaño de Iconos */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <Plus className="h-4 w-4" /> Tamaño de Iconos
                              </Label>
                              <Slider
                                value={[navConfig.iconSize]}
                                min={16}
                                max={32}
                                step={2}
                                onValueChange={([value]) =>
                                  updateConfig('iconSize', value)
                                }
                              />
                            </div>

                            {/* Espaciado */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <Minus className="h-4 w-4" /> Espaciado
                              </Label>
                              <Slider
                                value={[navConfig.spacing]}
                                min={1}
                                max={6}
                                step={1}
                                onValueChange={([value]) =>
                                  updateConfig('spacing', value)
                                }
                              />
                            </div>

                            {/* Icon Style */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <Palette className="h-4 w-4" /> Estilo de Iconos
                              </Label>
                              <RadioGroup
                                value={navConfig.iconStyle}
                                onValueChange={(value) =>
                                  updateConfig('iconStyle', value)
                                }
                                className="flex space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="filled" id="filled" />
                                  <Label htmlFor="filled">Relleno</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="ghost" id="ghost" />
                                  <Label htmlFor="ghost">Fantasma</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="thin" id="thin" />
                                  <Label htmlFor="thin">Delgado</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            {/* Additional Options */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">
                                  Mostrar Etiquetas
                                </Label>
                                <Switch
                                  checked={navConfig.showLabels}
                                  onCheckedChange={(checked) =>
                                    updateConfig('showLabels', checked)
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">
                                  Borde
                                </Label>
                                <Switch
                                  checked={navConfig.border}
                                  onCheckedChange={(checked) =>
                                    updateConfig('border', checked)
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">
                                  Sombra
                                </Label>
                                <Switch
                                  checked={navConfig.shadow}
                                  onCheckedChange={(checked) =>
                                    updateConfig('shadow', checked)
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">
                                  Ocultar al Desplazar
                                </Label>
                                <Switch
                                  checked={navConfig.hideOnScroll}
                                  onCheckedChange={(checked) =>
                                    updateConfig('hideOnScroll', checked)
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">
                                  Arrastrable
                                </Label>
                                <Switch
                                  checked={navConfig.draggable}
                                  onCheckedChange={(checked) =>
                                    updateConfig('draggable', checked)
                                  }
                                />
                              </div>
                            </div>

                            {/* Shuffle Items Button */}
                            <Button
                              onClick={shuffleNavItems}
                              className="w-full"
                            >
                              <Shuffle className="mr-2 h-4 w-4" /> Mezclar
                              Elementos
                            </Button>
                          </div>

                          <div className="flex flex-col space-y-4">
                            <Separator />
                            <ThemeSelector />
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Tema</span>
                            <Button
                            variant="ghost"
                            size="icon"
                            className="bg-background/10 hover:bg-background/20"
                            onClick={cycleTheme}
                          >
                            {getThemeIcon()}
                          </Button>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Enhanced navigation */}
      {showTopNav && (
          <motion.nav
            ref={navRef}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              ...getNavbarPosition(),
            }}
            transition={getAnimationProps()}
            className={`fixed z-40 ${
              navConfig.position === 'left' || navConfig.position === 'right'
                ? 'w-auto h-auto'
                : 'w-full'
            }`}
            drag={navConfig.draggable}
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={false} // permite arrastrar libremente
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center">
                <motion.div
                  className={`${getContainerClasses()}`}
                  style={{
                    backgroundColor:
                      navConfig.navbarStyle === 'glass'
                        ? `rgba(${parseInt(navConfig.color.slice(1, 3), 16)}, ${parseInt(
                            navConfig.color.slice(3, 5),
                            16
                          )}, ${parseInt(navConfig.color.slice(5, 7), 16)}, ${
                            navConfig.opacity
                          })`
                        : navConfig.navbarStyle === 'solid'
                        ? navConfig.color
                        : navConfig.navbarStyle === 'gradient'
                        ? `linear-gradient(45deg, ${navConfig.color}, ${navConfig.textColor})`
                        : `${navConfig.color}${Math.floor(navConfig.opacity * 255)
                            .toString(16)
                            .padStart(2, '0')}`,
                    backdropFilter:
                      navConfig.navbarStyle === 'glass' ? 'blur(10px)' : 'none',
                    color: navConfig.textColor,
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={getAnimationProps()}
                >
                  {navItems.map((item) => (
                    <TooltipProvider key={item.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex ${
                              navConfig.labelPosition === 'right'
                                ? 'flex-row'
                                : 'flex-col'
                            } items-center`}
                          >
                            <Link href={item.link}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="bg-transparent"
                                style={{ color: navConfig.textColor }}
                              >
                                {React.cloneElement(item.icon, {
                                  size: navConfig.iconSize,
                                  strokeWidth:
                                    navConfig.iconStyle === 'thin' ? 1 : 2,
                                  fill:
                                    navConfig.iconStyle === 'filled'
                                      ? 'currentColor'
                                      : 'none',
                                })}
                              </Button>
                            </Link>
                            {navConfig.showLabels && (
                              <span
                                className={`text-xs ${
                                  navConfig.labelPosition === 'right'
                                    ? 'ml-2'
                                    : 'mt-1'
                                }`}
                              >
                                {item.title}
                              </span>
                            )}
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
        )}


      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            className="fixed z-40 bottom-4 right-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollToTop}
                    className="rounded-full shadow-lg bg-background/10 backdrop-blur-sm hover:bg-background/20 border-white/10"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Back to top</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
