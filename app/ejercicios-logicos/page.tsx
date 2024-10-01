"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Code,
  Folder,
  FileCode,
  ChevronRight,
  Loader2,
  Play,
  BookOpen,
  List,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Title from "@/components/shared/title";
import Navbar from "@/components/shared/navbar";

interface Item {
  name: string;
  path: string;
  type: "file" | "dir";
  content?: string;
  items?: Item[];
  url: string;
  isOpen?: boolean;
}

const REPO_URL =
  "https://api.github.com/repos/CamiloEscar/EjerciciosLogicos/contents";

export default function EjerciciosLogicos() {
  const [categories, setCategories] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(REPO_URL);
        if (!response.ok) {
          throw new Error("No se pudo cargar el contenido del repositorio");
        }
        const data = await response.json();

        const categoriesData = data
          .filter((item: any) => item.type === "dir")
          .map((item: any) => ({
            name: item.name,
            path: item.path,
            type: item.type,
            url: item.url,
            isOpen: false,
          }));

        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(
          "No se pudo cargar las categorías. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedItem && selectedItem.type === "file" && selectedItem.content) {
      Prism.highlightAll();
    }
  }, [selectedItem]);

  const loadItemContent = async (item: Item) => {
    setIsLoading(true);
    setError(null);
    try {
      if (item.type === "file" && !item.content) {
        const response = await fetch(item.url);
        if (!response.ok) {
          throw new Error("No se pudo cargar el contenido del archivo");
        }
        const data = await response.json();
        item.content = atob(data.content);
      } else if (item.type === "dir" && !item.items) {
        const response = await fetch(item.url);
        if (!response.ok) {
          throw new Error("No se pudo cargar el contenido del directorio");
        }
        const data = await response.json();
        item.items = data.map((subItem: any) => ({
          name: subItem.name,
          path: subItem.path,
          type: subItem.type,
          url: subItem.url,
          isOpen: false,
        }));
      }
      return item;
    } catch (error) {
      console.error("Error loading item content:", error);
      setError(
        `Error al cargar el contenido de ${item.name}. Por favor, intenta de nuevo.`
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFolder = async (item: Item) => {
    let updatedItem = item;
    if (!item.items) {
      updatedItem = (await loadItemContent(item)) || item;
    }
    updatedItem.isOpen = !updatedItem.isOpen;

    const updateCategories = (categories: Item[]): Item[] => {
      return categories.map((category) => {
        if (category.path === updatedItem.path) {
          return updatedItem;
        }
        if (category.items) {
          return { ...category, items: updateCategories(category.items) };
        }
        return category;
      });
    };

    setCategories(updateCategories(categories));
  };

  const selectItem = async (item: Item) => {
    if (item.type === "dir") {
      await toggleFolder(item);
    } else {
      const loadedItem = await loadItemContent(item);
      if (loadedItem) {
        setSelectedItem(loadedItem);
        setCurrentPath(loadedItem.path.split("/"));
      }
    }
  };

  const renderDirectoryContent = (items: Item[], depth = 0) => (
    <ul
      className={`space-y-1 ${
        depth > 0 ? "border-l border-gray-200 dark:border-gray-700" : ""
      }`}
    >
      {items.map((item) => (
        <li key={item.path} className={`${depth > 0 ? "ml-4" : ""}`}>
          <Button
            variant="ghost"
            className="w-full text-left hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => selectItem(item)}
          >
            {item.type === "dir" &&
              (item.isOpen ? (
                <ChevronDown className="mr-2 h-4 w-4" />
              ) : (
                <ChevronRight className="mr-2 h-4 w-4" />
              ))}
            {item.type === "file" ? (
              <FileCode className="mr-2 h-4 w-4" />
            ) : (
              <Folder className="mr-2 h-4 w-4" />
            )}
            {item.name}
          </Button>
          {item.type === "dir" &&
            item.isOpen &&
            item.items &&
            renderDirectoryContent(item.items, depth + 1)}
        </li>
      ))}
    </ul>
  );

  const getLanguage = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "js":
        return "javascript";
      case "py":
        return "python";
      case "java":
        return "java";
      case "html":
        return "markup";
      case "css":
        return "css";
      default:
        return "markup";
    }
  };

  const renderHTML = () => {
    if (selectedItem && selectedItem.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(selectedItem.content, "text/html");

      // Extract CSS
      const styles = doc.getElementsByTagName("style");
      let cssContent = "";
      for (let i = 0; i < styles.length; i++) {
        cssContent += styles[i].textContent;
        styles[i].remove();
      }

      // Extract JavaScript
      const scripts = doc.getElementsByTagName("script");
      let jsContent = "";
      for (let i = 0; i < scripts.length; i++) {
        jsContent += scripts[i].textContent;
        scripts[i].remove();
      }

      // Remaining HTML
      const htmlContent = doc.documentElement.outerHTML;

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
      `;

      setHtmlContent(fullContent);
      setShowPreview(true);
    }
  };

  return (
    <>
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-8 md:py-12 bg-background transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
          >
            <Title title="Ejercicios Lógicos" subtitle="Explora y Aprende" />
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Blog
              </Link>
            </Button>
          </motion.div>

          <div className="flex flex-row gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-1/3"
            >
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-primary/10 text-primary">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <List className="mr-2 h-5 w-5" />
                    Categorías
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <ScrollArea className="h-[calc(100vh-200px)]">
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
              className="w-2/3"
            >
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md">
                <CardHeader className="bg-primary/10 text-primary">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    {selectedItem
                      ? selectedItem.name
                      : "Selecciona una categoría"}
                  </CardTitle>
                  {currentPath.length > 0 && (
                    <Breadcrumb>
                      {currentPath.map((path, index) => (
                        <BreadcrumbItem key={index}>
                          <BreadcrumbLink
                            href="#"
                            onClick={() => {
                              const item =
                                categories.find((c) => c.name === path) ||
                                selectedItem;
                              if (item) selectItem(item);
                            }}
                            className="text-primary hover:text-accent transition-colors"
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
                    <div className="flex justify-center items-center h-[calc(100vh-300px)]">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : error ? (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  ) : selectedItem ? (
                    selectedItem.type === "file" ? (
                      <Tabs defaultValue="code" className="w-full">
                        <TabsList>
                          <TabsTrigger value="code">Código</TabsTrigger>
                          {selectedItem.name.endsWith(".html") && (
                            <TabsTrigger value="preview">
                              Vista previa
                            </TabsTrigger>
                          )}
                        </TabsList>
                        <TabsContent value="code">
                          <ScrollArea className="h-[calc(100vh-300px)]">
                            <pre className="p-4 rounded-md overflow-x-auto bg-[#2d2d2d] text-[#ccc]">
                              <code
                                className={`language-${getLanguage(
                                  selectedItem.name
                                )}`}
                              >
                                {selectedItem.content}
                              </code>
                            </pre>
                          </ScrollArea>
                        </TabsContent>
                        {selectedItem.name.endsWith(".html") && (
                          <TabsContent value="preview">
                            <div className="space-y-4">
                              <Button onClick={renderHTML}>
                                <Play className="mr-2 h-4 w-4" />
                                Renderizar HTML
                              </Button>
                              {showPreview && (
                                <div className="w-full h-[calc(100vh-400px)] border rounded">
                                  <iframe
                                    srcDoc={htmlContent}
                                    title="HTML Preview"
                                    className="w-full h-full"
                                    sandbox="allow-scripts"
                                  />
                                </div>
                              )}
                            </div>
                          </TabsContent>
                        )}
                      </Tabs>
                    ) : (
                      <ScrollArea className="h-[calc(100vh-300px)]">
                        {renderDirectoryContent(selectedItem.items || [])}
                      </ScrollArea>
                    )
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Selecciona una categoría de la lista para ver su
                      contenido.
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
