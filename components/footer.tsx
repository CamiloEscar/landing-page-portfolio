import React from 'react';
import Link from 'next/link';
import { Separator } from './ui/separator';

const Footer = () => {
  return (
    <footer className="bg-transparent py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex md:justify-between items-center">
            <div>
              <h4 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 md:mb-0">
                Escar Camilo
              </h4>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
              <Link
                href="https://docs.google.com/document/d/1CvRZx0hI_KiiFPk9ok56dn2o5snL49w4cCidnHRFnXs/edit?tab=t.0"
                target='_blank'
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300"
              >
                Sobre Mi
              </Link>
              <Link
                href="#skills"
                className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300"
              >
                Skills
              </Link>
              <Link
                href="#services"
                className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300"
              >
                Servicios
              </Link>
              <Link
                href="#portfolio"
                className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300"
              >
                Portfolio
              </Link>
              <Link
                href="#contact"
                className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300"
              >
                Contacto
              </Link>
            </nav>
          </div>
          <Separator className="my-8 bg-gray-300 dark:bg-gray-700" />
          <div className="text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} | Landing Page by CamiloEscar
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
