'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Calendar,
  Facebook,
  Twitter,
  Linkedin,
  Menu,
  ArrowLeft,
} from 'lucide-react';
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
  // eslint-disable-next-line no-unused-vars
  const [showFloatingToc, setShowFloatingToc] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const {inView: contentStartInView } = useInView({
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
      Icon: Twitter,
      name: 'Twitter',
      color: 'bg-[#1da1f2] hover:bg-[#1da1f2]/90',
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
      Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${text}`,
      LinkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        shareUrl
      )}&title=${text}`,
    };

    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Navbar />
      <main className="py-8 bg-gradient-to-b from-background to-background/80">
        <article className="max-w-full">
          {/* Cover Image Section */}
          <div className="relative h-[40vh] md:h-[50vh] mb-8">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container max-w-7xl px-4">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="mb-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                >
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                  </Link>
                </Button>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {post.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>

          <div className="container max-w-full px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              {/* Left Sidebar - Related Articles */}
              <aside className="lg:w-64 hidden lg:block">
                <h3 className="text-xl font-semibold mb-4">
                  Ver otros Articulos
                </h3>
                <div className="space-y-4">
                  {relatedPostsLeft.map((relatedPost) => (
                    <Card key={relatedPost.slug}>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <div className="relative h-32">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium line-clamp-2">
                            {relatedPost.title}
                          </h4>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                <div className="bg-card rounded-lg p-8 shadow-lg mb-8">
                  {/* Author Info */}
                  <div className="flex items-center mb-6">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                      <AvatarFallback>
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>
                  </div>

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

                  {/* Tags */}
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

                  {/* Content */}
                  <div
                    ref={contentRef}
                    className="prose dark:prose-invert max-w-none blog-content"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                  />
                </div>

                <RelatedArticles currentSlug={post.slug} posts={dataBlog} />
              </div>

              {/* Table of Contents */}
              {!isMobile && (
                <aside className="lg:w-64 hidden lg:block sticky top-24 h-fit">
                  <TableOfContents
                    toc={toc}
                    activeHeading={activeHeading}
                    scrollToHeading={scrollToHeading}
                  />
                </aside>
              )}
            </div>
          </div>
        </article>
      </main>

      {/* Mobile Table of Contents */}
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-4 right-4 rounded-full shadow-lg z-50"
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
