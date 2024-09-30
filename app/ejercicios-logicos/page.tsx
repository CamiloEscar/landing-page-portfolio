"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Code, Folder, FileCode, ChevronRight, Loader2, Play, BookOpen, List } from 'lucide-react'
import { motion } from 'framer-motion'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import Title from "@/components/shared/title"
import Navbar from "@/components/shared/navbar"

interface Item {
  name: string
  path: string
  type: 'file' | 'dir'
  content?: string
  items?: Item[]
  url: string
}

const REPO_URL = 'https://api.github.com/repos/CamiloEscar/EjerciciosLogicos/contents'

export default function EjerciciosLogicos() {
  const [categories, setCategories] = useState<Item[]>([])
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [htmlContent, setHtmlContent] = useState<string>('')

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(REPO_URL)
        if (!response.ok) {
          throw new Error('No se pudo cargar el contenido del repositorio')
        }
        const data = await response.json()
        
        const categoriesData = data.filter((item: any) => item.type === 'dir').map((item: any) => ({
          name: item.name,
          path: item.path,
          type: item.type,
          url: item.url
        }))

        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setError('No se pudo cargar las categorías. Por favor, intenta de nuevo más tarde.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedItem && selectedItem.type === 'file' && selectedItem.content) {
      Prism.highlightAll()
    }
  }, [selectedItem])

  const loadItemContent = async (item: Item) => {
    setIsLoading(true)
    setError(null)
    try {
      if (item.type === 'file' && !item.content) {
        const response = await fetch(item.url)
        if (!response.ok) {
          throw new Error('No se pudo cargar el contenido del archivo')
        }
        const data = await response.json()
        item.content = atob(data.content)
      } else if (item.type === 'dir' && !item.items) {
        const response = await fetch(item.url)
        if (!response.ok) {
          throw new Error('No se pudo cargar el contenido del directorio')
        }
        const data = await response.json()
        item.items = data.map((subItem: any) => ({
          name: subItem.name,
          path: subItem.path,
          type: subItem.type,
          url: subItem.url
        }))
      }
      setSelectedItem({ ...item })
      setCurrentPath(item.path.split('/'))
    } catch (error) {
      console.error('Error loading item content:', error)
      setError(`Error al cargar el contenido de ${item.name}. Por favor, intenta de nuevo.`)
    } finally {
      setIsLoading(false)
    }
  }

  const renderDirectoryContent = (items: Item[], depth = 0) => (
    <ul className={`space-y-1 ${depth > 0 ? 'ml-4' : ''}`}>
      {items.map((item) => (
        <li key={item.path}>
          <Button
            variant="ghost"
            className="w-full text-left hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => loadItemContent(item)}
          >
            {item.type === 'file' ? (
              <FileCode className="mr-2 h-4 w-4" />
            ) : (
              <Folder className="mr-2 h-4 w-4" />
            )}
            {item.name}
          </Button>
          {item.items && renderDirectoryContent(item.items, depth + 1)}
        </li>
      ))}
    </ul>
  )

  const getLanguage = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'js':
        return 'javascript'
      case 'py':
        return 'python'
      case 'java':
        return 'java'
      case 'html':
        return 'markup'
      case 'css':
        return 'css'
      default:
        return 'markup'
    }
  }

  const renderHTML = () => {
    if (selectedItem && selectedItem.content) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(selectedItem.content, 'text/html')
      
      // Extract CSS
      const styles = doc.getElementsByTagName('style')
      let cssContent = ''
      for (let i = 0; i < styles.length; i++) {
        cssContent += styles[i].textContent
        styles[i].remove()
      }

      // Extract JavaScript
      const scripts = doc.getElementsByTagName('script')
      let jsContent = ''
      for (let i = 0; i < scripts.length; i++) {
        jsContent += scripts[i].textContent
        scripts[i].remove()
      }

      // Remaining HTML
      const htmlContent = doc.documentElement.outerHTML

      // Combine everything
      const fullContent = `
        <html>
          <head>
            <style>${cssContent}</style>
          </head>
          <body>
            ${htmlContent}
            <script>${jsContent}</script>
          </body>
        </html>
      `

      setHtmlContent(fullContent)
    }
  }

  return (
    <>
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16 md:py-24 bg-background transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          >
            <Title title="Ejercicios Lógicos" subtitle="Explora y Aprende" />
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Blog
              </Link>
            </Button>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:w-1/3"
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <List className="mr-2 h-6 w-6" />
                    Categorías
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ScrollArea className="h-[60vh]">
                    {isLoading && categories.length === 0 ? (
                      <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : (
                      renderDirectoryContent(categories)
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:w-2/3"
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-md">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <BookOpen className="mr-2 h-6 w-6" />
                    {selectedItem ? selectedItem.name : 'Selecciona una categoría'}
                  </CardTitle>
                  {currentPath.length > 0 && (
                    <Breadcrumb>
                      {currentPath.map((path, index) => (
                        <BreadcrumbItem key={index}>
                          <BreadcrumbLink 
                            href="#" 
                            onClick={() => {
                              const item = categories.find(c => c.name === path) || selectedItem;
                              if (item) loadItemContent(item);
                            }}
                            className="text-primary-foreground hover:text-accent transition-colors"
                          >
                            {path}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      ))}
                    </Breadcrumb>
                  )}
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-[60vh]">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : error ? (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  ) : selectedItem ? (
                    selectedItem.type === 'file' ? (
                      <Tabs defaultValue="code" className="w-full">
                        <TabsList>
                          <TabsTrigger value="code">Código</TabsTrigger>
                          <TabsTrigger value="preview">Vista previa</TabsTrigger>
                        </TabsList>
                        <TabsContent value="code">
                          <ScrollArea className="h-[60vh]">
                            <pre className="p-4 rounded-md overflow-x-auto bg-[#2d2d2d] text-[#ccc]">
                              <code className={`language-${getLanguage(selectedItem.name)}`}>
                                {selectedItem.content}
                              </code>
                            </pre>
                          </ScrollArea>
                        </TabsContent>
                        <TabsContent value="preview">
                          <div className="space-y-4">
                            <Textarea
                              value={selectedItem.content}
                              onChange={(e) => setSelectedItem({...selectedItem, content: e.target.value})}
                              className="h-[30vh] font-mono"
                            />
                            <div className="flex justify-between items-center">
                              <Button onClick={renderHTML}>
                                <Play className="mr-2 h-4 w-4" />
                                Renderizar HTML
                              </Button>
                              <div className="w-full ml-4 h-[30vh] border rounded">
                                <iframe
                                  srcDoc={htmlContent}
                                  title="HTML Preview"
                                  className="w-full h-full"
                                  sandbox="allow-scripts"
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    ) : (
                      <ScrollArea className="h-[60vh]">
                        {renderDirectoryContent(selectedItem.items || [])}
                      </ScrollArea>
                    )
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Selecciona una categoría de la lista para ver su contenido.
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  )
}