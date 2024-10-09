import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/app/blog/data';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import GradientName from './GradientName';

interface RecentPostsProps {
  posts: BlogPost[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="py-6 sm:py-8 md:py-16 bg-transparent transition-colors duration-300 ">
      <div className="container mx-auto px-4 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/20 shadow-xl rounded-md">
        <motion.section
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-lg p-4 sm:p-6 mb-6 sm:mb-8"
          id="blog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Book className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              <GradientName>Últimos posts</GradientName>
            </h2>
          </motion.div>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.title} className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-auto sm:flex-shrink-0">
                  <div className="h-48 sm:h-24 sm:w-48 rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.author.name}
                      height={640}
                      width={300}
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:underline text-black dark:text-white"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 sm:line-clamp-none">
                    {post.excerpt}
                  </p>
                  <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 block mt-1">
                    {new Date(post.date).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 sm:mt-6 flex justify-center">
            <Link href="/blog" className="w-full sm:w-auto">
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base">
                Ver todos los posts
              </button>
            </Link>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default RecentPosts;