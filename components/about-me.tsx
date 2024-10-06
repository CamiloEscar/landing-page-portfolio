/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {ChevronDown, ChevronUp, Monitor, Globe, Calendar, Building } from 'lucide-react';
import {
  dataAboutMe,
  dataSlider,
  educationTimeline,
  workExperience,
  aboutMe,
} from '@/data';
import GradientName from './GradientName';

type Skill = {
  id: string | number;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const additionalSkills: Skill[] = [
  { id: 'skill-pc-repair', name: 'Reparación de PC', icon: <Monitor className="w-6 h-6 text-green-500" />, description: 'Experiencia en diagnóstico y reparación de computadoras' },
  { id: 'skill-english', name: 'Inglés', icon: <Globe className="w-6 h-6 text-green-500" />, description: 'Nivel básico (Lecto comprensión)' },
];

const allSkills: Skill[] = [...dataAboutMe as Skill[], ...additionalSkills];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

interface SectionToggleProps {
  title: string;
  section: string;
  expandedSection: string | null;
  toggleSection: (section: string) => void;
}

const SectionToggle: React.FC<SectionToggleProps> = ({ title, section, expandedSection, toggleSection }) => (
  <button
    onClick={() => toggleSection(section)}
    className="flex items-center justify-between w-full text-left p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
    aria-expanded={expandedSection === section}
    aria-controls={`${section}-content`}
  >
    <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
      {title}
    </h3>
    {expandedSection === section ? (
      <ChevronUp className="w-5 h-5" aria-hidden="true" />
    ) : (
      <ChevronDown className="w-5 h-5" aria-hidden="true" />
    )}
  </button>
);

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  isEducation?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, subtitle, period, description, isEducation }) => (
  <div className="mb-6 relative">
    <div className="absolute left-0 top-0 w-0.5 h-full bg-green-200 dark:bg-green-800"></div>
    <div className="flex items-center mb-2 ml-6">
      <div className="absolute left-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        {isEducation ? (
          <Calendar className="w-3 h-3 text-white" />
        ) : (
          <Building className="w-3 h-3 text-white" />
        )}
      </div>
      <h3 className="font-bold text-gray-800 dark:text-white text-base ml-4">{title}</h3>
    </div>
    <div className="ml-10">
      <h4 className="text-green-600 dark:text-green-400 text-sm font-semibold">{subtitle}</h4>
      <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">{period}</p>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </div>
  </div>
);

export default function AboutMe() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { theme } = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section className="py-8 md:py-16 bg-transparent transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="p-4 md:p-8 max-w-8xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg transition-colors duration-300"
          id="about-me"
        >
          {/* <Title title="Sobre mí" subtitle="Mis actividades:" className="mb-6" /> */}

          <div className="flex flex-col lg:flex-row gap-6">
            <motion.div variants={itemVariants} className="lg:w-1/3">
              <div className="relative w-full mb-4 h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
                <div className="embla h-full" ref={emblaRef}>
                  <div className="embla__container h-full flex">
                    {dataSlider.map((data, index) => (
                      <div className="embla__slide relative h-full flex-[0_0_100%]" key={data.id}>
                        <Image
                          src={data.url}
                          alt={`Imagen ${data.id}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {dataSlider.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        currentSlide === index ? 'bg-white' : 'bg-gray-400'
                      }`}
                      onClick={() => emblaApi && emblaApi.scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                {allSkills.map((data) => (
                  <motion.div
                    key={data.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-sm bg-gray-50/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                  >
                    <div className="text-green-500 dark:text-green-400 mb-2 text-3xl" aria-hidden="true">
                      {data.icon}
                    </div>
                    <h3 className="font-semibold mb-1 text-sm text-center text-gray-800 dark:text-white">
                      {data.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs text-center">
                      {data.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:w-2/3 space-y-6"
            >
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                   <GradientName>
                   Sobre Mí

                   </GradientName>
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-2">
                  {aboutMe.description}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Edad: {aboutMe.age} años | Ubicación: {aboutMe.location}
                </p>
              </div>

              <div className="space-y-4">
                {/* <SectionToggle 
                  title="Educación y Experiencia Laboral" 
                  section="education-experience"
                  expandedSection={expandedSection}
                  toggleSection={toggleSection}
                /> */}
                <AnimatePresence initial={false}>
                  {/* {expandedSection === "education-experience" && ( */}
                    <motion.div
                      key="education-experience"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-lg mt-2"
                      id="education-experience-content"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative">
                          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-green-500" />
                            Educación
                          </h3>
                          {educationTimeline.map((edu) => (
                            <TimelineItem
                              key={edu.id}
                              title={edu.title}
                              subtitle={edu.institution}
                              period={edu.period}
                              description={edu.description}
                              isEducation={true}
                            />
                          ))}
                        </div>
                        <div className="relative">
                          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                            <Building className="w-5 h-5 mr-2 text-green-500" />
                            Experiencia Laboral
                          </h3>
                          {workExperience.map((exp) => (
                            <TimelineItem
                              key={exp.id}
                              title={exp.position}
                              subtitle={exp.company}
                              period={exp.period}
                              description={exp.description}
                              isEducation={false}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                    
                  {/* ) */}
                  
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}