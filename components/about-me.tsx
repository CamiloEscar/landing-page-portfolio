"use client"

import React, { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image"
import { useTheme } from "next-themes"
import { Phone, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Title from "./shared/title"
import {
  dataAboutMe,
  dataSlider,
  educationTimeline,
  workExperience,
  aboutMe,
} from "@/data"

type Skill = {
  id: string | number;
  name: string;
  icon: string | React.ReactNode;
  description: string;
}

const additionalSkills: Skill[] = [
  { id: 'skill-pc-repair', name: 'Reparación de PC', icon: '🖥️', description: 'Experiencia en diagnóstico y reparación de computadoras' },
  { id: 'skill-english', name: 'Inglés', icon: '🌐', description: 'Nivel básico (Lecto comprensión)' },
]

const allSkills: Skill[] = [...dataAboutMe as Skill[], ...additionalSkills]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

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
)

export default function AboutMe() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { theme } = useTheme()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentSlide(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return

    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(autoplay)
  }, [emblaApi])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <section className="py-8 md:py-16 bg-transparent transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="p-4 md:p-8 max-w-7xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg transition-colors duration-300"
          id="about-me"
        >
          <Title title="Sobre mí" subtitle="" className="mb-6" />

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
                          style={{ objectFit: "cover" }}
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
                  Sobre mí
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-2">
                  {aboutMe.description}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Edad: {aboutMe.age} años | Ubicación: {aboutMe.location}
                </p>
              </div>

              <div className="space-y-4">
                <SectionToggle 
                  title="Educación" 
                  section="education"
                  expandedSection={expandedSection}
                  toggleSection={toggleSection}
                />
                <AnimatePresence initial={false}>
                  {expandedSection === "education" && (
                    <motion.div
                      key="education"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white dark:bg-gray-800 p-4 rounded-lg mt-2"
                      id="education-content"
                    >
                      <div className="space-y-4">
                        {educationTimeline.map((edu) => (
                          <div
                            key={edu.id}
                            className="border-l-2 border-green-500 pl-3"
                          >
                            <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                              {edu.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {edu.institution} | {edu.period}
                            </p>
                            <p className="text-xs text-gray-700 dark:text-gray-300">
                              {edu.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <SectionToggle 
                  title="Experiencia Laboral" 
                  section="experience"
                  expandedSection={expandedSection}
                  toggleSection={toggleSection}
                />
                <AnimatePresence initial={false}>
                  {expandedSection === "experience" && (
                    <motion.div
                      key="experience"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white dark:bg-gray-800 p-4 rounded-lg mt-2"
                      id="experience-content"
                    >
                      <div className="space-y-4">
                        {workExperience.map((exp) => (
                          <div
                            key={exp.id}
                            className="border-l-2 border-green-500 pl-3"
                          >
                            <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                              {exp.position}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {exp.company} | {exp.period}
                            </p>
                            <p className="text-xs text-gray-700 dark:text-gray-300">
                              {exp.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-green-500 hover:bg-green-600 text-white transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  <Phone size={16} className="mr-2" aria-hidden="true" /> Contáctame
                </Button>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                  <ExternalLink size={16} className="mr-2" aria-hidden="true" /> Ver proyectos
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}