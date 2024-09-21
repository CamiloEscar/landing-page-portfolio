"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  FileText,
  Github,
  Linkedin,
  Code,
  Cpu,
  X,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Typewriter } from "react-simple-typewriter";
import { useSpring, animated } from "@react-spring/web";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const greetings = [
  "Hola, soy",
  "Hello, I am",
  "Bonjour, je suis",
  "Olá, eu sou",
  "Ciao, lo sono",
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
];

export default function Introduction() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const { theme } = useTheme();

  const { transform, opacity } = useSpring({
    transform: `translateY(0%)`,
    opacity: 1,
    from: { transform: `translateY(-50%)`, opacity: 0 },
    reset: true,
    config: { duration: 800 },
  });

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 3000);

    const skillInterval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
    }, 2000);

    return () => {
      clearInterval(greetingInterval);
      clearInterval(skillInterval);
    };
  }, []);

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  return (
    <section className="w-full">
      <div className="container min-h-screen flex items-center mx-auto px-4">
        <div
          className="flex flex-col lg:flex-row items-center justify-between py-20 w-full"
          id="home"
        >
          <motion.div
            className="text-left lg:w-3/5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <animated.h3
              style={{ transform, opacity }}
              className="text-2xl mb-4 text-gray-900 dark:text-gray-100 font-light"
            >
              {greetings[currentGreeting]}
            </animated.h3>

            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-green-500 to-teal-400 text-transparent bg-clip-text">
              Camilo Escar{" "}
              <span className="animate-bounce inline-block">💻</span>
            </h1>
            <h2 className="text-3xl text-gray-900 dark:text-gray-100 mb-8">
              <Typewriter
                words={[
                  "Frontend Developer",
                  "Estudiante de Licenciatura en Sistemas",
                  "Tecnico",
                  "Deportista",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h2>
            <p className="text-xl text-gray-900 dark:text-gray-100 mb-10 max-w-2xl">
              Apasionado por crear experiencias web increíbles y funcionales.
              Especializado en React y siempre en busca de nuevos desafíos
              tecnológicos. Transformando ideas en código, un píxel a la vez.
            </p>
            <div className="flex flex-wrap gap-6 mb-10">
              <motion.div variants={buttonVariants} whileHover="hover">
                <Button
                  size="lg"
                  asChild
                  className="transition-all bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-xl"
                >
                  <Link href="#contact">
                    <Mail className="mr-2" size={24} /> Contacta conmigo
                  </Link>
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsCVOpen(true)}
                  className="transition-all border-green-500 text-green-500 hover:bg-green-500 hover:text-white shadow-md hover:shadow-xl"
                >
                  <FileText className="mr-2" size={24} /> Ver CV
                </Button>
              </motion.div>
            </div>
            <div className="flex gap-6 mb-10">
              <Link
                href="https://github.com/CamiloEscar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110"
              >
                <Github size={32} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/camiloescar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors transform hover:scale-110"
              >
                <Linkedin size={32} />
              </Link>
            </div>
            <div className="flex gap-4 text-gray-600 dark:text-gray-400 items-center">
              <Code size={24} className="text-green-500" />
              {/* <Cpu size={24} className="text-green-500" /> */}
              <span className="text-lg font-semibold">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentSkillIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {skills[currentSkillIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-2/5 mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-100 h-100 mx-auto">
              <Image
                src="/profile.webp"
                width={240}
                height={240}
                style={{ width: "auto", height: "auto" }}
                alt="Profile"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Dialog open={isCVOpen} onOpenChange={setIsCVOpen}>
        <DialogContent className="sm:max-w-[800px] h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 bg-gray-100 dark:bg-gray-800">
            <DialogTitle className="text-2xl font-bold">
              Curriculum Vitae
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Aquí puedes ver mi CV completo. Puedes descargarlo o cerrarlo
              usando los botones de abajo.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <iframe
              src="/cv-camilo.pdf"
              className="w-full h-[calc(90vh-180px)]"
              title="CV"
            />
          </div>
          <div className="flex justify-end space-x-4 p-4 bg-gray-100 dark:bg-gray-800">
            <Button
              variant="outline"
              onClick={() => setIsCVOpen(false)}
              className="hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X className="mr-2 h-4 w-4" /> Cerrar
            </Button>
            <Button
              onClick={() => window.open("/path-to-your-cv.pdf", "_blank")}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Download className="mr-2 h-4 w-4" /> Descargar CV
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
