"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  FileText,
  Github,
  Linkedin,
  Code,
  Download,
  X,
  Layers,
  Pen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Typewriter } from "react-simple-typewriter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GradientName from "./GradientName";

const greetings = [
  "Hola, soy",
  "Hello, I am",
  "Bonjour, je suis",
  "Olá, eu sou",
  "Ciao, sono",
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "GIT",
];

export default function Introduction() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [cvLanguage, setCvLanguage] = useState("es");
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const { theme } = useTheme();

  const cycleGreeting = useCallback(() => {
    setCurrentGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
  }, []);

  useEffect(() => {
    const greetingInterval = setInterval(cycleGreeting, 3000);
    const skillInterval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
    }, 2000);

    return () => {
      clearInterval(greetingInterval);
      clearInterval(skillInterval);
    };
  }, [cycleGreeting]);

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  const handleCVOpen = (language: any) => {
    setCvLanguage(language);
    setIsCVOpen(true);
  };

  return (
    <section className="w-full">
      <div className="container min-h-screen flex items-center mx-auto px-4">
        <div
          className="flex flex-col lg:flex-row items-center justify-between py-10 lg:py-20 w-full"
          id="home"
        >
          <motion.div
            className="text-left lg:w-3/5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentGreetingIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl mb-4 text-gray-700 dark:text-gray-300 font-light"
              >
                {greetings[currentGreetingIndex]}
              </motion.h3>
            </AnimatePresence>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-green-600 via-green-500 to-teal-400 text-transparent bg-clip-text">
              <GradientName />
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-800 dark:text-gray-200 mb-6 lg:mb-8">
              <Typewriter
                words={["Developer Web", "Estudiante de Sistemas"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-8 lg:mb-10 max-w-2xl order-2 md:order-1">
              Con más de 2 años de experiencia en desarrollo web, me he
              especializado en tecnologías como
              <strong className="text-yellow-300 dark:text-yellow-400 font-bold font-mono">
                {" "}
                React y Node.js.
              </strong>{" "}
              Mi objetivo es ofrecer la mejor experiencia a mis clientes,
              manteniendo un aprendizaje continuo para mejorar cada día.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 lg:mb-10">
              <motion.div variants={buttonVariants} whileHover="hover">
                <Button
                  size="lg"
                  asChild
                  className="transition-all bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-xl"
                >
                  <Link href="#contact">
                    <Mail className="mr-2" size={20} /> Contacto
                  </Link>
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover">
                <Button
                  size="lg"
                  asChild
                  className="transition-all bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-xl"
                >
                  <Link href="/minimal">
                    <Layers className="mr-2" size={20} /> Mini Portfolio
                  </Link>
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover">
                <Button
                  size="lg"
                  asChild
                  className="transition-all bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-xl"
                >
                  <Link href="/blog">
                    <Pen className="mr-2" size={20} /> Blog
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="flex gap-6 mb-8 lg:mb-10 items-center">
              <Link
                href="https://github.com/CamiloEscar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110"
              >
                <Github size={28} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/camiloescar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors transform hover:scale-110"
              >
                <Linkedin size={28} />
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="transition-all border-green-500 text-green-500 hover:bg-green-500 hover:text-white shadow-md hover:shadow-xl"
                  >
                    <Download className="mr-2" size={20} /> CV
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleCVOpen("en")}>
                    View CV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCVOpen("es")}>
                    Ver CV
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-4 text-gray-700 dark:text-gray-300 items-center">
              <Code size={20} className="text-green-500" />
              <span className="text-base sm:text-lg font-semibold">
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
            className="lg:w-2/5 mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mx-auto rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/profile.webp"
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
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
              {cvLanguage === "en"
                ? "You're viewing the English version. You can download it or switch to Spanish using the buttons below."
                : "Estás viendo la versión en Español. Puedes descargarla o cambiar a Inglés usando los botones de abajo."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <iframe
              src={`/CV${cvLanguage}-CamiloEscar.pdf`}
              className="w-full h-[calc(90vh-180px)]"
              title="CV"
            />
          </div>
          <div className="flex justify-between space-x-4 p-4 bg-gray-100 dark:bg-gray-800">
            <Button
              variant="outline"
              onClick={() => setCvLanguage(cvLanguage === "en" ? "es" : "en")}
              className="hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {cvLanguage === "en" ? "Cambiar a Español" : "Switch to English"}
            </Button>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsCVOpen(false)}
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X className="mr-2 h-4 w-4" />{" "}
                {cvLanguage === "en" ? "Close" : "Cerrar"}
              </Button>
              <Button
                onClick={() =>
                  window.open(`/CV${cvLanguage}-CamiloEscar.pdf`, "_blank")
                }
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Download className="mr-2 h-4 w-4" />{" "}
                {cvLanguage === "en" ? "Download CV" : "Descargar CV"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
