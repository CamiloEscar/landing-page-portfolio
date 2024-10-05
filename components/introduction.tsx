import React, { useState, useEffect, useCallback, FC } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Github,
  Linkedin,
  Layers,
  Pen,
  Download,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GradientName from "./GradientName";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiGithub,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import TechStack from "./TechStack";

const greetings = [
  "Hola, soy",
  "Hello, I am",
  "Bonjour, je suis",
  "Olá, eu sou",
  "Ciao, sono",
];

const skills = [
  {
    name: "React",
    icon: <FaReact />,
    color: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    color:
      "bg-gray-500/10 text-gray-700 dark:bg-gray-400/20 dark:text-gray-400",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    color: "bg-blue-600/10 text-blue-600 dark:bg-blue-500/20",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    color: "bg-green-500/10 text-green-600 dark:bg-green-500/20",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql />,
    color: "bg-blue-400/10 text-blue-600 dark:bg-blue-400/20",
  },
  {
    name: "GIT",
    icon: <SiGithub />,
    color: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20",
  },
];

interface ActionButtonProps {
  text: string;
  icon: React.ElementType;
  color: string;
  href: string;
}

const ActionButton: FC<ActionButtonProps> = ({
  text,
  icon: Icon,
  color,
  href,
}) => (
  <motion.div 
    whileHover={{ scale: 1.05 }} 
    whileTap={{ scale: 0.95 }}
    className="w-full sm:w-auto"
  >
    <Button
      size="lg"
      asChild
      className={`
        w-full sm:w-auto
        transition-all duration-300 group font-medium
        text-sm sm:text-base
        px-4 sm:px-6
        py-2 sm:py-3
        ${
          color === "green" &&
          "bg-green-500 hover:bg-green-600 text-white shadow-green-200/50 dark:shadow-green-900/50"
        }
        ${
          color === "blue" &&
          "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200/50 dark:shadow-blue-900/50"
        }
        ${
          color === "purple" &&
          "bg-purple-500 hover:bg-purple-600 text-white shadow-purple-200/50 dark:shadow-purple-900/50"
        }
        shadow-lg hover:shadow-xl
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

const SocialLink: FC<SocialLinkProps> = ({
  href,
  icon: Icon,
  label,
  color,
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 group
        ${
          color === "gray" &&
          "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
        }
        ${
          color === "blue" &&
          "bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/50 dark:hover:bg-blue-800/50 dark:text-blue-300"
        }
      `}
    >
      <Icon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
      <span className="font-medium">{label}</span>
      <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  </motion.div>
);

export default function Introduction() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [cvLanguage, setCvLanguage] = useState("es");
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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

  const handleCVOpen = (language: string) => {
    setCvLanguage(language);
    setIsCVOpen(true);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div
            className="w-full lg:w-3/5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border-white/20 dark:border-gray-700/20 shadow-xl">
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
                </div>

                <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Con más de 2 años de experiencia en desarrollo web, me he
                  enfocado en tecnologías como
                  <GradientName
                    size="small"
                    className="mx-1 font-bold font-mono"
                  >
                    React
                  </GradientName>
                  y
                  <GradientName
                    size="small"
                    className="mx-1 font-bold font-mono"
                  >
                    Node.js
                  </GradientName>
                  . Mi objetivo es crear experiencias web de calidad,
                  manteniendo un aprendizaje continuo para innovar y mejorar
                  cada día.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <ActionButton
                    text="Contacto"
                    icon={Mail}
                    color="green"
                    href="#contact"
                  />
                  <ActionButton
                    text="Portfolio"
                    icon={Layers}
                    color="blue"
                    href="/minimal"
                  />
                  <ActionButton
                    text="Blog"
                    icon={Pen}
                    color="purple"
                    href="/blog"
                  />
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                  <SocialLink
                    href="https://github.com/CamiloEscar"
                    icon={Github}
                    label="GitHub"
                    color="gray"
                  />
                  <SocialLink
                    href="https://www.linkedin.com/in/camiloescar/"
                    icon={Linkedin}
                    label="LinkedIn"
                    color="blue"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          className="bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 font-medium"
                        >
                          <Download className="mr-2 w-5 h-5" />
                          Curriculum
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleCVOpen("en")}>
                        View CV in English
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCVOpen("es")}>
                        Ver CV en Español
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>


                <div className="flex flex-wrap gap-3">
                  {/* <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSkillIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Badge
                        variant="outline"
                        className={`py-2 px-4 text-sm font-medium ${skills[currentSkillIndex].color}`}
                      >
                        <span className="mr-2">
                          {skills[currentSkillIndex].icon}
                        </span>
                        {skills[currentSkillIndex].name}
                      </Badge>
                    </motion.div>
                  </AnimatePresence> */}
                  <TechStack />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isImageLoaded ? 1 : 0,
              scale: isImageLoaded ? 1 : 0.8,
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] mx-auto">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-sky-500/20 backdrop-blur-3xl" />
                <div className="absolute inset-0 border-[16px] border-white/10 dark:border-gray-800/10 rounded-2xl z-10" />
                <Image
                  src="/profile.webp"
                  alt="Profile"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl z-0"
                  priority
                  onLoadingComplete={() => setIsImageLoaded(true)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Dialog open={isCVOpen} onOpenChange={setIsCVOpen}>
        <DialogContent className="sm:max-w-[800px] h-[90vh] p-0">
          <DialogHeader className="p-6 backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border-b border-gray-200/20 dark:border-gray-700/20">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              Curriculum Vitae
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {cvLanguage === "en"
                ? "You're viewing the English version. Switch language or download using the buttons below."
                : "Estás viendo la versión en Español. Cambia el idioma o descarga usando los botones debajo."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 bg-gray-100 dark:bg-gray-800">
            <iframe
              src={`/CV${cvLanguage}-CamiloEscar.pdf`}
              className="w-full h-[calc(90vh-180px)]"
              title="CV"
            />
          </div>
          <div className="flex justify-between items-center gap-4 p-4 backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border-t border-gray-200/20 dark:border-gray-700/20">
            <Button
              variant="outline"
              onClick={() => setCvLanguage(cvLanguage === "en" ? "es" : "en")}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {cvLanguage === "en" ? "Cambiar a Español" : "Switch to English"}
            </Button>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsCVOpen(false)}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="mr-2 h-4 w-4" />
                {cvLanguage === "en" ? "Close" : "Cerrar"}
              </Button>
              <Button
                onClick={() =>
                  window.open(`/CV${cvLanguage}-CamiloEscar.pdf`, "_blank")
                }
                className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:opacity-90 transition-opacity"
              >
                <Download className="mr-2 h-4 w-4" />
                {cvLanguage === "en" ? "Download CV" : "Descargar CV"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
