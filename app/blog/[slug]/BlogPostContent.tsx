'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  ArrowLeft,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Title from '@/components/shared/title';
import Navbar from '@/components/shared/navbar';
import { BlogPost } from '../data';
import TableOfContents from './TableOfContents';

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

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    doc.querySelectorAll('h2, h3').forEach((heading) => {
      const id = slugify(heading.textContent || '');
      heading.id = id;
    });

    doc.querySelectorAll('img').forEach((img, index) => {
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || `Image ${index + 1}`;
      const wrapper = doc.createElement('div');
      wrapper.className = 'image-wrapper';
      wrapper.innerHTML = `
        <div class="relative w-full max-w-3xl mx-auto">
          <div class="aspect-w-16 aspect-h-9">
            <img src="${src}" alt="${alt}" class="rounded-lg object-cover" />
          </div>
        </div>
      `;
      img.parentNode?.replaceChild(wrapper, img);
    });

    setProcessedContent(doc.body.innerHTML);
  }, [content]);

  return processedContent;
};

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [showFloatingToc, setShowFloatingToc] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { ref: contentStartRef, inView: contentStartInView } = useInView({
    threshold: 0,
  });

  const processedContent = useProcessedContent(post.content);

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
          setActiveHeading(entry.target.id);
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
  }, [generateToc]);

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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareOnSocialMedia = (
    platform: 'facebook' | 'twitter' | 'linkedin'
  ) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(post.title)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          shareUrl
        )}&title=${encodeURIComponent(post.title)}`;
        break;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'Node.js': 'bg-primary/10 text-primary',
      API: 'bg-secondary/10 text-secondary',
      Express: 'bg-accent/10 text-accent',
      Backend: 'bg-muted/10 text-muted-foreground',
      React: 'bg-primary/10 text-primary',
      JavaScript: 'bg-secondary/10 text-secondary',
      Hooks: 'bg-accent/10 text-accent',
      Frontend: 'bg-muted/10 text-muted-foreground',
    };
    return colors[tag] || 'bg-primary/10 text-primary';
  };

  return (
    <>
      <Navbar />
      <main className="py-8 md:py-16 bg-gradient-to-b from-background to-background/80 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="overflow-hidden shadow-2xl mb-8">
            <CardHeader className="p-0 relative">
              <div className="relative w-full h-64 md:h-96">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-90"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-8"
              >
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:bg-primary/10 transition-colors duration-200 mb-4"
                >
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span className="sr-only">Back to Blog</span>
                    <span aria-hidden="true">Back to Blog</span>
                  </Link>
                </Button>
                <Title
                  title={post.title}
                  subtitle={post.excerpt}
                  className="text-white"
                />
              </motion.div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Avatar className="w-12 h-12 sm:w-10 sm:h-10">
                    {post.author.avatar ? (
                      <AvatarImage
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                    ) : (
                      <AvatarFallback>
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm sm:text-base font-medium">
                      {post.author.name}
                    </p>
                    <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center mr-4 mb-1 sm:mb-0">
                        <Calendar
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                          aria-hidden="true"
                        />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('es-AR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <div className="flex items-center">
                        <Clock
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                          aria-hidden="true"
                        />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              aria-label="Share post"
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => shareOnSocialMedia('facebook')}
                            >
                              <Facebook className="mr-2 h-4 w-4" />
                              <span>Facebook</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => shareOnSocialMedia('twitter')}
                            >
                              <Twitter className="mr-2 h-4 w-4" />
                              <span>Twitter</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => shareOnSocialMedia('linkedin')}
                            >
                              <Linkedin className="mr-2 h-4 w-4" />
                              <span>LinkedIn</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share this post</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <Tag
                  className="w-4 h-4 mr-2 text-muted-foreground"
                  aria-hidden="true"
                />
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className={`${getTagColor(
                      tag
                    )} transition-colors duration-200`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator className="my-8" />
              <div ref={contentStartRef} />
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div
                  ref={contentRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="prose dark:prose-invert max-w-none blog-content md:w-3/4"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
                {!isMobile && (
                  <div className="md:w-1/4">
                    <TableOfContents
                      toc={toc}
                      activeHeading={activeHeading}
                      scrollToHeading={scrollToHeading}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full shadow-lg"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <TableOfContents
                  toc={toc}
                  activeHeading={activeHeading}
                  scrollToHeading={scrollToHeading}
                  isFloating={true}
                />
              </SheetContent>
            </Sheet>
          </motion.div>
        )}
        {showFloatingToc && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 bg-background border border-border rounded-lg shadow-lg p-4 max-w-xs w-full"
          >
            <TableOfContents
              toc={toc}
              activeHeading={activeHeading}
              scrollToHeading={scrollToHeading}
              isFloating={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        :root {
          --primary: #61afef; /* Color azul claro */
          --primary-dark: #528bff; /* Color azul oscuro */
          --muted-foreground: #abb2bf; /* Color de texto atenuado */
          --code-bg: #3e4451; /* Fondo de bloques de código */
          --code-inline-bg: #3e4451; /* Fondo de código en línea */
          --code-inline-color: #c678dd; /* Color de texto de código en línea */
          --keyword-color: #c678dd; /* Color para palabras clave */
          --string-color: #98c379; /* Color para strings */
          --comment-color: #5c6370; /* Color para comentarios */
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --primary: #61afef;
            --primary-dark: #528bff;
            --muted-foreground: #abb2bf;
            --code-bg: #282c34;
            --code-inline-bg: #3e4451;
            --code-inline-color: #c678dd;
            --keyword-color: #c678dd;
            --string-color: #98c379;
            --comment-color: #5c6370;
          }
        }

        .highlight {
          color: var(--keyword-color); /* Aplica el color de palabras clave */
          font-weight: bold;
        }

        .toc {
          font-size: 0.9em;
          line-height: 1.2;
          padding-left: 0;
          list-style: none;
          max-height: calc(100vh - 200px);
          overflow-y: auto;
        }

        .floating-toc {
          max-height: 60vh;
          overflow-y: auto;
        }

        .blog-content h2 {
          font-size: 1.8em;
          margin-top: 2em;
          margin-bottom: 1em;
          color: var(--primary);
          scroll-margin-top: 100px;
        }
        .blog-content h3 {
          font-size: 1.5em;
          margin-top: 1.5em;
          margin-bottom: 0.8em;
          scroll-margin-top: 100px;
        }
        .blog-content p {
          margin-bottom: 1.2em;
          line-height: 1.8;
        }
        .blog-content a {
          color: var(--primary);
          text-decoration: underline;
          transition: color 0.2s ease;
        }
        .blog-content a:hover {
          color: var(--primary-dark);
        }
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.2em;
          padding-left: 1.5em;
        }
        .blog-content li {
          margin-bottom: 0.5em;
        }
        .blog-content blockquote {
          border-left: 4px solid var(--primary);
          padding-left: 1em;
          font-style: italic;
          margin: 1.5em 0;
          color: var(--muted-foreground);
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5em 0;
        }
        .blog-content pre {
          background-color: var(--code-bg);
          border-radius: 8px;
          padding: 1em;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .blog-content code {
          font-family: "Fira Code", monospace;
          font-size: 0.9em;
        }
        .blog-content :not(pre) > code {
          background-color: var(--code-inline-bg);
          color: var(--code-inline-color);
          padding: 0.2em 0.4em;
          border-radius: 4px;
        }
        .image-wrapper {
          margin: 2rem 0;
        }
      `}</style>
    </>
  );
}
