"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
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

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>(
    []
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Prism.highlightAll();

    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll("h2, h3");
      const tocItems = Array.from(headings).map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        return {
          id,
          text: heading.textContent || "",
          level: heading.tagName === "H2" ? 2 : 3,
        };
      });
      setToc(tocItems);
    }

    const observerOptions = {
      rootMargin: "-100px 0px -40% 0px",
      threshold: 1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    document
      .querySelectorAll(".blog-content h2, .blog-content h3")
      .forEach((heading) => {
        observer.observe(heading);
      });

    return () => observer.disconnect();
  }, [post.content]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareOnSocialMedia = (platform: string) => {
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
    const colors = {
      "Node.js": "bg-green-100 text-green-800",
      API: "bg-blue-100 text-blue-800",
      Express: "bg-yellow-100 text-yellow-800",
      Backend: "bg-purple-100 text-purple-800",
      React: "bg-cyan-100 text-cyan-800",
      JavaScript: "bg-yellow-100 text-yellow-800",
      Hooks: "bg-pink-100 text-pink-800",
      Frontend: "bg-orange-100 text-orange-800",
    };
    return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Adjust this value to fine-tune the scroll position
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
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
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-64 object-cover"
              />
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
                className="hover:bg-primary/10 transition-colors duration-200"
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
                    <AvatarImage
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                    <AvatarFallback>
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
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
                {post.tags.map((tag: string, index: number) => (
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

              <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-1/4">
                  <div className="sticky top-24">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Table of Contents
                    </h2>
                    <nav className="toc">
                      <ul className="space-y-2">
                        {toc.map((item) => (
                          <li
                            key={item.id}
                            className={item.level === 3 ? "ml-4" : ""}
                          >
                            <button
                              onClick={() => scrollToHeading(item.id)}
                              className={`block w-full text-left py-1 px-2 rounded transition-colors duration-200 ${
                                activeHeading === item.id
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-muted-foreground hover:text-primary"
                              }`}
                            >
                              {item.text}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </aside>
                <motion.div
                  ref={contentRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="prose dark:prose-invert max-w-none lg:w-3/4 blog-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hover:bg-primary/10 transition-colors duration-200"
            >
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </motion.article>
      <style jsx global>{`
        .toc {
          font-size: 0.9em;
          line-height: 1.2;
          padding-left: 0;
          list-style: none;
        }

        .toc li {
          margin-bottom: 0.5em;
        }

        .toc button {
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-size: 0.9em;
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
