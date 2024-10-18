'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Folder,
  FileCode,
  Loader2,
  Play,
  BookOpen,
  Terminal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Title from '@/components/shared/title';
import Navbar from '@/components/shared/navbarBlog';
import Footer from '@/components/blog/FooterBlog';

interface Item {
  name: string;
  path: string;
  type: 'file' | 'dir';
  content?: string;
  items?: Item[];
  url: string;
}

const REPO_URL =
  'https://api.github.com/repos/CamiloEscar/EjerciciosLogicos/contents';

export default function EjerciciosLogicos() {
  const [rootItems, setRootItems] = useState<Item[]>([]);
  const [currentItems, setCurrentItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');

  const fetchItems = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No se pudo cargar el contenido del repositorio');
      }
      const data = await response.json();

      const items = data.map((item: any) => ({
        name: item.name,
        path: item.path,
        type: item.type,
        url: item.url,
      }));

      return items;
    } catch (error) {
      console.error('Error fetching items:', error);
      setError(
        'No se pudo cargar el contenido. Por favor, intenta de nuevo más tarde.'
      );
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadRootItems = async () => {
      const items = await fetchItems(REPO_URL);
      setRootItems(items);
      setCurrentItems(items);
    };
    loadRootItems();
  }, [fetchItems]);

  useEffect(() => {
    if (selectedItem && selectedItem.type === 'file' && selectedItem.content) {
      Prism.highlightAll();
    }
  }, [selectedItem]);

  const loadItemContent = useCallback(async (item: Item) => {
    setIsLoading(true);
    setError(null);
    try {
      if (item.type === 'file' && !item.content) {
        const response = await fetch(item.url);
        if (!response.ok) {
          throw new Error('No se pudo cargar el contenido del archivo');
        }
        const data = await response.json();
        item.content = atob(data.content);
      } else if (item.type === 'dir' && !item.items) {
        item.items = await fetchItems(item.url);
      }
      return item;
    } catch (error) {
      console.error('Error loading item content:', error);
      setError(
        `Error al cargar el contenido de ${item.name}. Por favor, intenta de nuevo.`
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fetchItems]);

  const loadRelatedFiles = useCallback(async (htmlItem: Item) => {
    const folder = currentItems;
    const baseName = htmlItem.name.replace('.html', '');
    const cssItem = folder.find(item => item.name === `${baseName}.css`);
    const jsItem = folder.find(item => item.name === `${baseName}.js`);

    let htmlContent = htmlItem.content || '';
    let cssContent = '';
    let jsContent = '';

    if (cssItem) {
      const loadedCssItem = await loadItemContent(cssItem);
      if (loadedCssItem) {
        cssContent = loadedCssItem.content || '';
      }
    }

    if (jsItem) {
      const loadedJsItem = await loadItemContent(jsItem);
      if (loadedJsItem) {
        jsContent = loadedJsItem.content || '';
      }
    }

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
  }, [currentItems, loadItemContent]);

  const selectItem = useCallback(async (item: Item) => {
    if (item.type === 'dir') {
      const loadedItem = await loadItemContent(item);
      if (loadedItem && loadedItem.items) {
        setCurrentItems(loadedItem.items);
        setCurrentPath([...currentPath, item.name]);
      }
    } else {
      const loadedItem = await loadItemContent(item);
      if (loadedItem) {
        setSelectedItem(loadedItem);
        if (loadedItem.name.endsWith('.html')) {
          await loadRelatedFiles(loadedItem);
        }
      }
    }
  }, [loadItemContent, currentPath, loadRelatedFiles]);



  const renderFileExplorer = useCallback((items: Item[]) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-2"
      >
        {items.map((item) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {item.type === 'dir' ? (
              <Button
                variant="ghost"
                className="w-full text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => selectItem(item)}
              >
                <Folder className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ) : (
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => selectItem(item)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileCode className="mr-2 h-4 w-4" />
                    {item.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            )}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  ), [selectItem]);

  const getLanguage = useCallback((fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'html':
        return 'markup';
      case 'css':
        return 'css';
      default:
        return 'markup';
    }
  }, []);

  const runCode = useCallback(() => {
    if (selectedItem && selectedItem.content) {
      const language = getLanguage(selectedItem.name);
      let output = '';

      if (language === 'javascript') {
        try {
          const runInSandbox = new Function('console', selectedItem.content);
          const mockConsole = {
            log: (...args: any[]) => {
              output += args.join(' ') + '\n';
            },
            error: (...args: any[]) => {
              output += 'Error: ' + args.join(' ') + '\n';
            },
            warn: (...args: any[]) => {
              output += 'Warning: ' + args.join(' ') + '\n';
            }
          };
          runInSandbox(mockConsole);
        } catch (error) {
          output = 'Error';
        }
      } else if (language === 'python') {
        // Simulación básica de ejecución de Python
        // const lines = selectedItem.content.split('\n');
        const scope: { [key: string]: any } = {};

        const simulatePythonExecution = (code: string) => {
          const functionPattern = /def\s+(\w+)\s*$$(.*?)$$:/;
          const functionCalls = /(\w+)$$(.*?)$$/g;

          // Define functions
          code.split('\n').forEach(line => {
            const match = line.match(functionPattern);
            if (match) {
              const [, name, params] = match;
              scope[name] = new Function(...params.split(','), 'return ' + line.replace(functionPattern, ''));
            }
          });

          // Execute function calls
          code.split('\n').forEach(line => {
            const calls = line.match(functionCalls);
            if (calls) {
              calls.forEach(call => {
                const [, name, args] = call.match(/(\w+)$$(.*?)$$/) || [];
                if (scope[name]) {
                  const result = scope[name](...eval(`[${args}]`));
                  if (line.trim().startsWith('print(')) {
                    output += result + '\n';
                  }
                }
              });
            }
          });
        };

        simulatePythonExecution(selectedItem.content);
      }

      setConsoleOutput(output);
    }
  }, [selectedItem, getLanguage]);

  const goBack = useCallback(() => {
    if (currentPath.length > 0) {
      const newPath = currentPath.slice(0, -1);
      setCurrentPath(newPath);
      if (newPath.length === 0) {
        setCurrentItems(rootItems);
      } else {
        const parentItem = rootItems.find(item => item.name === newPath[0]);
        if (parentItem && parentItem.items) {
          setCurrentItems(parentItem.items);
        }
      }
      setSelectedItem(null);
    }
  }, [currentPath, rootItems]);

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

          <div className="flex flex-col lg:flex-row gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full lg:w-1/3"
            >
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-primary/10 text-primary">
                  <CardTitle className="text-xl font-semibold flex items-center justify-between">
                    <span>Explorador de Archivos</span>
                    {currentPath.length > 0 && (
                      <Button variant="outline" size="sm" onClick={goBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <ScrollArea className="h-[calc(100vh-200px)]">
                    {isLoading ? (
                      <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : (
                      renderFileExplorer(currentItems)
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full lg:w-2/3"
            >
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md">
                <CardHeader className="bg-primary/10 text-primary">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    {selectedItem
                      ? selectedItem.name
                      : 'Selecciona un archivo'}
                  </CardTitle>
                  {currentPath.length > 0 && (
                    <Breadcrumb>
                      {currentPath.map((path, index) => (
                        <BreadcrumbItem key={index}>
                          <BreadcrumbLink
                            href="#"
                            onClick={() => {
                              const newPath = currentPath.slice(0, index + 1);
                              setCurrentPath(newPath);
                              let items = rootItems;
                              for (let i = 0; i < newPath.length; i++) {
                                const folder = items.find(item => item.name === 
                                newPath[i]);
                                if (folder && folder.items) {
                                  items = folder.items;
                                }
                              }
                              setCurrentItems(items);
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
                    selectedItem.type === 'file' ? (
                      <Tabs defaultValue="code" className="w-full">
                        <TabsList>
                          <TabsTrigger value="code">Código</TabsTrigger>
                          {(selectedItem.name.endsWith('.js') || selectedItem.name.endsWith('.py')) && (
                            <TabsTrigger value="console">Consola</TabsTrigger>
                          )}
                          {selectedItem.name.endsWith('.html') && (
                            <TabsTrigger value="preview">
                              Vista previa
                            </TabsTrigger>
                          )}
                        </TabsList>
                        <TabsContent value="code">
                          <ScrollArea className="h-[calc(100vh-400px)]">
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
                          {(selectedItem.name.endsWith('.js') || selectedItem.name.endsWith('.py')) && (
                            <Button onClick={runCode} className="mt-4">
                              <Play className="mr-2 h-4 w-4" />
                              Ejecutar código
                            </Button>
                          )}
                          {(selectedItem.name.endsWith('.js') || selectedItem.name.endsWith('.py')) && (
                            <Card className="mt-4">
                              <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center">
                                  <Terminal className="mr-2 h-5 w-5" />
                                  Consola
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <pre className="p-4 rounded-md bg-[#2d2d2d] text-[#ccc] overflow-x-auto">
                                  {consoleOutput || 'La salida de la consola aparecerá aquí después de ejecutar el código.'}
                                </pre>
                              </CardContent>
                            </Card>
                          )}
                        </TabsContent>
                        {(selectedItem.name.endsWith('.js') || selectedItem.name.endsWith('.py')) && (
                          <TabsContent value="console">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center">
                                  <Terminal className="mr-2 h-5 w-5" />
                                  Consola
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <pre className="p-4 rounded-md bg-[#2d2d2d] text-[#ccc] overflow-x-auto">
                                  {consoleOutput || 'La salida de la consola aparecerá aquí después de ejecutar el código.'}
                                </pre>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        )}
                        {selectedItem.name.endsWith('.html') && (
                          <TabsContent value="preview">
                            <div className="w-full h-[calc(100vh-400px)] border rounded">
                              <iframe
                                srcDoc={htmlContent}
                                title="HTML Preview"
                                className="w-full h-full"
                                sandbox="allow-scripts"
                              />
                            </div>
                          </TabsContent>
                        )}
                      </Tabs>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p>Selecciona un archivo para ver su contenido.</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center text-muted-foreground space-y-4">
                      <p>
                        Selecciona un archivo de la lista para comenzar.
                      </p>
                      <p>
                        Cada ejercicio te ayudará a mejorar tus habilidades de programación y lógica.
                      </p>
                      <p>
                        ¡Buena suerte en tu viaje de aprendizaje!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <Footer />
        </div>
      </motion.section>
    </>
  );
}
// Explicación del Código de la Aplicación de Ejercicios Lógicos

// 1. Estructura General:
//    - El componente principal se llama 'EjerciciosLogicos'.
//    - Utiliza hooks de React (useState, useEffect) para manejar el estado y los efectos secundarios.
//    - La interfaz se divide en dos secciones principales: un panel izquierdo para la navegación y un panel derecho para mostrar el contenido.

// 2. Carga de Datos:
//    - Los datos se cargan desde un repositorio de GitHub utilizando la API de GitHub.
//    - Se realiza una solicitud inicial para obtener las categorías principales (directorios de nivel superior).
//    - Los contenidos de las subcarpetas se cargan bajo demanda cuando el usuario las expande.

// 3. Estructura de Archivos:
//    - Los archivos y carpetas se muestran en una estructura de árbol en el panel izquierdo.
//    - Cada elemento puede ser un archivo o un directorio.
//    - Los directorios tienen un icono de flecha que indica si están expandidos o contraídos.
//    - Al hacer clic en un directorio, se alterna su estado (expandido/contraído) y se cargan sus contenidos si aún no se han cargado.

// 4. Selección y Carga de Archivos:
//    - Al hacer clic en un archivo, su contenido se carga y se muestra en el panel derecho.
//    - Para archivos de código, se utiliza Prism.js para el resaltado de sintaxis.
//    - El contenido del archivo se muestra en un área desplazable.

// 5. Renderizado de HTML:
//    - Para archivos HTML, existe una función especial 'renderHTML'.
//    - Esta función procesa el contenido HTML, extrae CSS y JavaScript.
//    - Prepara el contenido para su visualización en un iframe.
//    - Se proporciona un botón "Renderizar HTML" para activar esta funcionalidad.

// 6. Manejo de Estado:
//    - categories: Array de objetos que representa la estructura de carpetas y archivos.
//    - selectedItem: El archivo o carpeta actualmente seleccionado.
//    - currentPath: Array que representa la ruta actual en la estructura de archivos.
//    - isLoading: Booleano que indica si se está cargando contenido.
//    - error: String que contiene mensajes de error, si los hay.
//    - htmlContent: String que contiene el HTML procesado para la vista previa.
//    - showPreview: Booleano que controla la visibilidad de la vista previa HTML.

// 7. Funciones Principales:
//    - loadItemContent: Carga el contenido de un archivo o los elementos de un directorio.
//    - toggleFolder: Expande o contrae un directorio y carga su contenido si es necesario.
//    - selectItem: Maneja la selección de archivos y carpetas.
//    - renderDirectoryContent: Genera la estructura de árbol para la navegación.
//    - getLanguage: Determina el lenguaje de programación basado en la extensión del archivo.
//    - renderHTML: Procesa y prepara el contenido HTML para la vista previa.
