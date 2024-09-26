"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Title from "@/components/shared/title";
import { dataBlog, BlogPost } from "./data";
import Navbar from "@/components/shared/navbar";

const ITEMS_PER_PAGE = 6;

const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-0">
          <Image
            src={post.image}
            alt={post.title}
            width={400}
            height={300}
            className="rounded-t-xl object-cover w-full h-48"
          />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          {/* Etiqueta del tipo de blog */}
          <Badge variant="outline" className="mb-2">
            {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
          </Badge>
          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
          <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button asChild>
            <Link href={`/blog/${post.slug}`}>Leer más</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
  

export default function BlogIndex() {
  const [visiblePosts, setVisiblePosts] = React.useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState("all");

  const filteredPosts = React.useMemo(() => {
    return dataBlog.filter(
      (post) =>
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedTag === "all" || post.tags.includes(selectedTag))
    );
  }, [searchTerm, selectedTag]);

  const togglePosts = () => {
    setVisiblePosts((prev) =>
      prev === ITEMS_PER_PAGE ? filteredPosts.length : ITEMS_PER_PAGE
    );
  };

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    dataBlog.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, []);

  return (
    <>
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16 md:py-24 bg-background transition-colors duration-300"
        id="blog"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          >
            <Title title="Blog" subtitle="Explora Nuestros Artículos" />
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
                aria-label="Buscar artículos"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Todos los temas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los temas</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {filteredPosts.slice(0, visiblePosts).map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
          </motion.div>

          {filteredPosts.length > ITEMS_PER_PAGE && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 text-center"
            >
              <Button
                onClick={togglePosts}
                variant="outline"
                size="lg"
                className="bg-background hover:bg-accent"
              >
                {visiblePosts === ITEMS_PER_PAGE
                  ? "Ver más artículos"
                  : "Ver menos artículos"}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.section>
    </>
  );
}