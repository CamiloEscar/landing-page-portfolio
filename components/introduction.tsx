'use client';

import React, { useState, useEffect, useCallback, useRef, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Layers,
  Pen,
  Download,
  X,
  ChevronRight,
  ExternalLink,
  QrCode,
  Briefcase,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Typewriter } from 'react-simple-typewriter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import GradientName from './shared/GradientName';
import TechStack from './shared/TechStack';
import { dataIntroduction } from '@/data';
import { QRCodeCanvas } from 'qrcode.react';

interface ActionButtonProps {
  text: string;
  icon: React.ElementType;
  color: string;
  href: string;
}

const ActionButton: FC<ActionButtonProps> = ({ text, icon: Icon, color, href }) => (
  <motion.div
    whileHover={{ scale: 1.05, z: 20, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.95 }}
    className="w-full sm:w-auto relative"
  >
    <Button
      size="lg"
      asChild
      className={`
        w-full sm:w-auto transition-all duration-300 group font-medium
        text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3
        ${color === 'green' && 'bg-green-500 hover:bg-green-600 text-white shadow-green-200/50 dark:shadow-green-900/50'}
        ${color === 'blue'  && 'bg-blue-500  hover:bg-blue-600  text-white shadow-blue-200/50  dark:shadow-blue-900/50'}
        ${color === 'purple'&& 'bg-purple-500 hover:bg-purple-600 text-white shadow-purple-200/50 dark:shadow-purple-900/50'}
        shadow-lg hover:shadow-xl transform transition-transform
      `}
    >
      <Link href={href} className="flex items-center justify-center w-full">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" />
        <span className="flex-shrink-0">{text}</span>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0" />
      </Link>
    </Button>
  </motion.div>
);

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  color: string;
}

const SocialLink: FC<SocialLinkProps> = ({ href, icon: Icon, label, color }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 group
        ${color === 'gray' && 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'}
        ${color === 'blue' && 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/50 dark:hover:bg-blue-800/50 dark:text-blue-300'}
      `}
    >
      <Icon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
      <span className="font-medium">{label}</span>
      <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  </motion.div>
);

type CvLanguage = 'es' | 'en';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [qrSize, setQrSize] = useState(280);

  useEffect(() => {
    const updateQRSize = () => {
      if (cardRef.current) {
        const { width } = cardRef.current.getBoundingClientRect();
        setQrSize(width - 32);
      }
    };
    updateQRSize();
    window.addEventListener('resize', updateQRSize);
    return () => window.removeEventListener('resize', updateQRSize);
  }, []);

  const handleClick = () => {
    if (!isDragging) { setIsFlipped(!isFlipped); setRotation({ x: 0, y: 0 }); }
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && cardRef.current) {
      const { width, height } = cardRef.current.getBoundingClientRect();
      setRotation({
        x: -((e.clientY - startPosition.y) / height) * 180,
        y:  ((e.clientX - startPosition.x) / width)  * 180,
      });
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    if (Math.abs(rotation.y) > 90) setIsFlipped(!isFlipped);
    setRotation({ x: 0, y: 0 });
  };
  const handleMouseLeave = () => {
    if (isDragging) { handleMouseUp(); }
  };

  return (
    <div
      ref={cardRef}
      className="flip-card w-full h-full cursor-pointer"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flip-card-inner w-full h-full transition-transform duration-300 ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isFlipped ? 'rotateY(180deg)' : ''}` }}
      >
        {/* FRONT */}
        <div className="flip-card-front w-full h-full">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">

            {/* Fondo glassmorphism estilo iOS */}
            <div className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}
            />

            {/* Orbes de color difuminados detrás (dan el efecto iOS colorido) */}
            <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full opacity-40 blur-2xl"
              style={{ background: 'radial-gradient(circle, #34d399, transparent)' }} />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-40 blur-2xl"
              style={{ background: 'radial-gradient(circle, #38bdf8, transparent)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-20 blur-2xl"
              style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />

            {/* Imagen con fondo transparente, más grande */}
            <div className="absolute inset-0 flex items-end justify-center">
              <Image
                src="/profile2.png"
                alt="Profile"
                fill
                style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                className="z-10 scale-110 drop-shadow-2xl"
                priority
              />
            </div>

            {/* Borde interno sutil (rim light estilo iOS) */}
            <div className="absolute inset-0 rounded-3xl z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
              }}
            />

            {/* Botón QR */}
            <Button className="absolute bottom-4 right-4 z-30 backdrop-blur-md bg-white/30 hover:bg-white/50 dark:bg-white/20 dark:hover:bg-white/30 text-gray-800 dark:text-white border border-white/40 shadow-lg rounded-xl transition-all duration-200">
              <QrCode className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back w-full h-full rotate-y-180 rounded-3xl overflow-hidden">
          <div className="w-full h-full flex flex-col items-center justify-center p-4 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.35)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium tracking-wide uppercase">Contacto rápido</p>
            <QRCodeCanvas
              value="https://wa.me/5493442475466?text=Hola%20Camilo%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20contactarme%20contigo%20%F0%9F%91%8B"
              size={qrSize} bgColor="transparent" fgColor="#1a1a1a" level="H"
              imageSettings={{ src: '/', x: undefined, y: undefined, height: qrSize * 0.2, width: qrSize * 0.2, excavate: true }}
              className="w-full h-auto rounded-xl"
            />
            <p className="text-xs text-gray-400 mt-3">Escaneá para escribirme por WhatsApp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollIndicator = () => (
  <div className="relative w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 p-1">
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full mx-auto"
    />
  </div>
);

