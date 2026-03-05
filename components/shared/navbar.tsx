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
  X,
  Download,
  Settings2,
  ExternalLink,
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
import CommandPalette from './CommandPalette';

const links = [
  { id: 1, title: 'Home',          icon: <Paperclip className="h-4 w-4" />, link: '/'        },
  { id: 2, title: 'MiniPortfolio', icon: <Layers    className="h-4 w-4" />, link: '/minimal' },
  { id: 3, title: 'Blog',          icon: <Pen       className="h-4 w-4" />, link: '/blog'    },
];

const THEMES = ['light', 'dark', 'sunrise', 'sunset'] as const;

const themeConfig = {
  light:   { icon: Sun,     label: 'Claro',      color: '#f97316' },
  dark:    { icon: Moon,    label: 'Oscuro',     color: '#818cf8' },
  sunrise: { icon: Sunrise, label: 'Amanecer',   color: '#fbbf24' },
  sunset:  { icon: Sunset,  label: 'Atardecer',  color: '#fb923c' },
} as const;

export default function EnhancedNavBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { setTheme, theme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTopNav, setShowTopNav]       = useState(true);
  const [lastScrollY, setLastScrollY]     = useState(0);
  const [sheetOpen, setSheetOpen]         = useState(false);
  const dragControls = useDragControls();
  const navRef = useRef(null);
  const [navItems, setNavItems] = useState(itemsNavbar);

  const [navConfig, setNavConfig] = useState({
    position:       'bottom',
    style:          'floating',
    iconSize:       20,
    spacing:        2,
    opacity:        0.1,
    blur:           8,
    showLabels:     false,
    animation:      'spring',
    border:         true,
    shadow:         true,
    hideOnScroll:   false,
    iconStyle:      'ghost',
    alignment:      'center',
    labelPosition:  'bottom',
    containerWidth: 'normal',
    cornerRadius:   'full',
    draggable:      false,
    color:          '#ffffff',
    textColor:      '#000000',
    rotationAngle:  0,
    navbarStyle:    'default',
  });

  const currentTheme = (theme ?? 'light') as typeof THEMES[number];

  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      setScrollPosition(cur);
      setShowBackToTop(cur > 300);
      if (navConfig.hideOnScroll) {
        setShowTopNav(cur < lastScrollY || cur < 100);
      } else {
        setShowTopNav(true);
      }
      setLastScrollY(cur);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, navConfig.hideOnScroll]);

  const cycleTheme = () => {
    const next = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length];
    setTheme(next);
    // Resetear colores del navbar inferior al cambiar tema
    setNavConfig(p => ({ ...p, color: '#ffffff', textColor: '#000000' }));
  };

  const ThemeIcon = themeConfig[currentTheme]?.icon ?? Sun;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const updateConfig = (key: string, value: string | number | boolean) =>
    setNavConfig((p) => ({ ...p, [key]: value }));

  const getAnimationProps = () =>
    navConfig.animation === 'bounce' ? { type: 'spring', stiffness: 400, damping: 10 }
    : navConfig.animation === 'smooth' ? { type: 'tween', duration: 0.3 }
    : { type: 'spring', stiffness: 300, damping: 30 };

  // Convierte hex + alpha a rgba() — evita el bug de hex de 8 dígitos
  const hexToRgba = (hex: string, alpha: number) => {
    const clean = hex.replace('#', '');
    const full  = clean.length === 3
      ? clean.split('').map(c => c + c).join('')
      : clean.padEnd(6, '0');
    const r = parseInt(full.slice(0, 2), 16) || 0;
    const g = parseInt(full.slice(2, 4), 16) || 0;
    const b = parseInt(full.slice(4, 6), 16) || 0;
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const getContainerClasses = () => {
    const base    = 'flex items-center px-6 py-3';
    const width   = navConfig.containerWidth === 'narrow' ? 'max-w-md' : navConfig.containerWidth === 'wide' ? 'w-full' : 'w-auto';
    const radius  = navConfig.cornerRadius === 'none' ? '' : navConfig.cornerRadius === 'medium' ? 'rounded-lg' : 'rounded-full';
    const shadow  = navConfig.shadow ? 'shadow-lg' : '';
    const border  = navConfig.border ? 'border border-white/10' : '';
    const align   = navConfig.alignment === 'left' ? 'justify-start' : navConfig.alignment === 'right' ? 'justify-end' : 'justify-center';
    const gap     = `gap-${navConfig.spacing}`;
    return `${base} ${width} ${radius} ${shadow} ${border} ${align} ${gap}`;
  };

  const shuffleNavItems = () => setNavItems([...navItems].sort(() => Math.random() - 0.5));

  const getNavbarPosition = () => {
    switch (navConfig.position) {
      case 'left':  return { left: 0,    top: '50%', transform: 'translateY(-50%)' };
      case 'right': return { right: 0,   top: '50%', transform: 'translateY(-50%)' };
      case 'top':   return { top: 0,     left: '50%', transform: 'translateX(-50%)' };
      default:      return { bottom: 8,  left: '50%', transform: 'translateX(-50%)' };
    }
  };

  const scrolled = scrollPosition > 20;

  return (
    <>
      {/* ── Top Navigation Bar ─────────────────────────────────── */}
      <AnimatePresence>
        {showTopNav && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-[100]"
          >
            {/* Fondo con transición sutil al hacer scroll */}
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundColor: scrolled ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0)',
                backdropFilter:  scrolled ? 'blur(16px)' : 'blur(0px)',
              }}
              transition={{ duration: 0.3 }}
              style={{ borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
            />

            <div className="relative container mx-auto px-4">
              <div className="flex items-center justify-between h-16">

                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-3"
                >
                  <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Camilo Escar" width={110} height={70} className="relative z-10" />
                  </Link>
                  {/* Indicador de posición — línea activa bajo el logo */}
                  <motion.div
                    className="absolute -bottom-0.5 left-0 h-px"
                    style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.5), transparent)' }}
                    initial={{ width: 0 }}
                    animate={{ width: scrolled ? '100%' : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>

                {/* Acciones derechas */}
                <div className="flex items-center gap-1">

                  <CommandPalette
                    showTrigger={true}
                    className="hidden md:flex"   // oculto en mobile si querés
                  />

                  {/* Botón de tema — cicla los 4 */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          onClick={cycleTheme}
                          className="relative w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
                          style={{ background: 'rgba(255,255,255,0.06)' }}
                          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.12)' }}
                          whileTap={{ scale: 0.92 }}
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentTheme}
                              initial={{ opacity: 0, rotate: -20, scale: 0.7 }}
                              animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                              exit={{   opacity: 0, rotate:  20,  scale: 0.7 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ThemeIcon className="h-4 w-4" />
                            </motion.div>
                          </AnimatePresence>
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        {themeConfig[currentTheme]?.label} → {themeConfig[THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length]]?.label}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Separador vertical */}
                  <div className="h-5 w-px bg-white/15 mx-1" />

                  {/* Social links — compactos */}
                  {[
                    { href: 'https://github.com/CamiloEscar',              icon: Github,   label: 'GitHub'   },
                    { href: 'https://www.linkedin.com/in/camiloescar/',    icon: Linkedin, label: 'LinkedIn' },
                    { href: 'mailto:camiloescar1995@gmail.com',            icon: Mail,     label: 'Email'    },
                  ].map(({ href, icon: Icon, label }) => (
                    <TooltipProvider key={label}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-colors"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }}
                            whileTap={{ scale: 0.92 }}
                          >
                            <Icon className="h-4 w-4" />
                          </motion.a>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}

                  <div className="h-5 w-px bg-white/15 mx-1" />

                  {/* Menu sheet */}
                  <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                      <motion.button
                        className="w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.12)' }}
                        whileTap={{ scale: 0.92 }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={sheetOpen ? 'x' : 'menu'}
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0   }}
                            exit={{   opacity: 0, rotate:  90  }}
                            transition={{ duration: 0.15 }}
                          >
                            {sheetOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                          </motion.div>
                        </AnimatePresence>
                      </motion.button>
                    </SheetTrigger>

                    <SheetContent
                      side="right"
                      className="w-[320px] sm:w-[380px] p-0 border-l border-white/10 overflow-hidden"
                      style={{ background: 'rgba(8,10,24,0.97)', backdropFilter: 'blur(24px)' }}
                    >
                      <div className="flex flex-col h-full overflow-y-auto">

                        {/* Sheet header */}
                        <div className="px-6 pt-8 pb-4 border-b border-white/06">
                          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1">Portfolio</p>
                          <h2 className="text-lg font-bold text-white">Camilo Escar</h2>
                          <p className="text-sm text-white/40 mt-0.5">Desarrollador Fullstack</p>
                        </div>

                        <div className="flex-1 px-6 py-5 space-y-6">

                          {/* Páginas */}
                          <div>
                            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-3">Páginas</p>
                            <div className="space-y-1">
                              {links.map((item) => (
                                <motion.div key={item.id} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                                  <Link
                                    href={item.link}
                                    onClick={() => setSheetOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/06 transition-colors text-sm"
                                  >
                                    <span className="text-white/30">{item.icon}</span>
                                    {item.title}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <Separator className="bg-white/06" />

                          {/* Social */}
                          <div>
                            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-3">Contacto</p>
                            <div className="space-y-1">
                              {[
                                { href: 'https://github.com/CamiloEscar',           icon: Github,   label: 'CamiloEscar',          sub: 'GitHub'   },
                                { href: 'https://www.linkedin.com/in/camiloescar/', icon: Linkedin, label: 'in/camiloescar',        sub: 'LinkedIn' },
                                { href: 'mailto:camiloescar1995@gmail.com',         icon: Mail,     label: 'camiloescar1995@gmail', sub: 'Email'    },
                              ].map(({ href, icon: Icon, label, sub }) => (
                                <motion.a
                                  key={sub}
                                  href={href}
                                  target={href.startsWith('http') ? '_blank' : undefined}
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/06 transition-colors group"
                                  whileHover={{ x: 4 }}
                                  transition={{ type: 'spring', stiffness: 400 }}
                                >
                                  <span className="text-white/30"><Icon className="h-4 w-4" /></span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm truncate">{label}</p>
                                    <p className="text-xs text-white/30">{sub}</p>
                                  </div>
                                  <ExternalLink className="h-3 w-3 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.a>
                              ))}
                            </div>
                          </div>

                          <Separator className="bg-white/06" />

                          {/* CV */}
                          <div>
                            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-3">Currículum</p>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { label: 'English', file: '/CVen-CamiloEscar.pdf' },
                                { label: 'Español', file: '/CVes-CamiloEscar.pdf' },
                              ].map(({ label, file }) => (
                                <motion.button
                                  key={label}
                                  onClick={() => window.open(file, '_blank')}
                                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white transition-colors border border-white/08 hover:border-white/20 hover:bg-white/05"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.97 }}
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  {label}
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          <Separator className="bg-white/06" />

                          {/* Tema */}
                          <div>
                            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-3">Tema</p>
                            <div className="grid grid-cols-2 gap-2">
                              {THEMES.map((t) => {
                                const cfg = themeConfig[t];
                                const Icon = cfg.icon;
                                const active = currentTheme === t;
                                return (
                                  <motion.button
                                    key={t}
                                    onClick={() => {
                                      setTheme(t);
                                      setNavConfig(p => ({ ...p, color: '#ffffff', textColor: '#000000' }));
                                    }}
                                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all border"
                                    style={{
                                      background:   active ? `${cfg.color}18` : 'transparent',
                                      borderColor:  active ? `${cfg.color}50` : 'rgba(255,255,255,0.08)',
                                      color:        active ? cfg.color : 'rgba(255,255,255,0.5)',
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                  >
                                    <Icon className="h-4 w-4" />
                                    {cfg.label}
                                    {active && (
                                      <motion.div
                                        layoutId="activeThemeDot"
                                        className="ml-auto w-1.5 h-1.5 rounded-full"
                                        style={{ background: cfg.color }}
                                      />
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>

                          <Separator className="bg-white/06" />

                          {/* Personalización del navbar inferior */}
                          <div>
                            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-4 flex items-center gap-2">
                              <Settings2 className="h-3 w-3" /> Navbar inferior
                            </p>
                            <div className="space-y-4">

                              <div className="space-y-1.5">
                                <Label className="text-xs text-white/50">Posición</Label>
                                <Select value={navConfig.position} onValueChange={(v) => updateConfig('position', v)}>
                                  <SelectTrigger className="h-9 bg-white/05 border-white/10 text-white/70 text-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="bottom">Abajo</SelectItem>
                                    <SelectItem value="left">Izquierda</SelectItem>
                                    <SelectItem value="right">Derecha</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs text-white/50">Tamaño de íconos — {navConfig.iconSize}px</Label>
                                <Slider value={[navConfig.iconSize]} min={16} max={32} step={2}
                                  onValueChange={([v]) => updateConfig('iconSize', v)}
                                  className="mt-1" />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs text-white/50">Espaciado — {navConfig.spacing}</Label>
                                <Slider value={[navConfig.spacing]} min={1} max={6} step={1}
                                  onValueChange={([v]) => updateConfig('spacing', v)} />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs text-white/50">Opacidad — {Math.round(navConfig.opacity * 100)}%</Label>
                                <Slider value={[navConfig.opacity]} min={0} max={1} step={0.05}
                                  onValueChange={([v]) => updateConfig('opacity', v)} />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                {[
                                  { label: 'Etiquetas',   key: 'showLabels'   },
                                  { label: 'Borde',       key: 'border'       },
                                  { label: 'Sombra',      key: 'shadow'       },
                                  { label: 'Ocultar',     key: 'hideOnScroll' },
                                  { label: 'Arrastrable', key: 'draggable'    },
                                ].map(({ label, key }) => (
                                  <div key={key} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/04 border border-white/06">
                                    <Label className="text-xs text-white/50">{label}</Label>
                                    <Switch
                                      checked={navConfig[key as keyof typeof navConfig] as boolean}
                                      onCheckedChange={(c) => updateConfig(key, c)}
                                      className="scale-75"
                                    />
                                  </div>
                                ))}
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <Label className="text-xs text-white/50">Color fondo</Label>
                                  <Input type="color" value={navConfig.color}
                                    onChange={(e) => updateConfig('color', e.target.value)}
                                    className="h-9 bg-white/05 border-white/10 cursor-pointer" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs text-white/50">Color texto</Label>
                                  <Input type="color" value={navConfig.textColor}
                                    onChange={(e) => updateConfig('textColor', e.target.value)}
                                    className="h-9 bg-white/05 border-white/10 cursor-pointer" />
                                </div>
                              </div>

                              <motion.button
                                onClick={shuffleNavItems}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white border border-white/08 hover:border-white/20 hover:bg-white/05 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                <Shuffle className="h-3.5 w-3.5" />
                                Mezclar elementos
                              </motion.button>

                            </div>
                          </div>
                        </div>

                        {/* Footer del panel */}
                        <div className="px-6 py-4 border-t border-white/06">
                          <p className="text-xs text-white/20 text-center">Camilo Escar · {new Date().getFullYear()}</p>
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

      {/* ── Bottom floating nav ─────────────────────────────────── */}
      <AnimatePresence>
        {showTopNav && (
          <motion.nav
            ref={navRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, ...getNavbarPosition() }}
            exit={{ opacity: 0, y: 20 }}
            transition={getAnimationProps()}
            className={`fixed z-40 ${
              navConfig.position === 'left' || navConfig.position === 'right' ? 'w-auto h-auto' : 'w-full'
            }`}
            drag={navConfig.draggable}
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={false}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center">
                <motion.div
                  className={getContainerClasses()}
                  style={{
                    backgroundColor:
                      navConfig.navbarStyle === 'solid'    ? navConfig.color
                      : navConfig.navbarStyle === 'gradient' ? undefined
                      : hexToRgba(navConfig.color, navConfig.opacity),
                    background:
                      navConfig.navbarStyle === 'gradient'
                        ? `linear-gradient(45deg, ${navConfig.color}, ${navConfig.textColor})`
                        : undefined,
                    backdropFilter: navConfig.navbarStyle === 'glass' ? 'blur(10px)' : 'blur(8px)',
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
                            whileHover={{ scale: 1.15, y: -2 }}
                            whileTap={{ scale: 0.92 }}
                            className={`flex ${navConfig.labelPosition === 'right' ? 'flex-row' : 'flex-col'} items-center`}
                          >
                            <Link href={item.link}>
                              <Button variant="ghost" size="icon" className="bg-transparent hover:bg-white/10"
                                style={{ color: navConfig.textColor }}>
                                {React.cloneElement(item.icon, {
                                  size: navConfig.iconSize,
                                  strokeWidth: navConfig.iconStyle === 'thin' ? 1 : 2,
                                  fill: navConfig.iconStyle === 'filled' ? 'currentColor' : 'none',
                                })}
                              </Button>
                            </Link>
                            {navConfig.showLabels && (
                              <span className={`text-xs opacity-60 ${navConfig.labelPosition === 'right' ? 'ml-2' : 'mt-0.5'}`}>
                                {item.title}
                              </span>
                            )}
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent><p>{item.title}</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Back to Top ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            className="fixed z-40 bottom-6 right-6"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{   opacity: 0, scale: 0.7,  y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={scrollToTop}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-colors border border-white/10 hover:border-white/25"
                    style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.14)' }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="left" className="text-xs">Volver arriba</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}