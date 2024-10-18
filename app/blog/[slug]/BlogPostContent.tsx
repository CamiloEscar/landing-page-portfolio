/* eslint-disable no-unused-vars */
'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Calendar,
  Facebook,
  Linkedin,
  Menu,
  ArrowLeft,
  Home,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { SiX } from 'react-icons/si';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Navbar from '@/components/shared/navbarBlog';
import { BlogPost, dataBlog } from '../data';
import TableOfContents from './TableOfContents';
import RelatedArticles from './RelatedArticles';
import FooterBlog from '@/components/blog/FooterBlog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .trim();
}

const useProcessedContent = (content: string) => {
  const [processedContent, setProcessedContent] = useState(content);
  const [sections, setSections] = useState<{ id: string; title: string; content: string }[]>([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const newSections: { id: string; title: string; content: string }[] = [];

    doc.querySelectorAll('h2, h3').forEach((heading) => {
      const id = slugify(heading.textContent || '');
      heading.id = id;

      let content = '';
      let nextElement = heading.nextElementSibling;
      while (nextElement && !['H2', 'H3'].includes(nextElement.tagName)) {
        content += nextElement.outerHTML;
        nextElement = nextElement.nextElementSibling;
      }

      newSections.push({ id, title: heading.textContent || '', content });
    });

    setSections(newSections);
    setProcessedContent(doc.body.innerHTML);
  }, [content]);

  return { processedContent, sections };
};