export default function Introduction() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [cvLanguage, setCvLanguage] = useState<CvLanguage>('es');
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [viewType, setViewType] = useState('pdf');

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const imageRef     = useRef<HTMLDivElement>(null);

  const { greetings, roles, description, buttons, socialLinks, cv, scroll } = dataIntroduction[0];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const moveX = ((left + width / 2) - e.clientX) / 50;
      const moveY = ((top + height / 2) - e.clientY) / 50;
      if (cardRef.current)  cardRef.current.style.transform  = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
      if (imageRef.current) imageRef.current.style.transform = `translate(${moveX * 0.4}px, ${moveY * 0.4}px)`;
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollIndicator(window.scrollY <= 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cycleGreeting = useCallback(() => {
    setCurrentGreetingIndex(prev => (prev + 1) % greetings.length);
  }, [greetings.length]);

  useEffect(() => {
    const id = setInterval(cycleGreeting, 3000);
    return () => clearInterval(id);
  }, [cycleGreeting]);

  const handleCVOpen = (language: CvLanguage) => { setCvLanguage(language); setIsCVOpen(true); };

  const docsLinks: Record<CvLanguage, string> = {
    es: 'https://docs.google.com/document/d/1CvRZx0hI_KiiFPk9ok56dn2o5snL49w4cCidnHRFnXs/preview',
    en: 'https://docs.google.com/document/d/1b4_exJllgBVQ6j0ISaJPk_F2Y4pphwzQinM4XDUknFY/preview',
  };

  const getSwitchLanguageText = () => cvLanguage === 'en' ? 'Ver CV en Español' : 'View CV in English';

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 relative">
          <motion.div
            ref={cardRef}
            className="w-full lg:w-3/5 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ transition: 'transform 0.3s ease-out' }}
          >
            <Card data-hero-card className="w-full backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border-white/20 dark:border-gray-700/20 shadow-xl">
              <CardContent className="p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={currentGreetingIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl sm:text-2xl mb-4 text-gray-600 dark:text-gray-400 font-light"
                  >
                    {greetings[currentGreetingIndex]}
                  </motion.h3>
                </AnimatePresence>

                <GradientName size="large" className="font-bold mb-4 lg:mb-6">
                  Camilo Escar
                </GradientName>

                <div className="h-[40px] mb-6">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-800 dark:text-gray-200">
                    <Typewriter words={roles} loop cursor cursorStyle="|" typeSpeed={70} deleteSpeed={50} delaySpeed={1500} />
                  </h2>
                </div>

                <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  {description.before}
                  <GradientName size="small" className="mx-1 font-bold font-mono" technology={description.nodeText}>{description.nodeText}</GradientName>
                  {description.middle}
                  <GradientName size="small" className="mx-1 font-bold font-mono" technology={description.reactText}>{description.reactText}</GradientName>
                  {description.y}
                  <GradientName size="small" className="mx-1 font-bold font-mono" technology={description.nextText}>{description.nextText}</GradientName>
                  {description.after}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <ActionButton text={buttons.portfolioPage} icon={Briefcase} color="green" href="/portfolio" />
                  <ActionButton text={buttons.portfolio}     icon={Layers}    color="blue"  href="/minimal" />
                  <ActionButton text={buttons.blog}          icon={Pen}       color="purple" href="/blog" />
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                  <SocialLink href="https://github.com/CamiloEscar"           icon={Github}   label={socialLinks.github}   color="gray" />
                  <SocialLink href="https://www.linkedin.com/in/camiloescar/" icon={Linkedin} label={socialLinks.linkedin} color="blue" />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className="bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 font-medium">
                          <Download className="mr-2 w-5 h-5" />
                          {cv.button}
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleCVOpen('en')}>View CV in English</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCVOpen('es')}>Ver CV en Español</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap gap-3">
                  <TechStack />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            ref={imageRef}
            className="w-full lg:w-2/5 lg:absolute lg:right-20 z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ transition: 'transform 0.3s ease-out' }}
          >
            <div className="relative aspect-square max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] mx-auto lg:ml-auto">
              <FlipCard />
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-8 right-8 text-center z-50"
          >
            <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <ScrollIndicator />
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
                className="mt-4 text-sm font-bold text-gray-600 dark:text-gray-400 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                {scroll}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isCVOpen} onOpenChange={setIsCVOpen}>
        <DialogContent className="p-0 flex flex-col h-[90vh] sm:max-w-[900px]">
          <DialogHeader className="p-6 border-b bg-white/40 dark:bg-gray-900/40">
            <div className="flex items-center justify-between w-full">
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
                  {cv.dialog.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  {cv.dialog.description}
                </DialogDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant={viewType === 'pdf'  ? 'default' : 'outline'} onClick={() => setViewType('pdf')}>PDF</Button>
                <Button size="sm" variant={viewType === 'docs' ? 'default' : 'outline'} onClick={() => setViewType('docs')}>Docs</Button>
                {viewType === 'docs' && (
                  <a href={docsLinks[cvLanguage]} target="_blank" className="text-sm underline text-blue-500">Abrir en Google Docs</a>
                )}
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1">
            <iframe
              src={viewType === 'pdf' ? `/CV${cvLanguage}-CamiloEscar.pdf` : docsLinks[cvLanguage]}
              className="w-full h-full"
            />
          </div>

          <div className="flex justify-between items-center p-4 border-t bg-white/40 dark:bg-gray-900/40">
            <Button variant="outline" onClick={() => setCvLanguage(cvLanguage === 'en' ? 'es' : 'en')}>
              {getSwitchLanguageText()}
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setIsCVOpen(false)}>
                <X className="mr-2 h-4 w-4" />{cv.dialog.close}
              </Button>
              {viewType === 'pdf' && (
                <Button onClick={() => window.open(`/CV${cvLanguage}-CamiloEscar.pdf`, '_blank')} className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white">
                  <Download className="mr-2 h-4 w-4" />{cv.dialog.download}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}