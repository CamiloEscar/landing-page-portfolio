"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, FileText, Github, Linkedin, Code, Cpu, Check } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Introduction() {
  const [isCVOpen, setIsCVOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container min-h-screen flex items-center mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between py-20 w-full" id="home">
          <motion.div 
            className="text-left lg:w-3/5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl mb-4 text-gray-600 dark:text-gray-400 font-light">Hola, soy</h3>
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-green-500 to-teal-400 text-transparent bg-clip-text">
              Camilo <span className="animate-bounce inline-block">💻</span>
            </h1>
            <h2 className="text-3xl text-gray-700 dark:text-gray-300 mb-8">Frontend Developer Extraordinario</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
              Apasionado por crear experiencias web increíbles y funcionales. 
              Especializado en React y siempre en busca de nuevos desafíos tecnológicos.
              Transformando ideas en código, un píxel a la vez.
            </p>
            <div className="flex flex-wrap gap-6 mb-10">
              <Button size="lg" asChild className="transition-all hover:scale-105 hover:shadow-lg bg-green-500 hover:bg-green-600 text-white">
                <Link href="#contact">
                  <Mail className="mr-2" size={24} /> Contacta conmigo
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsCVOpen(true)}
                className="transition-all hover:scale-105 hover:shadow-lg border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                <FileText className="mr-2" size={24} /> Ver CV
              </Button>
            </div>
            <div className="flex gap-6 mb-10">
              <Link href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                <Github size={32} />
              </Link>
              <Link href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                <Linkedin size={32} />
              </Link>
            </div>
            <div className="flex gap-4 text-gray-600 dark:text-gray-400">
              <Code size={24} />
              <Cpu size={24} />
              <span className="text-lg">React | Next.js | TypeScript | Node.js</span>
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-2/5 mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-80 h-80 mx-auto">
              <Image
                src="/profile.png?height=320&width=320"
                alt="Profile pic"
                width={320}
                height={320}
                className="rounded-full shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg">
                <Code size={32} className="text-green-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}