export default function Component({ post }: { post: BlogPost }) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [showFloatingToc, setShowFloatingToc] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSectionContent, setCurrentSectionContent] = useState('');

  const { inView: contentStartInView } = useInView({
    threshold: 0,
  });

  const { theme } = useTheme();

  const { processedContent, sections } = useProcessedContent(post.content);

  const generateToc = useCallback(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h2, h3');
      return Array.from(headings).map((heading) => {
        const element = heading as HTMLElement;
        const text = element.textContent || '';
        const id = slugify(text);
        element.id = id;
        return {
          id,
          text,
          level: element.tagName === 'H2' ? 2 : 3,
        };
      });
    }
    return [];
  }, []);

  useEffect(() => {
    const tocItems = generateToc();
    setToc(tocItems);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveHeading(id);
          const currentSection = sections.find(section => section.id === id);
          setCurrentSectionContent(currentSection?.content || '');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-100px 0px -40% 0px',
      threshold: 0.5,
    });

    const headings = contentRef.current?.querySelectorAll('h2, h3') || [];
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [generateToc, sections]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setShowFloatingToc(!contentStartInView && !isMobile);
  }, [contentStartInView, isMobile]);

  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const relatedPostsLeft = dataBlog
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const shareButtons = [
    {
      Icon: Facebook,
      name: 'Facebook',
      color: 'bg-[#1877f2] hover:bg-[#1877f2]/90',
    },
    {
      Icon: SiX,
      name: 'X',
      color: 'bg-[#111111] hover:bg-[#111111]/90',
    },
    {
      Icon: Linkedin,
      name: 'LinkedIn',
      color: 'bg-[#0a66c2] hover:bg-[#0a66c2]/90',
    },
  ];

  const shareOnSocialMedia = (platform: string) => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(post.title);

    const urls: { [key: string]: string } = {
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      X: `https://x.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${text}`,
      LinkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        shareUrl
      )}&title=${text}`,
    };

    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  useEffect(() => {
    const index = toc.findIndex((item) => item.id === activeHeading);
    if (index !== -1) {
      setCurrentHeadingIndex(index);
    }
  }, [activeHeading, toc]);

  const navigateHeading = (direction: 'prev' | 'next') => {
    const newIndex =
      direction === 'prev'
        ? Math.max(0, currentHeadingIndex - 1)
        : Math.min(toc.length - 1, currentHeadingIndex + 1);

    setCurrentHeadingIndex(newIndex);
    scrollToHeading(toc[newIndex].id);
  };

  const MobileNavigation = () => (
    <nav className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <Link href="/blog" className="flex items-center text-sm font-medium">
        <Home className="h-4 w-4 mr-2" />
        Blog
      </Link>
      <div className="flex items-center">
        <span className="text-sm font-medium truncate max-w-[150px]">
          {post.title}
        </span>
        <ChevronRight className="h-4 w-4 mx-2" />
      </div>
    </nav>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative">
        {/* Background image with reduced transparency */}
        <div className="fixed inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/60'}`}></div>
        </div>

        <article className="relative z-10">
          {/* Improved Header */}
          <header className="relative py-20 md:py-32 lg:py-48 overflow-hidden">
            <div className="container max-w-6xl mx-auto px-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="mb-8 bg-background/20 backdrop-blur-sm hover:bg-background/90"
              >
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Blog
                </Link>
              </Button>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {post.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {post.excerpt}
              </p>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('es-ES', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content with table of contents */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Table of Contents (Desktop) */}
              <aside className="lg:w-1/4 hidden lg:block">
                <div className="sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Tabla de Contenidos</h2>
                  <TableOfContents
                    toc={toc}
                    activeHeading={activeHeading}
                    scrollToHeading={scrollToHeading}
                  />
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:w-3/4">
                <div className="bg-card rounded-lg p-8 shadow-lg mb-8">
                  {/* Botones para compartir */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {shareButtons.map(({ Icon, name, color }) => (
                      <Button
                        key={name}
                        variant="default"
                        className={`${color} text-white`}
                        onClick={() => shareOnSocialMedia(name)}
                      >
                        Compartir en
                        <Icon className="ml-2 h-4 w-4 mr-2" />
                      </Button>
                    ))}
                  </div>

                  {/* Etiquetas */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 text-sm"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Separator className="my-8" />

                  {/* Contenido */}
                  <div
                    ref={contentRef}
                    className="prose dark:prose-invert max-w-none blog-content"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                  />
                </div>

                <RelatedArticles currentSlug={post.slug} posts={dataBlog} />
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Mobile navigation and table of contents */}
      {isMobile && (
        <>
          <MobileNavigation />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="fixed bottom-20 right-4 rounded-full shadow-lg z-50"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <Tabs defaultValue="toc" className="w-full h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="toc">Tabla de Contenidos</TabsTrigger>
                  <TabsTrigger value="navigation">
                    Navegación Rápida
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="toc"
                  className="mt-4 h-[calc(100%-60px)] overflow-y-auto"
                >
                  <TableOfContents
                    toc={toc}
                    activeHeading={activeHeading}
                    scrollToHeading={scrollToHeading}
                    isFloating={true}
                  />
                </TabsContent>
                <TabsContent
                  value="navigation"
                  className="mt-4 h-[calc(100%-60px)] flex flex-col justify-between"
                >
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
                    <p className="text-sm font-medium mb-2">
                      Sección actual: {toc[currentHeadingIndex]?.text || 'Introducción'}
                    </p>
                    <div className="text-sm text-muted-foreground max-h-40 overflow-y-auto">
                      <div dangerouslySetInnerHTML={{ __html: currentSectionContent || 'No hay contenido disponible para esta sección.' }} />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Button
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    >
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Inicio del artículo
                    </Button>
                    <div className="flex justify-between space-x-4">
                      <Button
                        onClick={() => navigateHeading('prev')}
                        disabled={currentHeadingIndex === 0}
                        className="flex-1"
                      >
                        <ChevronUp className="mr-2 h-4 w-4" />
                        Sección Anterior
                      </Button>
                      <Button
                        onClick={() => navigateHeading('next')}
                        disabled={currentHeadingIndex === toc.length - 1}
                        className="flex-1"
                      >
                        Siguiente Sección
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
        </>
      )}

      <FooterBlog />

      <style jsx global>{`
        .blog-content {
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .blog-content h2 {
          font-size: 2rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          scroll-margin-top: 100px;
        }

        .blog-content h3 {
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
          scroll-margin-top: 100px;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
        }

        .blog-content pre {
          background-color: hsl(var(--muted));
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1.5rem 0;
          overflow-x: auto;
        }

        .blog-content code {
          font-family: "Fira Code", monospace;
          font-size: 0.9em;
        }

        .blog-content img {
          border-radius: 0.5rem;
          margin: 2rem auto;
        }

        .blog-content blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: hsl(var(--muted-foreground));
        }
      `}</style>
    </>
  );
}