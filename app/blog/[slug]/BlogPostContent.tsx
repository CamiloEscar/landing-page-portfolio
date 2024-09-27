"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Title from "@/components/shared/title";
import Navbar from "@/components/shared/navbar";
import { BlogPost } from "../data";
import TableOfContents from "./TableOfContents";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface BlogPostContentProps {
  post: BlogPost;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .trim();
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [showFloatingToc, setShowFloatingToc] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { ref: contentStartRef, inView: contentStartInView } = useInView({
    threshold: 0,
  });

  const generateToc = useCallback(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll("h2, h3");
      return Array.from(headings).map((heading) => {
        const element = heading as HTMLElement;
        const text = element.textContent || "";
        const id = slugify(text);
        element.id = id;
        return {
          id,
          text,
          level: element.tagName === "H2" ? 2 : 3,
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
      rootMargin: "-100px 0px -40% 0px",
      threshold: 0.5,
    });

    const headings = contentRef.current?.querySelectorAll("h2, h3") || [];
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [generateToc]);

  useEffect(() => {
    setShowFloatingToc(!contentStartInView);
  }, [contentStartInView]);

  const scrollToHeading = useCallback((id: string) => {
    console.log(`Scrolling to heading with ID: ${id}`);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      console.log(`Element found. Scrolling to Y position: ${y}`);
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      console.warn(`Element with ID: ${id} not found`);
    }
  }, []);

  const processContent = useCallback((content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    doc.querySelectorAll('h2, h3').forEach((heading) => {
      const id = slugify(heading.textContent || '');
      heading.id = id;
    });

    return doc.body.innerHTML;
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareOnSocialMedia = (
    platform: "facebook" | "twitter" | "linkedin"
  ) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(post.title)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          shareUrl
        )}&title=${encodeURIComponent(post.title)}`;
        break;
    }
    window.open(url, "_blank");
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      "Node.js": "bg-green-100 text-green-800",
      API: "bg-blue-100 text-blue-800",
      Express: "bg-yellow-100 text-yellow-800",
      Backend: "bg-purple-100 text-purple-800",
      React: "bg-cyan-100 text-cyan-800",
      JavaScript: "bg-yellow-100 text-yellow-800",
      Hooks: "bg-pink-100 text-pink-800",
      Frontend: "bg-orange-100 text-orange-800",
    };
    return colors[tag] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <Navbar />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-8 md:py-16 bg-gradient-to-b from-background to-background/80 transition-colors duration-300"
      >
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
                    Back to Blog
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
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
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("es-AR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => shareOnSocialMedia("facebook")}
                            >
                              <Facebook className="mr-2 h-4 w-4" />
                              <span>Facebook</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => shareOnSocialMedia("twitter")}
                            >
                              <Twitter className="mr-2 h-4 w-4" />
                              <span>Twitter</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => shareOnSocialMedia("linkedin")}
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
                <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
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
              <motion.div
                ref={contentRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="prose dark:prose-invert max-w-none blog-content"
                dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
              />
            </CardContent>
          </Card>
        </div>
      </motion.article>
      <AnimatePresence>
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
          background-color: #2d2d2d;
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
          background-color: rgba(var(--primary-rgb), 0.1);
          color: var(--primary);
          padding: 0.2em 0.4em;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
