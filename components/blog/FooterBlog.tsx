import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Linkedin, Github, ArrowUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { dataContact } from '../../data';
import { AnimatePresence, motion } from 'framer-motion';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/camiloescar/', label: 'LinkedIn', color: 'hover:text-[#0a66c2]' },
  { icon: Github, href: 'https://github.com/CamiloEscar', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
];

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: 'https://docs.google.com/document/d/1CvRZx0hI_KiiFPk9ok56dn2o5snL49w4cCidnHRFnXs/edit?tab=t.0', label: 'CV' },
  { href: '/links', label: 'Contact' },
];

export default function FooterBlog() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-card/50 border-t relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Camilo Escar</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Desarrollador web creando experiencias digitales excepcionales. 
              Compartiendo conocimientos y explorando nuevas tecnologías.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors duration-200 ${color}`}
                >
                  <Icon size={20} />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Enlaces Rápidos</h2>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target='_blank'
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary"></span>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Contacto</h2>
            <ul className="space-y-4">
              {dataContact.map(contact => (
                <li key={contact.id} className="flex items-start space-x-3">
                  <div className="mt-1 p-2 bg-primary/10 rounded-md">
                    {contact.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{contact.title}</h3>
                    <a
                      href={contact.link}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {contact.subtitle}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Scroll to Top Section */}
          <div className="space-y-4">
            <Button 
              onClick={scrollToTop}
              className="w-full group"
              variant="outline"
            >
              <ArrowUp className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
              Volver Arriba
            </Button>
          </div>
        </div>

        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Camilo Escar. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Política de Privacidad
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="rounded-full shadow-lg"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}