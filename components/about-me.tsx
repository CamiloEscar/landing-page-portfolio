"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { dataAboutMe, dataSlider } from "@/data"
import Title from "./shared/title"
import { Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function AboutMe() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="p-6 md:px-12 md:py-20 max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300"
          id="about-me"
        >
          <Title title="Sobre mí" subtitle="Conóceme" />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div 
              variants={itemVariants}
              className="py-8 md:py-0 flex items-center justify-center"
            >
              <Carousel
                opts={{
                  align: "start",
                }}
                orientation="vertical"
                className="w-full max-w-xs h-fit"
              >
                <CarouselContent className="mt-1 h-[300px]">
                  {dataSlider.map((data) => (
                    <CarouselItem key={data.id}>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center justify-center h-full"
                      >
                        <Image
                          src={data.url}
                          alt={`Imagen de ${data.id}`}
                          width={250}
                          height={400}
                          className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1/2 -translate-x-1/2 top-0 -translate-y-full" />
                <CarouselNext className="left-1/2 -translate-x-1/2 bottom-0 translate-y-full" />
              </Carousel>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dataAboutMe.map((data) => (
                  <motion.div
                    key={data.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-md bg-gray-50 dark:bg-gray-800 transition-all duration-300"
                  >
                    <div className="text-green-500 dark:text-green-400 mb-2">{data.icon}</div>
                    <h3 className="font-semibold mb-2 text-sm text-gray-800 dark:text-white">{data.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">{data.description}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p 
                variants={itemVariants}
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base"
              >
                Soy un desarrollador apasionado que encuentra su mayor inspiración
                entre líneas de código y algoritmos desafiantes. Cuando no estoy
                inmerso en la programación, disfruto del aire libre y el deporte,
                creyendo firmemente en mantener un equilibrio entre mente y cuerpo.
                Además, soy un ávido lector, encontrando en los libros una fuente
                inagotable de conocimiento y crecimiento personal. En las redes
                sociales comparto mi pasión por la programación, creando contenido
                inspirador y educativo para conectar con otros apasionados del
                desarrollo de software.
              </motion.p>
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Button className="bg-green-500 hover:bg-green-600 text-white transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  <Phone size={20} className="mr-2" /> Contáctame
                </Button>
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  <ExternalLink size={20} className="mr-2" href='#portfolio' /> Ver proyectos
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}