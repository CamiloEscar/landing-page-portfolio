"use client"

import React, { useState, useEffect } from "react"
import { itemsNavbar } from "@/data"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Sun, Moon, Monitor, Globe } from 'lucide-react'
import { useTheme } from "next-themes"
import { useRouter, usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { setTheme, theme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Navbar')
  const locale = useLocale()

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const
    const currentIndex = themes.indexOf(theme as typeof themes[number])
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />
      case 'dark':
        return <Moon className="h-5 w-5" />
      case 'system':
        return <Monitor className="h-5 w-5" />
      default:
        return <Sun className="h-5 w-5" />
    }
  }

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en'
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPathname)
  }

  return (
    <>
      <motion.div
        className="fixed z-50 top-4 right-4 flex space-x-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Button asChild variant="outline" size="icon" className="bg-white/20 hover:bg-white/40 dark:bg-gray-800/20 dark:hover:bg-gray-800/40">
          <Link href="https://github.com/CamiloEscar" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="icon" className="bg-white/20 hover:bg-white/40 dark:bg-gray-800/20 dark:hover:bg-gray-800/40">
          <Link href="https://www.linkedin.com/in/camiloescar/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="icon" className="bg-white/20 hover:bg-white/40 dark:bg-gray-800/20 dark:hover:bg-gray-800/40">
          <Link href="mailto:camiloescar1995@gmail.com">
            <Mail className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/20 hover:bg-white/40 dark:bg-gray-800/20 dark:hover:bg-gray-800/40"
          onClick={cycleTheme}
        >
          {getThemeIcon()}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/20 hover:bg-white/40 dark:bg-gray-800/20 dark:hover:bg-gray-800/40"
          onClick={toggleLanguage}
        >
          <Globe className="h-5 w-5" />
        </Button>
      </motion.div>

      <motion.nav
        className="fixed z-50 w-full bottom-20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <motion.div
              className="flex items-center gap-2 px-6 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {itemsNavbar.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={item.link}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      {item.icon}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}